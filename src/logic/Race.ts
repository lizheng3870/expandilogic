import {PlanetType} from './Planet'
import Tech from './Tech'

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
    public power3: number;
    public pid: RaceType | null;

    public mine: number;
    public station: number;
    public institute: number;
    public lab: number;
    public academies: number;
    public gaiaformer: number;

    public planetType: PlanetType;
    public tech: Tech;

    public dig: number;
    public nav: number;
    public gaia: number;
    public resources: number;
    public knowledge: number;
    public range: number;
    public specialRange: number;
    public race: RaceType | null;

  constructor(pid?: RaceType|null){
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;
    this.power1 = 0;
    this.power2 = 0;
    this.power3 = 0;

    this.pid = pid || null
    this.mine = 0;
    this.station = 0;
    this.institute = 0;
    this.lab = 0;
    this.academies = 0;
    this.gaiaformer = 0;

    this.range = 1; // how far you can jump
    this.specialRange = 0;// the bonus range from using QIC or Special Power;
}

/**
 * Initializes Racetype depending on selected Race.
 * Need to add tech level 
 * @param race 
 */
public initialize(){

}

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
  * spend the power to get something
  * this function only consume power
  * @yalei;
  */
  public spendPower(charge: number){
    this.power3 -= charge;
    this.power1 += charge;
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
