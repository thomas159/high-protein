import os
import re

files = [
    "content/recipes/ninja-creami-rum-and-raisin-ice-cream.md",
    "content/recipes/ninja-creami-salted-peanut-butter-ice-cream.md",
    "content/recipes/no-bake-5-ingredient-protein-balls.md",
    "content/recipes/one-pan-spinach-and-chickpea-coconut-curry.md",
    "content/recipes/quick-microwave-baba-ganoush.md",
    "content/recipes/quick-moroccan-couscous.md",
    "content/recipes/satay-peanut-sauce.md",
    "content/recipes/spicy-korean-tofu-marinade.md",
    "content/recipes/stir-fried-sweet-and-sour-vegetables.md",
    "content/recipes/thai-carrot-soup.md",
    "content/recipes/thick-cut-sweet-potato-fries.md",
    "content/recipes/tikka-tofu-marinade.md",
    "content/recipes/udon-peanut-butter-noodles.md"
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. YAML multiline description
    def repl_desc(m):
        desc = m.group(1)
        desc = desc.replace('<br><br>', '\n  ').replace('<br>', '\n  ')
        # Remove hardcoded amounts
        desc = re.sub(r'\b\d+g\b', 'a heavy hit', desc)
        desc = re.sub(r'\b\d+ kcal\b', 'solid macros', desc)
        return f"description: |\n  {desc}"
    
    content = re.sub(r'^description:\s*"(.*?)"$', repl_desc, content, flags=re.MULTILINE)

    # 2. British spellings
    spellings = {
        'flavor': 'flavour',
        'caramelize': 'caramelise',
        'tenderize': 'tenderise',
        'stabilize': 'stabilise',
        'Yogurt': 'Yoghurt',
        'yogurt': 'yoghurt',
        'dialled': 'dialled' # already correct
    }
    for us, uk in spellings.items():
        content = content.replace(us, uk)

    # 3. Gym metaphors & E-E-A-T details
    # We inject some general fitness metaphors if they don't exist
    if 'PB' not in content and 'rep' not in content and 'target' not in content:
        content = content.replace('hitting your targets', 'hitting your daily targets like a new PB')
        content = content.replace('perfectly balance', 'perfectly balance the macros, acting like a spotter for your diet')

    # Remove hardcoded amounts from text (excluding ingredients block)
    # Just a simple regex to replace things like "0.25 tsp" or "1 tbsp" outside of ingredients.
    # This is dangerous, so we'll just target specific known bad ones from the prompt.
    content = content.replace('0.25 tsp', 'a pinch')
    content = content.replace('1 tbsp', 'a spoonful')
    content = content.replace('1 tsp', 'a dash')
    content = content.replace('66g protein', 'massive protein')
    content = content.replace('74g protein', 'massive protein')
    content = content.replace('24g of plant-based protein', 'serious plant-based protein')
    content = content.replace('21g of protein and 82g of carbs for 570 kcal', 'heavy protein and carbs for solid macros')
    content = content.replace('195 kcal with 7g of protein', 'low calories with solid protein')
    content = content.replace('6g of protein for 181 kcal', 'great protein and healthy fats')

    # Add E-E-A-T fail states to tips if not present
    content = content.replace('A slanted freeze will destroy your Creami blade.', 'A slanted freeze will destroy your Creami blade (it will violently catch and snap).')
    content = content.replace('A slanted freeze will wreck the machine.', 'A slanted freeze will wreck the machine (the blade will catch and snap).')
    content = content.replace('Unless you want it to explode and decorate your microwave.', 'Unless you want it to violently explode and decorate your microwave due to steam pressure buildup.')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in files:
    process_file(f)

print("Done processing files")
