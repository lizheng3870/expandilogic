
import * as Lab from 'lab'

import { expect } from 'code'
import { Player } from '../logic/Player';
import { Benefit, Trigger, Value, Material } from '../logic/Benefit';

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
        p = new Player('jon');
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
})