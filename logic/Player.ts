import {Race, RaceType} from './Race'
import {Planet, PlanetType} from './Planet'
import Tech from './Tech'
import TechTiles from './TechTiles'
import RoundBooster from './RoundBooster'
import {Benefit, Value, Material, Count, Struct, Trigger} from './Benefit'
import {Federation} from './Federation';
import {GridGenerator, HexGrid, Layout, Path, Text, Hexagon, Pattern, HexUtils, Hex} from 'react-hexgrid';
import { BuildCost, Cost } from './Cost';


class Player extends Race {
  public name: string;
  public passed: boolean;
  public roundBooster: RoundBooster;
  public planets: Planet[];
  public numGaia: number;
  public digCost: Cost;
  public gaiaFormingCost: Cost;
  public techs: Tech[];
  public techTiles: TechTiles[];
  public federations: Federation[];
  public planetType: PlanetType;
  public nowBenefits: Benefit[];
  public incomeBenefits: Benefit[];
  public specialBenefits: Benefit[];
  public pid: number;

  constructor(name: string, raceType: RaceType){
    super(raceType);
    this.name = name;
    this.passed = false;
    // this.roundBooster = undefined;
    // this.planetType = 
    this.digCost = new Cost([new BuildCost(Material.Ore, 3)]);
    this.gaiaFormingCost = new Cost([new BuildCost(Material.GaiaFormer, 1), new BuildCost(Material.GaiaFormingPower, 6)])
    this.planets = [];
    this.numGaia = 0;
    this.techs = [];
    this.techTiles = [];
    this.federations = [];
    this.pid =  -1;  // pid is player id for example 0 1 2 3
  }

  /*
  * Add the benefit into the benefit array by the trigger,
  * notice: this is only add them into the array, the benefit has not been used yet
  * input: benefit
  * output: add the benefit into the array
  * @yalei
  */
  public getBenefit(benefit: Benefit | null = null){
    if(benefit === null) return;

     /**
     Income benefit - occurs every round
     */
    if(benefit.trigger === Trigger.Income){
      this.incomeBenefits.push(benefit);
    }

    /**
     * Now benefit - occurs once, when obtained (Now)
     */
    if(benefit.trigger === Trigger.Now){
      this.nowBenefits.push(benefit);
      super.onBenefit(benefit);
    }

    /**
     * Special benefit - user decides when to use the power
     */
    if(benefit.trigger === Trigger.Special) {
      this.specialBenefits.push(benefit);
    }

  }

  /*
    @param
    here's what the function does
  */
  // cleanUp(player){ // this for caluclate techtile (federations) vp after round  for player

  // }

  public nearDistance(hex: Hex){

    let min = 10000;

    for(let i = 0; i < this.planets.length; i++){
      const d = HexUtils.distance(this.planets[i].loc, hex);
      if(d < min) {
        min = d;
      }
    }
    return min;

  }

  public checkPlanetDistance(hex: Hex){
    const distance = this.nearDistance(hex);
    if(this.range >= distance){
      return true;
    } else {
      if(this.range + this.qic * 2 >= distance){
        console.log("checkPlanetDistance OK but need QIC ");
        return true;
      }
    }

    return false;
  }

}

export {Player};
