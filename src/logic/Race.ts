import {PlanetType, Planet} from './Planet'
import Tech from './Tech'
import {Federation} from './Federation';
import { Benefit, Trigger, BuildingType, Value, Material, Count } from "./Benefit";
// from player class

import TechTiles from './TechTiles'
import RoundBooster  from './RoundBooster'
import {BuildingLib} from './BuildingLib'
import {Hex} from './Hex'
import {Structure, StructureStatus} from './Structure'
import {MapBoard} from './MapBoard'
import { count } from '../../node_modules/@types/code';


interface RaceJSON {
  name:       string;
  type:       number;
  gold:       number;
  ore:      number;
  vp:       number;
  science:   number;
  qic:      number;
  bowl1:    number;
  bowl2:    number;
  bowl3:    number;
}


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

export interface BuildBenefit{
    built : boolean
    benefit: Benefit
}

interface BuildBoard {
    mines : Structure[],
    stations : Structure[],
    labs : Structure[],
    academies : Structure[]
    institutes : Structure[],
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
    public sectors: number = 0;
    public satellites: number = 0;

    //Benefits not from the buildBoard
    // public nowBenefits: Benefit[];
    // public incomeBenefits: Benefit[];
    // public specialBenefits: Benefit[];

    //Benefit from all the board
    public techBenefits: Benefit[];
    public techTileBenefits: Benefit[];
    public roundTileBenefits: Benefit[];
    public roundBoosterBenefits: Benefit[];
    public federationBenefits: Benefit[];



    // This buildBoard holds the benefits that are unlocked at each step
    public buildBoard : BuildBoard = {
        mines : [],
        stations : [],
        institutes : [],
        labs : [],
        academies : []
    }

    // The permanent board incomes
    public income : Benefit[] = [];

    //Player Status - should these be set to private????
    public raceType: RaceType;
    public planetType: PlanetType;
    public passed: boolean;
    public gaiaColonize: Benefit;
    public range: number; // basic range, can be increased by upgrading the tech of range and will not decrease;
    public specialDig: number;
    public specialRange: number; // temporary range, increased by spend QIC or special power, will go back to 0 every new turn;


    // variable from previous player currentPlayerPass  public name: string
    public name: string
    public techs: number[]
    public techTiles: TechTiles[]  // not used in current design
    public gaiaFormingCost: number = 6
    public digCost: number = 3
    public pid: number
    public roundBooster: RoundBooster
    public buildings: BuildingLib

  constructor(name:string){

    //Player Resources
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;
    this.power.bowl1 = 2;
    this.power.bowl2 = 4;
    this.power.bowl3 = 0;
    this.power.gaia = 0;

    //Player Milestones
    this.gaiaformer = 0;
    this.numGaia = 0;
    this.range = 1;
    this.specialDig = 0;
    this.specialRange = 0;
    // - todo - initialize number of planets
    // - todo - initialize number of federations



  //initialize  from player
  this.initializeSpecialPowers();
  this.name = name;
  this.planets = [];
  this.numGaia = 0;
  this.techs = [0,0,0,0,0,0];
  this.techTiles = [];
  this.federations = [];
  this.pid =  -1;  // pid is player id for example 0 1 2 3
  // this.nowBenefits = [];
  // this.incomeBenefits = [];
  this.techBenefits = [];
  this.techTileBenefits = [];
  this.roundTileBenefits = [];
  this.roundBoosterBenefits = [];
  this.federationBenefits = [];

//  this.planetType = this.getPlantType(raceType);
  this.buildings = new BuildingLib();



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
  this.buildBoard.mines = this.buildings.mines;
  this.buildBoard.stations = this.buildings.station;
  this.buildBoard.labs = this.buildings.lab;
  this.buildBoard.academies = this.buildings.academies;
  this.buildBoard.institutes = this.buildings.institute;
}


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

  // Previous player function

    // map race type to plant types
    // public getPlantType(raceType: RaceType):PlanetType{
    //   if(raceType === RaceType.Terrans || raceType === RaceType.Lantids)
    //     return PlanetType.Blue;

    //   if(raceType === RaceType.Xenos || raceType === RaceType.Gleens)
    //       return PlanetType.Yellow;

    //   if(raceType === RaceType.Taklons || raceType === RaceType.Ambas)
    //       return PlanetType.Brown;

    //   if(raceType === RaceType.HadschHallas || raceType === RaceType.Ivits)
    //       return PlanetType.Red;


    //   if(raceType === RaceType.Nevlas || raceType === RaceType.Itars)
    //       return PlanetType.White;

    //   if(raceType === RaceType.Geodens || raceType === RaceType.Baltaks)
    //       return PlanetType.Orange;

    //   if(raceType === RaceType.Firaks || raceType === RaceType.Bescods)
    //         return PlanetType.Black;


    //   if(raceType === RaceType.Nevlas || raceType === RaceType.Itars)
    //       return PlanetType.White;

    //   return PlanetType.Blue;
    // }

    /**
     * initiallize the lib of special powers
     */
    public initializeSpecialPowers(){

    }

    // /*
    // * Add the benefit into the benefit array by the trigger,
    // * notice: this is only add them into the array, the benefit has not been used yet
    // * input: benefit
    // * output: add the benefit into the array
    // * @yalei
    // */
    // public getBenefit(benefit: Benefit){
    //   if(benefit.trigger === Trigger.Income){
    //     this.incomeBenefits.push(benefit);
    //   }
    //   if(benefit.trigger === Trigger.Now){
    //     this.nowBenefits.push(benefit);
    //     // since it is now, so we call the onBenefit at once;
    //     this.onBenefit(benefit);
    //   }
    //   if(benefit.trigger === Trigger.Special){
    //     this.activateSpecialPower(benefit);
    //   }
    // }

    public getTechBenefit(benefit: Benefit){
      this.techBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
    }

    public getTechTileBenefit(benefit: Benefit){
      this.techTileBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
    }

    public getRoundTileBenefit(benefit: Benefit){
      this.roundTileBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
    }

    public getRoundBoosterBenefit(benefit: Benefit){
      this.roundBoosterBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
    }

    public getFedrationBenefit(benefit: Benefit){
      this.federationBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
    }


    /**
     * search all the benefit array to find the benefit having the trigger
     * then call it onBenefit
     * if the trigger is build, we need to check if the building type is right
     * @param trigger the trigger you want to call
     * @param buildingType if the trigger is build, this is neccessary. If not, this should be null
     */
    public triggerBenefit(trigger: Trigger, buildingType: BuildingType | null){
      this.income.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
      this.techBenefits.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
      this.techTileBenefits.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
      this.roundTileBenefits.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
      this.roundBoosterBenefits.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
      this.federationBenefits.forEach(b => {
        if(b.trigger === trigger){
          if(trigger !== Trigger.Build){
            this.onBenefit(b);
          }else{
            if(b.object === buildingType){
              this.onBenefit(b);
            }
          }
        }
      })
    }

    /**
     * get the number of how many different types of planet you have occupied
     */
    public getPlanetTypes(): number{
      let temp: PlanetType[] = [];
      for(let i = 0; i < this.planets.length; i++){
        var type = this.planets[i].type;
        if(temp.indexOf(type) === -1) temp.push(type);
      }
      return temp.length;
    }
    /**
     * the function which will add the amount of resource into players class
     * @param benefit
     */
    public onBenefit(benefit: Benefit){
      const values = benefit.values;
      let i = 0;
      let value;
      let times = 1;

      // asign the times
      if(benefit.count === Count.Sectors){ times = this.sectors}
      if(benefit.count === Count.Mines){} // times = num of mine
      if(benefit.count === Count.TradingStations){} // times = num of station
      if(benefit.count === Count.Labs){}
      if(benefit.count === Count.BigBuildings){}
      if(benefit.count === Count.Feds){ times = this.federations.length }
      if(benefit.count === Count.PlanetTypes){ times = this.getPlanetTypes() }
      if(benefit.count === Count.Satellites){ times = this.satellites }
      if(benefit.count === Count.Gaia){ times = this.numGaia }

      for(; i < values.length; i++){
        value = values[i];
        if(value.material === Material.Gold){
          this.gold += value.quantity * times;
        }
        if(value.material === Material.Ore){
          this.ore += value.quantity * times;
        }
        if(value.material === Material.Science){
          this.science += value.quantity * times;
        }
        if(value.material === Material.QIC){ this.qic += value.quantity * times; }
        if(value.material === Material.ExtraPower){ this.power.bowl1 += value.quantity * times; }
        if(value.material === Material.Power){
          this.chargePower(value.quantity * times);
        }
        if(value.material === Material.Dig){ this.specialDig += value.quantity * times }
        if(value.material === Material.VP){ this.vp += value.quantity * times; }
        if(value.material === Material.SpecialRange){ this.specialRange += value.quantity * times; }
        if(value.material === Material.GaiaFormer){this.gaiaformer += value.quantity * times;}
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

  // terraforming will cost ore according tech level Dig Lane
  public terraformingCost(){
    //
    return this.digCost;
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

    public accessiblePlanets(board: MapBoard){
      let plants : Planet[] = []
    //  console.log(board.spaces);
      for(let planet of this.planets){

        let range = this.range + this.specialRange;

        let neighborings = Hex.rangeHexs(planet.loc, range)
        for(let hex of neighborings){

          if(board.hasPlanet(hex)){

            let planet = board.getPlanet(hex);

            if(planet.playerID === -1 ){
              plants.push(planet);
              //console.log(planet);
            }
          }
        }

      }

    }

    public calculateIncomeBenefit(){
      // // for default income for race board
      // let benefits = this.incomes;
      // //roundBooster
      // let list = this.roundBooster.benefit;
      // for(let benefit of list){
      //   if(benefit.trigger === Trigger.Income){
      //     benefits.push(benefit);
      //   }
      // }

      // console.log(this.name)
      // console.log("before income");
      // console.log(this.gold +" gold vs ore "+ this.ore);
      this.triggerBenefit(Trigger.Income, null);
      // console.log(this.gold +" gold vs ore "+ this.ore);
      // console.log("after income");

      // for title do not need remove previous for it income by fraction
      // see detail code of tech

    }

    public getJsonData():RaceJSON{
      return {
        name:       this.name,
        type:       this.raceType,
        gold:       this.gold,
        ore:      this.ore,
        vp:       this.vp,
        science:   this.science,
        qic:      this.qic,
        bowl1:    this.power.bowl1,
        bowl2:    this.power.bowl2,
        bowl3:    this.power.bowl3,
      };

    }

    /**
     * get the number of mines player build
     * @author yousong
     */
    public getMineNum(): number{
      let count = 0;
      for(let mine of this.buildings.mines){
        if(mine.status === StructureStatus.Built)
           count++;
      }
         return count;
    }

    public getStationNum():number{
      let count = 0;
      for(let s of this.buildings.station){
        if(s.status === StructureStatus.Built)
           count++;
      }
         return count;
    }

    public getLabNum():number{
      let count = 0;
      for(let s of this.buildings.lab){
        if(s.status === StructureStatus.Built)
           count++;
      }
         return count;
      return 0;
    }

    /**
     * return the number of Institutions and Academies
     * notice: two kinds of structure
     */
    public getBigBuildingNum():number{
      let count = 0;
      for(let s of this.buildings.institute){
        if(s.status === StructureStatus.Built)
           count++;
      }

      for(let s of this.buildings.academies){
        if(s.status === StructureStatus.Built)
           count++;
      }

      return count;
    }

}
