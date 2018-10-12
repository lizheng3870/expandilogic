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
import TechTile from '../logic/TechTiles';
import { FederationTokenType } from '../logic/Federation';

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }

describe('qic action test', ()=>{
    let g : Game
    before(() => {

        g = new Game(1)
        g.techBoard = new TechBoard(false);
       
        g.addPlayer(CreatePlayer('player0', RaceType.Terrans)) // blue
        g.addPlayer(CreatePlayer('player1', RaceType.Xenos))  //yellow
        g.addPlayer(CreatePlayer('player2', RaceType.HadschHallas))  //red
        g.addPlayer(CreatePlayer('player3', RaceType.Nevlas))   //while
    
      });
    
      
      it('qic vp action test', () => {
        let current_player = 0
        let player = g.players[current_player]
        player.qic += 4;    //  for testing, give a player 4 qic
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
        request.storeMerchandiseType = StoreMerchandiseType.qic2vp;

        if(g.store.checkQic(player,request.storeMerchandiseType)){
            g.processPlayerRequest(request)
            console.log("******************see the benefit of VP****************************")
            console.log(player)
            console.log("***************")   
        }
      });

      it('qic federation action test', () => {
        let current_player = 1
        let player = g.players[current_player]
        player.qic += 4;       //  for testing, give a player 4 qic
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
       
       request.storeMerchandiseType = StoreMerchandiseType.qic3fed;


       var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //Totally 9 techtiles 
       var randomPick = shuffle(numbers);
       if(g.store.checkQic(player,request.storeMerchandiseType)){
           console.log("federation success");
        request.federationTokenType = randomPick[0];

        g.processPlayerRequest(request)
        console.log("******************see the benefit of Federation****************************")
        console.log(player)
        console.log("***************")
        console.log(request.federationTokenType+" : " +player.federations[0] )
        console.log(player.federationBenefits)
       }
      });

      it('qic techtile action test', () => {
        let current_player = 2
        let player = g.players[current_player]
        player.qic += 4;    //  for testing, give a player 4 qic
        
        let request = new Request()
        request.type = RequestType.Action
     
        request.actionType = ActionType.PowerAndQIC; // power and qic action
        request.pid = player.pid
  
       request.storeMerchandiseType = StoreMerchandiseType.qic4tile;


       var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //Totally 7 federation token
       var randomPick = shuffle(numbers);
       if(g.store.checkQic(player,request.storeMerchandiseType)){
        console.log("tech tile success");
        //request.techTileID = randomPick[0];
        request.techTileID = 7;

        console.log(player)
        g.processPlayerRequest(request)
        console.log("******************see the benefit of TechTile****************************")
        console.log(player)
        console.log("***************")
        console.log(request.techTileID+" : " +player.techTiles[0] )
       }

      });

      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };
});