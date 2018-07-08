import { Player } from './Player';
import { Benefit, Trigger, Count, Struct, Value, Material } from './Benefit';

class TechTile {
  public techTileId: number;

  /**
  * the techTile will be assigned an Id
  * @param techTileId the id of the techTile
  */
  constructor(techTileId: number){
    this.techTileId = techTileId;
  }

  /**
  * when one player get the techtile, the function would new a benefit according to the techtile id
  * and give it to the player
  * @param player the player who get the techtile
  * @param techId the techtile id
  */
  public onTechTile(player: Player, techId: number){
    let b1 = null;
    let b2 = null;
    let b3 = null;
    if(techId === 0){
      //  player.ore += 1;
      //  player.QIC += 1;
      b1 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.Ore), new Value(1, Material.QIC)]);
    }
    if(techId === 1){
      //  player.science += player.planetTypes.length * 1;
      b1 = new Benefit(Trigger.Now, Count.PlanetTypes, Struct.None, [new Value(1, Material.Science)]);
    }
    if(techId === 2){
      // player.structure.value.academies = 4;
      // player.structure.value.institute = 4;
      player.buildingLib.changeBigBuildingValue(4);
    }
    if(techId === 3){
      // player.VP += 7;
      b1 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(7, Material.VP)]);
    }
    if(techId === 4){
      // player.income.ore += 1;
      // player.income.charge += 1;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Ore), new Value(1, Material.Charge)]);
    }
    if(techId === 5){
      // player.income.science += 1;
      // player.income.gold += 1;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Science), new Value(1, Material.Gold)]);
    }
    if(techId === 6){
      //everytime player build a mine on gaia, get 3 VP;
      b1 = new Benefit(Trigger.Build, Count.None, Struct.MineOnGaia, [new Value(3, Material.VP)]);
    }
    if(techId ===7){
      // player.income.gold += 4;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(4, Material.Gold)]);
    }
    if(techId === 8){
      //power: can charge 4 power, everyturn
      b1 = new Benefit(Trigger.Special, Count.None, Struct.None, [new Value(4, Material.Charge)]);
    }
    player.getBenefit(b1);
  }

  /**
   * when get an advance techtile, player need to cover a normal techtile,
   * the normal techtile will not work
   * @param player 
   * @param techId 
   */
  public offTechTile(player: Player, techId: number){
    let b1 = null;
    if(techId === 0){
      // do nothing since tech 0 is a now benefit, off it will not reduce anything;
    }
    if(techId === 1){
      // player.science += player.planetTypes.length * 1; also do nothing
    }
    if(techId === 2){
      // player.structure.value.academies = 3;
      // player.structure.value.institute = 3;
      player.buildingLib.changeBigBuildingValue(3);
    }
    if(techId === 3){
      // player.VP += 7;do nothing
    }
    if(techId === 4){
      // player.income.ore -= 1;
      // player.income.charge -= 1;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(-1, Material.Ore), new Value(-1, Material.Charge)]);
    }
    if(techId === 5){
      // player.income.science -= 1;
      // player.income.gold -= 1;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(-1, Material.Science), new Value(-1, Material.Gold)]);
    }
    if(techId === 6){
      // turn off the ability of "everytime player build a mine, get 3 VP";
      b1 = new Benefit(Trigger.Build, Count.None, Struct.MineOnGaia, [new Value(-3, Material.VP)]);
    }
    if(techId === 7){
      // player.income.gold -= 4;
      b1 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(-4, Material.Gold)]);
    }
    if(techId === 8){
      // ability: can charge 4 power, everyturn
      // player.abilities[XX] = null;
      // b1 = new Benefit(Trigger.Special, Count.None, Struct.None, [new Value(4, Material.Charge)]);
    }
    player.getBenefit(b1);
  }

  public onAdvanceTechTile(player: Player, adTechId: number, offTechId: number){
    this.offTechTile(player, offTechId);//turn off the normal techtile;

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
      // player.VP += 2 * player.numGaia;
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
