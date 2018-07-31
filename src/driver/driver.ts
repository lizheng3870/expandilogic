import {Player, CreatePlayer, RaceType} from '../logic/Player'
import { Game } from '../logic/Game';
import {Request, RequestType, UpgradeType, TechLaneType} from '../logic/Request'
import { Hex } from '../logic/Hex';
import {ActionType} from '../logic/Action'
import {StructureType} from '../logic/Structure'


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readCommandLine(text: String): PromiseLike<string> {
    return new Promise((resolve, reject) => {
    rl.question(text + "\n", (answer: string) => {
    // TODO: Log the answer in a database
    resolve(answer)
    });
})
}

async function main() {
    // var out = await readCommandLine("please enter the number of players");
    // console.log("the number is: " + out);
    // var personCount = await readCommandLine('plz enter person number');
    // console.log('xxx' + personCount);

    // start the game
    let g = new Game(1)
      g.clearSaveGame()




    g.addPlayer(CreatePlayer('Yousong', RaceType.Terrans))//blue
    g.addPlayer(CreatePlayer('Nina', RaceType.Xenos))//Yellow
    g.addPlayer(CreatePlayer('Yalei', RaceType.HadschHallas)) //red
    g.addPlayer(CreatePlayer('Rong', RaceType.Nevlas)) //white

    let request = new Request();
    var out;
    let i = 0;



    out = await readCommandLine("Demo 1 : initialize map and add 4 players ");
    g.saveGame()
    out = await readCommandLine("Demo 2 : Setup Phase each Player build two mine one map ");

    out = await readCommandLine("Demo 2 (1/8) : player(pid:0) build mine on location Hex(0, 0, 0) ");
    {
      let request = new Request()
      let hex = new Hex(0, 0, 0);
      request.type = RequestType.FirstStructures
      request.pid = 0;
      request.hex = hex;
      g.processSetupFirstStructures(request)
      g.saveGame()

    }

  out = await readCommandLine("Demo 2 (2/8) : player(pid:1) build mine on location Hex(2, 3, -5) ");
  {
    let request = new Request()
    let hex = new Hex(2, 3, -5);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 1;
    request.hex = hex;
    console.log(g.turn)
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (3/8) : player(pid:2) build mine on location Hex(5, -2, -3) ");
  {
    let request = new Request()
    let hex = new Hex(5, -2, -3);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 2;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (4/8) : player(pid:3) build mine on location Hex(-5, 2, 3) ");
  {
    let request = new Request()
    let hex = new Hex(-5, 2, 3);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 3;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (5/8) : player(pid:3) build mine on location Hex(2, 3, -5) ");
  {
    let request = new Request()
    let hex = new Hex(-6, 3, 3);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 3;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (6/8) : player(pid:2) build mine on location Hex(4, -1, -3) ");
  {
    let request = new Request()
    let hex = new Hex(4, -1, -3);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 2;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (7/8) : player(pid:1) build mine on location Hex(3, 3, -6) ");
  {
    let request = new Request()
    let hex = new Hex(3, 3, -6);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 1;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()
  }

  out = await readCommandLine("Demo 2 (8/8) : player(pid:0) build mine on location Hex(4, 6, -10) ");
  {
    let request = new Request()
    let hex = new Hex(4, 6, -10);
    //console.log(hex)
    request.type = RequestType.FirstStructures
    request.pid = 0;
    request.hex = hex;
    g.processSetupFirstStructures(request)
    g.saveGame()

  }

  {
    let request = new Request()
    request.type = RequestType.Roundbooter
    request.pid = 0;
    request.roundBoosterID = 3;
    g.processRoundRooter(request)
  }
  {
    let request = new Request()
    request.type = RequestType.Roundbooter
    request.pid = 1;
    request.roundBoosterID = 4;
    g.processRoundRooter(request)


    request.pid = 2;
    request.roundBoosterID = 0;
    g.processRoundRooter(request)


    request.pid = 3;
    request.roundBoosterID = 9;
    g.processRoundRooter(request)

  }

    out = await readCommandLine("Demo 3 :Action player(pid:0) build mine on location Hex(1, -1, 0) which cost  2 gold  1 ore ")
   {
     let request = new Request()
     request.type = RequestType.Action
     request.actionType = ActionType.BuildMine
     request.pid = 0;
     request.hex = new Hex(1, -1, 0);
     g.processPlayerRequest(request)
     g.saveGame()
   }

   out = await readCommandLine("Demo 3 :Action player(pid:1) update mine structure to station on location Hex(2, 3, -5) which cost  2 gold  1 ore ")


  {
         let request = new Request()
         request.type = RequestType.Action
         request.actionType = ActionType.Upgrade
         request.upgradeType = UpgradeType.MineToStation;
         request.pid = 1;
         request.hex = new Hex(2, 3, -5);
        g.saveGame()
  }

  out = await readCommandLine("Demo End : Thank you ")
    process.exit();
}

main();
