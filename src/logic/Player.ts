import {Race, RaceType} from './Race'
import {PlanetType} from './Planet'
import TechTiles from './TechTiles'
import {Benefit, Trigger} from './Benefit'
import {Federation} from './Federation'
// import {Hex} from './Hex'


class Player extends Race {
  public name: string
  public planets: PlanetType[]
  public numGaia: number
  public techs: number[]
  public techTiles: TechTiles[]
  public federations: Federation[]
  public nowBenefits: Benefit[]
  public incomeBenefits: Benefit[]
  public gaiaFormingCost: number = 6
  public digCost: number = 3

  constructor(name: string, raceType: RaceType){
    super(raceType);
    this.initializeSpecialPowers();
    this.name = name;
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
      // super.onBenefit(benefit);
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

  }

}

export {Player};
