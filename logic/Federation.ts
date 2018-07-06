//import Race from './Race'
import {Benefit, Value, Material, Count, Struct, Trigger}   from './Benefit'
//import MapBoard from './MapBoard'


// enum Fed{
//   12vp,
//   8vp1qic,
//   8vp2pw,
//   7vp2ore,
//   7vp6gold,
//   6vp2klgs,
//   1ore1klg2gold
// }

// todo rename a better name like VP VP
enum Fed{
  vp,
  vp1qic,
  vp2pw,
  vp2ore,
  vp6gold,
  vp2klgs,
  ore1klg2gold
}



//todo  define this class clearly. Federation is fedaration token.
// do not checkValid. that is Action class method. when do action of fedaration will check it.
// please focus only on token benefit for Federation like TechTile
// rong will concern race. you only need build token of 6. he is will to race of Gleens.
class Federation{
  public fed: Fed
  public fedStatus: string //green or gray
  //public race: RaceType
  //public //which building formed this Federation
  public valid : boolean;//if the points are enough for federating
  //public types : ?

  constructor(){
    // if(race === 'Gleens'){
    //   addFed(6);//if race is gleens, automatically gains this.
    // }
  }

  public initialize(){
    for(let i = 1; i < 7; i++){
    //  types[i].side = 'green'; //the 12vp one has both sides gray.
    }
    // hasFed = [];  // missing this
    // this.count = 0;
  }

  /*
  * Check if the points are enough for federating, and that they are
  * next to each other or connected by sattelites.
  */
  // public checkValid(input: string){
  //   //points === 0;
  //   //input is 'cancel' or hex
  //   while(input !== 'cancel' && points <= 7){
  //     selectBuildings();
  //   }
  //   connectBySatellites();
  //   chooseFedType();//that fed type is still available in the store
  // }

  public selectBuildings(hex, pid){
    //getHexInfo from yousong's mapboard class
    //if the building's owner is your
    //and points are enough
  }

  // todo why this?  is this refer to player?
  public addFed(fed:Fed){
    // if(fed === 'vp'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(12, Material.VP)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'vp1qic'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(8, Material.VP), new Value(1, Material.QIC)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'vp2pw'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(8, Material.VP), new Value(2, Material.Power)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'vp2ore'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(7, Material.VP), new Value(2, Material.Ore)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'vp6gold'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(7, Material.VP), new Value(6, Material.Gold)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'vp2klgs'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(6, Material.VP), new Value(2, Material.Science)]);
    //   this.benefit.push(benefit)
    // }
    // if(fed === 'ore1klg2gold'){
    //   const benefit  = new Benefit(Trigger.Fed, null, null,
    //       [new Value(1, Material.Ore), new Value(1, Material.Science), new Value(2, Material.Gold)]);
    //   this.benefit.push(benefit)
    // }
  }
}
// todo not Federation?
export {Federation, Fed}
