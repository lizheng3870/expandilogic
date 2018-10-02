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



describe('Player Actions Tests', () => {
  let g: Game
  before(() => {
    var playernum = 3
    var race: number[] = new Array(playernum);

    g = new Game(1)
    g.techBoard = new TechBoard(false);
    let i = 0
    g.setPlayerNum(playernum);
    //loop to create different player
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //Totally 14 race, but logic team only work with 8 race
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

    //   g.board.planetsMap.forEach((value: Planet, key: string) => {
    //     console.log(key, value);
    // }); 
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
      // FirstStructures
      //0123
      console.log("Turn: " + g.turn)

      let request = new Request()
      let current_player = g.turn % g.players.length;
      let player = g.players[current_player];

      let playerAvailabePlanet = playAvailablePlanetMap.get(current_player)
      //Random Planet from list
      // console.log(playerAvailabePlanet);
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

      // console.log("Player#" + request.pid + " Place mines at "+ hex)
    }
    //Revert Place Mines
    for (i = g.players.length - 1; i >= 0; i--) {
      //3210
      console.log("Turn: " + g.turn)

      let request = new Request()
      let current_player = g.turn % g.players.length;
      let player = g.players[current_player];

      let playerAvailabePlanet = playAvailablePlanetMap.get(current_player)
      //Random Planet from list
      // console.log(playerAvailabePlanet);
      // let flag
      let hex
      // do {
      //   flag = false
        let randomNum = Math.floor(Math.random() * playerAvailabePlanet.length);
        console.log("Random num is " + randomNum)
        let randomPlant = playerAvailabePlanet[randomNum];
        console.log("Player choose Planets " + randomPlant.type)
        hex = randomPlant.loc;
        console.log("Planet's loc is " + hex)
      //   if (player.planets[0].loc === hex)
      //     flag = true

      // } while (flag);


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

  //Begin Play
  it('New Game Start', () => {
    var preRound = 1
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var j = 0
    var randomRoundBoosterID = shuffle(numbers)
    while (g.round <= 6) {
      console.log("Current round is " + g.round + " preRound is " + preRound +" turn is "+ g.turn +" player is " + g.players[g.turn].pid)
      if (preRound < g.round) {
        randomRoundBoosterID = shuffle(numbers)
        j = 0
        preRound++;
      }

      let current_player = g.turn 
      let player = g.players[current_player];
      let request = new Request()
      request.type = RequestType.Action
      console.log("*************************************")
      do {
        var randomAction = Math.floor(Math.random() * 9);
        console.log("Random Action is " + randomAction)
        request.actionType = randomAction;
        request.pid = player.pid;
        console.log("Current turn is " + g.turn )
        console.log("request.pid is " + g.players[g.turn].pid )
        switch (randomAction) {
          case ActionType.BuildMine: {
            console.log("................Try BuildMine")
            let randomRange: number
            randomRange = Math.floor(Math.random() * player.range + 1)
            console.log("Random range is " + randomRange)

            let availablePlanet = g.board.getAvailablePlanetsInRange(randomRange, player)
            console.log("Available planets are " + availablePlanet)
            let randomNum = Math.floor(Math.random() * availablePlanet.length)
            console.log("Random pick planet " + randomNum)
            if (availablePlanet.length !== 0)
              request.hex = availablePlanet[randomNum].loc
            else request.hex = player.planets[0].loc
            console.log("Choose build mine Hex: " + request.hex)
            break

          }
          case ActionType.Gaia: {
            //Gaia
            console.log("................Try Gaia")
            let randomRange: number
            randomRange = Math.floor(Math.random() * player.range + 1)
            console.log("Random range is " + randomRange)
            let availablePlanet = g.board.getAvailableTransdimInRange(randomRange, player)
            console.log("Available planets are " + availablePlanet)

            let randomNum = Math.floor(Math.random() * availablePlanet.length)
            console.log("Random pick planet " + randomNum)
            if (availablePlanet.length !== 0)
              request.hex = availablePlanet[randomNum].loc
            else request.hex = player.planets[0].loc
            console.log("Choose Gaia Hex: " + request.hex)
            break
          }
          case ActionType.Upgrade: {
            //Upgrade building
            console.log("................Try Upgrade")

            let p = player.planets[Math.floor(Math.random() * player.planets.length)]
            console.log("The build on random planet was a " + p.building + "Location is " + p.loc)
            if (p.building === 0)
              request.upgradeType = UpgradeType.MineToStation;
            else if (p.building === 1) {
              let labOrInstitute = Math.floor(Math.random() * 2);
              if (labOrInstitute === 1)
                request.upgradeType = UpgradeType.StationToInstitute;
              else
                request.upgradeType = UpgradeType.LabToAcademy;
            }
            else if (p.building === 2)
              request.upgradeType = UpgradeType.LabToAcademy;
            request.hex = p.loc
            break
          }
          case ActionType.Federate: {
            //Federate
            //   request.path.push(h2);
            // request.path.push(h3);
            // request.path.push(new Hex(4,2,-6));
            // request.path.push(new Hex(5,2,-7));
            // request.path.push(new Hex(6,1,-7));
            // request.path.push(new Hex(8,1,-9));
            // request.path.push(h4);
            // request.federationTokenType = 1;
            console.log("................Try Frederation")

            console.log("Federate")
            break
          }
          case ActionType.Research: {
            console.log("................Try research")

            let randomTechLine = Math.floor(Math.random() * 6)   //TechLaneType.Dig
            console.log("Player reserarch " + randomTechLine)

            request.techLane = randomTechLine; //0-5
            break
          }
          case ActionType.PowerAndQIC: {
            console.log("................Try Store")

            let randomMerchandiseType = Math.floor(Math.random() * 7)  //StoreMerchandiseType.Pw7sci3
            console.log("Player exchange " + randomMerchandiseType)

            request.storeMerchandiseType = randomMerchandiseType //0-6
            break
          }
          case ActionType.Special: {
            console.log("................Try to use Special Action")

            let randomSpecialActionSource = Math.floor(Math.random() * 4)  // SpecialActionSource.RoundBooster 
            console.log("Player use Special Action " + randomSpecialActionSource)

            request.specialActionSource = randomSpecialActionSource  //0-3
            break
          }
          case ActionType.Free: {
            console.log("................Try free exchange items")

            request.freeExchangeItems = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)] // Material 0-9
            request.freeExchangeTimes = 1;
            break
          }
          case ActionType.Pass: {
            console.log("................Try pass")

            let flag = true
            var i = 0
            var randomBoostID

            console.log(randomRoundBoosterID)
            do {
              flag = true
              for (i = 0; i < g.players.length; i++) {
                randomBoostID = randomRoundBoosterID[j]
                // console.log("Player #" + i + " is using roundbooster " + g.players[i].roundBooster.id)
                // console.log("Let's try" + randomBoostID)

                if (g.players[i].roundBooster.id == randomBoostID) {
                  flag = false;
                  j++;
                }
              }
            } while (!flag)
            j++;
            request.roundBoosterID = randomBoostID;
            console.log("Player #" + request.pid + " pass the game, and pick roundBoosterID" + request.roundBoosterID)
            break
          }
        }
      } while (!new Action(g, player, request).checkValid());

      console.log("Player #" + request.pid + " will do action " + request.actionType)
      console.log("*************************************")

      g.processPlayerRequest(request)
      console.log("End turn")
    }
  });

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  function checkBuildMineValid() {

  }

});