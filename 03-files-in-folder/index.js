const fs = require('fs');
  
const dir = __dirname + '/secret-folder/';
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
        } else if (stats.isFile()) {
            const [name, ext] = file.split('.');
            console.log(name + ' -', ext + ' -', convertBytes(stats.size));
        }
      })
    })
  }
})

const convertBytes = function(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  if (bytes == 0) {
    return "n/a"
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  if (i == 0) {
    return bytes + " " + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(3) + " " + sizes[i]
}

// const fs = require('fs/promises');
// const path = require('path');

// async function folderRead() {
//     try {
//     const files = await fs.readdir(path.join(__dirname, 'secret-folder/'), {withFileTypes: true});
//     for (const file of files)
//         if (file.isFile()) {
//             console.log(file)
//         };

//     } catch (err) {
//     console.error(err);
//     }
// };

// folderRead();

// const fs = require('fs/promises');
// const path = require('path');

// async function folderRead() {
//     try {
//         const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {
//             withFileTypes: true
//         });
//         for (const file of files) {
//             fs.stat("example_file.txt", (error, stats) => {
//                 if (error) {
//                   console.log(error);
//                 }
//                 else {
//                   console.log("Stats object for: example_file.txt");
//                   console.log(stats);
                
//                   // Using methods of the Stats object
//                   console.log("Path is file:", stats.isFile());
//                   console.log("Path is directory:", stats.isDirectory());
//                 }
//               });
//             }
//     } catch (err) {
//         console.error(err);
//     }
// };

// folderRead();