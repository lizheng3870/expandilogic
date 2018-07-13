import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus, Phase} from '../logic/Game'

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
    before(() => {});

    it('creates a game', () => {
        g = new Game(1)
        expect(g.status).to.equal(GameStatus.Open)
        expect(g.phase).to.equal(Phase.Income)
        expect(g.players.length).to.equal(0)
    });
});