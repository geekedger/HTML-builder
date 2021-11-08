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

