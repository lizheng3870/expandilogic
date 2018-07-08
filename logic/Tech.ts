import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
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
    this.lane = this.lane;
    this.level = this.level;
  }

/**
 * update and get the benefit
 * @param player the player who do the update
 */
  public update(player: Player){
    if(this.level === 3){
      //player.chargePower(3);
      const b1 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(3, Material.Charge)]);
      player.getBenefit(b1);
    }

    let b2 = null;

    //dig
    if(this.lane === 0){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(2, Material.Ore)]);}
      if(this.level === 2) {player.digCost.items[0].quantity = 2;}
      if(this.level === 3) {player.digCost.items[0].quantity = 1;}
      if(this.level === 4) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(2, Material.Ore)]);}
      //if(this.level == 5) // player.getFedaration();
    }

    //range
    if(this.lane === 1){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.QIC)]);}
      if(this.level === 2) {player.range = 2;}
      if(this.level === 3) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.QIC)]);}
      if(this.level === 4) {player.range = 3;}
      if(this.level === 5){
        player.range = 4;
        //player.getLostPlanet();
      }
    }

    //qic
    if(this.lane === 2){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.QIC)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.QIC)]);}
      if(this.level === 3) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(2, Material.QIC)]);}
      if(this.level === 4) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(2, Material.QIC)]);}
      if(this.level === 5) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(4, Material.QIC)]);}
    }

    //gaia
    if(this.lane === 3){
      if(this.level === 1) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.GaiaFormer)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(3, Material.Power)]);}
      if(this.level === 3){
        b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.GaiaFormer)]);
        player.gaiaFormingCost.items[2].quantity = 4;
      }
      if(this.level === 4){
        b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(1, Material.GaiaFormer)]);
        player.gaiaFormingCost.items[2].quantity = 3;
      }
      if(this.level === 5) {
        b2 = new Benefit(Trigger.Now, Count.Gaia, Struct.None, [new Value(1, Material.VP)]);
        const b3 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(4, Material.VP)]);
        player.getBenefit(b3);
      }
    }

    //income
    if(this.lane === 4){
      if(this.level === 1){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(2, Material.Gold), new Value(1, Material.Charge)]);
      }
      if(this.level === 2){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Ore), new Value(1, Material.Charge)]);
      }
      if(this.level === 3){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Gold), new Value(1, Material.Charge)]);
      }
      if(this.level === 4){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Ore), new Value(1, Material.Gold), new Value(1, Material.Charge)]);
      }
      if(this.level === 5){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(-2, Material.Ore), new Value(-4, Material.Gold), new Value(-4, Material.Charge)]);
        b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(3, Material.Ore), new Value(6, Material.Gold), new Value(6, Material.Charge)]);
      }
    }

    //science
    if(this.lane === 5){
      if(this.level === 1) {b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Science)]);}
      if(this.level === 2) {b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Science)]);}
      if(this.level === 3) {b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Science)]);}
      if(this.level === 4) {b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(1, Material.Science)]);}
      if(this.level === 5){
        b2 = new Benefit(Trigger.Income, Count.None, Struct.None, [new Value(-4, Material.Science)]);
        b2 = new Benefit(Trigger.Now, Count.None, Struct.None, [new Value(9, Material.Science)]);
      }
    }

  }
}

export default Tech;
