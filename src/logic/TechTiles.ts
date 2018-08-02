import {Player} from './Player'
import {Benefit, Value, Material, Count, BuildingType, Trigger} from './Benefit'

class TechTile {
  public techId: number;
  public benefit: Benefit;
  public round: number; // Each special action can be used only once per round.


  constructor(techId: number){
    this.techId = techId;
  }

  /**
   * get the techId
   */
  public getId(){
    return this.techId;
  }

   /**
    * when get a normal techtile
    * get something or get some power
    * @param player
    */
   public onTechTile(player: Player){
     let b1 = null;
     if(this.techId === 0){
      b1 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.Ore), new Value(1, Material.QIC)]);
     }
     if(this.techId === 1){
      b1 = new Benefit(Trigger.Now, Count.PlanetTypes, null, [new Value(1, Material.Science)]);
     }
     if(this.techId === 2){
      // player.buildingLib.changeBigBuildingPowerValue(4);
     }
     if(this.techId === 3){
       b1 = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP)]);
     }
     if(this.techId === 4){
       b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore), new Value(1, Material.Power)]);
     }
     if(this.techId === 5){
      b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science), new Value(1, Material.Gold)]);
     }
     if(this.techId === 6){
       b1 = new Benefit(Trigger.Build, null, BuildingType.MineOnGaia, [new Value(3, Material.VP)]);
     }
     if(this.techId ===7){
      b1 = new Benefit(Trigger.Income, null, null, [new Value(4, Material.Gold)]);
     }
     if(this.techId === 8){
       //power: can charge 4 power, everyturn
       b1 = new Benefit(Trigger.Special, null, null, [new Value(4, Material.Power)]);
     }

     if(b1 != null){
       player.getTechTileBenefit(b1);

       let techtile = new TechTile(this.techId);
       techtile.benefit = b1;
       techtile.round = -1;
       player.techTiles.push(techtile);
     }
   }

   /*
   when get an advance techtile, player need to cover a normal techtile,
   the normal techtile will not work
   */
   public offTechTile(player: Player, techId: number){
    let b1 = null;
    if(techId === 0){
     //player.ore -= 1; player.QIC -= 1; do nothing, since this is a now benefit, turn it off will cause nothing
    }
    if(techId === 1){
      //player.science += player.planetTypes.length * 1; also do nothing
    }
    if(techId === 2){
    //  player.buildingLib.changeBigBuildingPowerValue(4);
    }
    if(techId === 3){
      //player.VP += 7;
      //do nothing
    }
    if(techId === 4){
     //  player.income.ore -= 1;
     //  player.income.charge -= 1;
     b1 = new Benefit(Trigger.Income, null, null, [new Value(-1, Material.Ore), new Value(-1, Material.Power)]);
    }
    if(techId === 5){
     //  player.income.science -= 1;
     //  player.income.gold -= 1;
     b1 = new Benefit(Trigger.Income, null, null, [new Value(-1, Material.Science), new Value(-1, Material.Gold)]);
    }
    if(techId === 6){
      //turn off the ability of "everytime player build a mine, get 3 VP";
      b1 = new Benefit(Trigger.Build, null, BuildingType.MineOnGaia, [new Value(-3, Material.VP)]);
    }
    if(techId === 7){
     //  player.income.gold -= 4;
     b1 = new Benefit(Trigger.Income, null, null, [new Value(-4, Material.Gold)]);
    }
    if(techId === 8){
      //ability: can charge 4 power, everyturn
      //player.abilities[XX] = null;
      //how to turn it off;
    }

    // remove techTiles from player.techTiles
    player.removeTechtile(techId)

   }

   public onAdvanceTechTile(player: Player, offTechId: number){
     this.offTechTile(player, offTechId);//turn off the normal techtile;
     var adTechId = this.techId;
     let b1 = null;
     if(adTechId === 0){
       //every cleanup phase: player.VP += 3 * number of federation;
       b1 = new Benefit(Trigger.Pass, Count.Feds, null, [new Value(3, Material.VP)]);
     }
     if(adTechId === 1){
       //everytime update tech +2 VP;
       b1 = new Benefit(Trigger.ScienceUp, null, null, [new Value(2, Material.VP)]);
     }
     if(adTechId === 2){
       //get ability: every turn, +1 QIC +5 gold;
       b1 = new Benefit(Trigger.Special, null, null, [new Value(1, Material.QIC), new Value(5, Material.Gold)]);
     }
     if(adTechId === 3){
       //player.VP += number of mine * 2;
       b1 = new Benefit(Trigger.Now, Count.Mines, null, [new Value(2, Material.VP)]);
     }
     if(adTechId === 4){
       //every cleanup phase: player.VP += 3 * number of lab;
       b1 = new Benefit(Trigger.Pass, Count.Labs, null, [new Value(3, Material.VP)]);
     }
     if(adTechId === 5){
       //player.ore += 1 * player.number of sector
       b1 = new Benefit(Trigger.Now, Count.Sectors, null, [new Value(1, Material.Ore)]);
     }
     if(adTechId === 6){
       //every cleanup phase: player.VP += 1 * player.planetTypes.length;
       b1 = new Benefit(Trigger.Pass, Count.PlanetTypes, null, [new Value(1, Material.VP)]);
     }
     if(adTechId === 7){
      //  player.VP += 2 * player.numGaia;
      b1 = new Benefit(Trigger.Now, Count.Gaia, null, [new Value(2, Material.VP)]);
     }
     if(adTechId === 8){
       //player.VP += 4 * player.number of station;
       b1 = new Benefit(Trigger.Now, Count.TradingStations, null, [new Value(4, Material.VP)]);
     }
     if(adTechId === 9){
       //player.VP += 2 * number of sectors;
       b1 = new Benefit(Trigger.Now, Count.Sectors, null, [new Value(2, Material.VP)]);
     }
     if(adTechId === 10){
       //get ability: +3 ore;
       b1 = new Benefit(Trigger.Special, null, null, [new Value(3, Material.Ore)]);
     }
     if(adTechId === 11){
       //player.VP += 5 * number of federation;
       b1 = new Benefit(Trigger.Now, Count.Feds, null, [new Value(5, Material.VP)]);
     }
     if(adTechId === 12){
       //get ability: +3 science;
       b1 = new Benefit(Trigger.Special, null, null, [new Value(3, Material.Science)]);
     }
     if(adTechId === 13){
       //every time build mine: +3 VP;
       b1 = new Benefit(Trigger.Build, null, BuildingType.Mine, [new Value(3, Material.VP)]);
     }
     if(adTechId === 14){
       //every time build station: +3 VP;
       b1 = new Benefit(Trigger.Build, null, BuildingType.TradingStation, [new Value(3, Material.VP)]);
     }

     if(b1 != null){
       player.getTechTileBenefit(b1);
       let techtile = new TechTile(this.techId);
       techtile.benefit = b1;
       techtile.round = -1;
       player.techTiles.push(techtile);
     }
   }
}

export default TechTile;
