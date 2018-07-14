import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus, Phase} from '../logic/Game'
import {Player} from '../logic/Player'
import {RaceType} from '../logic/Race'

const lab = Lab.script()
const { describe, it, before, beforeEach } = lab
export { lab }

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

});