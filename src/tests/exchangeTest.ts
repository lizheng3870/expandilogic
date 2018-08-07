import * as Lab from 'lab'

import { expect } from 'code'
import { Player, CreatePlayer,  RaceType } from '../logic/Player';
import { Benefit, Trigger, Value, Material } from '../logic/Benefit';
import { Exchange} from '../logic/Exchange';
import { Race } from '../logic/Race';
import {Merchandise, Store, StoreMerchandiseType} from '../logic/Store';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }


describe('Exchange Test', () => {
    let p: Player
    let exchange: Exchange

    beforeEach(() => {
        p = CreatePlayer('jon', RaceType.Terrans)
        exchange = new Exchange()
    })

    it('try to trade an invalid merchandise', ()=>{
        try{
            exchange.trade(p, Material.Power, Material.SpecialRange, 11);
        }catch(e){
            expect('merchandise not found')
        }
    })

    it('single time trade failure: not enough resouces', ()=>{
        p.qic = 0;
        p.ore = 1;
        exchange.trade(p, Material.QIC, Material.Ore, 1);
        expect(p.qic).to.equal(0);
        expect(p.ore).to.equal(1);

    })
    


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


describe('Store Test', () => {
    let p: Player
    let store: Store

    beforeEach(() => {
        p = CreatePlayer('jon', RaceType.Terrans)
        store = new Store()
    })

    //this is unnecessary because if it's invalid, it doesn't pass npm test.
    it('try to trade an invalid merchandise', ()=>{
        try{
            //store.trade(p, StoreMerchandiseType.Pw3dig2);
        }catch(e){
            expect('merchandise not found')
        }
    })

    it('single time trade success', ()=>{
        p.power.bowl3 = 7;
        p.science = 0;
        store.trade(p, StoreMerchandiseType.Pw7sci3);
        expect(p.science).to.equal(3);
    })

    it('single time trade failure: not enough resources', ()=>{
        p.power.bowl3 = 3;
        p.science = 0;
        store.trade(p, StoreMerchandiseType.Pw7sci3);
        expect(p.science).to.equal(0);
    })

    it('serial store trades: cannot buy the same item once it is sold out ', ()=>{
        p.power.bowl3 = 8;
        p.ore = 0;
        store.trade(p, StoreMerchandiseType.Pw4ore2);
        store.trade(p, StoreMerchandiseType.Pw4ore2);
        expect(p.ore).to.equal(2);
        expect(p.power.bowl3).to.equal(4);
    })




})