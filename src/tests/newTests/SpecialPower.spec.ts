import * as Lab from 'lab'

import { expect } from 'code'
import { Game, GameStatus } from '../../logic/Game'
import { Player, CreatePlayer, RaceType } from '../../logic/Player'
import { Request, RequestType, UpgradeType, TechLaneType, SpecialActionSource } from '../../logic/Request'
import { Hex } from '../../logic/Hex'
import { ActionType, Action } from '../../logic/Action'
import { StructureType } from '../../logic/Structure'
import { StoreMerchandiseType } from '../../logic/Store'
import { Material, BuildingType } from '../../logic/Benefit'
import TechBoard from '../../logic/TechBoard'
import { ScoringBoard } from '../../logic/ScoringBoard'
import { Planet } from '../../logic/Planet';

const lab = Lab.script()
const { describe, it, before } = lab
export { lab }



describe('Player Actions Tests', () => {
  let g: Game
  before(() => {
    var playernum = 2
    var race: number[] = new Array(playernum);

    g = new Game(1)
    g.techBoard = new TechBoard(false);
    g.setPlayerNum(playernum);
    g.addPlayer(CreatePlayer('Play' + 0, 0)); 
    g.addPlayer(CreatePlayer('Play' + 1, 3)); 

    let player = g.players[0]
    //loop to pick random booster
    let request = new Request()
    request.type = RequestType.Roundbooter
    request.pid = player.pid;;
    request.roundBoosterID = 3; //Roundbooster which has special power
    g.processRoundRooter(request)
    console.log("Player #" + request.pid + " pick roundBoosterID " + request.roundBoosterID)

    player = g.players[1]
    request = new Request()
    request.type = RequestType.Roundbooter
    request.pid = player.pid;;
    request.roundBoosterID = 6; //Roundbooster which has special power
    g.processRoundRooter(request)
    console.log("Player #" + request.pid + " pick roundBoosterID " + request.roundBoosterID)
  });


  //Begin Play
  it('New Game Start', () => {
  
      let current_player = g.turn
      let player = g.players[current_player];
      let request = new Request()
      player.roundBooster = g.roundBoosters[3]
      request.type = RequestType.Action
      console.log("*************************************")


      request.actionType = 6; // Special action
      request.pid = player.pid;
      player.printSpecialPower()
      console.log("player.specialDig "  + player.specialDig)

      console.log("................Test using Special Action")
      let list = player.getExistPowerList()
      player.useSpecialPower(list.pop())

      console.log("................After Special Action")
      console.log("player.specialDig "  + player.specialDig)
      player.printSpecialPower()
      console.log("*************************************")
      // g.processPlayerRequest(request)
      console.log("End turn")
    
  });


});