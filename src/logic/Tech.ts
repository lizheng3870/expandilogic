import {Benefit, Value, Material, Count, Trigger} from './Benefit'
import {Player} from './Player'

class Tech{
  public lane: number;
  public level: number;

  /**
   * each square of technology in the tech board would have the this.lane and this.level to stand for its position
   * @param this.lane the type of technology
   * @param this.level the this.level of technology
   */
  constructor(lane: number, level: number){
    this.lane = lane;
    this.level = level;
  }

/**
 * update and get the benefit
 * @param player the player who do the update
 */
  public update(player: Player){
    // console.log("the lane is: " + this.lane + "; the level is: " + this.level);
    if(this.level === 3){
      //player.chargePower(3);
      const b1 = new Benefit(Trigger.Now, null, null, [new Value(3, Material.Power)]);
      player.getBenefit(b1);
    }

    let b2 = null;

    //dig
    if(this.lane === 0){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Ore)]);}
      if(this.level === 2) {player.digCost = 2;}
      if(this.level === 3) {player.digCost = 1;}
      if(this.level === 4) {b2 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Ore)]);}
      //if(this.level == 5) // player.getFedaration();
    }

    //range
    if(this.lane === 1){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.QIC)]);}
      if(this.level === 2) {player.range = 2;}
      if(this.level === 3) {b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.QIC)]);}
      if(this.level === 4) {player.range = 3;}
      if(this.level === 5){
        player.range = 4;
        //player.getLostPlanet();
      }
    }

    //qic
    if(this.lane === 2){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.QIC)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.QIC)]);}
      if(this.level === 3) {b2 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.QIC)]);}
      if(this.level === 4) {b2 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.QIC)]);}
      if(this.level === 5) {b2 = new Benefit(Trigger.Now, null, null, [new Value(4, Material.QIC)]);}
    }

    //gaia
    if(this.lane === 3){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Now, null, null, [new Value(3, Material.ExtraPower)]);}
      if(this.level === 3){
        b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]);
        player.gaiaFormingCost = 4;
      }
      if(this.level === 4){
        b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.GaiaFormer)]);
        player.gaiaFormingCost = 3;
      }
      if(this.level === 5) {
        b2 = new Benefit(Trigger.Now, Count.Gaia, null, [new Value(1, Material.VP)]);
        const b3 = new Benefit(Trigger.Now, null, null, [new Value(4, Material.VP)]);
        player.getBenefit(b3);
      }
    }

    //income
    if(this.lane === 4){
      if(this.level === 1){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(2, Material.Gold), new Value(1, Material.Power)]);
      }
      if(this.level === 2){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore), new Value(1, Material.Power)]);
      }
      if(this.level === 3){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Gold), new Value(1, Material.Power)]);
      }
      if(this.level === 4){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Ore), new Value(1, Material.Gold), new Value(1, Material.Power)]);
      }
      if(this.level === 5){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(-2, Material.Ore), new Value(-4, Material.Gold), new Value(-4, Material.Power)]);
        const b3 = new Benefit(Trigger.Now, null, null, [new Value(3, Material.Ore), new Value(6, Material.Gold), new Value(6, Material.Power)]);
        player.getBenefit(b3);
      }
    }

    //science
    if(this.lane === 5){
      if(this.level === 1) {b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);}
      if(this.level === 3) {b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);}
      if(this.level === 4) {b2 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Science)]);}
      if(this.level === 5){
        b2 = new Benefit(Trigger.Income, null, null, [new Value(-4, Material.Science)]);
        const b3 = new Benefit(Trigger.Now, null, null, [new Value(9, Material.Science)]);
        player.getBenefit(b3);
      }
    }
    if(b2 !== null) {
      // console.log("tech benefit is passing");
      player.getBenefit(b2);
    }
    // console.log("tech benefit is null");

  }
}

export default Tech;
