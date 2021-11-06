const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const { exit } = require('process');
const path = require('path');
const prompt = require('prompt');

const rl = readline.createInterface({ input, output });
const wstream = fs.createWriteStream(path.join(__dirname, 'out.txt'));
const handler = async (answer) =>  {
    if (answer == 'exit') {
        console.log("\nBYE BYE !!!");
        process.exit();     
    }
    rl.question('', handler);
    wstream.write(answer + '\n');
}

rl.question('Prompt anything: ', handler);
