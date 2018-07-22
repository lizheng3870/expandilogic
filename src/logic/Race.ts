import {PlanetType, Planet} from './Planet'
import Tech from './Tech'
import { Benefit } from './Benefit';
import {Federation} from './Federation';

interface BuildBenefit{
    built : boolean
    benefit: Benefit
}

interface BuildBoard {
    mines : BuildBenefit[],
    stations : BuildBenefit[],
    institutes : BuildBenefit[],
    labs : BuildBenefit[],
    academies : BuildBenefit[]
}
/**
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 * race will have income from many places, including
 * build board
 * permanent income from build board
 * tech tiles
 * round boosters
 * tech tracks
 *
 */
export class Race {

    //Player Resources
    public vp: number;
    public gold: number;
    public ore: number;
    public science: number;
    public qic: number;
    public power : {
        bowl1: number,
        bowl2: number,
        bowl3: number,
        gaia: number
    } = {
        bowl1: 2,
        bowl2: 4,
        bowl3: 0,
        gaia: 0
    }

    //Player Milestones
    public planets: Planet[] // Which planets are my buildings on
    public gaiaformer: number;  // How many gaiaformers do I have
    public federations: Federation[]; // My Federations
    public nowBenefits: Benefit[];
    public incomeBenefits: Benefit[];
    public specialBenefits: Benefit[];
    public boughtBenefits: Benefit[];

    // This buildBoard holds the benefits that are unlocked at each step
    public buildBoard : BuildBoard = {
        mines : [],
        stations : [],
        institutes : [],
        labs : [],
        academies : []
    }
   
    //Player Status
    public planetType: PlanetType;
    public passed: boolean;
    // public roundBooster: RoundBooster;
    // public numGaia: number;
    // public digCost: Cost;
    // public gaiaFormingCost: Cost;
    // public gaiaColonize: Cost;
    public range: number; // basic range, can be increased by upgrading the tech of range and will not decrease;
    public specialDig: number;
    public specialRange: number; // temporary range, increased by spend QIC or special power, will go back to 0 every new turn;
    public playerId: number;

    // The permanent board incomes
    public income : Benefit[]

    // Tech level of player
    //Tech level array form - EITHER
    public techs: Tech[];
    // Tech level value form - OR
    public dig: number;
    public nav: number;
    public qicTech: number;
    public gaia: number;
    public resources: number;
    public knowledge: number;
   
  constructor(){
    
    //Resources  
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;

    this.gaiaformer = 0;
    
    
    // Set up the buildboard
    this.setUpBuildBoard();
}

private setUpBuildBoard(){
    // this.buildBoard.mines.push()
}





/*
    use the "charge power" mechanic to push
    power aka energy around the bowl system
    gaia bowl and "burning power" mechanics are
    handled in other methods
*/
 public chargePower(charge: number){
    let amount = charge

    // move the lesser of the amount to charge or all of bowl 1
    // this will also work when there's zero in bowl 1
    if (charge > this.power.bowl1){
        amount = this.power.bowl1
    }

    this.power.bowl2 += amount
    this.power.bowl1 -= amount
    charge -= amount

    // now do bowl2 -> bowl3
    amount = charge

    if (charge > this.power.bowl2){
        amount = this.power.bowl2
    }
    this.power.bowl3 += amount
    this.power.bowl2 -= amount
    charge -= amount

  }

  public addPower(extra : number){
    this.power.bowl1 += extra
  }

  /*
  * spend the power to get something
  * this function only consume power
  * @yalei;
  */
  public spendPower(charge: number){
    if (this.power.bowl3 < charge){
        throw new Error(`SPEND POWER ERROR: ${charge} is greater than ${this.power.bowl3}`)
    }
    this.power.bowl3 -= charge
    this.power.bowl1 += charge
  }

  // todo reseachArea
  public reseachArea(){

  }

}
