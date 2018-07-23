import {Game} from "./Game";
import {MapBoard} from "./MapBoard";
import {Player} from "./Player";
//import {Hex} from "./Hex";
import { Request } from './Request'
import { StructureType} from './Structure'

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
     Special,
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


  constructor(game: Game, player:Player, request: Request) {
    this.game = game;
    this.request = request;
    this.board = game.board;
    this.player = player;
    this.check = true;

  }


   public checkValid(){

     if(this.request.actionType === ActionType.BuildMine){
       this.buildMineCheck()
       return this.check;
     }
    //  if(this.request.actionType === ActionType.Gaia){
    //    return this.checkGaiaProject()
    //  }
    //
    //  if(this.request.actionType === ActionType.Upgrade){
    //    return this.checkUpdateBuilding()
    //  }
    //
    //  if(this.requestactionType === ActionType.Federate){
    //   return
    // }
    //
    // if(this.request.actionType === ActionType.Research){
    //   return
    // }
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
//
//    public checkUpdateBuilding(): boolean{
//       const planet = this.board.getPlanet(this.hex);
//       if(planet.pid !== this.player.pid){
//         console.log("you do not own this planet")
//         return false
//       }
//
//       if(this.request.subtype === 1){ // Mine ➜ Trading Station
//
//         if(this.planet.sid !== 0){  // this is mine
//           console.log(" Mine ➜ Trading Station cost insufficient this.data.subType == 1 require mine type ");
//           return false;
//         }
//
//         if(this.board.hasNeighboring(this.data.hex, player.pid)){
//               if(this.player.ore >= this.player.cost.station2.ore &&
//                 this.player.gold >= this.player.cost.station2.gold ){
//                   return true;
//                 }else{
//                   console.log(" Mine ➜ Trading Station cost insufficient ");
//                   return false;
//                 }
//
//         }else{
//
//           if(this.player.ore >= this.player.cost.station1.ore &&
//             this.player.gold >= this.player.cost.station1.gold ){
//               return true;
//             }else{
//               console.log(" Mine ➜ Trading Station cost insufficient ");
//               return false;
//             }
//          }
//
//       }
//       return false
//    }
//
//    public checkGaiaProject(): boolean{
//      // page 11
//      if(this.player.gaiaformer === 0){
//        console.log("gaiaformer not available");
//        return false;
//      }
//
//      const planet = this.board.getPlanet(this.data.hex);
//      // Transdim
//      if(planet.pid !== 8){
//        console.log("not  Transdim  can not start gaia project ");
//        return false;
//      }
//
//      if(this.player.checkPlanetDistance(data.hex) === false){
//              console.log("checkPlanetDistance error ");
//              return false;
//      }
//
//      if(this.player.checkPowerForGaiaProject() === false){
//        console.log("checkPowerForGaiaProject error ");
//        return false;
//      }
//
//      return true;
//
//    }
//
public doAction(){
    if(this.request.actionType === ActionType.BuildMine) {
        this.buildMine();
    }

    if(this.request.actionType === ActionType.Upgrade){
      if(this.request.upateTo === StructureType.Station){
        if(this.board.hasNeighboring(this.request.hex, this.player.pid)){
          //todo
            //  this.player.ore -= this.player.cost.station2.ore;
          //    this.player.gold -= this.player.cost.station2.gold;

        }else{
          //todo
            // this.player.ore -= this.player.cost.station1.ore;
            // this.player.gold -= this.player.cost.station1.gold;
         }

        // this.board.updateBuiding(hex, 1);



      }
    }
  }

   public buildMine() {

     // if (this.buildMineCheck() === true) {
     //   const planet = this.board.getPlanet(this.data.hex);
     //   this.board.buildMine(this.data.location, this.player);
     //   const terraforming = planet.terraformingCalculate(this.player);
     //   const needOres = terraforming * this.player.cost.terraforming.ore;
     //   this.player.ore -= needOres;
     //   if(planet.pid === 7){  // Gaia
     //     this.player.QIC -= 1;
     //   }
     //
     //   this.player.gold -= this.cost.mine.gold;
     //   this.player.ore -= this.cost.mine.ore;
     //   this.player.mine++;
     //   this.player.planets.push(planet);
     //   planet.playerID = this.player.pid;
     // }
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

return true;
     // if (this.checkMineAvailability() &&
     //     this.checkEmpty() &&
     //     this.checkAccessible() &&
     //     this.checkHabitable() &&
     //     this.checkAffordable()) {
     //   return true;
     // } else {
     //   return false;
     // }
   }

   public checkMineAvailability() {
      if(this.player.getAvalibleMine() == null)return false
      else return true;
   }

   public checkEmpty() {
     return this.board.checkPlanetEmpty(this.request.hex);
   }

   public checkAccessible() {
     // Distance from one of the existing planets
     this.player.checkPlanetDistance(this.request.hex);

   }

   public checkHabitable() {
     const planet = this.board.getPlanet(this.request.hex);
     if(planet === null) return false;
     const terraforming = planet.terraformingCalculate(this.player);
     const needOres = terraforming * this.player.terraformingCost();
     if(this.player.ore >= needOres){
       return true;
     }else{
       return false;
     }

   }


   public checkAffordable() {
     this.player.isHaveAffordableMine()

   }
//
//    public pass(){
//      this.player.passed = true;
//      this.game.passed++;
//    }
//


}


export {Action, ActionType};
