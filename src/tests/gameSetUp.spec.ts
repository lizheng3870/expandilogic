import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus} from '../logic/Game'
import {Player, RaceType} from '../logic/Player'
import {Request, RequestType} from '../logic/Request'

const lab = Lab.script()
const { describe, it, beforeEach } = lab
export { lab }



function playerTest(p:Player){
  // this.vp = 10;
  // this.gold = 15;
  // this.ore = 4;
  // this.science = 3;
  // this.qic = 1;
  expect(p.vp).to.equal(10)
  expect(p.gold).to.equal(15)
  expect(p.ore).to.equal(4)
  expect(p.science).to.equal(3)
  expect(p.qic).to.equal(1)
}

describe('Game Before Setup Tests', () => {
    let g: Game
    beforeEach(() => {
        g = new Game(1)

    });

    it('check game status zero player  ', () => {
      expect(g.status).to.equal(GameStatus.Open)

    })

    it('check game status two player  ', () => {
      g.addPlayer(new Player('yousong', RaceType.Terrans))
      g.addPlayer(new Player('nina', RaceType.Lantids))
      expect(g.status).to.equal(GameStatus.Open)

    })

    it('check game status 4 player  ', () => {
      g.addPlayer(new Player('yousong', RaceType.Terrans))
      g.addPlayer(new Player('nina', RaceType.Lantids))
      g.addPlayer(new Player('yalei', RaceType.Xenos))
      g.addPlayer(new Player('rong', RaceType.Gleens))
      expect(g.status).to.equal(GameStatus.Setup)

    })


});


describe('Game SetUp finished Tests', () => {
    let g: Game
    beforeEach(() => {
        g = new Game(1)
        g.addPlayer(new Player('yousong', RaceType.Terrans))
        g.addPlayer(new Player('nina', RaceType.Lantids))
        g.addPlayer(new Player('yalei', RaceType.Xenos))
        g.addPlayer(new Player('rong', RaceType.Gleens))

    });

    it('check game status (GameStatus.Setup)  ', () => {
      expect(g.status).to.equal(GameStatus.Setup)

    })

    it(`setup player's  ore, knowledge, gold`, () => {
      for(let player of g.players){
        playerTest(player);
      }
    })

});


describe('Player RoundBooster Request Tests', () => {
    let g: Game
    beforeEach(() => {
        g = new Game(1)
        g.addPlayer(new Player('yousong', RaceType.Terrans))
        g.addPlayer(new Player('nina', RaceType.Lantids))
        g.addPlayer(new Player('yalei', RaceType.Xenos))
        g.addPlayer(new Player('rong', RaceType.Gleens))


    });

    it('check player get right Roundbooter ', () => {
      let request = new Request()
      request.type = RequestType.Roundbooter
      request.pid = 0;
      request.roundBoosterID = 3;
      g.processRoundRooter(request)

      expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);


      request.type = RequestType.Roundbooter
      request.pid = 1;
      request.roundBoosterID = 4;
      g.processRoundRooter(request)

      expect(g.players[1].roundBooster).to.equal(g.roundBoosters[4]);

    })


    it('check game status and after 4 players get Roundbooter ', () => {
      let request = new Request()
      request.type = RequestType.Roundbooter
      request.pid = 0;
      request.roundBoosterID = 3;
      g.processRoundRooter(request)

      expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);

      request.pid = 1;
      request.roundBoosterID = 4;
      g.processRoundRooter(request)
      expect(g.players[1].roundBooster).to.equal(g.roundBoosters[4]);

      request.pid = 2;
      request.roundBoosterID = 0;
      g.processRoundRooter(request)
      expect(g.players[2].roundBooster).to.equal(g.roundBoosters[0]);

      request.pid = 3;
      request.roundBoosterID = 9;
      g.processRoundRooter(request)
      expect(g.players[3].roundBooster).to.equal(g.roundBoosters[9]);

      expect(g.status).to.equal(GameStatus.Playing)

    })


});
