const fs = require('fs');
const stream = require('stream');
const path = require('path');

const dir = __dirname + '/styles/';
let chunks = [];
fs.readdir(dir, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            fs.stat(dir + file, (err, stats) => {
                if (err) {
                    console.error(err)
                    return
                } else if (stats.isFile() && file.split('.').pop() == "css") {
                    let rstream = fs.createReadStream(path.join(__dirname + '/styles/', file));
                    rstream.on('data', data => {
                        chunks.push(data.toString());
                    });
                    rstream.on('end', () => {
                        const wstream = fs.createWriteStream(path.join(__dirname + '/project-dist/', 'bundle.css'));
                        wstream.write(chunks.join(''));
                    });
                };
            });
        });
    };
});