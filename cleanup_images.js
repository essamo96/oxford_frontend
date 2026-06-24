const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const imgDir = path.join(rootDir, 'assets', 'img');

function getAllFiles(dir, extList, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        getAllFiles(fullPath, extList, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (!extList || extList.includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const sourceFiles = getAllFiles(rootDir, ['.html', '.css', '.js']);
let sourceCodeCombined = '';
for (const f of sourceFiles) {
  sourceCodeCombined += fs.readFileSync(f, 'utf8') + '\n';
}

const imgFiles = getAllFiles(imgDir);

let deletedCount = 0;
let keptCount = 0;

for (const imgPath of imgFiles) {
  const filename = path.basename(imgPath);
  // Also check if the path or filename is mentioned
  // (we just check if the exact filename is somewhere in the code)
  if (!sourceCodeCombined.includes(filename)) {
    console.log(`Deleting unused image: ${filename}`);
    fs.unlinkSync(imgPath);
    deletedCount++;
  } else {
    keptCount++;
  }
}

console.log(`Cleanup complete. Deleted: ${deletedCount}, Kept: ${keptCount}`);
