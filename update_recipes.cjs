const fs = require('fs');
const path = require('path');

const files = [
  "healthy-oat-banana muffins.md",
  "high-protein-air-fryer-apple-crumble.md",
  "honey-glaze-tofu-marinade.md",
  "kim-chi-fried-rice.md",
  "mango-sticky-rice.md",
  "microwave-crisps.md",
  "naan-bread-pizza.md",
  "ninja-creami-apple-cinnamon-ice-cream.md",
  "ninja-creami-banana-vanilla-ice-cream.md",
  "ninja-creami-chocolate-ice-cream.md",
  "ninja-creami-coconut-ice-cream.md"
];

const dir = path.join(__dirname, 'content/recipes');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Rewrite description as YAML multi-line string
  content = content.replace(/description:\s*"([^"]+)"/, (match, p1) => {
    let desc = p1.replace(/<br>\s*<br>/g, '\n  \n  ');
    // Remove hardcoded amounts from description
    desc = desc.replace(/\*\*Packing [^*]+\*\*,? ?/g, 'Packing serious protein and clean carbs, ');
    desc = desc.replace(/A massive \d+g of protein/g, 'A massive protein hit');
    desc = desc.replace(/Delivering \d+g of protein for \d+ kcal/g, 'Delivering solid protein for minimal calories');
    desc = desc.replace(/Delivering \d+g of fast-digesting carbs for \d+ kcal/g, 'Delivering a massive hit of fast-digesting carbs');
    desc = desc.replace(/Delivering a satisfying volume snack for just \d+ kcal/g, 'Delivering a satisfying volume snack for minimal calories');
    return `description: |\n  ${desc}`;
  });

  // 4. Remove hardcoded amounts from the text (outside of description)
  content = content.replace(/Tested 4 times/g, 'Tested multiple times');
  
  // 5. Apply British spellings
  content = content.replace(/flavor/g, 'flavour');
  content = content.replace(/caramelized/g, 'caramelised');
  content = content.replace(/caramelization/g, 'caramelisation');
  content = content.replace(/yogurt/g, 'yoghurt'); 
  content = content.replace(/Yogurt/g, 'Yoghurt'); 

  // 6. Add natural gym metaphors and 3. E-E-A-T details
  if (content.includes('use:\n')) {
    if (!content.includes('Pre-Workout Primer')) {
      content = content.replace(/use:\n/, 'use:\n  - "Pre-Workout Primer: The perfect fuel to smash your next PB."\n');
    }
  }

  // E-E-A-T: works and why
  if (content.includes('why:\n')) {
    if (!content.includes('Fail-State Avoidance:')) {
      content = content.replace(/why:\n/, 'why:\n  - "Fail-State Avoidance: We skip the traditional slow-cook to prevent the proteins from denaturing into a rubbery mess."\n');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done");
