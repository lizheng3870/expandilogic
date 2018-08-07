import {Player, CreatePlayer, RaceType} from '../logic/Player'  
import { Game } from '../logic/Game';
import {Request, RequestType} from '../logic/Request'
import { Hex } from '../logic/Hex';
 
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
    let g = new Game(2)
    g.clearSaveGame()
    g.addPlayer(CreatePlayer('yousong', RaceType.Terrans))//blue
    g.addPlayer(CreatePlayer('nina', RaceType.Xenos))//Yellow
    g.addPlayer(CreatePlayer('yalei', RaceType.HadschHallas)) //red
    g.addPlayer(CreatePlayer('rong', RaceType.Nevlas)) //white
    let request = new Request();
    var out;
    let i = 0;
     // game setup: build the first mine;
    while(i < 4){
        let p = g.getPlayer(i);
        let name = p.name;
        out = await readCommandLine("player number " + i + " " + name + ", please enter the location of your first mine");
        var loc = out.split(" ");
        if(loc.length !== 3){
            console.log("invalid arguments");
            continue;
        }
        let hex = new Hex(parseInt(loc[0]), parseInt(loc[1]),parseInt(loc[2]));
        request.type = RequestType.FirstStructures
        request.pid = i;
        request.hex = hex;
        let flag = g.processSetupFirstStructures(request);
        if(flag) i++;
        g.saveGame();
    }
     // game setup: build the secound mine
    i = 3;
    while(i >= 0){
        let p = g.getPlayer(i);
        let name = p.name;
        out = await readCommandLine("player number " + i + " " + name + ", please enter the location of your secound mine");
        var loc = out.split(" ");
        if(loc.length !== 3){
            console.log("not enough arguments");
            continue;
        }
        let hex = new Hex(parseInt(loc[0]), parseInt(loc[1]),parseInt(loc[2]));
        request.type = RequestType.FirstStructures
        request.pid = i;
        request.hex = hex;
        let flag = g.processSetupFirstStructures(request);
        if(flag) i--;
        g.saveGame();
    }
     rl.close();
    process.exit();
}
 main();