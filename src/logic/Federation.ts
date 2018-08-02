import {Planet} from './Planet'
import {Hex} from './Hex'

import {Benefit, Count, Trigger, Material, Value} from './Benefit'
import {MapBoard} from './MapBoard'
import { Player } from './Player';

enum FederationTokenType{
  vp12, // id 0
  vp8qic1, // id 1
  vp8pw2, // id 2
  vp7ore2, // id 3
  vp7gold6, // id 4
  vp6Sci2, // id 5
  ore1Sci1gold2 // id 6
}

class FederationToken{
  public type: FederationTokenType
  public used: boolean = false
  public benefit: Benefit

  constructor(type: FederationTokenType){
    this.type = type;

    if(type === FederationTokenType.vp12){
      this.used = true;
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(12, Material.VP)]);
    }
    if(type === FederationTokenType.vp8qic1){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(8, Material.VP), new Value(1, Material.QIC)]);
    }
    if(type === FederationTokenType.vp8pw2){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(8, Material.VP), new Value(2, Material.Power)]);
    }
    if(type === FederationTokenType.vp7ore2){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP), new Value(2, Material.Ore)]);
    }
    if(type === FederationTokenType.vp7gold6){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(7, Material.VP), new Value(6, Material.Gold)]);
    }
    if(type === FederationTokenType.vp6Sci2){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(6, Material.VP), new Value(2, Material.Science)]);
    }
    if(type === FederationTokenType.ore1Sci1gold2){
      this.benefit = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Gold), new Value(1, Material.Science), new Value(1, Material.Ore)]);
    }
  }

  /**
   * for output to screen purpose. return a readable string
   */
  public getFedName(){
    if(this.type === FederationTokenType.vp12) return "12 VP";
    if(this.type === FederationTokenType.vp8qic1) return "8 VP, 1 qic";
    if(this.type === FederationTokenType.vp8pw2) return "8 VP, 2 power";
    if(this.type === FederationTokenType.vp7ore2) return "7 VP, 2 ore";
    if(this.type === FederationTokenType.vp7gold6) return "7 VP, 6 gold";
    if(this.type === FederationTokenType.vp6Sci2) return "6 VP, 2 science";
    if(this.type === FederationTokenType.ore1Sci1gold2) return "1 ore, 2 gold, 1 science";
    return "invalid federation type"
  }

}

class Federation {  //for player
  public used: boolean = false;
  public planets: Planet[]
  public satellites: Hex[]
  public token:FederationToken
  public path: Hex[]



  // /**
  //  * select planets, then form a federation.
  //  * TODO: mark planets as used in a federation, so that they can't be used in a 2nd federation
  //  * TODO: satellites?
  //  * @param planets1
  //  * @param fedName
  //  */
  // public formFederation(planets1:Planet[], player: Player){
  //   this.addPlanets(planets1);
  //   if(this.getTotalPower() >= 7){
  //     player.getFedrationBenefit(this.benefit);
  //   }
  //   return "unable to form federation because power < 7"
  // }

  // //add planets used in a federation
  // public addPlanets(planets1:Planet[]){
  //   for(let i = 0; i < planets1.length; i++){
  //     this.planets.push(planets1[i]);
  //   }
  // }
   // use the federation to go into the top spot on a tech track
  // public spend (){
  //   if (this.used){
  //     throw new Error ("can't spend a federation twice");
  //   } else {
  //     this.used = true;
  //   }
  // }

  // /**
  //  * when buy a specific stuff in the store, the grey fed can turn green
  //  */
  // public turnGreen(){
  //   this.used = false;
  // }
  //
  // // return the total number of buildings in the federation
  // public getTotalBuildings(): number{
  //   return this.planets.length;
  // }

  // public getTotalPower(): number{
  //   let sum = 0;
  //   this.planets.forEach(p => {
  //     sum += p.buildingPower();
  //   })
  //   return sum;
  // }


}

class FederationLib {  // for game
  public specialOne: FederationToken[] // this one is on the techBoard as a special level 5 benefit in dig technology
  public tokens: FederationToken[] // this is the normal selectable
  public gleensFed: FederationToken;
  public tempArr: number[];

  constructor(random:boolean = true){
    this.specialOne = [];
    this.tokens = [];
    this.load(random);
  }

  public load(random:boolean){

     let specialID = 0;

     if(random)
        specialID =  Math.floor(Math.random() * 6);

     for(let j = 0;  j< 6 ; j++){
       for(let i = 0; i < 3; i++){
         if(j === specialID){
           this.specialOne.push(new FederationToken(j))
         }else{
           this.tokens.push(new FederationToken(j))
         }
         }
       }
  }

  public hasFederationToken(type:FederationTokenType){
    for(let token of this.tokens){
      if(token.type === type)return true;
    }
    return false;
  }

  public hasDigLaneSpeicalFederationToken(){
    return this.specialOne.length > 0

  }

  public getFederationToken(type:FederationTokenType){
    let found = false;
    let index = 0;
    for(let token of this.tokens){
      if(token.type === type){
        found = true;
      }
      index++;
    }
    let tmp = null;
    if(found){
      tmp = this.tokens[index];
      this.tokens.splice(index, 1);
    }

    return tmp

  }

  public getDigLaneSpeicalFederationToken(){
    let tmp = this.specialOne[0];
    this.specialOne.splice(0, 1);
    return tmp;

  }

  // /**
  //  * print out the federations
  //  */
  // public printFed(){
  //   for(let i = 0; i < 5; i++){
  //     console.log("index: " + i + " effect: " + this.sixNormal[i].getFedName());
  //   }
  // }

  // public getFederation(planets: Planet[], index: number, player: Player){
  //   this.sixNormal[index].formFederation(planets, player);
  // }

  // // at the start of each round, 1 type of federation gets put away. other 6 types are available for use
  // public getUsable(){
  //   return this.sixNormal;
  // }
  // /**
  //  * return the special one
  //  */
  // public getSpecial(){
  //   return this.specialOne;
  // }

  // /**
  //  * an suport function to hash the id to the fed;
  //  * @param id
  //  */
  // public hashFed(id: number){
  //   if(id === 0) return Fed.vp12;
  //   if(id === 1) return Fed.vp8qic1;
  //   if(id === 2) return Fed.vp8pw2;
  //   if(id === 3) return Fed.vp7ore2;
  //   if(id === 4) return Fed.vp7gold6;
  //   if(id === 5) return Fed.vp6Sci2;
  //   if(id === 6) return Fed.ore1Sci1gold2;
  //   return null;
  //
  // }
}

export {FederationToken, FederationLib, Federation, FederationTokenType};
