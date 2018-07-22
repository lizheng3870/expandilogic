import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus} from '../logic/Game'
import {Player, RaceType} from '../logic/Player'
import {Request, RequestType} from '../logic/Request'
import {Hex} from '../logic/Hex'

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }



describe('Player Actions Tests', () => {
    let g: Game
    before(() => {
      g = new Game(1)
      g.addPlayer(new Player('yousong', RaceType.Terrans))
      g.addPlayer(new Player('nina', RaceType.Lantids))
      g.addPlayer(new Player('yalei', RaceType.Xenos))
      g.addPlayer(new Player('rong', RaceType.Gleens))

      let request = new Request()
      request.type = RequestType.Roundbooter
      request.pid = 0;
      request.roundBoosterID = 3;
      g.processRoundRooter(request)

      request.pid = 1;
      request.roundBoosterID = 4;
      g.processRoundRooter(request)

      request.pid = 2;
      request.roundBoosterID = 0;
      g.processRoundRooter(request)

      request.pid = 3;
      request.roundBoosterID = 9;
      g.processRoundRooter(request)

    });

    it('check game status', () => {
      expect(g.stateMachine.currentState).to.equal(GameStatus.Actions)

    });

    it('0 player send a build mine structure request to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.pid = 0;
      request.hex = new Hex(0,0,0);
      g.processPlayerRequest(request)

    });
});
