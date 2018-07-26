import {Merchandise, Exchange} from './Exchange';
import { Material } from "./Benefit";
import { Player } from "./Player";

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

    public trade(player: Player, give: Material, get: Material, times: number){
        var good = null;
        // find the type of trading
        for(let i = 0; i < this.exchanges.length; i++){
            if(this.exchanges[i].give === give && this.exchanges[i].get === get){
                good = this.exchanges[i];
                break;
            }
        }

        if(good === null) {// if not find the type of trading
            console.log("merchandise not found");
            return;
        }

        if(good.available === false) {// if the good is used in the same round already
            console.log("merchandise already used");
            return;
        }

        var totalGive = good.numGive * times;
        var totalGet = good.numGet * times;

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

export {Merchandise, Exchange}
