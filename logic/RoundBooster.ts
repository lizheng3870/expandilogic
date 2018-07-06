//import Income from './Income'
import {Benefit, Value, Material, Count, Struct, Trigger}   from './Benefit'

class RoundBooster{
  public id : number;
  public valid : boolean;
  public benefit : Benefit[];
  constructor(id){
    this.valid = true;
    this.benefit = [];
    this.initialize(id);
  }

  public initialize(id) {
    this.id = id;
    if(id === 0){
      const benefit  = new Benefit(Trigger.Income, null, null,
          [new Value(1, Material.Ore), new Value(1, Material.Science)])
      this.benefit.push(benefit)
      // this.income.ore = 1;
      // this.income.science = 1;
    }

    if(id === 1){
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(2, Material.Gold), new Value(1, Material.QIC)])
      this.benefit.push(benefit)
      // this.income.gold = 2;
      // this.income.QIC = 1;
    }

    if(id === 2){
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(2, Material.Power), new Value(1, Material.Ore)])

      this.benefit.push(benefit)
      // this.income.power = 2; // gain of two power tokens
      // this.income.ore = 1;
    }


    if(id === 3){
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(2, Material.Gold), new Value(1, Material.SpecialDig)])
        this.benefit.push(benefit)

      //this.benefit.push(benefit)

      // this.income.charge = 2; //charge of two power tokens
      // this.benefit.range = 3;
    }

    if(id === 4) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(2, Material.Charge), new Value(1, Material.SpecialRange)])
        this.benefit.push(benefit)
      // When you return this round booster by taking the “Pass” action,
      // gain 1 VP for each of your mines on the board
    }

    if(id === 5) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(1, Material.Ore)])
      this.benefit.push(benefit)
      const benefit2 = new Benefit(Trigger.Pass, Count.Mines, null,
          [new Value(1, Material.VP)])
      this.benefit.push(benefit2)

      // When you return this round booster by taking the “Pass” action,
      // gain 3 VP for each of your research labs on the board.
    }

    if(id === 6) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(1, Material.Science)])
      this.benefit.push(benefit)
      const benefit2 = new Benefit(Trigger.Pass, Count.Labs, null,
          [new Value(3, Material.VP)])
      this.benefit.push(benefit2)
      // When you return this round booster by taking the “Pass” action,
      // gain 2 VP for each of your trading stations on the board.
    }

    /*

    enum Count {
        Sectors = 'sectors',
        Mines = 'mines',
        TradingStations = 'tradingstations',
        Labs = 'labs',
        BigBuildings = 'bigbuildings',
        Feds = 'feds',
        PlanetTypes = 'planetTypes',
        Satellites = 'satellites',
        Gaia = 'gaia'
    }

    enum Struct {
        Mine = 'mine',
        TradingStation = 'trading',
        Lab = 'Lab',
        BigBuildings = 'bigbuildings',
        Academy = 'academy',
        Institute = 'institute'
    }
    */

    if(id === 7) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(1, Material.Ore)])
      this.benefit.push(benefit)
      const benefit2 = new Benefit(Trigger.Pass,  Count.TradingStations, null,
          [new Value(2, Material.VP)])
      this.benefit.push(benefit2)
      // Free terraforming step

    }

    if(id === 8) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(4, Material.Charge)])
      this.benefit.push(benefit)
      const benefit2 = new Benefit(Trigger.Pass, Count.BigBuildings, null,
          [new Value(4, Material.VP)])
      this.benefit.push(benefit2)
      // When you return this round booster by taking the “Pass” action,
      // gain 4 VP for each of your planetary institutes and academies on the board.

    }

    if(id === 9) {
      const benefit = new Benefit(Trigger.Income, null, null,
        [new Value(4, Material.Gold)])
      this.benefit.push(benefit)
      const benefit2 = new Benefit(Trigger.Pass,  Count.Gaia, null,
          [new Value(1, Material.VP)])
      this.benefit.push(benefit2)
      // When you return this round booster by taking the “Pass” action, gain 1 VP for each Gaia Planet you have colonized
      // (you do not gain VP for Gaiaformers on Gaia or Transdim Planets).

    }


  }
//
//   public doBeforeRound(player) {
//     // todo
//     //this.income.doIncome(player);
//   }
//
//   public doAfterRound(player) {
//     // to do pass
//     // if(this.id === 5) {
//     //   this.doRoundBoosterBenefit(player, 1, this.mine)
//     // }
//   }
//
}


export default RoundBooster;
