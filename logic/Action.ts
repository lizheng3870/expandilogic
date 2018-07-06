import Game from "./Game";
import {MapBoard} from "./MapBoard";
import {Player} from "./Player";

/**
 * Types of actions that a player can make on his turn 
 * Not including free actions
 */
enum ActionType {
  Mine = 'mine',
  Gaia = 'gaia',
  Update = 'update',
  Federation = 'federation',
  Research = 'research',
  Special = 'special',
  Pass = 'pass'
}

/**
 * Action class considers factors relating to making an action
 */
class Action {
  private game: Game;
  private action: ActionType;
  private check: boolean;
  private board: MapBoard;
  private player: Player;

  constructor(game: Game, board: MapBoard, action: ActionType) {
    this.game = game;
    this.action = action;
    this.check = true;
    this.board = board;
  }

   public checkValid(){
     if(this.action === 'mine'){
       this.buildMineCheck()
       return this.check;
     }

     if(this.action === 'gaia'){
       return this.checkGaiaProject()
     }

     if(this.action === 'update'){
       return this.checkUpdateBuilding()
     }

     if(this.action === 'federation'){
      return 
    }

    if(this.action === 'research'){
      return 
    }

    if(this.action === 'special'){
      return 
    }

    if(this.action === 'pass'){
      return 
    }

     return true;
   }

   public checkUpdateBuilding(){
      const planet = this.board.getPlanet(this.action.hex);
      if(planet.pid !== this.player.pid){
        console.log("you do not own this planet");
      }



      if(this.action.subType === 1){ // Mine ➜ Trading Station

        if(this.planet.sid !== 0){  // this is mine
          console.log(" Mine ➜ Trading Station cost insufficient this.data.subType == 1 require mine type ");
          return false;
        }


        if(this.board.hasNeighboring(this.data.hex, player.pid)){
              if(this.player.ore >= this.player.cost.station2.ore &&
                this.player.gold >= this.player.cost.station2.gold ){
                  return true;
                }else{
                  console.log(" Mine ➜ Trading Station cost insufficient ");
                  return false;
                }

        }else{

          if(this.player.ore >= this.player.cost.station1.ore &&
            this.player.gold >= this.player.cost.station1.gold ){
              return true;
            }else{
              console.log(" Mine ➜ Trading Station cost insufficient ");
              return false;
            }
         }

      }

      // if(this.data.subType === 2){
      //
      // }
      //
      // if(this.data.subType === 3){
      //
      // }
      //
      // if(this.data.subType === 4){
      //
      // }


   }

   public checkGaiaProject(){
     // page 11
     if(this.player.gaiaformer === 0){
       console.log("gaiaformer not available");
       return false;
     }

     const planet = this.board.getPlanet(this.data.hex);
     // Transdim
     if(planet.pid !== 8){
       console.log("not  Transdim  can not start gaia project ");
       return false;
     }

     if(this.player.checkPlanetDistance(data.hex) === false){
             console.log("checkPlanetDistance error ");
             return false;
     }

     if(this.player.checkPowerForGaiaProject() === false){
       console.log("checkPowerForGaiaProject error ");
       return false;
     }

     return true;

   }

public    doAction(){
    if(this.data.type === 'mine') {
        this.buildMine();
    }

    if(this.data.type === "update"){
      if(this.data.subType === 1){
        if(this.board.hasNeighboring(this.data.hex, player.pid)){
              this.player.ore -= this.player.cost.station2.ore;
              this.player.gold -= this.player.cost.station2.gold;

        }else{
            this.player.ore -= this.player.cost.station1.ore;
            this.player.gold -= this.player.cost.station1.gold;
         }

         this.board.updateBuiding(hex, 1);



      }
    }



  }



   public buildMine() {

     if (buildMineCheck() === true) {
       const planet = this.board.getPlanet(this.data.hex);
       this.board.buildMine(this.data.location, this.player);
       const terraforming = planet.terraformingCalculate(this.player);
       const needOres = terraforming * this.player.cost.terraforming.ore;
       this.player.ore -= needOres;
       if(planet.pid === 7){  // Gaia
         this.player.QIC -= 1;
       }

       this.player.gold -= this.cost.mine.gold;
       this.player.ore -= this.cost.mine.ore;
       this.player.mine++;
       this.player.planets.push(planet);
       planet.playerID = this.player.pid;
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


     if (this.checkMineAvailability() && this.checkEmpty() && this.checkAccessible() && this.checkHabitable() && this.checkResources()) {
       return true;
     } else {
       return false;
     }
   }

   public checkMineAvailability() {
     if (this.player.mine === 8) {
       return false;
     } else {
       return true;
     }
   }

   public checkEmpty() {
     return this.board.checkPlanetEmpty(this.data.hex);
   }

   public checkAccessible() {
     // Distance from one of the existing planets
     this.player.checkPlanetDistance(this.data.hex);

   }

   public pass(){
     this.player.passed = true;
     this.game.passed++;
   }

   private checkHabitable() {
     const planet = this.board.getPlanet(this.data.hex);
     const terraforming = planet.terraformingCalculate(this.player);
     const needOres = terraforming * this.player.cost.terraforming.ore;
     if(this.player.ore >= needOres){
       return true;
     }else{
       return false;
     }


   }

   private checkResources() {
     if(this.gold >= this.cost.mine.gold && this.ore >= this.cost.mine.ore){
       return true;
     } else {
       return false;
     }
   }





}


export {Action};
