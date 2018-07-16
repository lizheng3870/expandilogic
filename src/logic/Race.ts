import {PlanetType} from './Planet'
import Tech from './Tech'

/**
 * Race base class. Every race shares similar base
 * initialization aspects which are included here
 */
export class Race {
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

  constructor(){
    this.vp = 10;
    this.gold = 15;
    this.ore = 4;
    this.science = 3;
    this.qic = 1;

    this.mine = 0;
    this.station = 0;
    this.institute = 0;
    this.lab = 0;
    this.academies = 0;
    this.gaiaformer = 0;

    this.range = 1; // how far you can jump
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

}
