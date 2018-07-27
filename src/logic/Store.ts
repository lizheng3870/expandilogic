import {Merchandise, Exchange} from './Exchange';
import { Material } from "./Benefit";
import { Player } from "./Player";

enum StoreMerchandiseType{
  Pw7sci3, // id 0
  Pw5dig2, // id 1
  Pw4ore2,
  Pw4gold7,
  Pw4sci2,
  Pw3dig1,
  Pw3pw2,
  // missing 3 QIC item
}

/**
 * Store.ts
 * this class is the store on the tech board. It gives a discount on regular exchange
 */
class Store{
    public pw7sci3: Merchandise; // id 0
    public pw5dig2: Merchandise; // id 1
    public pw4ore2: Merchandise;
    public pw4gold7: Merchandise;
    public pw4sci2: Merchandise;
    public pw3dig1: Merchandise;
    public pw3pw2: Merchandise;
    public exchanges: Merchandise[];

    constructor(){
        this.pw7sci3 = new Merchandise(Material.Power, Material.Science, 7, 3);
        this.pw7sci3.available = true;
        this.pw5dig2 = new Merchandise(Material.Power, Material.Dig, 5, 2);
        this.pw5dig2.available = true;
        this.pw4ore2 = new Merchandise(Material.Power, Material.Ore, 4, 2);
        this.pw4ore2.available = true;
        this.pw4gold7 = new Merchandise(Material.Power, Material.Gold, 4, 7);
        this.pw4gold7.available = true;
        this.pw4sci2 = new Merchandise(Material.Power, Material.Science, 4, 2);
        this.pw4sci2.available = true;
        this.pw3dig1 = new Merchandise(Material.Power, Material.Dig, 3, 1);
        this.pw3dig1.available = true;
        this.pw3pw2 = new Merchandise(Material.Power, Material.ExtraPower, 3, 2);
        this.pw3pw2.available = true;
        //push them all into an array
        this.exchanges = [];
        this.exchanges.push(this.pw7sci3);
        this.exchanges.push(this.pw5dig2);
        this.exchanges.push(this.pw4ore2);
        this.exchanges.push(this.pw4gold7);
        this.exchanges.push(this.pw4sci2);
        this.exchanges.push(this.pw3dig1);
        this.exchanges.push(this.pw3pw2);
    }

    public checkTrade(player: Player, type : StoreMerchandiseType){
      let totalGive = 10000;  // must call if
      if(type === StoreMerchandiseType.Pw7sci3){
        totalGive = 7;
      }

      if(type === StoreMerchandiseType.Pw5dig2){
        totalGive = 5;
      }

      if(type === StoreMerchandiseType.Pw4ore2){
        totalGive = 2;
      }

      if(type === StoreMerchandiseType.Pw4gold7){
        totalGive = 4;
      }

      if(type === StoreMerchandiseType.Pw4sci2){
        totalGive = 4;
      }

      if(type === StoreMerchandiseType.Pw3dig1){
        totalGive = 3;
      }

      if(type === StoreMerchandiseType.Pw3pw2){
        totalGive = 3;
      }

      return player.power.bowl3 > totalGive;

    }


    public  trade(player: Player, type : StoreMerchandiseType){
        var good = null;
        var get = null;

        // find the type of trading
        if(type === StoreMerchandiseType.Pw7sci3){
            good = this.pw7sci3
            get = Material.Science
        }

        if(type === StoreMerchandiseType.Pw5dig2){
            good = this.pw5dig2
            get = Material.Dig
        }

        if(type === StoreMerchandiseType.Pw4ore2){
            good = this.pw4ore2
            get = Material.Ore
        }

        if(type === StoreMerchandiseType.Pw4gold7){
            good = this.pw4gold7
            get = Material.Gold
        }

        if(type === StoreMerchandiseType.Pw4sci2){
            good = this.pw4sci2
            get = Material.Science
        }


        if(type === StoreMerchandiseType.Pw3dig1){
            good = this.pw3dig1
            get = Material.Dig
        }

        if(type === StoreMerchandiseType.Pw3pw2){
            good = this.pw3pw2
            get = Material.ExtraPower
        }

        if(good === null) {// if not find the type of trading
            console.log("merchandise not found");
            return;
        }

        if(good.available === false) {// if the good is used in the same round already
            console.log("merchandise already used");
            return;
        }

        var totalGive = good.numGive ;
        var totalGet = good.numGet ;

        //check if you have enough resources
        if(player.power.bowl3 < totalGive){
            console.log("not enough resources");
            return;
        }

        player.spendPower(totalGive);
        good.available = false;

        if(get === Material.QIC) player.qic += totalGet;
        if(get === Material.Ore) player.ore += totalGet;
        if(get === Material.Gold) player.gold += totalGet;
        if(get === Material.Science) player.science += totalGet;
        if(get === Material.Dig) player.specialDig += totalGet;
        if(get === Material.ExtraPower) player.power.bowl1 += totalGet;
    }
}

export {Merchandise, Store, StoreMerchandiseType}
