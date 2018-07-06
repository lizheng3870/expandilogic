import Income from './Income'

class TechTile {
   constructor(techId){
     this.techId = techId;
   }

   /*
   when get a normal techtile
   get something or get some power
   */
   public onTechTile(player, techId){
     if(techId === 0){
       player.ore += 1;
       player.QIC += 1;
     }
     if(techId === 1){
       player.science += player.planetTypes.length * 1;
     }
     if(techId === 2){
       player.structure.value.academies = 4;
       player.structure.value.institute = 4;
     }
     if(techId === 3){
       player.VP += 7;
     }
     if(techId === 4){
       player.income.ore += 1;
       player.income.charge += 1;
     }
     if(techId === 5){
       player.income.science += 1;
       player.income.gold += 1;
     }
     if(techId === 6){
       //everytime player build a mine, get 3 VP;
     }
     if(techId ===7){
       player.income.gold += 4;
     }
     if(techId === 8){
       //power: can charge 4 power, everyturn
     }
   }

   /*
   when get an advance techtile, player need to cover a normal techtile,
   the normal techtile will not work
   */
   public offTechTile(player, techId){
     if(techId === 0){
       player.ore -= 1;
       player.QIC -= 1;
     }
     if(techId === 1){
       //player.science += player.planetTypes.length * 1;
     }
     if(techId === 2){
       player.structure.value.academies = 3;
       player.structure.value.institute = 3;
     }
     if(techId === 3){
       //player.VP += 7;
     }
     if(techId === 4){
       player.income.ore -= 1;
       player.income.charge -= 1;
     }
     if(techId === 5){
       player.income.science -= 1;
       player.income.gold -= 1;
     }
     if(techId === 6){
       //turn off the ability of "everytime player build a mine, get 3 VP";
     }
     if(techId === 7){
       player.income.gold -= 4;
     }
     if(techId === 8){
       //ability: can charge 4 power, everyturn
       //player.abilities[XX] = null;
     }
   }

   public onAdvanceTechTile(player, adTechId, offTechId){
     offTechTile(player, offTechId);//turn off the normal techtile;

     if(adTechId === 0){
       //every cleanup phase: player.VP += 3 * number of federation;
     }
     if(adTechId === 1){
       //everytime update tech +2 VP;
     }
     if(adTechId === 2){
       //get ability: every turn, +1 QIC +5 gold;
     }
     if(adTechId === 3){
       //player.VP += number of mine * 2;
     }
     if(adTechId === 4){
       //every cleanup phase: player.VP += 3 * number of lab;
     }
     if(adTechId === 5){
       //player.ore += 1 * player.number of sector
     }
     if(adTechId === 6){
       //every cleanup phase: player.VP += 1 * player.planetTypes.length;
     }
     if(adTechId === 7){
       player.VP += 2 * player.numGaia;
     }
     if(adTechId === 8){
       //player.VP += 4 * player.number of station;

     }
     if(adTechId === 9){
       //player.VP += 2 * number of sectors;
     }
     if(adTechId === 10){
       //get ability: +3 ore;
     }
     if(adTechId === 11){
       //player.VP += 5 * number of federation;
     }
     if(adTechId === 12){
       //get ability: +3 science;
     }
     if(adTechId === 13){
       //every time build mine: +3 VP;
     }
     if(adTechId === 14){
       //every time build station: +3 VP;
     }
   }
}

export default TechTile;
