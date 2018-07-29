import {Player, CreatePlayer, RaceType} from '../logic/Player'  
import { Game } from './Game';
 

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
    let g = new Game(1)
    g.addPlayer(CreatePlayer('yousong', RaceType.Terrans))//blue
    g.addPlayer(CreatePlayer('nina', RaceType.Xenos))//Yellow
    g.addPlayer(CreatePlayer('yalei', RaceType.Taklons)) //brown
    g.addPlayer(CreatePlayer('rong', RaceType.HadschHallas)) //red
    rl.close();
    process.exit();
}

main();