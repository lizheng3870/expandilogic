import {Game} from "./Game";
import {MapBoard} from "./MapBoard";
import {Player} from "./Player";
//import {Hex} from "./Hex";
import { Request , UpgradeType} from './Request'
import { StructureType, StructureStatus} from './Structure'
import {PlanetType} from './Planet'

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



    //
    // if(this.request.actionType === ActionType.Special){
    //   return
    // }
    //
    // if(this.request.actionType === ActionType.Pass){
    //   return
    // }

     return true;
   }

   public checkUpdateBuilding(): boolean{
      const planet = this.board.getPlanet(this.request.hex);
      if(planet.playerID !== this.player.pid){
        console.log("you do not own this planet")
        return false
      }

      let hasNeighboring = this.board.hasNeighboring(this.request.hex, this.player.pid);
      // check planet building type
      if(this.request.upgradeType === UpgradeType.MineToStation){
        if(planet.building === StructureType.Mine)return true;
        else return false;

      }

      if(this.request.upgradeType === UpgradeType.StationToInstitute ||
        this.request.upgradeType === UpgradeType.StationToLab
      ){
        if(planet.building === StructureType.Station)return true;
        else return false;

      }

      if(this.request.upgradeType === UpgradeType.LabToAcademy){
        if(planet.building === StructureType.Lab)return true;
        else return false;
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
          return this.player.haveResouces(lab.cost);
      }

      if(this.request.upgradeType === UpgradeType.LabToAcademy){
        let academy = this.player.getAvalibleAcademies();
        if(academy === null)return false;
        return this.player.haveResouces(academy.cost);
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
     if(this.board.checkSpaceFeded(this.request.path) === true) return false;
     let power = 0  // total power value of at least seven
     let satellite : number = 0;
     for(const hex of this.request.path){
          if(this.board.hasPlanet(hex)){
            const planet = this.board.getPlanet(hex);
            // Satellites cannot be placed on planets
            if(planet.playerID !== this.player.pid)return false; //player does not own planet buiding
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

     if(this.player.checkPowerForFederation(satellite) === false)return false;

     if(power < 7) return false;
     else return true;


 }

 public checkResearch(){
   if(this.player.science < 4)return false;
   //todo talk with yalei
   return true;

 }

public checkPowerAndQIC(){
  //todo
  return true;
}

public checkSpecial(){
  //todo
  return true;
}

public checkFree(){
  //todo
  return true;

}

public checkPass(){
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
      }

      if(this.request.actionType === ActionType.Gaia) {
        this.startGaiaProject();
      }

      if(this.request.actionType === ActionType.Upgrade){
        this.updateBuilding();
      }

      if(this.request.actionType === ActionType.Federate){
        this.FormFederation();
      }

      if(this.request.actionType === ActionType.Federate){
        this.FormFederation();
      }


      if(this.request.actionType === ActionType.Research){
        this.Research();
      }


  }



   public buildMine() {
       const planet = this.board.getPlanet(this.request.hex);


       this.board.buildMine(this.request.hex, this.player.pid);



       // Habitability
       if(planet.type === PlanetType.Gaia){  // Gaia need one Q.I.C.
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
       this.message = "built mine successfully"

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
       this.message = "checkPlanetEmpty failed ";
       return false;
     }
   }

   public checkAccessible() {

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
    }

    if(this.request.upgradeType === UpgradeType.LabToAcademy){
      let academy = this.player.getAvalibleAcademies();
      if(academy === null)return;
      this.player.payResouces(academy.cost);
      planet.building = StructureType.Academy;
    }

  }

  public FormFederation(){
    if(this.checkFederation() === false)return;
    this.board.markSpaceFeded(this.request.path);

    let satellite : number = 0;
    for(const hex of this.request.path){
         if(this.board.hasPlanet(hex)){
           // this must own by player
         }else{
          satellite++;
        }
    }
    this.player.discardPowersToBuildSatellites(satellite);


  }

  public Research(){
    //todo
  }

  public powerAndQIC(){
    //todo
  }


  public special(){
    //todo
    return true;
  }

  public free(){
    //todo
    return true;

  }

  public pass(){
    this.game.currentPlayerPass(this.request);


  }



//
//    public pass(){
//      this.player.passed = true;
//      this.game.passed++;
//    }
//

public chargePower(){

}


}


export {Action, ActionType};
