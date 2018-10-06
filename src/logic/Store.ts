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
  qic2vp,
  qic3fed,
  qic4tile,
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

    // qic item
    public qic4tile:Merchandise;
    public qic3fed:Merchandise;
    public qic2vp:Merchandise;

    constructor(){
          // qic item
        this.qic2vp = new Merchandise(Material.QIC, Material.VP, 2, 3);
        this.qic2vp.available = true;
        this.qic3fed = new Merchandise(Material.QIC,Material.Feds, 3, 1);
        this.qic3fed.available = true;
        this.qic4tile = new Merchandise(Material.QIC,Material.techtile, 4, 1);
        this.qic4tile.available = true;

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

        //qic item
        this.exchanges.push(this.qic2vp);
        this.exchanges.push(this.qic3fed);
        this.exchanges.push(this.qic4tile);
    }

    public getGood(type : StoreMerchandiseType){
            let good = null;
            // find the type of trading
            if(type === StoreMerchandiseType.Pw7sci3){
                good = this.pw7sci3
            }

            if(type === StoreMerchandiseType.Pw5dig2){
                good = this.pw5dig2
            }

            if(type === StoreMerchandiseType.Pw4ore2){
                good = this.pw4ore2
            }

            if(type === StoreMerchandiseType.Pw4gold7){
                good = this.pw4gold7
            }

            if(type === StoreMerchandiseType.Pw4sci2){
                good = this.pw4sci2
            }


            if(type === StoreMerchandiseType.Pw3dig1){
                good = this.pw3dig1
            }
             //qic item
             if(type == StoreMerchandiseType.qic2vp){
                good = this.qic2vp
            }
            if(type == StoreMerchandiseType.qic3fed){
                good = this.qic3fed
            }
            if(type == StoreMerchandiseType.qic4tile){
                good = this.qic4tile
            }

           // last case
            good = this.pw3pw2


            return good;

    }

    public checkTrade(player: Player, type : StoreMerchandiseType){
       // must call if
      let good  = this.getGood(type)
      let totalGive = good.numGive;

      return player.power.bowl3 > totalGive && good.available;

    }

    // check the qic of player
    public checkQic(Player: Player, type: StoreMerchandiseType){
        let good = this.getGood(type)
        return Player.qic > good.numGive && good.available;
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

         // qic item
         if(type == StoreMerchandiseType.qic2vp){
             console.log("in the Store")
            good = this.qic2vp
            get = Material.VP
        }
        if(type == StoreMerchandiseType.qic3fed){
            good = this.qic3fed
            get = Material.Feds 
        }
        if(type == StoreMerchandiseType.qic4tile){
            good = this.qic4tile
            get = Material.techtile
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
        if(type == StoreMerchandiseType.qic2vp || type == StoreMerchandiseType.qic3fed || type == StoreMerchandiseType.qic4tile){
           console.log("check qic number")
            if(player.qic < totalGive){
                console.log("not enough qic");
                return;
            }

        // qic action
        player.spendQic(totalGive);
        good.available = false;

        console.log("add vp step")
        if(get == Material.Feds) player.federations += totalGet;
        if(get == Material.VP) player.vp += totalGet + player.numGaia;
        if(get == Material.techtile) player.techTiles += totalGet;
        }
    
        if(type == StoreMerchandiseType.Pw3dig1 || type == StoreMerchandiseType.Pw3pw2 || type == StoreMerchandiseType.Pw4gold7
            || type == StoreMerchandiseType.Pw4ore2 || type == StoreMerchandiseType.Pw4sci2 || type == StoreMerchandiseType.Pw5dig2
            || type == StoreMerchandiseType.Pw7sci3){
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
}

export {Merchandise, Store, StoreMerchandiseType}
