import {Race} from './Race'
import {Planet, PlanetType} from './Planet'
import TechTiles from './TechTiles'
import {Benefit, Trigger, Material, Value} from './Benefit'
import {Federation} from './Federation'
import RoundBooster  from './RoundBooster'
import {BuildingLib} from './BuildingLib'
import {Hex} from './Hex'
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

class Player extends Race {
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
  }

  // map race type to plant types
  public getPlantType(raceType: RaceType):PlanetType{
  //todo
    return PlanetType.Green;
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

public isHaveAffordableMine(){
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
    return value.quantity >= this.gold;
  }

  if(value.material === Material.Ore){
    return value.quantity >= this.ore;
  }

  if(value.material === Material.Science){
    return value.quantity >= this.science;
  }

  if(value.material === Material.QIC){
    return value.quantity >= this.qic;
  }

  if(value.material === Material.VP){
    return value.quantity >= this.vp;
  }

  if(value.material === Material.GaiaFormer){
    return value.quantity >= this.gaiaformer;
  }

  return false;

}

public payResouce(value:Value){
  //todo

}
public haveResouces(values:Value[]){
  for(const value of values){
    if(this.haveResouce(value) === false)return false;
  }
  return true;
}

public payResouces(values:Value[]){
    //todo
}






}

export {Player};
