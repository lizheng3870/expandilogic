import Tech from './Tech'
import TechTile from './TechTiles';
import { Player } from './Player';

class TechBoard {
  public table: Tech[][];
  public normal6Id: number[];
  public normal6TechTiles: TechTile[];
  public normal3Id: number[];
  public normal3TechTiles: TechTile[];
  public advanceId: number[];
  public advanceTechTiles: TechTile[];

  constructor() {
    this.loadTechs();
  }

   /**
    * update the technology
    * @param lane update the lane of tech
    * @param player 
    */
   public update(lane: number, player: Player){  // 0 - 5  lane 0 -5
      var level = player.techs[lane];
      this.table[lane][level + 1].update(player);
      player.techs[lane]++;
   }

   /**
    * 
    * @param lane which lane of techtile you want to take
    * @param player which player take
    */
   public takeNormal6TechTiles(lane: number, player: Player){
      this.normal6TechTiles[lane].onTechTile(player);
      this.update(lane, player);
   }

   /**
    * when you take the above 3 techtiles, you need to specify which lane of technology
    * you want to update
    * @param index the techtile index in the normail3TechTiles
    * @param lane the lane of tech you want to update
    * @param player the player who do this
    */
   public takeNormal3TechTiles(index: number, lane: number, player: Player){
      this.normal3TechTiles[index].onTechTile(player);
      this.update(lane, player);
   }

   /**
    * when you take the advance techtile, you must also turn off a normal techtile
    * @param lane the one you take
    * @param offId the one you turn off
    * @param player who will take
    */
   takeAdvancedTechTiles(lane: number, offId: number, player: Player){
      this.advanceTechTiles[lane].onAdvanceTechTile(player, offId);
      this.update(lane, player);
   }

   loadTechs(){
     var i = 0;
     var j = 0;

     for(; i < 6; i++){
      for(; j< 6; j++){
        this.table[i][j] = new Tech(i, j);
      }
     }

     var arr = [0,1,2,3,4,5,6,7,8];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(i = 0; i < 6; i++){
       this.normal6Id[i] = arr[i];
       this.normal6TechTiles[i] = new TechTile(arr[i]);
     }
     for(i = 0; i < 3; i++){
       this.normal3Id[i] = arr[i + 6];
       this.normal3TechTiles[i] = new TechTile(arr[i + 6]);
     }
     arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
     arr.sort(function(){ return 0.5 - Math.random() });
     for(i = 0; i < 6; i++){
       this.advanceId[i] = arr[i];
       this.advanceTechTiles[i] = new TechTile(arr[i]);
     }
   }


}


export default TechBoard;
