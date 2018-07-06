import {Planet, PlanetType} from './Planet'
import Cost from './Cost'
import Tech from './Tech'
import {Structure} from './Structure';
import {BuildingLib} from './BuildingLib';
import {Benefit, Value, Material, Count, Struct, Trigger} from "./Benefit";

/**
 * Enum Racetype
 */
enum RaceType {
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
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 */
class Race {
    public vp: number;
    public gold: number;
    public ore: number;
    public science: number;
    public qic: number;
    public power1: number;
    public power2: number;
    public power3:number;
    public pid: number;

    public mine: number;
    public station: number;
    public institute: number;
    public lab: number;
    public academies: number;
    public gaiaformer: number;

    public cost: Cost;
    public planetType: PlanetType;
    public tech: Tech;
    public buildingLib: BuildingLib;

    public dig: number;
    public nav: number;
    public gaia: number;
    public resources: number;
    public knowledge: number;
    public range: number;
    public race: RaceType;

  constructor(pid: number){
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;
    this.power1 = 0;
    this.power2 = 0;
    this.power3 = 0;

    this.pid = pid;
    this.mine = 0;
    this.station = 0;
    this.institute = 0;
    this.lab = 0;
    this.academies = 0;
    this.gaiaformer = 0;

    // this.cost = new Cost();
    this.range = 1; // how far you can jump
}

public initialize(race: RaceType){
  this.buildingLib = new BuildingLib(race);

  if(race === RaceType.Terrans) {
    this.planetType = PlanetType.Blue;

  }

  if(race === RaceType.Lantids) {
    this.planetType = PlanetType.Blue;
    this.gold = 13;
  }

  if(race === RaceType.Xenos) {
    this.planetType = PlanetType.Yellow;

  }

  if(race === RaceType.Gleens) {
    this.planetType = PlanetType.Yellow;
    this.qic = 0;
  }

  if(race === RaceType.Taklons) {
    this.planetType = PlanetType.Brown;

  }

  if(race === RaceType.Ambas) {
    this.planetType = PlanetType.Brown;
  }

  if(race === RaceType.Itars) {
    this.planetType = PlanetType.White;
    this.ore = 5;
  }

  if(race === RaceType.Nevlas) {
    this.planetType = PlanetType.White;
    this.science = 2;
  }

  if(race === RaceType.HadschHallas) {
    this.planetType = PlanetType.White;

  }

  if(race === RaceType.Ivits) {
    this.planetType = PlanetType.White;

  }

  if(race === RaceType.Geodens) {
    this.planetType = PlanetType.Orange;
   }

  if(race === RaceType.Baltaks) {
    this.planetType = PlanetType.Orange;

  }

  if(race === RaceType.Bescods) {
    this.planetType = PlanetType.Black;
    this.science = 1;
  }

  if(race === RaceType.Firaks) {
    this.planetType = PlanetType.Black;
    this.ore = 3;
    this.science = 2;
  }
}

/*
* Make the benefit come true;
* input: the benefit
* output: change the number of gold or ore of the race
* @yalei
*/
public onBenefit(benefit: Benefit){
  const values = benefit.benefits;
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
    if(value.material === Material.Power){ this.power1 += value.quantity; }
    if(value.material === Material.Charge){
      this.chargePower(value.quantity); 
    }
    if(value.material === Material.Dig){ /*lets discuss this part later --- by yalei*/ }
    if(value.material === Material.VP){ this.vp += value.quantity; }
    if(value.material === Material.SpecialDig){ /*what is the special dig? ---by yalei*/ }
    if(value.material === Material.SpecialRange){ this.range += value.quantity; }
  }
}

//  public planetType(): PlanetType {

//   return
//  }

 public chargePower(charge: number){
    if(charge <= this.power1){
      this.power1 -= charge;
      this.power2 += charge;
    } else {
      this.power2 += this.power1;
      charge -= this.power1;
      this.power1 = 0;

      if(charge <= this.power2){
        this.power2 -= charge;
        this.power3 += charge;
      } else {
        this.power3 += this.power2;
        this.power2 = 0;
      }
    }
  }

/*
* Gaia Cost here exists in cost class which needs discussion for structure
*/
// public checkPowerForGaiaProject(){
//     if(this.power1 + this.power2 + this.power3 >= this.cost.getGaiaCost()){
//       return true;
//     } else {
//       return false;
//     }
// }

}

export {Race, RaceType};

/*
Race (Base Class)
    Points : <victory points>
    QIC : 1
    gold : 15
    ore: 4
    science : 3
    tech : {
        dig : 0
        nav : 1
        qic : 0
        gaia : 0
        resources : 0
        science : 0
    }
    range : 1 // how far you can jump
    digCost : 3 // how much to dig
    gaiaCost : 6 // how many power to put into gaia
    boardincome : { // how much income from the board
        ore : 3
        gold : 2
        science : 1
        power : 4
        morePower : 1
    }
    techTiles : [
        <list of TechTiles you have>
    ]
    bonusTile : <which BonusTile you have>
    federations : [
        <list of Federations you have>
    ]
    Ability: [
        <list of abilities>
    ]
    Power : {
        bowl1 : 2
        bowl2: 4
        bowl3 : 0
    }

/*
Federation:
    benefit
    status : ["green", "silver"]
Purchase :
    benefit
    cost
    status : ["available","purchased"]
Store : [
    <list of purchases>
]
TechTrack : {// keeps list of what TechTile is in what place
    // and maybe the benefit associated with each space
}

*/
