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
        expect(oldPower3).to.equal(exchangeType.numGive*times + player.power.bowl3)
        expect(exchangeType.numGet*times + oldPower1).to.equal(player.power.bowl1)
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

