import {Race} from './Race'
import {Planet, PlanetType} from './Planet'
import TechTiles from './TechTiles'
import {Benefit, Trigger, Material, Value} from './Benefit'
import {Federation} from './Federation'
import RoundBooster  from './RoundBooster'
import {BuildingLib} from './BuildingLib'
import {Hex} from './Hex'
import {Terrans} from './Terrans'
import {StructureStatus} from './Structure'

export enum RaceType {
  Terrans,
  Lantids,
  Xenos,
  Gleens,
  Taklons,
  Ambas,
  Nevlas,
  Itars,
  HadschHallas,
  Ivits,
  Geodens,
  Baltaks,
  Firaks,
  Bescods,
}
// export type Player = Terrans | Lantids | Xenos,
// Gleens,
// Taklons,
// Ambas,
// Nevlas,
// Itars,
// HadschHallas,
// Ivits,
// Geodens,
// Baltaks,
// Firaks,
// Bescods,


class Player extends Race{
  public name: string
  public planets: Planet[]
  public numGaia: number
  public techs: number[]
  public techTiles: TechTiles[]
  public federations: Federation[]
  public nowBenefits: Benefit[]
  public incomeBenefits: Benefit[]
  public gaiaFormingCost: number = 6
  public digCost: number = 3
  public race: RaceType|null
  public pid: number
  public roundBooster:RoundBooster
  public buildings:BuildingLib
  public planetType:PlanetType

  constructor(name: string, raceType: RaceType){
    super();
    this.initializeSpecialPowers();
    this.name = name;
    this.race = raceType;
    this.planets = [];
    this.numGaia = 0;
    this.techs = [0,0,0,0,0,0];
    this.techTiles = [];
    this.federations = [];
    this.pid =  -1;  // pid is player id for example 0 1 2 3
    this.nowBenefits = [];
    this.incomeBenefits = [];
    this.planetType = this.getPlantType(raceType);
    this.buildings = new BuildingLib(raceType);

  }

  // map race type to plant types
  public getPlantType(raceType: RaceType):PlanetType{
    if(raceType === RaceType.Terrans || raceType === RaceType.Lantids)
      return PlanetType.Blue;

    if(raceType === RaceType.Xenos || raceType === RaceType.Gleens)
        return PlanetType.Yellow;

    if(raceType === RaceType.Taklons || raceType === RaceType.Ambas)
        return PlanetType.Brown;

    if(raceType === RaceType.HadschHallas || raceType === RaceType.Ivits)
        return PlanetType.Red;


    if(raceType === RaceType.Nevlas || raceType === RaceType.Itars)
        return PlanetType.White;

    if(raceType === RaceType.Geodens || raceType === RaceType.Baltaks)
        return PlanetType.Orange;

    if(raceType === RaceType.Firaks || raceType === RaceType.Bescods)
          return PlanetType.Black;


    if(raceType === RaceType.Nevlas || raceType === RaceType.Itars)
        return PlanetType.White;

    return PlanetType.Blue;
  }

  /**
   * initiallize the lib of special powers
   */
  public initializeSpecialPowers(){

  }

  /*
  * Add the benefit into the benefit array by the trigger,
  * notice: this is only add them into the array, the benefit has not been used yet
  * input: benefit
  * output: add the benefit into the array
  * @yalei
  */
  public getBenefit(benefit: Benefit){
    if(benefit.trigger === Trigger.Income){
      this.incomeBenefits.push(benefit);
    }
    if(benefit.trigger === Trigger.Now){
      this.nowBenefits.push(benefit);
      // since it is now, so we call the onBenefit at once;
      this.onBenefit(benefit);
    }
    if(benefit.trigger === Trigger.Special){
      this.activateSpecialPower(benefit);
    }
  }

  /**
   * the function which will add the amount of resource into players class
   * @param benefit
   */
  public onBenefit(benefit: Benefit){
    const values = benefit.values;
    let i = 0;
    let value;
    for(; i < values.length; i++){
      value = values[i];
      if(value.material === Material.Gold){
        this.gold += value.quantity;
      }
      if(value.material === Material.Ore){
        this.ore += value.quantity;
      }
      if(value.material === Material.Science){
        this.science += value.quantity;
      }
      if(value.material === Material.QIC){ this.qic += value.quantity; }
      if(value.material === Material.ExtraPower){ this.power.bowl1 += value.quantity; }
      if(value.material === Material.Power){
        this.chargePower(value.quantity);
      }
      if(value.material === Material.Dig){ /*lets discuss this part later --- by yalei*/ }
      if(value.material === Material.VP){ this.vp += value.quantity; }
      // if(value.material === Material.SpecialDig){ /*what is the special dig? ---by yalei*/ }
      if(value.material === Material.SpecialRange){ this.specialRange += value.quantity; }
      if(value.material === Material.GaiaFormer){this.gaiaformer += value.quantity;}
    }
    if(this.gold > 30) this.gold = 30;
  }

  /**
   * activate the special power which has this benefit
   * @param benefit
   */
  public activateSpecialPower(benefit: Benefit){

  }


  public nearDistance(hex: Hex){
    let min = 10000;

    for(let i = 0; i < this.planets.length; i++){
      const d = hex.distance(this.planets[i].loc);
      if(d < min) min = d;
    }
    return min;
  }

  public checkPlanetDistance(hex: Hex){
    var distance = this.nearDistance(hex);
    if(this.range >= distance){
      return true;
    }else{
      if(this.range + this.qic * 2 >= distance){
        console.log("checkPanetDistance OK  but need QIC ");
        return true;
      }
    }

    return false;
}

// terraforming will cost ore according tech level
public terraformingCost(){
  //// TODO:
  return 3;
}

public getAvalibleMine(){
  for(let mine of this.buildings.mines){
    if(mine.status === StructureStatus.Unbuilt)
       return mine;
  }
     return null;

}

public getAvalibleStation(){
  for(let s of this.buildings.station){
    if(s.status === StructureStatus.Unbuilt)
       return s;
  }
     return null;

}

public getAvalibleLab(){
  for(let l of this.buildings.lab){
    if(l.status === StructureStatus.Unbuilt)
       return l;
  }
     return null;

}

public getAvalibleInstitute(){
  for(let i of this.buildings.institute){
    if(i.status === StructureStatus.Unbuilt)
       return i;
  }
     return null;

}

public getAvalibleAcademies(){
  for(let a of this.buildings.academies){
    if(a.status === StructureStatus.Unbuilt)
       return a;
  }
     return null;

}

public getLastBuiltMine(){
  let last = null;
  for(let mine of this.buildings.mines){
    if(mine.status === StructureStatus.Built)
       last =  mine;
  }
     return last;

}

public getLastBuiltStation(){
  let last = null;
  for(let s of this.buildings.station){
    if(s.status === StructureStatus.Unbuilt)
       last = s;
  }
     return last;

}

public getLastBuiltLab(){
  let last = null;
  for(let l of this.buildings.lab){
    if(l.status === StructureStatus.Unbuilt)
       last = l;
  }
     return last;

}





public AffordMine(){
  const mine = this.getAvalibleMine();
  if(mine == null)return false;

  return this.haveResouces(mine.cost);
  // for(const value : mine.values){
  //
  //
  // }
}





/*
Gold,
Ore,
Science,
QIC,
Power, // charge power
ExtraPower,
VP,
Dig, // you can buy the dig chance from the store
SpecialRange, // some special power or round booster can give you temporary range
GaiaFormer, /
*/
public haveResouce(value:Value){
  if(value.material === Material.Gold){
    return value.quantity <= this.gold;
  }

  if(value.material === Material.Ore){
    return value.quantity <= this.ore;
  }

  if(value.material === Material.Science){
    return value.quantity <= this.science;
  }

  if(value.material === Material.QIC){
    return value.quantity <= this.qic;
  }

  if(value.material === Material.VP){
    return value.quantity <= this.vp;
  }

  if(value.material === Material.GaiaFormer){
    return value.quantity <= this.gaiaformer;
  }

  return false;

}

public payResouce(value:Value){
  if(value.material === Material.Gold){
    this.gold -= value.quantity;
    return true;
  }

  if(value.material === Material.Ore){
    this.ore -= value.quantity;
    return true;
  }

  if(value.material === Material.Science){
    this.science -= value.quantity;
    return true;
  }

  if(value.material === Material.QIC){
    this.qic -= value.quantity;
    return true;
  }

  if(value.material === Material.VP){
    this.vp -= value.quantity;
    return true;
  }

  if(value.material === Material.GaiaFormer){
    this.gaiaformer -= value.quantity;
    return true;
  }

  return false;

}
public haveResouces(values:Value[]){
  for(const value of values){
    if(this.haveResouce(value) === false){
      console.log("can not afford sources:")
      console.log(value)
      return false;
    }
  }

  return true;
}

public payResouces(values:Value[]){
  for(const value of values){
    if(this.payResouce(value) === false)return false;
  }
  return true;
}



// terraforming will cost ore according tech level
public startGaiaProjectCost():number{
  //// TODO:
  return 6;
}

public checkPowerForGaiaProject(){
  if(this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= this.startGaiaProjectCost()){
    return true;
  }else{
    return false;
  }

}

public checkPowerForFederation(satellite:number){
  if(this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= satellite){
    return true;
  }else{
    return false;
  }

}

public transferGaiaPower(){
   let cost = this.startGaiaProjectCost();
   this.takePowersAwayFromBowl(cost);

 }

// used in Federation
 public discardPowersToBuildSatellites(satellite:number){
    this.takePowersAwayFromBowl(satellite);
 }

  public takePowersAwayFromBowl(cost: number){
    let amount = cost

    if (cost > this.power.bowl1){
        amount = this.power.bowl1
    }

    this.power.bowl1 -= amount
    cost -= amount

    // now do bowl2 -> bowl3
    amount = cost

    if (cost > this.power.bowl2){
        amount = this.power.bowl2
    }

    this.power.bowl2 -= amount
    cost -= amount

    if(cost > 0){  // previous check is true, so defintely have enough power to take away
      this.power.bowl2 -= cost
    }
  }


  /*
  * Add the benefit into the benefit array by the trigger,
  * notice: this is only add them into the array, the benefit has not been used yet
  * input: benefit
  * output: add the benefit into the array
  * @yalei
  */
  public getTrigerBenefit(trigger: Trigger){
    let result : Benefit[] = [];
    if(trigger === Trigger.Pass){
      const benefits = this.roundBooster.benefit;
      for(const benefit of benefits){
        if(benefit.trigger === Trigger.Pass){
          result.push(benefit)
        }
      }


    }

    return result;

  }

  public onPassBenefit(){
    let benefits = this.getTrigerBenefit(Trigger.Pass);
    for(const benefit of benefits){
      this.onBenefit(benefit);
    }
  }

  public accessiblePlanets(){
    // let hexs : Hex[] = []
    // for(let planet of this.planets){
    //   let neighborings = Hex
    //
    // }

  }






}

export {Player};
