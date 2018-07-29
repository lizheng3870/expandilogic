// function readCommandLine(text: String): PromiseLike<string> {  
//     return new Promise((resolve, reject) => {    
//         var result = "";    
//         console.log(text);    
//         process.stdin.setEncoding('utf8');    
//         var n;    
//         process.stdin.on('readable', function () {      
//             n = process.stdin.read();      
//             if (n !== null) {        
//                 result = n.toString();              
//                 process.exit();      
//             }    
//         });  
//     })
// }
// async function main() {  
//     var out = await readCommandLine("please enter the number of players");  
//     console.log("the number is: " + out);  
//     var personCount = await readCommandLine('plz enter person number');  
//     console.log('xxx' + personCount);
// }

// main();

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
    var out = await readCommandLine("please enter the number of players");
    console.log("the number is: " + out);
    var personCount = await readCommandLine('plz enter person number');
    console.log('xxx' + personCount);
    rl.close();
    process.exit();
}

main();