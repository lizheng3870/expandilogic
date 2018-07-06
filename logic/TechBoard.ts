import Tech from './Tech'
import TechTile from './TechTiles'

enum TechType{
  Dig = 0,
  Range = 1,
  QIC = 2,
  Gaia = 3,
  Resource = 4,
  Science = 5,

}

class TechBoard {
  private table :  Tech[][];
  private normal6Techs : TechTile[];
  private normal3Techs : TechTile[];
  private advanceTechs : TechTile[];
  constructor() {
    this.normal6Techs = [];
    this.normal3Techs = [];
    this.advanceTechs = [];

    this.loadTechs();

  }


   public next(lane, player){  // 0 - 5  lane 0 -5
        const level = player.techs[lane];
        //todo do benifit in some way
        //this.table[lane][level+1].update(player);
        player.techs[lane]++;
   }

   public takeTechTiles5(lane, player){

   }

   public takeTechTiles3(){

   }

   public takeAdvancedTechTiles(lane, player){

   }

   public loadTechs(){


     for(let i = 0; i < 6; i++){
      for(let j = 0; j< 6; j++){
        this.table[i][j] = new Tech(i, j);
      }
     }

     let arr = [0,1,2,3,4,5,6,7,8];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(let i = 0; i < 6; i++){
       this.normal6Techs[i] = new TechTile(arr[i]);
     }
     for(let i = 0; i < 3; i++){
       this.normal3Techs[i] = new TechTile(arr[i + 6]);
     }
     arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(let i = 0; i < 6; i++){
       this.advanceTechs[i] = new TechTile(arr[i]);
     }
   }


}


export default TechBoard;
