import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus} from '../logic/Game'
import {Player, CreatePlayer, RaceType} from '../logic/Player'
import {Request, RequestType} from '../logic/Request'
import {Hex} from '../logic/Hex'
import { StructureType, StructureStatus} from '../logic/Structure'
import {PlanetType} from '../logic/Planet'

const lab = Lab.script()
const { describe, it, beforeEach, before } = lab
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
      expect(g.stateMachine.currentState).to.equal(GameStatus.Open)

    })

    it('check game status two player  ', () => {
      g.addPlayer(CreatePlayer('yousong', RaceType.Terrans))
      g.addPlayer(CreatePlayer('nina', RaceType.Lantids))
      expect(g.stateMachine.currentState).to.equal(GameStatus.Open)

    })

    it('check game status 4 player  ', () => {
      g.addPlayer(CreatePlayer('yousong', RaceType.Terrans))
      g.addPlayer(CreatePlayer('nina', RaceType.Lantids))
      g.addPlayer(CreatePlayer('yalei', RaceType.Xenos))
      g.addPlayer(CreatePlayer('rong', RaceType.Gleens))
      expect(g.stateMachine.currentState).to.equal(GameStatus.Setup)

    })


});




describe('Game SetUp Before Build First Structures Tests', () => {
    let g: Game
    beforeEach(() => {
        g = new Game(1)
        g.addPlayer(CreatePlayer('yousong', RaceType.Terrans))//blue
        g.addPlayer(CreatePlayer('nina', RaceType.Xenos))//Yellow
        g.addPlayer(CreatePlayer('yalei', RaceType.Taklons)) //brown
        g.addPlayer(CreatePlayer('rong', RaceType.HadschHallas)) //red

    });

    it('check game status (GameStatus.Setup)  ', () => {
      expect(g.stateMachine.currentState).to.equal(GameStatus.Setup)

    })

    it('check player planetType  ', () => {
      let player  = g.getPlayer(0);
      expect(player.planetType).to.equal(PlanetType.Blue)
      player  = g.getPlayer(1);
      expect(player.planetType).to.equal(PlanetType.Yellow)
      player  = g.getPlayer(2);
      expect(player.planetType).to.equal(PlanetType.Brown)
      player  = g.getPlayer(3);
      expect(player.planetType).to.equal(PlanetType.Red)

    })


    // it(`setup player's  ore, knowledge, gold`, () => {
    //   for(let player of g.players){
    //     playerTest(player);
    //   }
    // })

});


describe('Game SetUp Build First Structures Tests', () => {
    let g: Game
    before(() => {
        g = new Game(1)
        g.addPlayer(CreatePlayer('yousong', RaceType.Terrans)) // blue
        g.addPlayer(CreatePlayer('nina', RaceType.Xenos))  //yellow
        g.addPlayer(CreatePlayer('yalei', RaceType.HadschHallas))  //red
        g.addPlayer(CreatePlayer('rong', RaceType.Nevlas))   //while


    });

    it('player(pid:0) build mine', () => {
      let request = new Request()
      let hex = new Hex(0, 0, 0);
      request.type = RequestType.FirstStructures
      request.pid = 0;
      request.hex = hex;
      g.processSetupFirstStructures(request)

      expect(g.board.hasPlanet(hex)).to.equal(true);
      let planet = g.board.getPlanet(hex);

      expect(planet.building).to.equal(StructureType.Mine);
      expect(planet.type).to.equal(PlanetType.Blue);
      expect(planet.playerID).to.equal(0);

      let player = g.getPlayer(0);
      let mine = player.buildings.mines[0];
      expect(mine.status).to.equal(StructureStatus.Built);
      console.log(g.turn)
    })

    it('player(pid:1) build mine', () => {
        let request = new Request()
        let hex = new Hex(2, 3, -5);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 1;
        request.hex = hex;
        console.log(g.turn)
        g.processSetupFirstStructures(request)

        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);
        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.Yellow);
        expect(planet.playerID).to.equal(1);

        let player = g.getPlayer(1);
        let mine = player.buildings.mines[0];
        expect(mine.status).to.equal(StructureStatus.Built);


      })

      it('player(pid:2) build mine', () => {

        let request = new Request()
        let hex = new Hex(5, -2, -3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 2;
        request.hex = hex;
        g.processSetupFirstStructures(request)

        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);
        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.Red);
        expect(planet.playerID).to.equal(2);

        let player = g.getPlayer(2);
        let mine = player.buildings.mines[0];
        expect(mine.status).to.equal(StructureStatus.Built);

      });
      it('player(pid:3) build mine', () => {
        let request = new Request()
        let hex = new Hex(-5, 2, 3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 3;
        request.hex = hex;
        let player3 = g.getPlayer(3);

         g.processSetupFirstStructures(request)
         player3 = g.getPlayer(3);


        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);
        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.White);
        expect(planet.playerID).to.equal(3);

        let player = g.getPlayer(3);

        let mine = player.buildings.mines[0];
        expect(mine.status).to.equal(StructureStatus.Built);

      })
      it('player(pid:3) build second mine', () =>
      {
        let request = new Request()
        let hex = new Hex(-6, 3, 3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 3;
        request.hex = hex;


        g.processSetupFirstStructures(request)

        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);

        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.White);
        expect(planet.playerID).to.equal(3);

        let player = g.getPlayer(3);

        expect(player.buildings.mines[0].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[1].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[2].status).to.equal(StructureStatus.Unbuilt);
      })
      it('player(pid:2) build second mine', () =>
      {
        let request = new Request()
        let hex = new Hex(4, -1, -3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 2;
        request.hex = hex;


        g.processSetupFirstStructures(request)

        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);

        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.Red);
        expect(planet.playerID).to.equal(2);

        let player = g.getPlayer(2);

        expect(player.buildings.mines[0].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[1].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[2].status).to.equal(StructureStatus.Unbuilt);
      })
      it('player(pid:1) build second mine', () =>
      {
        let request = new Request()
        let hex = new Hex(3, 3, -6);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 1;
        request.hex = hex;


        g.processSetupFirstStructures(request)

        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);

        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.Yellow);
        expect(planet.playerID).to.equal(1);

        let player = g.getPlayer(1);

        expect(player.buildings.mines[0].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[1].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[2].status).to.equal(StructureStatus.Unbuilt);
      })
      it('player(pid:0) build second mine', () =>
      {
        let request = new Request()
        let hex = new Hex(1, -1, 0);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 0;
        request.hex = hex;


        g.processSetupFirstStructures(request)


        expect(g.board.hasPlanet(hex)).to.equal(true);
        let planet = g.board.getPlanet(hex);

        expect(planet.building).to.equal(StructureType.Mine);
        expect(planet.type).to.equal(PlanetType.Blue);
        expect(planet.playerID).to.equal(0);

        let player = g.getPlayer(0);

        expect(player.buildings.mines[0].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[1].status).to.equal(StructureStatus.Built);
        expect(player.buildings.mines[2].status).to.equal(StructureStatus.Unbuilt);
        expect(g.firstStructuresRound).to.equal(3);
      }

    )


    it('check player get right Roundbooter ', () => {
      let request = new Request()
      request.type = RequestType.Roundbooter
      request.pid = 0;
      request.roundBoosterID = 3;

      g.processRoundRooter(request)

      expect(g.players[0].roundBooster).to.equal(g.roundBoosters[3]);


    })

    it('check game status and after 4 players get Roundbooter ', () => {
      let request = new Request()
      request.type = RequestType.Roundbooter
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

       // jump from Setup to Playing or later stage

      expect(g.stateMachine.currentState).to.equal(GameStatus.Actions)

    })



});
