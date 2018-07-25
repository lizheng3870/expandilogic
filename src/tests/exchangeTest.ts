import * as Lab from 'lab'

import { expect } from 'code'
import { Player, RaceType } from '../logic/Player';
import { Benefit, Trigger, Value, Material } from '../logic/Benefit';
import {Merchandise, Exchange} from '../logic/Exchange';
import { Race } from '../logic/Race';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }

function testExchange(exchangeType: Merchandise, player:Player, times: number, exchange: Exchange){


    var give = exchangeType.give
    var get = exchangeType.get

    var oldOre = player.ore
    var oldPower3 = player.power.bowl3
    var oldQIC = player.qic
    var oldScience = player.science
    var oldGold = player.gold
    var oldSRange = player.specialRange
    var oldPower1 = player.power.bowl1

    exchange.trade(player, give, get, times)

    if(exchangeType === exchange.powerToGold){ 
        //old value of item used to exchange = quantity given + new value a player has now
        expect(oldPower3).to.equal(exchangeType.numGive*times + player.power.bowl3)
        expect(exchangeType.numGet*times + oldPower1).to.equal(player.power.bowl1)

        //old value of purchased item + quantity purchased = new value a player has now
        expect(exchangeType.numGet*times + oldGold).to.equal(player.gold)
    }
    else if (exchangeType === exchange.powerToOre){
        expect(oldPower3).to.equal(exchangeType.numGive*times + player.power.bowl3)
        expect(exchangeType.numGet*times + oldPower1).to.equal(player.power.bowl1)
        expect(exchangeType.numGet*times + oldOre).to.equal(player.ore)
    }
    else if (exchangeType === exchange.powerToQIC){
        expect(oldPower3).to.equal(exchangeType.numGive*times + player.power.bowl3)
        expect(exchangeType.numGet*times + oldPower1).to.equal(player.power.bowl1)
        expect(exchangeType.numGet*times + oldQIC).to.equal(player.qic)
    }
    else if (exchangeType === exchange.powerToScience){
        expect(oldPower3).to.equal(exchangeType.numGive*times + player.power.bowl3)
        expect(exchangeType.numGet*times + oldPower1).to.equal(player.power.bowl1)
        expect(exchangeType.numGet*times + oldScience).to.equal(player.science)
    }
    else if (exchangeType === exchange.oreToExtra){
        expect(oldOre).to.equal(exchangeType.numGive*times + player.ore)
        expect(exchangeType.numGet*times + oldSRange).to.equal(player.specialRange)
    }
    else if (exchangeType === exchange.oreToGold){
        expect(oldOre).to.equal(exchangeType.numGive*times + player.ore)
        expect(exchangeType.numGet*times + oldGold).to.equal(player.gold)
    }
    else if (exchangeType === exchange.qicToOre){
        expect(oldQIC).to.equal(exchangeType.numGive*times + player.qic)
        expect(exchangeType.numGet*times + oldOre).to.equal(player.ore)
    }
    else if (exchangeType === exchange.qicToRange){
        expect(oldQIC).to.equal(exchangeType.numGive*times + player.qic)
        expect(exchangeType.numGet*times + oldSRange).to.equal(player.specialRange)
    }
    else if (exchangeType === exchange.scienceToGold){
        expect(oldScience).to.equal(exchangeType.numGive*times + player.science)
        expect(exchangeType.numGet*times + oldGold).to.equal(player.gold)
    }

}


describe('Exchange Test', () => {
    let p: Player
    let exchange: Exchange

    beforeEach(() => {
        p = new Player('jon', RaceType.Terrans)
        exchange = new Exchange()
    })

    it('try to trade an invalid merchandise', ()=>{
        try{
            exchange.trade(p, Material.Power, Material.SpecialRange, 11);
        }catch(e){
            expect('merchandise not found')
        }
    })

    // it('try to trade with not enough resources', ()=>{
    //     p.power.bowl3 = 1
    //     try{
    //         testExchange(exchange.powerToGold, p, 6, exchange)
    //     }catch(e){
    //         expect('not enough resources')
    //     }
    //     expect(p.power.bowl3).to.equal(1)
    // })
    //

    
    it('single time trade success', ()=>{
        p.gold = 10;
        p.power.bowl3 = 1;
        exchange.trade(p, Material.Power, Material.Gold, 1);
        expect(p.gold).to.equal(11);
    })

    it('multiple times trade success', ()=>{
        p.gold = 10;
        p.power.bowl3 = 3;
        exchange.trade(p, Material.Power, Material.Gold, 3);
        expect(p.gold).to.equal(13);
    })

    it('multiple times trade failure: not enough resouces', ()=>{
        p.gold = 10;
        p.power.bowl3 = 1;
        exchange.trade(p, Material.Power, Material.Gold, 11);
        expect(p.gold).to.equal(10);
    })




})

