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
        terminate();
        process.exit();     
    }
    rl.question('', handler);
    wstream.write(answer + '\n');
}

function terminate() {
    rl.write("\nBYE BYE !!!");
    process.exit(0);
  }

rl.question('Prompt anything: ', handler);
rl.addListener('close', terminate);