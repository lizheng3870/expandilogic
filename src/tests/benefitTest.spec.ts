
import * as Lab from 'lab'

import { expect } from 'code'
import { Player , RaceType} from '../logic/Player';
import { Benefit, Trigger, Value, Material } from '../logic/Benefit';
import TechBoard from '../logic/TechBoard';

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }

function testAddIncomeBenefit(player: Player, benefits: Benefit[], numOfIncome: number){
    var old = player.incomeBenefits.length;
    for(var i = 0; i < benefits.length; i++){
        player.getBenefit(benefits[i]);
    }
    var now = player.incomeBenefits.length;
    expect(now - old).to.equal(numOfIncome);
}


describe('experiment', () => {
    before(() => {});

    it('verifies 1 equals 1', () => {
        expect(1).to.equal(1);
    });
});

describe('Benefit Test', () => {
    let p: Player
    let b1: Benefit;
    let b2: Benefit;
    // let b3: Benefit;
    beforeEach(() => {
        p = new Player('jon', RaceType.Terrans);
        b1 = new Benefit(Trigger.Income, null, null, [new Value(1, Material.Gold)]);
        b2 = new Benefit(Trigger.Now, null, null, [new Value(1, Material.Ore)]);
        // b3 = new Benefit(Trigger.Income, null, null, [new Value(3, Material.QIC)]);
    })

    it('begin the player with no benefit', ()=>{
        expect(p.incomeBenefits.length).to.equal(0);
    })

    it('add one income benefit of income into the player', ()=>{
        testAddIncomeBenefit(p, [b1], 1);
    })

    it('add one income benefit and one now benefit, to see if the income benefit is added into the right place', ()=>{
        testAddIncomeBenefit(p, [b1, b2], 1);
    })

    it('can add the resource of now benefit into player class', () => {
        var oldOre = p.ore;
        p.getBenefit(b2);
        var nowOre = p.ore;
        expect(nowOre - oldOre).to.equal(1);
    })

    it('can add mutiple resources', () => {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic
        var b3 = new Benefit(Trigger.Now, null, null, [new Value(10, Material.Gold),
                                                       new Value(3, Material.Ore),
                                                       new Value(5, Material.Science),
                                                       new Value(7, Material.QIC)]);
        p.getBenefit(b3);
        expect(p.gold - g1).to.equal(10);
        expect(p.ore - o1).to.equal(3);
        expect(p.science - s1).to.equal(5);
        expect(p.qic - q1).to.equal(7);
    })

    it('can add mutiple resources from multiple benefits', () => {
        var g1 = p.gold;
        var o1 = p.ore;
        var s1 = p.science;
        var q1 = p.qic
        var b3 = new Benefit(Trigger.Now, null, null, [new Value(10, Material.Gold),
                                                       new Value(3, Material.Ore),
                                                       new Value(5, Material.Science),
                                                       new Value(7, Material.QIC)]);
        var b4 = new Benefit(Trigger.Now, null, null, [new Value(2, Material.Gold),
                                                       new Value(6, Material.Ore),
                                                       new Value(1, Material.Science),
                                                       new Value(9, Material.QIC)]);
        p.getBenefit(b3);
        p.getBenefit(b4);
        expect(p.gold - g1).to.equal(12);
        expect(p.ore - o1).to.equal(9);
        expect(p.science - s1).to.equal(6);
        expect(p.qic - q1).to.equal(16);
    })
})

describe('tech test', () => {
    let p: Player
    let techboard: TechBoard;
    beforeEach(() => {
        console.log("tech test begin");
        p = new Player('jon', RaceType.Terrans);
        expect(p.techs[0]).to.equal(0);
        expect(p.techs[1]).to.equal(0);
        expect(p.techs[2]).to.equal(0);
        expect(p.techs[3]).to.equal(0);
        expect(p.techs[4]).to.equal(0);
        expect(p.techs[5]).to.equal(0);
        techboard = new TechBoard();
        // techboard.print();
    })

    it("update test: 1.if it can update; 2.can not update when it is level 5", () => {
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(1);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(2);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(3);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(4);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(5);
        techboard.update(0,p);
        expect(p.techs[0]).to.equal(5);
    })

    it("the effect of tech is right: dig", () => {
        console.log("the dig cost was: " + p.digCost);
        techboard.update(0, p);
        expect(p.ore).to.equal(6);
        techboard.update(0, p);
        expect(p.digCost).to.equal(2);
        techboard.update(0, p);
        expect(p.digCost).to.equal(1);
        expect(p.power.bowl2).to.equal(5);
        expect(p.power.bowl3).to.equal(1);
        techboard.update(0, p);
        expect(p.ore).to.equal(8);
    })




})
