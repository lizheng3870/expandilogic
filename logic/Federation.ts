import Race from './Race'
import {Benefit, Value, Material, Count, Struct, Trigger}   from './Benefit'
import MapBoard from './MapBoard'

enum Fed{
  12vp,
  8vp1qic,
  8vp2pw,
  7vp2ore,
  7vp6gold,
  6vp2klgs,
  1ore1klg2gold
}

class Federation{
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
      //types[0]--;
      hasFed.addFed(0);
    }
    if(fed === '8vp1qic'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(8, Material.VP), new Value(1, Material.QIC)]);
      this.benefit.push(benefit)
      //types[1]--;
      hasFed.addFed(0);
    }
    if(fed === '8vp2pw'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(8, Material.VP), new Value(2, Material.Power)]);
      this.benefit.push(benefit)
      //types[2]--;
      hasFed.addFed(0);
    }
    if(fed === '7vp2ore'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(7, Material.VP), new Value(2, Material.Ore)]);
      this.benefit.push(benefit)
      //types[2]--;
      hasFed.addFed(0);
    }
    if(fed === '7vp6gold'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(7, Material.VP), new Value(6, Material.Gold)]);
      this.benefit.push(benefit)
      //types[2]--;
      hasFed.addFed(0);
    }
    if(fed === '6vp2klgs'){
      const benefit  = new Benefit(Trigger.Fed, null, null,
          [new Value(6, Material.VP), new Value(2, Material.Science)]);
      this.benefit.push(benefit)
      //types[2]--;
      hasFed.addFed(0);
    }

    if(fedID == 2)
      this.vp += 8;
      this.power += 2;
      types[2]--;
    if(fedID == 3)
      this.vp += 7;
      this.ore += 2;
      types[3]--;
    if(fedID == 4)
      this.vp += 7;
      this.gold += 6;
      types[4]--;
    if(fedID == 5)
      this.vp += 6;
      this.knowledge += 3;
      types[5]--;
    if(fedID == 6)
      this.ore++;
      this.gold++;
      this.knowledge++;
  }

  useFed(fedID, actionID){
    if(!this.hasFed.includes(fedID) || !this.hasFed[fedID].status == 'green'){
       console.log('you have no such fed or have already used.');
       return false;
    }else{
      types[fedID]++;
    }
    if(actionID == 0)
      //gain an advanced tech tile
    if(actionID == 1)
      //if level 5 is not occupied
        //advance to the highest level (level 5) of a research area.
    hasFed[fedID].side == 'gray';
  }
}

export{Fed}
