import {Race, RaceType} from './Race'
import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
import {MapBoard} from './MapBoard'

enum Fed{
  vp12,
  vp8qic1,
  vp8pw2,
  vp7ore2,
  vp7gold6,
  vp6 2klgs,
  ore1klg1gold2
}

class Federation {
  public fed: Fed
  public fedStatus: string //green or gray
  public race: RaceType
  //public //which building formed this Federation
  public valid : boolean;//if the points are enough for federating

  constructor(){
    if(race === 'Gleens'){
      addFed(6);//if race is gleens, automatically gains this.
    }
  }

  public initialize(){
    for(let i = 1; i < 7; i++){
      types[i].side = 'green'; //the 12vp one has both sides gray.
    }
    hasFed = [];
    this.count = 0;
  }

  /*
  * Check if the points are enough for federating, and that they are
  * next to each other or connected by sattelites.
  */
  public checkValid(input: string){
    //points === 0;
    //input is 'cancel' or hex
    while(input !== 'cancel' && points <= 7){
      selectBuildings();
    }
    connectBySatellites();
    chooseFedType();//that fed type is still available in the store
  }

  public selectBuildings(hex, pid){
    //getHexInfo from yousong's mapboard class
    //if the building's owner is your
    //and points are enough
  }

  public addFed(fed:Fed){
    if(fed === '12vp'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(12, Material.VP)]);
      this.benefit.push(benefit)
    }
    if(fed === '8vp1qic'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(8, Material.VP), new Value(1, Material.QIC)]);
      this.benefit.push(benefit)
    }
    if(fed === '8vp2pw'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(8, Material.VP), new Value(2, Material.Power)]);
      this.benefit.push(benefit)
    }
    if(fed === '7vp2ore'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(7, Material.VP), new Value(2, Material.Ore)]);
      this.benefit.push(benefit)
    }
    if(fed === '7vp6gold'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(7, Material.VP), new Value(6, Material.Gold)]);
      this.benefit.push(benefit)
    }
    if(fed === '6vp2klgs'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(6, Material.VP), new Value(2, Material.Science)]);
      this.benefit.push(benefit)
    }
    if(fed === '1ore1klg2gold'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(1, Material.Ore), new Value(1, Material.Science)], new Value(2, Material.Gold)]);
      this.benefit.push(benefit)
    }
}

export {Federation};
