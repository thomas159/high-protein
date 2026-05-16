const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.md')) {
      files.push(name);
    }
  }
  return files;
}

const allFiles = [
  ...getFiles(path.join(__dirname, 'content/recipes')),
  ...getFiles(path.join(__dirname, 'content/collections'))
];

let updatedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Remove 'Visual cue:' labels
  content = content.replace(/\*\*Visual [Cc]ue:\*\*\s*/g, '');
  content = content.replace(/Visual [Cc]ue:\s*/g, '');

  // 2. Remove 'Fail-state:' labels
  content = content.replace(/\*\*Fail-[Ss]tate:\*\*\s*/g, '');
  content = content.replace(/Fail-[Ss]tate:\s*/g, '');
  content = content.replace(/\*\*Fail-[Ss]tate Avoidance:\*\*\s*/g, '');
  content = content.replace(/Fail-[Ss]tate Avoidance:\s*/g, '');

  // 3. Remove semicolons (not part of HTML entities)
  // We'll replace them with a comma to maintain sentence flow
  content = content.replace(/(?<!&[a-zA-Z0-9]+);/g, ',');

  // 4. Fix dynamic quantities in text (tips, instructions, etc.)
  content = content.replace(/0\.25 tsp/gi, 'a pinch of');
  content = content.replace(/1\/4 tsp/gi, 'a pinch of');
  content = content.replace(/a spoonful of/gi, 'some');
  content = content.replace(/a spoonful/gi, 'some');
  
  // 5. Title formatting (Ensure first letter is capitalized, trim spaces)
  content = content.replace(/^title:\s*"([^"]+)"/m, (match, title) => {
    let newTitle = title.trim();
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
    return `title: "${newTitle}"`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
  }
}

console.log(`Processed ${allFiles.length} files. Updated ${updatedCount} files.`);
