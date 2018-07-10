import {Race, RaceType} from './Race'
import {Planet, PlanetType} from './Planet'
import Tech from './Tech'
import TechTiles from './TechTiles'
import RoundBooster from './RoundBooster'
import {Benefit, Value, Material, Count, Structure, Trigger} from './Benefit'
import {Federation} from './Federation';
import {GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex} from 'react-hexgrid';
import { BuildCost, Cost } from './Cost';
import { SpecialPower, SpecialPowerType } from './SpecialPower';


class Player extends Race {
  public name: string;
  public passed: boolean;
  public roundBooster: RoundBooster;
  public planets: PlanetType[];
  public numGaia: number;
  public digCost: Cost;
  public gaiaFormingCost: Cost;
  public techs: number[];
  public techTiles: TechTiles[];
  public federations: Federation[];
  public nowBenefits: Benefit[];
  public incomeBenefits: Benefit[];
  public specialPowers: SpecialPower[];

  constructor(name: string, raceType: RaceType){
    super(raceType);
    this.initializeSpecialPowers();
    this.name = name;
    this.passed = false;
    // this.roundBooster = undefined;
    // this.planetType =
    this.digCost = new Cost([new BuildCost(Material.Ore, 3)]);
    this.gaiaFormingCost = new Cost([new BuildCost(Material.GaiaFormer, 1), new BuildCost(Material.Power, 6)])
    this.planets = [];
    this.numGaia = 0;
    this.techs = [0,0,0,0,0,0];
    this.techTiles = [];
    this.federations = [];
    this.pid =  -1;  // pid is player id for example 0 1 2 3
  }

  /**
   * initiallize the lib of special powers
   */
  public initializeSpecialPowers(){
    var powerTypes = [SpecialPowerType.QIC1,
                      SpecialPowerType.Dig1,
                      SpecialPowerType.SpecialRange3,
                      SpecialPowerType.Power4,
                      SpecialPowerType.QIC1Gold5,
                      SpecialPowerType.Ore3,
                      SpecialPowerType.Science3];
    for(let i = 0; i < powerTypes.length; i++){
      let specialPower = new SpecialPower(powerTypes[i]);
      this.specialPowers.push(specialPower);
    }
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
      super.onBenefit(benefit);
    }
    if(benefit.trigger === Trigger.Special){
      this.activateSpecialPower(benefit);
    }
  }

  /**
   * activate the special power which has this benefit
   * @param benefit 
   */
  public activateSpecialPower(benefit: Benefit){
    var values = benefit.benefits;
    if(values.length === 1){
      var value = values[0];
      if(value.quantity === 1 && value.material === Material.QIC){
        this.specialPowers[0].activatePower();
      }
      if(value.quantity === 1 && value.material === Material.SpecialDig){
        this.specialPowers[1].activatePower();
      }
      if(value.quantity === 3 && value.material === Material.SpecialRange){
        this.specialPowers[2].activatePower();
      }
      if(value.quantity === 4 && value.material === Material.Power){
        this.specialPowers[3].activatePower();
      }
      if(value.quantity === 3 && value.material === Material.Ore){
        this.specialPowers[5].activatePower();
      }
      if(value.quantity === 3 && value.material === Material.Science){
        this.specialPowers[6].activatePower();
      }
    }else if(values.length === 2){
      this.specialPowers[4].activatePower();
    }
    console.log("no such special power");
    return;
  }

  /*
    @param
    here's what the function does
  */
  // cleanUp(player){ // this for caluclate techtile (federations) vp after round  for player

  // }

  public nearDistance(hex){

    let min = 10000;

    for(let i = 0; i < this.planets.length; i++){
      const d = HexUtils.distance(this.planets[i].hex, hex);
      if(d < min) {
        min = d;
      }
    }
    return min;

  }

  public checkPlanetDistance(hex){
    const distance = this.nearDistance(hex);
    if(this.range >= distance){
      return true;
    } else {
      if(this.range + this.qic * 2 >= distance){
        console.log("checkPlanetDistance OK  but need QIC ");
        return true;
      }
    }

    return false;
  }

}

export {Player};
