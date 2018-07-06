import Player from './Player'
import Game from './Game'
import {MapBoard} from './MapBoard'


enum ActionType {
  Mine = 'mine',
  Gaia = 'gaia',
  Update = 'update',
  Federation = 'federation',
  Research = 'research',
  Special = 'special',
  Pass = 'pass'
}

class Action {
  private game: Game;
  private data;
  private check: boolean;
  private board: MapBoard;
  private player;

  constructor(game, board, player, data) {
    this.game = game
    this.data = data
    this.check = true
    this.board = board
    this.player = player

  }

   public checkValid(){
     if(this.data.type === 'mine'){
       this.buildMineCheck()
       return this.check;
     }

     if(this.data.type === 'gaia'){
       return this.checkGaiaProject()
     }

     if(this.data.type === 'update'){
       return this.checkUpdateBuilding()
     }

     return true;
   }

   public checkUpdateBuilding(){
      const planet = this.board.getPlanet(this.data.hex);
      if(planet.playerID !== this.player.pid){
        console.log("you do not own this planet");
      }



      if(this.data.subType === 1){ // Mine ➜ Trading Station

        // if(this.planet.sid !== 0){  // this is mine todo
        //   console.log(" Mine ➜ Trading Station cost insufficient this.data.subType == 1 require mine type ");
        //   return false;
        // }


        if(this.board.hasNeighboring(this.data.hex, this.player.pid)){
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
     // Transdim todo
     // if(planet.pid !== 8){
     //   console.log("not  Transdim  can not start gaia project ");
     //   return false;
     // }

     if(this.player.checkPlanetDistance(this.data.hex) === false){
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
        if(this.board.hasNeighboring(this.data.hex, this.player.pid)){
              this.player.ore -= this.player.cost.station2.ore;
              this.player.gold -= this.player.cost.station2.gold;

        }else{
            this.player.ore -= this.player.cost.station1.ore;
            this.player.gold -= this.player.cost.station1.gold;
         }

         // todo this.board.updateBuiding(hex, 1);



      }
    }



  }



   public buildMine() {
//todo
     // if (buildMineCheck() === true) {
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
     //}
   }

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
     this.game.passed.push(this.player.playerID);
   }

//todo
   private checkHabitable() {
     // const planet = this.board.getPlanet(this.data.hex);
     // const terraforming = planet.terraformingCalculate(this.player.planetType);
     // const needOres = terraforming * this.player.cost.terraforming.ore;
     // if(this.player.ore >= needOres){
     //   return true;
     // }else{
     //   return false;
     // }


   }

   //todo
   private checkResources() {
     // if(this.gold >= this.cost.mine.gold && this.ore >= this.cost.mine.ore){
     //   return true;
     // } else {
     //   return false;
     // }
   }





}


export default Action
