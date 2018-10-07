import {Game} from "./Game";
import {MapBoard} from "./MapBoard";
import {Player, CreatePlayer} from "./Player";
//import {Hex} from "./Hex";
import { Request , UpgradeType, RequestType, SpecialActionSource} from './Request'
import { StructureType, StructureStatus} from './Structure'
import {PlanetType, Planet} from './Planet'
import {Material, Trigger, BuildingType} from './Benefit'
import {Hex} from './Hex'
import {Federation, FederationTokenType} from './Federation'

/**
 * Types of actions that a player can make on his turn
 * Not including free actions
 */
 enum ActionType{
     BuildMine,
     Gaia,
     Upgrade,
     Federate,
     Research,
     PowerAndQIC,
     Special,
     Free,
     Pass

 }



/**
 * Action class considers factors relating to making an action
 */
class Action {
  public game: Game;
  public request: Request;
  public check: boolean;
  public board: MapBoard;
  public player: Player;
  public message: string;


  constructor(game: Game, player:Player, request: Request) {
    this.game = game;
    this.request = request;
    this.board = game.board;
    this.player = player;
  //  this.check = true;
    this.message = "undefined"

  }


   public checkValid(){
     //if(this.checkCurrentTurnPlayer() === false)return false;

     if(this.request.actionType === ActionType.BuildMine){

       return this.buildMineCheck()
     }
     if(this.request.actionType === ActionType.Gaia){
       return this.checkGaiaProject()
     }

     if(this.request.actionType === ActionType.Upgrade){
       return this.checkUpdateBuilding()
     }

     if(this.request.actionType === ActionType.Federate){
        return this.checkFederation()
    }

    if(this.request.actionType === ActionType.Research){
      return this.checkResearch()
    }

    if(this.request.actionType === ActionType.PowerAndQIC){
       return this.checkPowerAndQIC()
    }

    if(this.request.actionType === ActionType.Special){
      return this.checkSpecial()
    }

    if(this.request.actionType === ActionType.Free){
      return this.checkFree()
    }

    if(this.request.actionType === ActionType.Pass){
      return this.checkPass()
    }

    return false;

   }

   /*
   * You must have at least one uncovered standard tech tile.
      When you gain an advanced tech tile, place it faceup covering one

      update action lab or academy pickup techtile
      case one:  takeNormal6TechTiles  techTileID  0 1 2 3 4 5
      case two:  takeNormal3TechTiles  techTileID  6 7 8
      case three: takeAdvancedTechTiles techTileID 9 10 11 12 13 14 offTechId  0 - 8  offTechId is ID of covered standard tech tile

   */
   public checkTechTile(){
     if(this.request.techLane === undefined){
       this.message = "this.request.techLane === undefined"
       return false;
     }

     if(this.request.techTileID < 0  && this.request.techTileID >14){
       this.message = "techTileID out of range [0 14]"
       return false;
     }

     if(this.request.techTileID > 8 ){
       // rule 1 Your player token must be on level 4 or 5
       let level = this.player.techs[this.request.techLane];
       if(level === 4 || level === 5){}
       else{
         this.message = "tech level 4 or 5 required"
         return false;
       }
       // rule 2 You must own at least one federation token with its green side faceup
       if(this.request.federationTokenType === undefined){
         this.message = "federationTokenType need "
         return false;
       }

       if(this.hasGreenSideFederationToken(this.request.federationTokenType) === false){
         this.message = "player does not have green usuable federation token "
         return false;
       }



       // You must have at least one uncovered standard tech tile.
       if(this.request.offTechId === undefined){
         this.message = "this.request.offTechId === undefined when techTileID > 8 "
         return false;
       }
     }

     return true;

   }


   public hasGreenSideFederationToken(type : FederationTokenType){
     for(let federation of this.player.federations){
       if(federation.token.used === false && federation.token.type === type){
         return true;
       }
     }
     return false;

   }





   public checkUpdateBuilding(): boolean{
       if(this.request.upgradeType === UpgradeType.StationToLab || this.request.upgradeType === UpgradeType.LabToAcademy){
          if(this.request.techTileID === undefined){
            this.message = "missing techTileID for update to lab and academy "
            return false
          }

       }


      const planet = this.board.getPlanet(this.request.hex);
      if(planet.playerID !== this.player.pid){
        console.log("you do not own this planet")
        return false
      }

      let hasNeighboring = this.board.hasNeighboring(this.request.hex, this.player.pid);
      // check planet building type
      if(this.request.upgradeType === UpgradeType.MineToStation){
        if(planet.building !== StructureType.Mine){
          console.log("planet.building !== StructureType.Mine")
          return false;
        }

      }

      if(this.request.upgradeType === UpgradeType.StationToInstitute ||
        this.request.upgradeType === UpgradeType.StationToLab
      ){
        if(planet.building !== StructureType.Station){
          console.log("planet.building !== StructureType.Station")
          return false;
        }
      }

      if(this.request.upgradeType === UpgradeType.LabToAcademy){
        if(planet.building !== StructureType.Lab){
          console.log("planet.building !== StructureType.Lab")
          return false;
        }

      }


      // check afford
      if(this.request.upgradeType === UpgradeType.MineToStation){
          let station = this.player.getAvalibleStation();
          if(station === null)return false;
          return this.player.haveResouces(station.cost);
      }

      if(this.request.upgradeType === UpgradeType.StationToInstitute ){
        let institute = this.player.getAvalibleInstitute();
        if(institute === null)return false;

        return this.player.haveResouces(institute.cost);
      }

      if(this.request.upgradeType === UpgradeType.StationToLab){
          let lab = this.player.getAvalibleLab();
          if(lab === null)return false;
          return this.player.haveResouces(lab.cost) && this.checkTechTile();
      }

      if(this.request.upgradeType === UpgradeType.LabToAcademy){
        let academy = this.player.getAvalibleAcademies();
        if(academy === null)return false;
        return this.player.haveResouces(academy.cost) && this.checkTechTile();
      }



      return false;  // execute to here is wrong

   }

   public checkGaiaProject(): boolean{
     // page 11
     if(this.player.gaiaformer === 0){
       console.log("gaiaformer not available");
       return false;
     }

     const planet = this.board.getPlanet(this.request.hex);
     // Transdim
     if(planet.type !== PlanetType.Transdim){
       console.log("not  Transdim  can not start gaia project ");
       return false;
     }

     if(planet.playerID !== -1){
       console.log("GaiaProject  this planet has token by others");
       return false;
     }

     if(this.player.checkPlanetDistance(this.request.hex) === false){
        console.log("checkPlanetDistance error ");
        return false;
     }

     if(this.player.checkPowerForGaiaProject() === false){
       console.log("checkPowerForGaiaProject error ");
       return false;
     }



     return true;

   }

   public checkFederation():boolean{
     // check any space of path used as federation before
     if(this.request.federationTokenType === undefined || this.request.federationTokenType === null){
          this.message = "federationTokenType required"
          return false;
     }
     let tokenType = this.request.federationTokenType;
     if(this.game.federationlib.hasFederationToken(tokenType) === false){
       this.message = "can not find this toke at game federationlib"
       return false;
     }

     if(this.board.checkSpaceFeded(this.request.path) === true) {
       this.message = "this path has some place in another federation";
       return false;
      }
     let power = 0  // total power value of at least seven
     let satellite : number = 0;
     for(const hex of this.request.path){
          if(this.board.hasPlanet(hex)){
            const planet = this.board.getPlanet(hex);
            // Satellites cannot be placed on planets
            if(planet.playerID !== this.player.pid){
              // console.log("planet pid is: " + planet.playerID + "; pid is: " + this.player.pid + "***************************");
              this.message = "there is another players planet on the path";
              return false;
            } //player does not own planet buiding
            if(planet.building === StructureType.Mine){
              power++;
            }

            if(planet.building === StructureType.Station || planet.building === StructureType.Lab){
              power += 2;
            }

            if(planet.building === StructureType.Institute || planet.building === StructureType.Academy){
              power += 3;
            }
         }else{
           satellite++;
         }
     }

     if(this.player.checkPowerForFederation(satellite) === false){
       this.message = "player do not have enough power to federate";
       return false;
     }

     if(power < 7) {
       this.message = "value of the buildings is too low";
       return false;
     }
     else return true;


 }

 public checkResearch(){
   if(this.request.techLane === undefined || this.request.techLane === null){
     this.message = "undefine techLane"
     return false;
   }
   if(this.game.techBoard.canUpdate(this.request.techLane, this.player) === false){
     this.message = "can not update this techlane, it already max or other take level 5(only one can take)"
     return false;
   }
   if(this.player.science < 4)return false;
   return true;

 }

public checkPowerAndQIC(){
  if(this.request.storeMerchandiseType == 7 || this.request.storeMerchandiseType == 8 || this.request.storeMerchandiseType == 9 ){
    return this.game.store.checkQic(this.player, this.request.storeMerchandiseType)
  }
  return this.game.store.checkTrade(this.player, this.request.storeMerchandiseType)
}

public checkSpecial(){
  if(this.request.specialActionSource === undefined){
    this.message = "specialTokenType required"
    return false;
  }
  let player = this.player
  console.log("****************Print All Special")
   return player.checkSpecialPower()

}

public checkFree(){
  return this.game.exchange.checkTrade(this.player, this.request.freeExchangeItems[0],
                           this.request.freeExchangeItems[1],
                           this.request.freeExchangeTimes);

}

public checkPass(){
  if(this.game.round < 6 && this.request.roundBoosterID == null){
    this.message = "roundBoosterID missing";
    return false;
  }
  return true;
}



// public checkCurrentTurnPlayer(){
//   let currentPlayer = this.game.players[this.game.turn];
//   if(currentPlayer.pid === this.player.pid)return true;
//   else return false;
// }

//
public doAction(){
      //if(this.checkCurrentTurnPlayer() === false)return

      if(this.request.actionType === ActionType.BuildMine) {
        this.buildMine();
      }else if(this.request.actionType === ActionType.Gaia) {
        this.startGaiaProject();
      }else if(this.request.actionType === ActionType.Upgrade){
        this.updateBuilding();
      }else if(this.request.actionType === ActionType.Federate){
        this.FormFederation();
      }else if(this.request.actionType === ActionType.Research){
        this.Research();
      }else if(this.request.actionType === ActionType.PowerAndQIC){
        this.powerAndQIC();
      }else if(this.request.actionType === ActionType.Special){
        this.special();
      }else if(this.request.actionType === ActionType.Free){
        this.free();
      }else if(this.request.actionType === ActionType.Pass){
        this.pass();
      }else{
        console.trace()
        console.log("error can not find action type")
      }

      //trigerRoundScoringBenefit  we suppose the action successfully done
      /*
      Trigger.Build, null, BuildingType.Mine
      Trigger.Build, null, BuildingType.TradingStation
      Trigger.Build, null, BuildingType.MineOnGaia
      Trigger.Build, null, BuildingType.BigBuildings
      Trigger.Fed, null, null
      Trigger.Dig, null, null
      Trigger.ScienceUp, null, null
      */

      if(this.request.actionType === ActionType.BuildMine){
            this.game.trigerRoundScoringBenefit(Trigger.Build, BuildingType.Mine);
      }

      if(this.request.actionType === ActionType.Upgrade &&
        this.request.upgradeType === UpgradeType.MineToStation){
            this.game.trigerRoundScoringBenefit(Trigger.Build, BuildingType.TradingStation);
      }

      if(this.request.actionType === ActionType.BuildMine){
        const planet = this.board.getPlanet(this.request.hex);

        if(planet.type === PlanetType.Gaia){
            this.game.trigerRoundScoringBenefit(Trigger.Build, BuildingType.MineOnGaia);
        }
      }


      if(this.request.actionType === ActionType.Upgrade && 
        (this.request.upgradeType === UpgradeType.StationToInstitute ||
        this.request.upgradeType === UpgradeType.LabToAcademy)){
            this.game.trigerRoundScoringBenefit(Trigger.Build, BuildingType.TradingStation);
      }

      if(this.request.actionType === ActionType.Federate){
            this.game.trigerRoundScoringBenefit(Trigger.Fed, null);
      }

      if(this.request.actionType === ActionType.Research){
            this.game.trigerRoundScoringBenefit(Trigger.ScienceUp, null);
      }






  }



   public buildMine() {
       const planet = this.board.getPlanet(this.request.hex);
       // special case  build mine on new coverted gaia planet which from Transdim
       // should return GaiaFormer
       let isTransdim = false;
       if(planet.type === PlanetType.Gaia && planet.playerID === this.request.pid){
           this.player.gaiaformer++;
           isTransdim = true;

       }


       this.board.buildMine(this.request.hex, this.player.pid);


       // Habitability
       if(planet.type === PlanetType.Gaia){  // Gaia need one Q.I.C.
         if(isTransdim === false)
              this.player.qic -= 1;
       }else{
         // The seven colored planet types must first be terraformed
         const terraforming = planet.terraformingCalculate(this.player.planetType);
         const needOres = terraforming * this.player.terraformingCost();
         this.player.ore -= needOres;

       }


       // cost of mine
       let mine = this.player.getAvalibleMine();
       if(mine == null)return  // never happen just satisfy tsc
       this.player.payResouces(mine.cost); // for already check so not check again
       mine.status = StructureStatus.Built;

       // player has this plenet
       this.player.planets.push(planet);
       this.neighborBuildingsChargePower();
       this.player.sectors = this.game.board.getPlayerSectors(this.player.pid);
       this.message = "built mine successfully"

     }

     //Passive Action: Charge Power
     public neighborBuildingsChargePower(){
       let currentPlayerID = this.request.pid;
       let range = 2;
       let numPlayers = this.game.players.length
       let players: number[] = new Array(numPlayers).fill(0)
      
       let planets = this.game.board.getPlanetsInRange(this.request.hex, range);

       for(let planet of planets){
           if(planet.playerID !== -1){
             let charge = 0
             if(planet.building === StructureType.Mine){
               charge = 1;
             }

             if(planet.building === StructureType.Station || planet.building === StructureType.Lab){
               charge = 2;
             }

             if(planet.building === StructureType.Academy || planet.building === StructureType.Institute){
               charge = 3;
               let player = this.game.getPlayer(planet.playerID);
               if(player.hasTechTileID(8))
                   charge = 4;  // this techtile will increase institute and academy charge to 4
              }
              let prevousCharge = players[planet.playerID]
              if(charge > prevousCharge){
                players[planet.playerID] =  charge;
              }
           }
       }

       for(let i = 0; i < players.length;  i++){
          if(i === currentPlayerID)continue;
          let charge = players[i];
          if(charge > 0){
          // do charge
            let player = this.game.getPlayer(i);
            if(player.passiveActionOn === true){
               // for techtile 4
               player.chargePower(charge);
               player.vp -= 1;
               //console.log("charge pid  " + i + " power " + charge)
            }
          }
       }


     }



  /**
   * Checks if the player can undertake this action
   */
   // Needs to check if player has any mines available on faction board
   // It is empty (i.e., has no structures on it).
   // It is accessible from one of your planets.
   // It is habitable to your faction.
   // If the planet is not habitable, you must pay any costs required to make it habitable
   public buildMineCheck() {
     if (this.checkMineAvailability() &&
         this.checkEmpty() &&
         this.checkAccessible() &&
         this.checkHabitable() &&
         this.player.AffordMine()){
       return true;
     } else {
       return false;
     }

   }

   public checkMineAvailability() {

      if(this.player.getAvalibleMine() == null){
        this.message = "getAvalibleMine failed ";
        return false
      }
      else return true;
   }

   public checkEmpty() {

     if(this.board.checkPlanetEmpty(this.request.hex)){
       return true;
     }else{
      // speical cause
      const planet = this.board.getPlanet(this.request.hex);
      if(planet.type === PlanetType.Gaia && planet.building === null && planet.playerID === this.request.pid){
        // this is new converted gaia planet after gaia project
        return true;
      }


       this.message = "checkPlanetEmpty failed ";
       return false;
     }
   }

   public checkAccessible() {
     // speical case for coverted Transdim not need check
     const planet = this.board.getPlanet(this.request.hex);
     if(planet.type === PlanetType.Gaia && planet.building === null && planet.playerID === this.request.pid){
       // this is new converted gaia planet after gaia project
       return true;
     }

     // Distance from one of the existing planets
     if(this.player.checkPlanetDistance(this.request.hex)){
      return true;
     }else{
       this.message = "checkAccessible failed ";
       return false;
     }

   }

   public checkHabitable() {

     const planet = this.board.getPlanet(this.request.hex);
     if(planet === null) return false;
     const terraforming = planet.terraformingCalculate(this.player.planetType);
     const needOres = terraforming * this.player.terraformingCost();
     if(this.player.ore >= needOres){
       return true;
     }else{
       this.message = "checkHabitable failed ";
       return false;
     }

   }



  public startGaiaProject(){
    if(this.checkGaiaProject() === false) return;
     this.player.gaiaformer--;
     this.player.transferGaiaPower();

     const planet = this.board.getPlanet(this.request.hex);
     planet.playerID = this.request.pid;
     this.player.gaiaProjectPlanets.push(planet)
     //planet.type = PlanetType.Gaiaformer;

  }

  /*
  * You must have at least one uncovered standard tech tile.
     When you gain an advanced tech tile, place it faceup covering one

     update action lab or academy pickup techtile
     case one:  takeNormal6TechTiles  techTileID  0 1 2 3 4 5
     case two:  takeNormal3TechTiles  techTileID  6 7 8
     case three: takeAdvancedTechTiles techTileID 9 10 11 12 13 14 offTechId  0 - 8  offTechId is ID of covered standard tech tile

  */
  public takeTechTile(){
    if(this.request.techTileID < 6){
      this.game.techBoard.takeNormal6TechTiles(this.request.techLane, this.player);
    }

    if(this.request.techTileID >= 6  && this.request.techTileID <= 8){
      let index = this.request.techTileID - 6;
      this.game.techBoard.takeNormal3TechTiles(index, this.request.techLane, this.player);
    }

    if(this.request.techTileID > 8 ){
      let index = this.request.techTileID - 9;
      this.game.techBoard.takeAdvancedTechTiles(this.request.techLane, this.request.offTechId, this.player);
      this.takeGreenSideFederationToken(this.request.federationTokenType);

    }

  }


  public takeGreenSideFederationToken(type : FederationTokenType){
    for(let federation of this.player.federations){
      if(federation.token.used === false && federation.token.type === type){
        federation.token.used = true;
        return ;
      }
    }
  }

  public updateBuilding(){
    if(this.checkUpdateBuilding() === false)return



    // check planet building type
    let last = null;
    if(this.request.upgradeType === UpgradeType.MineToStation){
       last = this.player.getLastBuiltMine();

    }

    if(this.request.upgradeType === UpgradeType.StationToInstitute ||
      this.request.upgradeType === UpgradeType.StationToLab
    ){
      last = this.player.getLastBuiltStation()

    }

    if(this.request.upgradeType === UpgradeType.LabToAcademy){
      last = this.player.getLastBuiltLab()

    }

    if(last){
      last.status = StructureStatus.Unbuilt;
    }



    const planet = this.board.getPlanet(this.request.hex);
    // check afford
    if(this.request.upgradeType === UpgradeType.MineToStation){
        let station = this.player.getAvalibleStation();
        if(station === null)return;
        this.player.payResouces(station.cost);
        planet.building = StructureType.Station;
    }

    if(this.request.upgradeType === UpgradeType.StationToInstitute ){

      let institute = this.player.getAvalibleInstitute();
      if(institute === null)return;
      this.player.payResouces(institute.cost);
      planet.building = StructureType.Institute;
    }

    if(this.request.upgradeType === UpgradeType.StationToLab){
        let lab = this.player.getAvalibleLab();
        if(lab === null)return;
        this.player.payResouces(lab.cost);
        planet.building = StructureType.Lab;
        this.takeTechTile()
    }

    if(this.request.upgradeType === UpgradeType.LabToAcademy){
      let academy = this.player.getAvalibleAcademies();
      if(academy === null)return;
      this.player.payResouces(academy.cost);
      planet.building = StructureType.Academy;
      this.takeTechTile()
    }

     this.neighborBuildingsChargePower();

  }

  public FormFederation(): boolean{
    if(this.checkFederation() === false)return false;
    this.board.markSpaceFeded(this.request.path);

    let satellite : number = 0;
    let satelliteHexs : Hex[] = []
    let planets: Planet[] = []
    for(const hex of this.request.path){
         if(this.board.hasPlanet(hex)){
           // this must own by player
           planets.push(this.board.getPlanet(hex))
         }else{
          satellite++;
          satelliteHexs.push(hex);
        }
    }
    this.player.discardPowersToBuildSatellites(satellite);
    let token = this.game.federationlib.getFederationToken(this.request.federationTokenType);
    // console.log(token + " ************************** ");
    let federation = new Federation();
    federation.token = token;
    federation.satellites = satelliteHexs;
    federation.planets = planets;
    federation.path = this.request.path;

    // add federation benefit to player
    this.player.getFedrationBenefit(token.benefit);

    return true;

  }

  public Research(){

    let line : number = this.request.techLane
    this.game.techBoard.update(line, this.player)
    this.player.science -= 4;
  }

  public powerAndQIC(){
      this.game.store.trade(this.player, this.request.storeMerchandiseType)
  }


  ///
  public special(){
    // if(this.request.specialActionSource === SpecialActionSource.RoundBooster){
    //   let benefits = this.player.roundBooster.benefit;
    //   for(let benefit of benefits){
    //     if(benefit.trigger === Trigger.Special){
    //       this.player.onBenefit(benefit);
    //     }
    //   }

    //  }

    //  if(this.request.specialActionSource === SpecialActionSource.TechTile){
    //    let techtile = null;
    //    for(let item of this.player.techTiles){
    //      if(item.techId === this.request.techTileID){
    //        techtile = item;
    //      }
    //    }

    //    if(techtile !== null && techtile.benefit.trigger === Trigger.Special){
    //          this.player.onBenefit(techtile.benefit);

    //    }

    //  }

    // return true;

    let list = this.player.getExistPowerList()
    console.log("Begin use special power, The play have special power "+ list)
    let specialId:number 
    specialId = list.pop()
    console.log("For testing, it will only use the first special power " + specialId)
    this.player.useSpecialPower(specialId)
  }

  public free(){
    this.game.exchange.trade(this.player, this.request.freeExchangeItems[0],
                             this.request.freeExchangeItems[1],
                             this.request.freeExchangeTimes);

  }

  public pass(){
    this.game.currentPlayerPass(this.request);


  }




}


export {Action, ActionType};
