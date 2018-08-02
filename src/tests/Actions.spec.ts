import * as Lab from 'lab'

import { expect } from 'code'
import {Game, GameStatus} from '../logic/Game'
import {Player, CreatePlayer, RaceType} from '../logic/Player'
import {Request, RequestType, UpgradeType, TechLaneType, SpecialActionSource} from '../logic/Request'
import {Hex} from '../logic/Hex'
import {ActionType} from '../logic/Action'
import {StructureType} from '../logic/Structure'
import {StoreMerchandiseType} from '../logic/Store'
import {Material} from '../logic/Benefit'
import TechBoard from '../logic/TechBoard'
import {ScoringBoard} from '../logic/ScoringBoard'

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }



describe('Player Actions Tests', () => {
    let g: Game

    before(() => {
      g = new Game(1)
      g.techBoard = new TechBoard(false);
      g.addPlayer(CreatePlayer('yousong', RaceType.Terrans)) // blue
      g.addPlayer(CreatePlayer('nina', RaceType.Xenos))  //yellow
      g.addPlayer(CreatePlayer('yalei', RaceType.HadschHallas))  //red
      g.addPlayer(CreatePlayer('rong', RaceType.Nevlas))   //while

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
        let hex = new Hex(-6, 3, 3);
        //console.log(hex)
        request.type = RequestType.FirstStructures
        request.pid = 3;
        request.hex = hex;


        g.processSetupFirstStructures(request)
      }

      {
        let request = new Request()
        let hex = new Hex(4, -1, -3);
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
        let hex = new Hex(4, 6, -10);
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
      request.hex = new Hex(1, -1, 0);
      g.processPlayerRequest(request)
      let player = g.getPlayer(request.pid);

      if(player === null){
          expect(0).to.equal(1);
      }else{
        expect(player.name).to.equal("yousong")
        expect(g.turn).to.equal(1)
        expect(player.planets.length).to.equal(3)
        player.accessiblePlanets(g.board);

       }
   });


    it('nina player(pid:1) send a update mine structure to station request to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Upgrade
      request.upgradeType = UpgradeType.MineToStation;
      request.pid = 1;
      request.hex = new Hex(2, 3, -5);

      let player = g.getPlayer(request.pid);


      let beforeGold = player.gold;
      let beforeOre = player.ore;
      g.processPlayerRequest(request)

      expect(beforeGold - player.gold).to.equal(3)
      expect(beforeOre - player.ore).to.equal(2)

      if(player === null){
          expect(0).to.equal(1);
      }else{
        expect(player.name).to.equal("nina")
        expect(g.turn).to.equal(2)
        expect(player.planets.length).to.equal(2)
        let planet = g.board.getPlanet(request.hex);

        expect(planet.building).to.equal(StructureType.Station)

        //player.accessiblePlanets(g.board);

       }
    });

    it('yalei player(yalei:2) send rearch action to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Research
      request.techLane = TechLaneType.Dig;
      request.pid = 2;
      //request.hex = new Hex(2, 3, -5);


     let player = g.getPlayer(request.pid);
     // change science
      player.science = 8

      // default value
      expect(player.digCost).to.equal(3)
      expect(player.ore).to.equal(6)
      g.processPlayerRequest(request)
      // 0 ->1  add two ore
      expect(player.digCost).to.equal(3)
      expect(player.ore).to.equal(8)

      expect(player.name).to.equal("yalei")
      expect(g.turn).to.equal(3)

      // this.turn = 2
      g.turn = 2;
      g.processPlayerRequest(request)
      // 1 ->2  add two ore
      expect(player.ore).to.equal(8)
      expect(player.digCost).to.equal(2)


    });


    it('rong player(3) send reqest of QIC Action to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.PowerAndQIC
      request.storeMerchandiseType = StoreMerchandiseType.Pw7sci3
      request.pid = 3;
      //request.hex = new Hex(2, 3, -5);

     let player = g.getPlayer(request.pid);
     // change science

      player.power.bowl3 = 8;

      // default value
      expect(player.science).to.equal(5)
      expect(player.power.bowl3).to.equal(8)
      expect(player.power.bowl1).to.equal(2)
      g.processPlayerRequest(request)
      //
      expect(player.science).to.equal(8)
      expect(player.power.bowl3).to.equal(1)
      expect(player.power.bowl1).to.equal(9)
      expect(g.turn).to.equal(0)



    });


    it('yousong player(pid:0) send free action one ore to one gold request to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Free
      request.freeExchangeItems = [Material.Ore, Material.Gold]
      request.freeExchangeTimes = 1;
      request.pid = 0;


     let player = g.getPlayer(request.pid);
     // change science

      // default value
      expect(player.ore).to.equal(4)
      expect(player.gold).to.equal(15)
      g.processPlayerRequest(request)
      //
      expect(player.ore).to.equal(3)
      expect(player.gold).to.equal(16)

      request.freeExchangeItems = [Material.Power, Material.Power]
      request.freeExchangeTimes = 2;
      request.pid = 0;


    });


    it('yousong player(pid:0) send free action discard bowl2 power to charge bowl2 => bowl3 request to Game', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Free
      request.freeExchangeItems = [Material.Power, Material.Power]
      request.freeExchangeTimes = 2;
      request.pid = 0;

      let player = g.getPlayer(request.pid);



      // default value
      expect(player.power.bowl1).to.equal(4)
      expect(player.power.bowl2).to.equal(4)
      expect(player.power.bowl3).to.equal(0)
      g.processPlayerRequest(request)
      //
      expect(player.power.bowl1).to.equal(4)
      expect(player.power.bowl2).to.equal(0)
      expect(player.power.bowl3).to.equal(2)

    });

    it('yousong player(pid:0) update mine to trade station', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Upgrade
      request.upgradeType = UpgradeType.MineToStation;
      request.pid = 0;
      request.hex = new Hex(1, -1, 0);

      let player = g.getPlayer(request.pid);

      let beforeGold = player.gold;
      let beforeOre = player.ore;


      g.processPlayerRequest(request)

      let planet = g.board.getPlanet(request.hex);
      expect(planet.building).to.equal(StructureType.Station)

     // for neighbor or not neighbor is gold 3 /6 does no check, all is 3
      expect(beforeGold - player.gold).to.equal(3)
      expect(beforeOre - player.ore).to.equal(2)



    });

    it(' player(pid:1) trade station to Planetary Institute', () => {
      let request = new Request()
      request.type = RequestType.Action
      request.actionType = ActionType.Upgrade
      request.upgradeType = UpgradeType.StationToInstitute;
      request.pid = 1;
      request.hex = new Hex(2, 3, -5);

      let player = g.getPlayer(request.pid);



      // default value
      // expect(player.power.bowl1).to.equal(4)
      // expect(player.power.bowl2).to.equal(4)
      // expect(player.power.bowl3).to.equal(0)

      player.ore = 4; // ore not enough
      let beforeGold = player.gold;
      let beforeOre = player.ore;

      g.processPlayerRequest(request)


      let planet = g.board.getPlanet(request.hex);
      expect(planet.building).to.equal(StructureType.Institute)

      expect(beforeGold - player.gold).to.equal(6)
      expect(beforeOre - player.ore).to.equal(4)


    });



        it('player(pid:2) update mine to trade station', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.MineToStation;
          request.pid = 2;
          request.hex = new Hex(5, -2, -3);

          let player = g.getPlayer(request.pid);



          // default value
          // expect(player.power.bowl1).to.equal(4)
          // expect(player.power.bowl2).to.equal(4)
          // expect(player.power.bowl3).to.equal(0)

        // ore not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;

          g.processPlayerRequest(request)


          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Station)

          expect(beforeGold - player.gold).to.equal(3)
          expect(beforeOre - player.ore).to.equal(2)
        });

        it('player(3) update mine to trade station', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.MineToStation;
          request.pid = 3;
          request.hex = new Hex(-6, 3, 3);

          let player = g.getPlayer(request.pid);



          // default value
          // expect(player.power.bowl1).to.equal(4)
          // expect(player.power.bowl2).to.equal(4)
          // expect(player.power.bowl3).to.equal(0)

        // ore not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;

          g.processPlayerRequest(request)


          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Station)

          expect(beforeGold - player.gold).to.equal(3)
          expect(beforeOre - player.ore).to.equal(2)
        });


        it('yousong player(pid:0) update mine to trade station', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.MineToStation;
          request.pid = 0;
          request.hex = new Hex(0, 0, 0);

          let player = g.getPlayer(request.pid);

          player.ore = 10 // not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;

         g.processPlayerRequest(request)

          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Station)


          expect(beforeGold - player.gold).to.equal(3)
          expect(beforeOre - player.ore).to.equal(2)
        });


        it('player(1) update trade station to  lab', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.MineToStation;
          request.pid = 1;
          request.techTileID = 2;
          request.hex = new Hex(3, 3, -6);

          let player = g.getPlayer(request.pid);

          player.ore = 10 // not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;


          g.processPlayerRequest(request)


          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Station)


          expect(beforeGold - player.gold).to.equal(3)
          expect(beforeOre - player.ore).to.equal(2)
        });



        it('player(2) update trade station to lab', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.StationToLab;
          request.pid = 2;
          request.techTileID = 3;
          request.techLane = 3;
          request.hex = new Hex(5, -2, -3);

          let player = g.getPlayer(request.pid);

          //player.ore = 10 // not enough
          // console.log("before ore" +  player.ore)
          // console.log("before gold" +  player.gold)
          let beforeGold = player.gold;
          let beforeOre = player.ore;

          g.processPlayerRequest(request)

          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Lab)


          expect(beforeGold - player.gold).to.equal(5)
          expect(beforeOre - player.ore).to.equal(3)
        });


        it('player(3) update trade station to lab', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.StationToLab;
          request.pid = 3;
          request.techTileID = 4;
          request.techLane = 4;
          request.hex = new Hex(-6, 3, 3);

          let player = g.getPlayer(request.pid);

          //player.ore = 10 // not enough
          // console.log("before ore" +  player.ore)
          // console.log("before gold" +  player.gold)
          let beforeGold = player.gold;
          let beforeOre = player.ore;

          g.processPlayerRequest(request)

          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Lab)


          expect(beforeGold - player.gold).to.equal(5)
          expect(beforeOre - player.ore).to.equal(3)
        });


        it('player(0) update station to lab', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.StationToLab;
          request.pid = 0;
          request.hex = new Hex(0, 0, 0);
          request.techTileID = 1;
          request.techLane = 1;


          let player = g.getPlayer(request.pid);

          //player.ore = 10 // not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;
          let beforeQic = player.qic;

          g.processPlayerRequest(request)


          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Lab)

          expect(beforeGold - player.gold).to.equal(5)
          expect(beforeOre - player.ore).to.equal(3)
         expect(player.qic - beforeQic).to.equal(1) // techLane from 1 to
        });
        //
        it('player(1) pass test', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Pass
          request.pid = 1;
          request.roundBoosterID = 1;


          let player = g.getPlayer(request.pid);


          g.processPlayerRequest(request)

          expect(g.turn).to.equal(1)  // for turn will not change but current player move to nextRound
        });

        it('player(2) update lab to Academy', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Upgrade
          request.upgradeType = UpgradeType.LabToAcademy;
          request.pid = 2;
          request.techTileID = 8;
          request.techLane = 1;
          request.hex = new Hex(5, -2, -3);

          let player = g.getPlayer(request.pid);

          player.ore = 10 // not enough
          let beforeGold = player.gold;
          let beforeOre = player.ore;


          g.processPlayerRequest(request)

          let planet = g.board.getPlanet(request.hex);
          expect(planet.building).to.equal(StructureType.Academy)


          expect(beforeGold - player.gold).to.equal(6)
          expect(beforeOre - player.ore).to.equal(6)
        });


        it('player(3) pass test', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Pass
          request.pid = 3;
          request.roundBoosterID = 4;


          let player = g.getPlayer(request.pid);


          g.processPlayerRequest(request)

          expect(g.turn).to.equal(0)  // for turn will not change but current player move to nextRound
        });

        it('player(0) pass test', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Pass
          request.pid = 0;
          request.roundBoosterID = 6;

          let player = g.getPlayer(request.pid);


          g.processPlayerRequest(request)
          expect(g.turn).to.equal(0)  // for turn will not change but current player move to nextRound
        });


        it('player(2) pass test', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Pass
          request.pid = 2;
          request.roundBoosterID = 3;


          let player = g.getPlayer(request.pid);


          g.processPlayerRequest(request)
           expect(g.turn).to.equal(0)  // for turn will not change but current player move to nextRound
           expect(g.round).to.equal(2)
        });

       // player 1 is first
        it('new Round player(1) pass ', () => {
          let request = new Request()
          request.type = RequestType.Action
          request.actionType = ActionType.Pass
          request.pid = 1;
          request.roundBoosterID = 5;

          let player = g.getPlayer(request.pid);

           g.processPlayerRequest(request)

          expect(g.nextPlayerPid()).to.equal(3)


        });

        // player 1 is first
         it('new Round player(3) special action ', () => {
           let request = new Request()
           request.type = RequestType.Action
           request.actionType = ActionType.Special
           request.specialActionSource = SpecialActionSource.RoundBooster
           request.pid = 3;


           let player = g.getPlayer(request.pid);


           g.processPlayerRequest(request)

           expect(player.specialRange).to.equal(3)

         });

         it('new Round player(3) pass ', () => {
           let request = new Request()
           request.type = RequestType.Action
           request.actionType = ActionType.Pass
           request.roundBoosterID = 1

           request.pid = 3;



           let player = g.getPlayer(request.pid);


           g.processPlayerRequest(request)

           expect(player.specialRange).to.equal(0)

           expect(g.nextPlayerPid()).to.equal(0);

         });


         it('new Round player(0) pass ', () => {
           let request = new Request()
           request.type = RequestType.Action
           request.actionType = ActionType.Pass
           request.pid = 0;
           request.roundBoosterID = 0;
           //g.getRoundBooster()

           let player = g.getPlayer(request.pid);


            g.processPlayerRequest(request)

           expect(g.nextPlayerPid()).to.equal(2)


         });


         it('player(pid:2) send a build mine structure request to Game', () => {
           let request = new Request()
           request.type = RequestType.Action
           request.actionType = ActionType.BuildMine
           request.pid = 2;
           request.hex = new Hex(-4, 1, 3);
           let player = g.getPlayer(request.pid);
           player.specialRange = 100; // just make player accsible to this location

           let neighbor = g.getPlayer(3);
           // console.log("before bowl1 " + neighbor.power.bowl1)
           //  console.log("before bowl2 " + neighbor.power.bowl2)
           //  console.log("before bowl3 " + neighbor.power.bowl3)
           expect(neighbor.power.bowl1).to.equal(5)
           expect(neighbor.power.bowl2).to.equal(8)
           expect(neighbor.power.bowl3).to.equal(1)
           g.processPlayerRequest(request)
           expect(g.nextPlayerPid()).to.equal(2)
           expect(neighbor.power.bowl1).to.equal(3)
           expect(neighbor.power.bowl2).to.equal(10)
           expect(neighbor.power.bowl3).to.equal(1)
           //


          });


          it('player(pid:2) check final scoring ', () => {
            let request = new Request()
            request.type = RequestType.Action
            request.actionType = ActionType.Pass
            request.pid = 2;

            g.round = 6;


            g.processPlayerRequest(request)
            //  console.log(g.dumpPlayers());


           });


});
