
const { promises: fs } = require("fs");
const path = require("path");

async function copyDir(src, dest) {

    try  {
        await fs.rm(dest, { recursive: true });
    }
    catch {}   

    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));