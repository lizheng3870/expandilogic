import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus, Phase} from '../logic/Game'
import {Player, RaceType} from '../logic/Player'

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }

function powerTest(p:Player, charge: number, bowl1:number, bowl2:number, bowl3:number){
    p.chargePower(charge)
    expect(p.power.bowl1).to.equal(bowl1)
    expect(p.power.bowl2).to.equal(bowl2)
    expect(p.power.bowl3).to.equal(bowl3)
}
function setPower(p:Player, bowl1?:number, bowl2?:number, bowl3?:number){
    if (bowl1 !== undefined){
        p.power.bowl1 = bowl1
    }
    if (bowl2 !== undefined){
        p.power.bowl2 = bowl2
    }
    if (bowl3 !== undefined){
        p.power.bowl3 = bowl3
    }
}

describe('experiment', () => {
    before(() => {});

    it('verifies 1 equals 1', () => {
        expect(1).to.equal(1);
    });
});

describe('Basic Game Tests', () => {
    let g: Game
    beforeEach(() => {
        g = new Game(1)
    });

    it('creates a game', () => {
        // when you create a game, it should be OPEN, in INCOME PHASE, and have
        // zero players
        expect(g.status).to.equal(GameStatus.Open)
        expect(g.phase).to.equal(Phase.Income)
        expect(g.players.length).to.equal(0)
    })

    it('creates Player', () => {
        // a player should have no planets when it's first created
        const p = new Player('jon', RaceType.Terrans)
        expect(p.planets.length).to.equal(0)
    })

    it('creates Player without Race', () => {
        // a player should have no planets when it's first created
        const p = new Player('jon')
        expect(p.planets.length).to.equal(0)
    })

    it('adds Player to game', () => {
        // when you add a player to a game, the game should have one player
        const p = new Player('jon', RaceType.Terrans)
        g.addPlayer(p)
        expect(g.players.length).to.equal(1)
    })

    it(`doesn't allow adding five Players to game`, () => {
        g.addPlayer(new Player('yousong'))
        g.addPlayer(new Player('nina'))
        g.addPlayer(new Player('yalei'))
        g.addPlayer(new Player('rong'))
        try{
            g.addPlayer(new Player('jon'))
        }catch(e){
            expect(g.players.length).to.equal(4)
        }
        expect(g.players.length).to.equal(4)
    })

    it(`doesn't allow adding two Players of the same race`, () => {
        g.addPlayer(new Player('yousong', RaceType.Terrans))
        try{
            g.addPlayer(new Player('nina', RaceType.Terrans))
        }catch(e){
            expect(g.players.length).to.equal(1)
        }
        expect(g.players.length).to.equal(1)
    })

    it('can go to the next turn', () => {
        g.addPlayer(new Player('yousong', RaceType.Terrans));
        g.addPlayer(new Player('rong', RaceType.Ambas));
        g.addPlayer(new Player('yalei', RaceType.Baltaks));
        g.nextTurn();
        expect(g.turn).to.equal(1);
        })
        
    it('can go back to the turn 0', () => {
        g.addPlayer(new Player('yousong', RaceType.Terrans));
        g.addPlayer(new Player('rong', RaceType.Ambas));
        g.addPlayer(new Player('yalei', RaceType.Baltaks));
        g.nextTurn();
        g.nextTurn();
        g.nextTurn();
        expect(g.turn).to.equal(0);
    })
    
    it('can go to the next round when all the player pass', () => {
        g.nextTurn();
        expect(g.turn).to.equal(0);
        expect(g.round).to.equal(2); //turn starts at 0, round at 1
    })

});

describe('Power tests', () => {
    let p: Player
    beforeEach(() => {
        p = new Player('jon')
    })
    it('begins each player with the normal default power', ()=>{
        powerTest(p, 0, 2, 4, 0)
    })
    it('properly charges power', ()=>{
        powerTest(p, 2, 0, 6, 0)

    })
    it('properly charges power with overflow', ()=>{
        setPower(p, 0, 1, 0)
        powerTest(p, 2, 0, 0, 1)
    })
    it('properly charges power', ()=>{
        setPower(p, 1, 1, 1)
        powerTest(p, 3, 0, 0, 3)
    })
    it('properly charges power', ()=>{
        setPower(p, 4, 0, 0)
        powerTest(p, 6, 0, 2, 2)
    })
    it('properly charges power', ()=>{
        setPower(p, 3, 0, 0)
        powerTest(p, 3, 0, 3, 0)
    })
    it('properly charges power', ()=>{
        setPower(p, 3, 3, 3)
        powerTest(p, 10, 0, 0, 9)
    })
    it('properly charges power', ()=>{
        setPower(p, 5, 0, 0)
        powerTest(p, 10, 0, 0, 5)
    })
    it('properly charges power when all full', ()=>{
        setPower(p, 0, 0, 3)
        powerTest(p, 4, 0, 0, 3)
    })
    it('properly charges power when first bowl empty', ()=>{
        setPower(p, 0, 3, 3)
        powerTest(p, 4, 0, 0, 6)
    })
    it('properly charges max', ()=>{
        setPower(p, 1, 0, 0)
        powerTest(p, 4, 0, 0, 1)
    })

    it('adds power', ()=>{
        p.addPower(2)
        expect(p.power.bowl1).to.equal(4)
    })
})
