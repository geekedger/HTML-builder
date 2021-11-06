const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

var rstream = fs.createReadStream(path.join(__dirname, 'text.txt'));
rstream.on('data', data => console.log('Data:', data.toString()));

//Alternative
// async function logChunks(stream) {
//   for await (const chunk of stream) {
//     console.log(chunk);
//   }
// }

// const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf8'});
// logChunks(stream);
