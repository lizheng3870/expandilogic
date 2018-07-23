import {PlanetType, Planet} from './Planet'
import Tech from './Tech'
import {Federation} from './Federation';
import { RaceType } from './Player';
import { Benefit, Trigger, BuildingType, Value, Material } from "./Benefit";

export interface BuildBenefit{
    built : boolean
    benefit: Benefit
}

interface BuildBoard {
    mines : BuildBenefit[],
    stations : BuildBenefit[],
    labs : BuildBenefit[],
    academies : BuildBenefit[]
    institutes : BuildBenefit[],
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
    public planets: Planet[]; // Which planets are my buildings on
    public gaiaformer: number;  // How many gaiaformers do I have
    public federations: Federation[]; // My Federations
    public numGaia: number; // How many gaia planets have a conquered

    //Benefits not from the buildBoard
    public nowBenefits: Benefit[];
    public incomeBenefits: Benefit[];
    public specialBenefits: Benefit[];

    // This buildBoard holds the benefits that are unlocked at each step
    public buildBoard : BuildBoard = {
        mines : [],
        stations : [],
        institutes : [],
        labs : [],
        academies : []
    }

    // The permanent board incomes
    public income : Benefit[]

    //Player Status - should these be set to private????
    public playerId: number;
    public raceType: RaceType;
    public planetType: PlanetType;
    public passed: boolean;
    // public roundBooster: Benefit;
    // public digCost: Benefit;
    // public gaiaFormingCost: Benefit;
    public gaiaColonize: Benefit;
    public range: number; // basic range, can be increased by upgrading the tech of range and will not decrease;
    public specialDig: number;
    public specialRange: number; // temporary range, increased by spend QIC or special power, will go back to 0 every new turn;

    //Tech level of player
    //Tech level array form - EITHER
    // public techs: Tech[];
    // Tech level value form - OR
    public dig: number;
    public nav: number;
    public qicTech: number;
    public gaia: number;
    public resources: number;
    public knowledge: number;

  constructor(){

    //Player Resources
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;

    // - todo - some factions have different power bowl starting points

    //Player Milestones
    this.gaiaformer = 0;
    this.numGaia = 0;
    // - todo - initialize number of planets
    // - todo - initialize number of federations



}

/**
 * Set player RaceType
 * @param race
 */
public setRaceType(race: RaceType) {
    this.raceType = race;
    // Set up the buildboard for that player
    this.setUpBuildBoard();
}

/**
 * Set player buildBoard
 */
public setUpBuildBoard(){
    this.addMines();
    this.addStations();
}

/**
 * AddMines for buildBoard
 */
private addMines() {
    let item = false;
    let playerBenefit1 = new Benefit(Trigger.Income, null, BuildingType.Mine, [new Value(1, Material.Ore)]);
    let playerBenefit2 = new Benefit(Trigger.Income, null, BuildingType.Mine, [new Value(0, Material.Ore)]);
    let mine1 = {built: item, benefit: playerBenefit1};
    let mine2 = {built: item, benefit: playerBenefit2};

    for (let i = 1; i <= 8; i++) {
        if (i === 3) {
            this.buildBoard.mines.push(mine2);
        }
        this.buildBoard.mines.push(mine1);
    }
}

/**
 * Add Trading Stations for buildboard
 */
private addStations() {

}



/**
 * Adds now benefits collected during game play
 * Note: Not on buildBoard
 * @param nowBenefit
 */
public addNowBenefits(nowBenefit: Benefit) {
    this.nowBenefits.push(nowBenefit);
}

/**
 * Adds income benefits collected during game play
 * Note: Not on buildBoard
 * @param incomeBenefit
 */
public addIncomeBenefits(incomeBenefit: Benefit) {
    this.incomeBenefits.push(incomeBenefit);
}


/**
 * Adds special benefits collected during game play
 * Note: Not on buildBoard
 */
public addSpecialBenefits(specialBenefit: Benefit) {
    this.specialBenefits.push(specialBenefit);
}


/**
 * Set player Planet type
 * @param playerPlanet
 */
public setPlanetType(playerPlanet: PlanetType) {
    this.planetType = playerPlanet;
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
