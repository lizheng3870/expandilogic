import {Planet} from './Planet'
import {Hex} from './Hex'

import {Benefit, Count, Trigger, Material, Value} from './Benefit'
import {MapBoard} from './MapBoard'
import { Player } from './Player';

enum Fed{
  vp12, // id 0
  vp8qic1, // id 1
  vp8pw2, // id 2
  vp7ore2, // id 3
  vp7gold6, // id 4
  vp6Sci2, // id 5
  ore1Sci1gold2 // id 6
}

class Federation {
  public fed: Fed
  public used: boolean = false;
  public benefit: Benefit
  public planets: Planet[]
  public satellites: Hex[]
  public feds: Federations

  constructor(fedName: Fed){
    //total 7 kinds of federation
    // this.planets = planets;

    if(fedName === Fed.vp12){
      this.fed = fedName;
      this.used = true;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(12, Material.VP)]);
    }
    if(fedName === Fed.vp8qic1){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(8, Material.VP), new Value(1, Material.QIC)]);
    }
    if(fedName === Fed.vp8pw2){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(8, Material.VP), new Value(2, Material.Power)]);
    }
    if(fedName === Fed.vp7ore2){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP), new Value(2, Material.Ore)]);
    }
    if(fedName === Fed.vp7gold6){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP), new Value(6, Material.Gold)]);
    }
    if(fedName === Fed.vp6Sci2){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(6, Material.VP), new Value(2, Material.Science)]);
    }
    if(fedName === Fed.ore1Sci1gold2){
      this.fed = fedName;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Gold), new Value(1, Material.Science), new Value(1, Material.Ore)]);
    }
  }

  /**
   * select planets, then form a federation.
   * TODO: mark planets as used in a federation, so that they can't be used in a 2nd federation
   * TODO: satellites?
   * @param planets1 
   * @param fedName 
   */
  public formFederation(planets1:Planet[], player: Player){
    this.addPlanets(planets1);
    if(this.getTotalPower() >= 7){
      player.getBenefit(this.benefit);
    }
    return "unable to form federation because power < 7" 
  }

  //add planets used in a federation
  public addPlanets(planets1:Planet[]){
    for(let i = 0; i < planets1.length; i++){
      this.planets.push(planets1[i]);
    }
  }
   // use the federation to go into the top spot on a tech track
  public spend (){
    if (this.used){
      throw new Error ("can't spend a federation twice");
    } else {
      this.used = true;
    }
  }

  /**
   * when buy a specific stuff in the store, the grey fed can turn green
   */
  public turnGreen(){
    this.used = false;
  }

  // return the total number of buildings in the federation
  public getTotalBuildings(): number{
    return this.planets.length;
  }

  public getTotalPower(): number{
    let sum = 0;
    this.planets.forEach(p => {
      sum += p.type;
    })
    return sum;
  }

  /**
   * for output to screen purpose. return a readable string
   */
  public getFedName(){
    if(this.fed === Fed.vp12) return "12 VP";
    if(this.fed === Fed.vp8qic1) return "8 VP, 1 qic";
    if(this.fed === Fed.vp8pw2) return "8 VP, 2 power";
    if(this.fed === Fed.vp7ore2) return "7 VP, 2 ore";
    if(this.fed === Fed.vp7gold6) return "7 VP, 6 gold";
    if(this.fed === Fed.vp6Sci2) return "6 VP, 2 science";
    if(this.fed === Fed.ore1Sci1gold2) return "1 ore, 2 gold, 1 science";
    return "invalid federation type"
  }
}

class Federations {
  public specialOne: Federation; // this one is on the techBoard as a special level 5 benefit in dig technology
  public sixNormal: Federation[]; // this is the normal selectable
  public tempArr: number[];

  constructor(){
    this.tempArr = [0, 1, 2, 3, 4, 5];
    this.tempArr.sort(function(){ return 0.5 - Math.random() });

    // assign the special one;
    let tempNum = this.tempArr[5];
    let fed = this.hashFed(tempNum);
    if(fed != null) this.specialOne = new Federation(fed);

    // assign the five
    for(let i = 0; i < 5; i++){
      fed = this.hashFed(tempNum[i]);
      if(fed != null) this.sixNormal[i] = new Federation(fed);
    }

  }

  /**
   * print out the federations
   */
  public printFed(){
    for(let i = 0; i < 5; i++){
      console.log("index: " + i + " effect: " + this.sixNormal[i].getFedName);
    }
  }

  public getFederation(planets: Planet[], index: number, player: Player){
    this.sixNormal[index].formFederation(planets, player);
  }

  // at the start of each round, 1 type of federation gets put away. other 6 types are available for use
  public getUsable(){
    return this.sixNormal;
  }
  /**
   * return the special one 
   */
  public getSpecial(){
    return this.specialOne;
  }

  /**
   * an suport function to hash the id to the fed;
   * @param id 
   */
  public hashFed(id: number){
    if(id === 0) return Fed.vp12;
    if(id === 1) return Fed.vp8qic1;
    if(id === 2) return Fed.vp8pw2;
    if(id === 3) return Fed.vp7ore2;
    if(id === 4) return Fed.vp7gold6;
    if(id === 5) return Fed.vp6Sci2;
    if(id === 6) return Fed.ore1Sci1gold2;
    return null;

  }
}

export {Federations, Federation, Fed};
