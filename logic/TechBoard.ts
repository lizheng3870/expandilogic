import Tech from './Tech'
import TechTile from './TechTiles'

class TechBoard {
  private normal6Techs: TechTile[];
  private normal3Techs: TechTile[];
  private advanceTechs: TechTile[];
  private table: TechTile[][];
  constructor() {
    this.normal6Techs = [];
    this.normal3Techs = [];
    this.advanceTechs = [];

    this.loadTechs();

    //this.types = ["dig", "nav",  "gic",  "gaia",  "resouces", "science"];
  }


   public next(lane, player){  // 0 - 5  lane 0 -5
        const level = player.techs[lane];
        // todo update
      //  this.table[lane][level+1].update(player);
        player.techs[lane]++;
   }

   public takeTechTiles5(lane, player){

   }

   public takeTechTiles3(){

   }

   public takeAdvancedTechTiles(lane, player){

   }

   public loadTechs(){
     let i = 0;
     let j = 0;

     for(; i < 6; i++){
      for(; j< 6; j++){
        this.table[i][j] = new Tech(i, j);
      }
     }

     let arr = [0,1,2,3,4,5,6,7,8];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(i = 0; i < 6; i++){
       this.normal6Techs[i] = new TechTile(arr[i]);
     }
     for(i = 0; i < 3; i++){
       this.normal3Techs[i] = new TechTile(arr[i + 6]);
     }
     arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(i = 0; i < 6; i++){
       this.advanceTechs[i] = new TechTile(arr[i]);
     }
   }


}


export default TechBoard;
