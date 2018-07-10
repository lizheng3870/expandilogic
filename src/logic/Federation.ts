import {Benefit, Count, Trigger, Material, Structure} from './Benefit'
import {MapBoard} from './MapBoard'
import { Value } from 'dist/logic/Benefit';

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
    this.spendable = true;
    //total 7 kinds of federation
    if(fedName === Fed.vp12){
      this.fed = fedName;
      this.spendable = false;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(12, Material.VP)]);
    }
    if(fedName === Fed.vp8qic1){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(8, Material.VP), new Value(1, Material.QIC)]);
    }
    if(fedName === Fed.vp8pw2){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(8, Material.VP), new Value(2, Material.Power)]);
    }
    if(fedName === Fed.vp7ore2){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(7, Material.VP), new Value(2, Material.Ore)]);
    }
    if(fedName === Fed.vp7gold6){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(7, Material.VP), new Value(6, Material.Gold)]);
    }
    if(fedName === Fed.vp6Sci2){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(6, Material.VP), new Value(2, Material.Science)]);
    }
    if(fedName === Fed.ore1Sci1gold2){
      this.fed = fedName;
      this.effect = new Benefit(Trigger.Now, Count.None, Structure.None, [new Value(2, Material.Gold), new Value(1, Material.Science), new Value(1, Material.Ore)]);
    }
  }

  /**
   * when federate, the turn the token's side from green to grey
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
  }
}

class Federations {
  public specialOne: Federation; // this one is on the techBoard as a special level 5 benefit in dig technology
  public sixNormal: Federation[]; // this is the normal selectable

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
      if(fed != null) this.sixNormal[i] = new Federation(fed);
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
