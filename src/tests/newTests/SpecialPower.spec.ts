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
    console.log("Player is a RaceType.Terrans " + RaceType.Terrans)
    g.addPlayer(CreatePlayer('Play' + 1, 9)); 
    console.log("Player is a RaceType.Ivits " + RaceType.Ivits)

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
    request.roundBoosterID = 4; //Roundbooster which has special power
    g.processRoundRooter(request)
    console.log("Player #" + request.pid + " pick roundBoosterID " + request.roundBoosterID)
  });


  //Begin Play
  it('New Game Start', () => {
    let request = new Request()

      let current_player = g.turn
      let player = g.players[0]
      console.log("*************************************")
      player.printSpecialPower()
      console.log("................player.specialDig "  + player.specialDig)
      console.log("................Test using Special Action")
      let list = player.getExistPowerList()
      player.useSpecialPower(list.pop())
      console.log("................After Special Action")
      console.log("................player.specialDig "  + player.specialDig)
      player.printSpecialPower()
      console.log("*************************************")

      player = g.players[1]
      console.log("*************************************")
      player.printSpecialPower()
      console.log("................player.specialRange "  + player.specialRange)
      console.log("................Test using Special Action")
      list = player.getExistPowerList()
      player.useSpecialPower(list.pop())
      console.log("................After Special Action")
      console.log("................player.specialRange "  + player.specialRange)
      player.printSpecialPower()
      console.log("*************************************")
      // g.processPlayerRequest(request)
      console.log("End turn")
    
  });


});