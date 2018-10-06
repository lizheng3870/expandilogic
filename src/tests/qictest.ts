import * as Lab from 'lab'

import { expect } from 'code'
import { Game, GameStatus } from '../logic/Game'
import { Player, CreatePlayer, RaceType } from '../logic/Player'
import { Request, RequestType, UpgradeType, TechLaneType, SpecialActionSource } from '../logic/Request'
import { Hex } from '../logic/Hex'
import { ActionType, Action } from '../logic/Action'
import { StructureType } from '../logic/Structure'
import { StoreMerchandiseType } from '../logic/Store'
import { Material, BuildingType } from '../logic/Benefit'
import TechBoard from '../logic/TechBoard'
import { ScoringBoard } from '../logic/ScoringBoard'
import { Planet } from '../logic/Planet';

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }

describe('qic action test', ()=>{
    let g : Game
    before(() => {
        var playernum = 3
        var race: number[] = new Array(playernum);
    
        g = new Game(1)
        g.techBoard = new TechBoard(false);
        let i = 0
        g.setPlayerNum(playernum);
       
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; 
        var randomRace = shuffle(numbers);
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var randomRoundBoosterID = shuffle(numbers);
        while (g.players.length < playernum) {
          console.log(randomRace)
          console.log("Player" + i + " is" + randomRace[i]);
          g.addPlayer(CreatePlayer('Play' + i, randomRace[i])); // random
          console.log("Player plant type: " + g.players[i].planetType + "Player's race type" + g.players[i].raceType);
    
          i++
        }
    
        var playAvailablePlanetMap = new Map();
        var playAvailablePlanetList: Array<Planet>;
        for (let i = 0; i < g.board.planets.length; i++) {
          // console.log(g.board.planets[i]);
          for (let j = 0; j < g.players.length; j++) {
            if (g.board.planets[i].type == g.players[j].planetType) {
              // console.log("Planet type: "+g.board.planets[i].type+ "Player plant type: "+  g.players[j].planetType+ "Player's race type" + g.players[j].raceType);
              if (!playAvailablePlanetMap.has(j))
                playAvailablePlanetList = new Array();
              else {
                playAvailablePlanetList = playAvailablePlanetMap.get(j);
              }
              playAvailablePlanetList.push(g.board.planets[i]);
              playAvailablePlanetMap.set(j, playAvailablePlanetList)
            }
          }
        }
    
        for (let i = 0; i < g.players.length; i++) {
          console.log("Turn: " + g.turn)
    
          let request = new Request()
          let current_player = g.turn % g.players.length;
          let player = g.players[current_player];
    
          let playerAvailabePlanet = playAvailablePlanetMap.get(current_player)
       
          let randomNum = Math.floor(Math.random() * playerAvailabePlanet.length);
          console.log("Random num is " + randomNum)
          let randomPlant = playerAvailabePlanet[randomNum];
          console.log("Player choose Planets " + randomPlant.type)
          let hex = randomPlant.loc;
          console.log("Planet's loc is " + hex)
          request.type = RequestType.FirstStructures
          request.pid = g.players[i].pid;
          request.hex = hex;
          g.processSetupFirstStructures(request)
    
        }
        //Revert Place Mines
        for (i = g.players.length - 1; i >= 0; i--) {
          //3210
          console.log("Turn: " + g.turn)
    
          let request = new Request()
          let current_player = g.turn % g.players.length;
          let player = g.players[current_player];
    
          let playerAvailabePlanet = playAvailablePlanetMap.get(current_player)
     
          let hex
       
            let randomNum = Math.floor(Math.random() * playerAvailabePlanet.length);
            console.log("Random num is " + randomNum)
            let randomPlant = playerAvailabePlanet[randomNum];
            console.log("Player choose Planets " + randomPlant.type)
            hex = randomPlant.loc;
            console.log("Planet's loc is " + hex)
    
    
          request.type = RequestType.FirstStructures
          request.pid = g.players[i].pid;
          request.hex = hex;
          g.processSetupFirstStructures(request)
    
        }
    
        console.log("End reverse")
        // console.log("Play0's Planets "+ g.players[0].planets)
        for (let i = 0; i < g.players.length; i++) {
          console.log("Turn: " + g.turn)
    
          //loop to pick random booster
          let request = new Request()
          request.type = RequestType.Roundbooter
          request.pid = g.players[i].pid;;
          request.roundBoosterID = randomRoundBoosterID[i];
          g.processRoundRooter(request)
          console.log("Player #" + request.pid + " pick roundBoosterID " + request.roundBoosterID)
    
        }
    
      });
    
      it('check game status', () => {
        expect(g.stateMachine.currentState).to.equal(GameStatus.Actions)
    
      });
      it('power ore action test', () => {
        let current_player = 0
        let player = g.players[current_player]   
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
        //player.power.bowl3 = 10;
        request.storeMerchandiseType = StoreMerchandiseType.Pw4ore2;
  
        console.log("Player #" + request.pid + " will do action " + request.actionType)
        console.log("*************************************")
        g.processPlayerRequest(request)
        console.log("******************see the benefit****************************")
        console.log(player)
      });

      it('power glod action test', () => {
        let current_player = 0
        let player = g.players[current_player]  
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
       // player.power.bowl3 = 6;
        request.storeMerchandiseType = StoreMerchandiseType.Pw4gold7;
  
        console.log("Player #" + request.pid + " will do action " + request.actionType)
        console.log("*************************************")
        g.processPlayerRequest(request)
        console.log("******************see the benefit****************************")
        console.log(player)
      });

      it('qic vp action test', () => {
        let current_player = 0
        let player = g.players[current_player]
        player.qic += 4;    
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
        request.storeMerchandiseType = StoreMerchandiseType.qic2vp;
  
        console.log("Player #" + request.pid + " will do action " + request.actionType)
        console.log("*************************************")
        g.processPlayerRequest(request)
        console.log("******************see the benefit****************************")
        console.log(player)
      });

      it('qic feneration action test', () => {
        let current_player = 0
        let player = g.players[current_player]
        player.qic += 4;       
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
       
       request.storeMerchandiseType = StoreMerchandiseType.qic3fed;
    
       if(!new Action(g, player, request).checkValid()){
        console.log("Player #" + request.pid + " will do action " + request.actionType)
        console.log("*************************************")
        g.processPlayerRequest(request)
        console.log("******************see the benefit****************************")
       // console.log(player)
       }
      });

      it('qic techtile action test', () => {
        let current_player = 0
        let player = g.players[current_player]
        player.qic += 4;    
        console.log(player)
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
       request.storeMerchandiseType = StoreMerchandiseType.qic4tile;

       if(!new Action(g, player, request).checkValid()){
        console.log("Player #" + request.pid + " will do action " + request.actionType)
        console.log("*************************************")
        g.processPlayerRequest(request)
        console.log("******************see the benefit****************************")
       // console.log(player)
       }
      });

      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };
});