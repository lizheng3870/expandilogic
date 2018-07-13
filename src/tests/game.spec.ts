import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus, Phase} from '../logic/Game'
import {Player} from '../logic/Player'
import {RaceType} from '../logic/Race'

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }

describe('experiment', () => {
    before(() => {});

    it('verifies 1 equals 1', () => {
        expect(1).to.equal(1);
    });
});

describe('Basic Game Tests', () => {
    let g: Game
    before(() => {
        g = new Game(1)
    });

    it('creates a game', () => {
        expect(g.status).to.equal(GameStatus.Open)
        expect(g.phase).to.equal(Phase.Income)
        expect(g.players.length).to.equal(0)
    })

    it('creates Player', () => {
        const p = new Player('jon', RaceType.Terrans)
        expect(p.planets.length).to.equal(0)
    })

    it('adds Player to game', () => {
        const p = new Player('jon', RaceType.Terrans)
        g.addPlayer(p)
        expect(g.players.length).to.equal(1)
    })
    
});