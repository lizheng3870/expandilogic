import {Benefit, Count, Trigger, Material, Structure} from './Benefit'
import {MapBoard} from './MapBoard'
import { Value } from 'dist/logic/Benefit';

// todo rename a better name like VP VP
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
  public spendable: boolean
  public effect: Benefit

  constructor(fedName: Fed){
    //totally six kind of federation
    if(fedName === Fed.vp12){
      this.fed = fedName;
      this.spendable = false;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(12, Material.VP)]);
    }
    if(fedName === Fed.vp8qic1){
      //nina: do it
    }
    // if .......
    // if........
    // if .......
    // 
  
  }

  /**
   * when federate, the token would turn grey
   */
  public turnGrey(){
    if(this.spendable === false) return false;
    this.spendable = false;
    return true;
  }

  /**
   * when buy a specific stuff in the store, the grey fed can turn green
   */
  public turnGreen(){
    this.spendable = true;
  }

  public getTheName(){
    if(this.fed === Fed.vp12) return "VP 12";
    //the rest, do it nana;
  }
}

class Federations {
  public specialOne: Federation; // this one is on the techBoard as a special level 5 benefit in dig technology
  public fiveNormal: Federation[]; // this is the normal selectable

  constructor(){
    let tempArr = [0, 1, 2, 3, 4, 5];
    tempArr.sort(function(){ return 0.5 - Math.random() });

    // assign the special one;
    let tempNum = tempArr[5];
    let fed = this.hashFed(tempNum);
    if(fed != null) this.specialOne = new Federation(fed);

    // assign the five
    for(let i = 0; i < 5; i++){
      fed = this.hashFed(tempNum[i]);
      if(fed != null) this.fiveNormal[i] = new Federation(fed);
    }

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
