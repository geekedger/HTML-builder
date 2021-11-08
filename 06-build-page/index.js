const path = require("path");
const fs = require('fs');
const fsp = require('fs/promises');

async function copyDir(src, dest) {

    try {
        await fsp.rm(dest, {
            recursive: true,
            force: true
        });
    } catch {}

    await fsp.mkdir(dest, {
        recursive: true
    });
    let entries = await fsp.readdir(src, {
        withFileTypes: true
    });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fsp.copyFile(srcPath, destPath);
    }
}

copyDir(path.join(__dirname, 'assets'), path.join(__dirname, '/project-dist/', '/assets/'));


async function buildHtml() {
    const files = await fsp.readdir(path.join(__dirname, 'components'));
    const filtered = files.filter(file => path.extname(file) === '.html');
    const readable = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');
    readable.on('data', async (template) => {
        let bundle = template.toString();
        for (const file of filtered) {
            const componentPath = path.join(path.join(__dirname, 'components'), file);
            const componentItem = await fsp.readFile(componentPath);
            const FileName = path.basename(file, '.html');
            bundle = bundle.replace(`{{${FileName}}}`, componentItem);
        }
        await fsp.writeFile(path.join(__dirname, 'project-dist', 'index.html'), bundle, 'utf8');
    });
}

buildHtml();

async function buildCss() {
    const files = await fsp.readdir(path.join(__dirname, 'styles'));
    const filtered = files.filter(file => path.extname(file) === '.css');
    const bundle = [];
    for (const file of filtered) {
        const componentPath = path.join(path.join(__dirname, 'styles'), file);
        const componentItem = await fsp.readFile(componentPath);
        bundle.push(componentItem);
    }
    await fsp.writeFile(path.join(__dirname, 'project-dist', 'style.css'), bundle.join(''), 'utf8');
}

buildCss();

