import {PlanetType, Planet} from './Planet'
import Tech from './Tech'
import {Federation, FederationToken} from './Federation';
import { Benefit, Trigger, BuildingType, Value, Material, Count } from "./Benefit";
// from player class

import TechTiles from './TechTiles'
import RoundBooster  from './RoundBooster'
import {BuildingLib} from './BuildingLib'
import {Hex} from './Hex'
import {Structure, StructureStatus} from './Structure'
import {MapBoard} from './MapBoard'
import { count } from '../../node_modules/@types/code';
import { SpecialPowerType, SpecialPower } from './SpecialPower';

/**
 * Player resources interface
 */
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

/**
 * 14 Factions for Gaia project
 */
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

/**
 * BuildBenefit - Not used 
 */
export interface BuildBenefit{
    built : boolean
    benefit: Benefit
}

/**
 * Faction buildboard
 * Stores a standard set of buildings
 * Specific differences between Factions 
 * are written in the respective Factions 
 * in Races Folder
 */
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
    public gaiaProjectPlanets:Planet[]; // Transdim planets start gaia project
    public gaiaformer: number;  // How many gaiaformers do I have
    public federations: Federation[]; // My Federations
    public numGaia: number; // How many gaia planets has player conquered
    public sectors: number = 0; // How many sectors I have built on
    public satellites: number = 0; 
    public passiveActionOn:boolean = true; 

    //Benefits not from the buildBoard - not used
    // public nowBenefits: Benefit[];
    // public incomeBenefits: Benefit[];
    // public specialBenefits: Benefit[];

    //Benefit from all the board
    public techBenefits: Benefit[];
    public techTileBenefits: Benefit[];
    public roundTileBenefits: Benefit[];
    public roundBoosterBenefits: Benefit[];
    public federationBenefits: Benefit[];

    //The special powers - Orange one time benefit
    public specialPowers: SpecialPower[] = [];

    /**
     * 
     * This buildBoard holds the benefits that are unlocked at each step
     * All buildings are stored on the BuildBoard and set to true when built
     */
    public buildBoard : BuildBoard = {
        mines : [],
        stations : [],
        institutes : [],
        labs : [],
        academies : []
    }

    // The permanent board incomes
    public income : Benefit[] = [];

    //Player Status 
    public raceType: RaceType;
    public planetType: PlanetType;
    public passed: boolean;
    public gaiaColonize: Benefit;
    public range: number; // basic range, can be increased by upgrading the tech of range and will not decrease;
    public specialDig: number; // terraform cost
    public specialRange: number; // temporary range, increased by spend QIC or special power, will go back to 0 every new turn;


    public name: string // Player name
    public techs: number[] // Stores the level of the player's tech
    public techTiles: TechTiles[] // Obtained techtiles
    public gaiaFormingCost: number = 6
    public digCost: number = 3
    public pid: number // Player id 
    public roundBooster: RoundBooster 
    public buildings: BuildingLib // Player's building library i.e. Faction board
    public sortByValue:number  //  final scoring count and sort

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

  //Initialize  from player
  this.initializeSpecialPowers();
  this.name = name;
  this.planets = [];
  this.numGaia = 0;
  this.techs = [0,0,0,0,0,0];
  this.techTiles = [];
  this.federations = [];
  this.pid =  -1;  // pid is player id for example 0 1 2 3
  this.gaiaProjectPlanets = [];

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

  /**
   * Add a new Extra power to bowl1
   * @param extra 
   */
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

    /**
     * get the benefit from tech
     * @param benefit 
     */
    public getTechBenefit(benefit: Benefit){
      this.techBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
      if(benefit.trigger === Trigger.Special){
        this.activateSpecialPower(benefit);
      }
    }

    /**
     * get the benefit from tech tile
     * @param benefit 
     */
    public getTechTileBenefit(benefit: Benefit){
      this.techTileBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
      if(benefit.trigger === Trigger.Special){
        this.activateSpecialPower(benefit);
      }
    }

    /**
     * get the benefit from the round tile
     * @param benefit 
     */
    public getRoundTileBenefit(benefit: Benefit){
      this.roundTileBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
      if(benefit.trigger === Trigger.Special){
        this.activateSpecialPower(benefit);
      }
    }

    /**
     * get the benefit from round booster
     * @param benefit 
     */
    public getRoundBoosterBenefit(benefit: Benefit){
      this.roundBoosterBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
      if(benefit.trigger === Trigger.Special){
        this.activateSpecialPower(benefit);
      }
    }

    /**
     * get the benefit from federation
     * @param benefit 
     */
    public getFedrationBenefit(benefit: Benefit){
      this.federationBenefits.push(benefit);
      if(benefit.trigger === Trigger.Now){
        this.onBenefit(benefit);
      }
      if(benefit.trigger === Trigger.Special){
        this.activateSpecialPower(benefit);
      }
    }

    /**
     * put the federation token into account and put the benefit inside of it into the benefit account
     * @param fed 
     */
    public getSpecialFedration(fed: FederationToken){
      let federation = new Federation();
      federation.token = fed
      this.federations.push(federation);
      this.getFedrationBenefit(fed.benefit);
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
     * Get the number of how many different types of planet you have occupied
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
     * the function which will activate the benefit
     * and store it in the private data member
     * @param benefit
     */
    public onBenefit(benefit: Benefit){
      const values = benefit.values;
      let i = 0;
      let value;
      let times = 1;

      // asign the times
      if(benefit.count === Count.Sectors){ times = this.getSectors()}
      if(benefit.count === Count.Mines){} // times = num of mine
      if(benefit.count === Count.TradingStations){} // times = num of station
      if(benefit.count === Count.Labs){}
      if(benefit.count === Count.BigBuildings){}
      if(benefit.count === Count.Feds){ times = this.federations.length }
      if(benefit.count === Count.PlanetTypes){ times = this.getPlanetTypes() }
      if(benefit.count === Count.Satellites){ times = this.satellites }
      if(benefit.count === Count.Gaia){ times = this.getGaiaNum() }

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
     * Activate the special power which has this benefit
     * Orange base tech tile
     * @param benefit
     */
    public activateSpecialPower(benefit: Benefit){
      var values = benefit.values;
      if(values.length === 1){
        var value = values[0];
        if(value.quantity === 1 && value.material === Material.QIC){
          this.specialPowers[0].activatePower();
        }
        if(value.quantity === 1 && value.material === Material.Dig){
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

    /**
     * turn off the special power if the tech tile is covered
     * @param spt 
     */
    public turnOffSpecialPower(spt: SpecialPowerType){
      if(spt === 'QIC1         ') this.specialPowers[0].turnOffPower();
      if(spt === 'Dig1         ') this.specialPowers[1].turnOffPower();
      if(spt === 'SpecialRange3') this.specialPowers[2].turnOffPower();
      if(spt === 'Power4       ') this.specialPowers[3].turnOffPower();
      if(spt === 'QIC1Gold5    ') this.specialPowers[4].turnOffPower();
      if(spt === 'Ore3         ') this.specialPowers[5].turnOffPower();
      if(spt === 'Science3     ') this.specialPowers[6].turnOffPower();
      
    }

    /**
     * Print out the status of special powers
     */
    public printSpecialPower(){
      for(let i = 0; i < this.specialPowers.length; i++){
        let temp = this.specialPowers[i];
        console.log("index: " + i + "; effect: " + temp.id + "; ifGet: " + temp.ifGet + "; ifUsable: " + temp.ifUsable);
      }
    }

    /**
     * Use the special power
     * @param id 
     */
    public useSpecialPower(id: number): boolean{
      if(!this.specialPowers[id].ifGet){
        console.log("special power not get");
        return false;
      }
      if(!this.specialPowers[id].ifUsable){
        console.log("special power used this round, please wait for the next round");
        return false;
      }
      this.onBenefit(this.specialPowers[id].benefit);
      this.specialPowers[id].ifUsable = false;
      return true;
    }


    /**
     * Check distance of the Hex
     * @param hex 
     */
    public nearDistance(hex: Hex){
      let min = 10000;

      for(let i = 0; i < this.planets.length; i++){
        const d = hex.distance(this.planets[i].loc);
        if(d < min) min = d;
      }
      return min;
    }

    /**
     * 
     * @param hex
     */
    public checkPlanetDistance(hex: Hex){
      var distance = this.nearDistance(hex);
      if(this.range + this.specialRange >= distance){
        return true;
      }else{
        if(this.range + this.specialRange + this.qic * 2 >= distance){
          console.log("checkPanetDistance OK  but need QIC ");
          return true;
        }
      }

      return false;
  }

 /**
  * Get the cost to terraform 
  */
  public terraformingCost(){
    return this.digCost;
  }

  /**
   * Get the next available Mine
   * Used in Action.ts
   */
  public getAvalibleMine(){
    for(let mine of this.buildings.mines){
      if(mine.status === StructureStatus.Unbuilt)
         return mine;
    }
       return null;

  }

  /**
   * Get the next available station
   * Used in Action.ts
   */
  public getAvalibleStation(){
    for(let s of this.buildings.station){
      if(s.status === StructureStatus.Unbuilt)
         return s;
    }
       return null;

  }


  /**
   * Get the next available lab
   * Used in Action.ts
   */
  public getAvalibleLab(){
    for(let l of this.buildings.lab){
      if(l.status === StructureStatus.Unbuilt)
         return l;
    }
       return null;

  }

  /**
   * Get the next available Institute
   * Used in Action.ts
   */
  public getAvalibleInstitute(){
    for(let i of this.buildings.institute){
      if(i.status === StructureStatus.Unbuilt)
         return i;
    }
       return null;

  }

  /**
   * Get the next available Academy
   * Used in Action.ts
   */
  public getAvalibleAcademies(){
    for(let a of this.buildings.academies){
      if(a.status === StructureStatus.Unbuilt)
         return a;
    }
       return null;

  }

  /**
   * Get back last built mine
   * Used in Action.ts
   */
  public getLastBuiltMine(){
    let last = null;
    for(let mine of this.buildings.mines){
      if(mine.status === StructureStatus.Built)
         last =  mine;
    }
       return last;

  }

  /**
   * Get back last built station
   * Used in Action.ts
   */
  public getLastBuiltStation(){
    let last = null;
    for(let s of this.buildings.station){
      if(s.status === StructureStatus.Unbuilt)
         last = s;
    }
       return last;

  }

  /**
   * Get back the last built Lab
   */
  public getLastBuiltLab(){
    let last = null;
    for(let l of this.buildings.lab){
      if(l.status === StructureStatus.Unbuilt)
         last = l;
    }
       return last;

  }




  /**
   * Checks if the player can afford to build a Mine
   */
  public AffordMine(){
    const mine = this.getAvalibleMine();
    if(mine == null)return false;

    return this.haveResouces(mine.cost);
    
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
  /**
   * Checks if the player has the particular resource
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

  /**
   * Subtract the resource from the player
   * @param value 
   */
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

  /**
   * Check if the player has the resources
   * @param values 
   */
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

  /**
   * Pay the resource
   */
  public payResouces(values:Value[]){
    for(const value of values){
      if(this.payResouce(value) === false)return false;
    }
    return true;
  }



  /**
   *  terraforming will cost an ore quantity according tech level
   */
  public startGaiaProjectCost():number{
    return this.gaiaFormingCost;
  }

  /**
   * Check if the player has sufficient power materials 
   * to start a Gaia project
   */
  public checkPowerForGaiaProject(){
    if(this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= this.startGaiaProjectCost()){
      return true;
    }else{
      return false;
    }

  }

  /**
   * Checks if the player has sufficient power materials to 
   * form a federation
   * @param satellite 
   */
  public checkPowerForFederation(satellite:number){
    if(this.power.bowl1 + this.power.bowl2 + this.power.bowl3 >= satellite){
      return true;
    }else{
      return false;
    }

  }

  /**
   * Transfers powers into the Gaia bowl
   */
  public transferGaiaPower(){
     let cost = this.startGaiaProjectCost();
     this.takePowersAwayFromBowl(cost);
     this.power.gaia += cost;
   }

  /**
   * Take away power materials for each Sattellite 
   * @param satellite 
   */
   public discardPowersToBuildSatellites(satellite:number){
      this.takePowersAwayFromBowl(satellite);
   }

   /**
    * Remove power materials from the power bowls
    */
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

    /**
     * Trigger the benefit when a person passes
     */
    public onPassBenefit(){
      // let benefits = this.getTrigerBenefit(Trigger.Pass);
      // for(const benefit of benefits){
      //   this.onBenefit(benefit);
      // }
      this.triggerBenefit(Trigger.Pass, null);
    }

    /**
     * Planets that the player can reach/access
     * @param board 
     */
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

    /**
     * Calculate the Income benefits for each player
     * during the income phase
     * - unfinished
     */
    public calculateIncomeBenefit(){

      // // for default income for race board
      // let benefits = this.incomes;
      // //roundBooster
      this.roundBoosterBenefits = [];
      let list = this.roundBooster.benefit;
      for(let benefit of list){
          this.getRoundBoosterBenefit(benefit);
      }

      // console.log(this.name)
      // console.log("before income");
      // console.log(this.gold +" gold vs ore "+ this.ore);

      this.triggerBenefit(Trigger.Income, null);
      // console.log(this.gold +" gold vs ore "+ this.ore);
      // console.log("after income");

      // for title do not need remove previous for it income by fraction
      // see detail code of tech

    }

    /**
     * Get as a JsonData Structure
     */
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

    /**
     * Get the number of stations built
     */
    public getStationNum():number{
      let count = 0;
      for(let s of this.buildings.station){
        if(s.status === StructureStatus.Built)
           count++;
      }
         return count;
    }

    /**
     * Get the number of labs built
     */
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

    /**
     * Replace normal tech tile with the advanced tech tile
     */
    public removeTechtile(techId: number){  // when get advanced techTile
      let index = 0;
      let found = false;
      for(let techTile of this.techTiles ){
          if(techTile.techId === techId){
            found = true;
            break;
          }
          index++;
      }
      if(found){
        this.techTiles.splice(index, 1); //remove this techtile
      }

    }

    /**
     * Check if the player has the tech tile
     * @param techId 
     */
    public hasTechTileID(techId: number){

      for(let techTile of this.techTiles ){
          if(techTile.techId === techId){
            return true;
          }
     }
      return false;

    }


    /**
     * GaiaPhase operation
     */
    public GaiaPhase(){
       this.power.bowl1 += this.power.gaia;
       for(let planet of this.gaiaProjectPlanets){
         planet.type = PlanetType.Gaia;
       }

       this.gaiaProjectPlanets = [];
    }


    /**
     * Get method for sectors
     */
    public getSectors(){
      return this.sectors;
    }

    /**
     * Get number of gaia planets conquered
     */
    public getGaiaNum(){
      let count = 0;
      for(let planet of this.planets){
        if(planet.type === PlanetType.Gaia){
          count ++;
        }
      }
      return count;
    }

    /**
     * Count the federation buildings
     */
    public getFedarationBuildings(){
      let count = 0;
      for(let federation of this.federations){
        count += federation.planets.length;
      }
      return count;
    }

    /**
     * Double check
     */
    public getBuildings(){
      return this.planets.length;
    }

}
