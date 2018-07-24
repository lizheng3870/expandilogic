import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus} from '../logic/Game'
import {Player, RaceType} from '../logic/Player'
import {Request, RequestType} from '../logic/Request'
import {Hex} from '../logic/Hex'
import {ActionType} from '../logic/Action'

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }



describe('Player Actions Tests', () => {
    let g: Game

    before(() => {
      g = new Game(1)
      g.addPlayer(new Player('yousong', RaceType.Terrans)) // blue
      g.addPlayer(new Player('nina', RaceType.Xenos))  //yellow
      g.addPlayer(new Player('yalei', RaceType.HadschHallas))  //red
      g.addPlayer(new Player('rong', RaceType.Nevlas))   //while

      // FirstStructures
      {
        let request = new Request()
        let hex = new Hex(0, 0, 0);
        request.type = RequestType.FirstStructures
        request.pid = 0;
        request.hex = hex;
        g.processSetupFirstStructures(request)
    }

      {
        let request = new Request()
        let hex = new Hex(2, 3, -5);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 1;
        request.hex = hex;
        g.processSetupFirstStructures(request)

      }

      {
        let request = new Request()
        let hex = new Hex(5, -2, -3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 2;
        request.hex = hex;
        g.processSetupFirstStructures(request)
      }

      {
        let request = new Request()
        let hex = new Hex(-5, 2, 3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 3;
        request.hex = hex;
        let player3 = g.getPlayer(3);

         g.processSetupFirstStructures(request)

      }

      //reverse
      {
        let request = new Request()
        let hex = new Hex(-4, 2, 2);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 3;
        request.hex = hex;


        g.processSetupFirstStructures(request)
      }

      {
        let request = new Request()
        let hex = new Hex(6, -2, -4);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 2;
        request.hex = hex;

        g.processSetupFirstStructures(request)
      }

      {
        let request = new Request()
        let hex = new Hex(3, 3, -6);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 1;
        request.hex = hex;


        g.processSetupFirstStructures(request)
      }

      {
        let request = new Request()
        let hex = new Hex(3, -1, -2);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 0;
        request.hex = hex;
        g.processSetupFirstStructures(request)
      }


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

    it('yousong player(pid:0) send a build mine structure request to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.BuildMine
      request.pid = 0;
      request.hex = new Hex(3, -2, -1);
      g.processPlayerRequest(request)
      let player = g.getPlayer(request.pid);

      if(player === null){
          expect(0).to.equal(1);
      }else{
        // expect(player.name).to.equal("yousong")
        // console.log(g.turn)
        // expect(g.turn).to.equal(1)
        //
        // expect(player.planets.length).to.equal(1)
       }







    });
});
