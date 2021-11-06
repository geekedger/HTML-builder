const fs = require('fs');
const readline = require('readline');
var stream = require('stream');


const {
    stdin: input,
    stdout: output
} = require('process');
const {
    exit
} = require('process');
const path = require('path');
const prompt = require('prompt');


const dir = __dirname + '/styles/';
let chunks = [];
fs.readdir(dir, (err, files) => {
    if (err)
        console.log(err);
    else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {
            // console.log(dir + file);
            fs.stat(dir + file, (err, stats) => {
                if (err) {
                    console.error(err)
                    return
                } else if (stats.isFile && file.split('.').pop() == "css") {
                    const [name, ext] = file.split('.');
                    console.log(name + ' -', ext + ' -', stats.size);
                    let rstream = fs.createReadStream(path.join(__dirname + '/styles/', file));
                    //   rstream.on('data', data => console.log('Data:', data.toString()));
                    rstream.on('data', data => {
                        chunks.push(data.toString())


                    });
                    rstream.on('end', () => {
                        const wstream = fs.createWriteStream(path.join(__dirname, 'bundle.css'));
                        wstream.write(chunks.toString());

                    });

                }
            })
        })
    }
})

// const rl = readline.createInterface({ input, output });
// const wstream = fs.createWriteStream(path.join(__dirname, 'bundle.css'));