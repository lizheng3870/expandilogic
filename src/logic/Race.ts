import {PlanetType, Planet} from './Planet'
import Tech from './Tech'
import {Federation} from './Federation';
import { RaceType } from './Player';
import { Benefit, Trigger, BuildingType, Value, Material } from "./Benefit";
import TechTiles from './TechTiles';
import RoundBooster from './RoundBooster';
import { BuildingLib } from './BuildingLib';
import { Structure } from './Structure';

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
    public techs: number[];
    public techTiles: TechTiles[];
    public buildingLib: BuildingLib;
    
    //Player Status
    public playerId: number;
    public raceType: RaceType;
    public planetType: PlanetType;
    public passed: boolean;
    public gaiaFormingCost: number = 6;
    public digCost: number = 3;
    public range: number; // basic range, can be increased by upgrading the tech of range and will not decrease;
    public specialDig: number;
    public specialRange: number; // temporary range, increased by spend QIC or special power, will go back to 0 every new turn;
    public roundBooster: RoundBooster;
    
    //Benefits not from the buildBoard
    public nowBenefits: Benefit[];
    public incomeBenefits: Benefit[];
    public specialBenefits: Benefit[];

    // This buildBoard holds the benefits that are unlocked at build
    public buildBoard : BuildBoard = {
        mines : [],
        stations : [],
        institutes : [],
        labs : [],
        academies : []
    }

    // The permanent board incomes
    public income : Benefit[];

  constructor(){

    //Player Resources
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;
    // this.power.bowl1 = 4;
    // this.power.bowl2 = 2;
    // this.power.bowl3 = 0;
    // this.power.gaia = 0;

    //Player Milestones
    this.planets = [];
    this.gaiaformer = 0;
    this.federations = [];
    this.numGaia = 0;
    this.techs = [0,0,0,0,0,0];
    this.techTiles = [];
    
    //Player Status
    
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
 * Set player Planet type
 * @param playerPlanet
 */
public setPlanetType(playerPlanet: PlanetType) {
    this.planetType = playerPlanet;
}

/**
 * Set player buildBoard
 */
public setUpBuildBoard(){
    // this.addMines();
    // this.addStations();
}

/**
 * AddMines for buildBoard
 */
// private addMines() {
//     this.buildBoard.mines = this.buildingLib.mines;
// }

/**
 * Add Trading Stations for buildboard
 */
// private addStations() {

// }



// /**
//  * Adds now benefits collected during game play
//  * Note: Not on buildBoard
//  * @param nowBenefit
//  */
// public addNowBenefits(nowBenefit: Benefit) {
//     this.nowBenefits.push(nowBenefit);
// }

// /**
//  * Adds income benefits collected during game play
//  * Note: Not on buildBoard
//  * @param incomeBenefit
//  */
// public addIncomeBenefits(incomeBenefit: Benefit) {
//     this.incomeBenefits.push(incomeBenefit);
// }


// /**
//  * Adds special benefits collected during game play
//  * Note: Not on buildBoard
//  */
// public addSpecialBenefits(specialBenefit: Benefit) {
//     this.specialBenefits.push(specialBenefit);
// }


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
