import re
import os

recipes = {
    "content/recipes/air-fryer-mozarella-sticks.md": {
        "desc": "  Skip the frozen options. The double-breading on these mozzarella sticks locks the cheese inside, preventing any messy leaks in your air fryer basket.\n  \n  Packing a solid protein hit for minimal calories, this is the ultimate cheat day starter. You get an extra crispy crunch and a massive cheese pull without deep-frying.\n  \n  Tested multiple times to nail the exact double-breading thickness and spice ratio. This structural armour prevents blowouts, ensuring you hit your macro targets perfectly.",
        "works": "  - \"Thermal Shielding: Freezing drops the core temperature, while the double layer of flour and egg acts as a thermal insulator. This ensures the exterior dehydrates and crisps completely before the core temperature rises enough to cause a blowout. If you skip this, the cheese will liquefy and rupture the casing before the crust even sets.\"\n  - \"Structural Integrity: As the egg proteins coagulate and the flour starches gelatinise under the intense heat, they form a rigid, impenetrable matrix that locks the melting cheese inside. Watch for a deep golden-brown crust; if it looks pale, the matrix hasn't fully set.\"",
        "why": "  - \"Superior Crunch: The circulating air delivers a deep-fried texture without swimming in oil. You get that heavy lifting satisfaction without the sluggish aftermath.\"\n  - \"Speed: Frozen to perfectly melted in a fraction of the time.\"\n  - \"Mess-Free: Zero oil splatters to clean up when you're done. Just pure, efficient fuel.\""
    },
    "content/recipes/air-fryer-pizza-tortilla-wrap.md": {
        "desc": "  A flour tortilla is a fantastic, lightweight framework for your pizza toppings. It crisps up beautifully under the intense heat of the air fryer, delivering a quick, crispy pizza.\n  \n  It saves you a massive amount of calories compared to heavy dough. Tested multiple times to balance the moisture of the pesto and tomatoes, ensuring the thin base stays rigid instead of collapsing into a soggy mess.\n  \n  Think of it as a lean, mean macro hack for your cutting phase.",
        "works": "  - \"Macro Hack: Swapping heavy dough for a tortilla saves you a massive amount of calories to spend elsewhere.\"\n  - \"Pesto Efficiency: Pesto brings oil, garlic, nuts, and herbs in a single spoonful. Ultimate flavour efficiency.\"\n  - \"Dehydration Mechanics: The intense circulating air of the fryer rapidly evaporates the surface moisture from the thin flour tortilla. This fundamentally alters its starch structure to shatter-crisp before the toppings have a chance to make it soggy. If the base feels floppy, it needs another minute to fully dehydrate.\"",
        "why": ""
    },
    "content/recipes/air-fryer-rosemary-and-garlic-fries.md": {
        "desc": "  Upgrade your side dish with these fragrant, herb-infused fries. By combining fresh rosemary and savoury garlic with the high-speed crisping of the air fryer, you get extra crispy chips with significantly less fat than traditional frying.\n  \n  Absolutely golden and perfectly seasoned. It's like adding plates to your barbell, but for flavour.\n  \n  Tested to ensure the garlic doesn't burn, delivering a premium side dish without the grease.",
        "works": "  - \"Essential Oil Extraction: The rapid, circulating heat of the air fryer essentially 'fries' the rosemary needles in the olive oil. This violently extracts their fat-soluble essential oils, distributing a deep, earthy aroma across the dehydrating starch crust of every single potato. Look for the needles to turn dark and brittle.\"\n  - \"Starch Evaporation: The intense, circulating heat strips the potatoes of their surface moisture, delivering a satisfying crunch without requiring a deep-fat fryer. If they look pale and soft, the starches haven't dehydrated enough.\"",
        "why": "  - \"Herb Infusion: The rapid air circulation 'toasts' the rosemary needles, releasing their essential oils directly into the potato skin.\"\n  - \"Reduced Fat: Achieve that signature crunch with just a minimal splash of heart-healthy olive oil. Perfect for keeping your macros in check.\"\n  - \"Consistent Heat: No hot spots—the air fryer ensures every fry is evenly browned and infused with garlic.\""
    },
    "content/recipes/air-fryer-sour-cream-fries.md": {
        "desc": "  These irresistible sour cream fries are extra crispy on the outside and fluffy in the centre. Every golden fry is drizzled with a velvety, garlic-infused sour cream sauce.\n  \n  An easy treat that delivers the perfect balance of savoury textures. It's the ultimate post-workout reward that won't derail your progress.\n  \n  Tested to ensure the sauce coats the fries perfectly without turning them into a soggy mess.",
        "works": "  - \"Thermal Coating: The intense residual heat of the fries slightly melts the heavy fats in the cold sour cream upon contact. This instantly transforms the thick dollop into a silky, emulsified sauce that evenly coats the rigid starch crust without immediately turning it soggy. If the sauce splits, the fries were too hot.\"\n  - \"Air-Fried Armour: The air fryer violently strips moisture, creating a rigid exterior that holds up under the heavy sauce. You want a deep golden crunch to act as the perfect structural base.\"",
        "why": "  - \"Superior Crunch: Circulating heat delivers a deep-fried snap with barely any oil. Like a perfect deadlift, it's all about solid form.\"\n  - \"Brutal Efficiency: Raw potato to fully loaded plate in record time.\""
    },
    "content/recipes/chimichurri-sauce.md": {
        "desc": "  The ultimate quick flavour hack. Macerating the raw garlic in red wine vinegar removes the harsh bite, perfectly balancing the heavy olive oil and fresh herbs.\n  \n  The perfect zesty chimichurri to drizzle over grilled seitan or roasted veg for a massive, healthy upgrade. It's the ultimate condiment to superset your meals.\n  \n  Tested to ensure the acidity perfectly cuts through the fat, delivering a balanced, punchy profile.",
        "works": "  - \"Enzymatic Mellowing (Maceration): Soaking the raw minced garlic in red wine vinegar first halts the production of allicin—the compound responsible for raw garlic's aggressive, burning bite. This yields a smooth, deeply savoury pungency that perfectly balances the heavy olive oil. If you skip this, the raw garlic will overpower the entire sauce.\"\n  - \"Fat and Acid Synergy: The heavy olive oil is perfectly sliced open by the sharp vinegar. Look for a vibrant green emulsion that holds together nicely.\"",
        "why": ""
    },
    "content/recipes/chipotle-lime-tofu-marinade.md": {
        "desc": "  Give your meal prep a serious Mexican-inspired kick. The lime juice breaks down the dense outer layer of the tofu, letting the deep, smoky chipotle oils penetrate right to the core.\n  \n  This easy marinade caramelises beautifully in the air fryer for your post-workout tacos. It's a high-protein powerhouse that hits all your targets.\n  \n  Tested to ensure the marinade sticks and chars perfectly, delivering maximum flavour efficiency.",
        "works": "  - \"Acidic Permeation: The low pH of the lime juice attacks the rigid soy protein structure of the tofu. This slight surface breakdown allows the heavy, fat-soluble smoky oils from the chipotle adobo to infiltrate the block rather than just washing off in the pan. If the tofu is too wet, the acid can't penetrate.\"\n  - \"Sugar Caramelisation: The natural sugars in the adobo sauce char rapidly under the air fryer's heat, building a proper BBQ-style bark. Watch for a dark, sticky crust; if it's pale, it needs more heat.\"",
        "why": "  - \"The Acid Factor: High citric acid breaks down the tofu's defence mechanisms, pulling the marinade to the core. Just like breaking down muscle fibres to build them back stronger.\"\n  - \"Smoky Char: Chipotle sugars caramelise brutally fast, mimicking a traditional BBQ sear.\"\n  - \"Versatile Umami: A heavy-hitting protein base for everything from wraps to salads.\""
    },
    "content/recipes/chocolate-orange-ninja-creami-ice-cream.md": {
        "desc": "  A massive protein hit disguised as a decadent chocolate orange dessert. Using the Ninja Creami turns this macro-friendly mix of whey and cocoa into the ultimate ultra-creamy gelato-like dream.\n  \n  The absolute cheat code for hitting your targets without sacrificing flavour. It's a PB for your tastebuds.\n  \n  Tested endlessly to nail the exact ratio of cocoa to fresh orange zest, preventing it from tasting like artificial medicine.",
        "works": "  - \"Structural Matrix: Whey protein and cocoa powder act as exceptional mechanical binders. When frozen and violently micro-shaved by the Creami blade, these dry ingredients stabilise the ice crystals in the low-fat milk, replicating the dense, velvety mouthfeel of heavy cream. If it comes out powdery, it just needs a re-spin with a splash of milk.\"\n  - \"Micro-Shaving: The Creami blade violently shaves the solid ice block into an aerated masterpiece. Ensure the surface is perfectly flat before freezing to avoid blade damage.\"\n  - \"Flavour Synergy: Deep cocoa is perfectly sliced open by the sharp, acidic orange zest.\"",
        "why": "  - \"Macro Friendly: Premium ice cream satisfaction for a fraction of the calories and a massive protein spike. The ultimate recovery fuel.\"\n  - \"Customisable: You control every gram of sugar and fat. Perfect for strict cuts.\"\n  - \"No Gums Needed: The whey and cocoa provide enough structure to skip the artificial stabilisers.\""
    },
    "content/recipes/creamy-feta-and-cherry-tomato-pasta.md": {
        "desc": "  This easy pasta is a delicious, low-effort dish perfect for busy weeknights or when you're craving a comforting carb refeed. The combination of sweet cherry tomatoes, pasta, and an ultra-creamy feta sauce creates a brilliant meal.\n  \n  Guaranteed to hit the spot and fuel your recovery. It's a heavy-lifting meal that takes minimal prep.\n  \n  Tested to ensure the feta melts into a smooth sauce without turning grainy.",
        "works": "  - \"Acid and Fat Synergy: The sharp acidity of the wine and tomatoes violently cuts the heavy cream and salty feta. Look for the tomatoes to blister and burst, releasing their sweet juices.\"\n  - \"Starch-Stabilised Emulsion: Feta is prone to splitting into a grainy, oily mess when heated. By aggressively tossing the melting cheese with starchy pasta water, the starch molecules physically intercept the fat and water, binding them into a thick, unbreakable, ultra-creamy sauce. If it splits, add more pasta water and whisk vigorously.\"",
        "why": ""
    },
    "content/recipes/creamy-low-calorie-garlic-sauce.md": {
        "desc": "  A brilliant low-calorie swap that doesn't taste like diet food. Using a heavy ratio of Greek yoghurt to mayonnaise slashes the fat while delivering a massive protein spike.\n  \n  A quick ultra-creamy texture that acts as the perfect dip for your meal prep. It's lean, efficient, and hits all the right macros.\n  \n  Tested multiple times to perfectly balance the sharp raw garlic bite against the tangy Greek yoghurt, so it tastes like a genuine, premium aioli.",
        "works": "  - \"Fat Balance: Greek yoghurt aggressively slashes the calories while maintaining a thick, premium texture. It's the ultimate macro hack.\"\n  - \"Enzymatic Mellowing: Resting the sauce allows the sharp allicin enzymes in the raw garlic to oxidise and mellow out in the fat of the mayo and yoghurt. This prevents the garlic from chemically burning your palate. If you eat it immediately, the raw garlic will be overpowering.\"",
        "why": ""
    },
    "content/recipes/creamy-mushroom-pasta.md": {
        "desc": "  A bowl of pure comfort for when you need a serious carb reload. Searing the mushrooms hard creates a deep, meaty umami crust that elevates the entire dish.\n  \n  The starchy pasta water emulsifies the parmesan flawlessly. It's the perfect post-workout fuel to replenish your glycogen stores.\n  \n  Tested endlessly to perfectly balance the starchy pasta water emulsion against the heavy cream, ensuring it binds into a thick, glossy sauce without splitting.",
        "works": "  - \"The Maillard Reaction: High-heat searing caramelises the mushrooms, delivering a massive umami hit. Leave them undisturbed until a deep brown crust forms; if you stir too early, they will just steam and turn rubbery.\"\n  - \"Starch Emulsion: The amylose starches leached into the pasta water physically intercept the heavy cream fats, binding them into a thick, glossy emulsion that clings to the pasta without splitting into a greasy pool. Watch for the sauce to coat the back of a spoon.\"",
        "why": "  - \"The Maillard Reaction: Sautéing until golden unlocks a deep, meaty umami flavour that carries the entire dish. Like building a solid foundation for your lifts.\"\n  - \"The Emulsion Secret: Starchy pasta water combined with butter creates a glossy coating that actually clings to the pasta.\"\n  - \"Acidic Lift: The wine's acidity alters the pH, cutting straight through the heavy lipid structure of the cream and preventing the dish from becoming a cloying disaster.\""
    },
    "content/recipes/garam-masala-tofu-marinade.md": {
        "desc": "  This quick Garam Masala marinade is a flavour powerhouse. The lime juice tenderises the tofu, letting the earthy ginger and Indian spices penetrate right to the core.\n  \n  It builds a phenomenal charred crust in the air fryer. High-protein, totally vegan, and zero BS—the perfect fuel for your gains.\n  \n  Tested to ensure the spices bloom perfectly without burning under the intense heat.",
        "works": "  - \"Acidic Denaturation: The citric acid from the lime juice partially denatures the dense soy protein lattice on the tofu's surface. This micro-breakdown creates pathways for the heavy Indian aromatics to penetrate deeper into the core. If the tofu isn't pressed properly, the water will block the marinade.\"\n  - \"Char Factor: High heat caramelises the ginger and garlic paste into an elite crust. Look for dark, crispy edges that signal the perfect Maillard reaction.\"",
        "why": "  - \"Deeper Flavour: Letting it sit drags the aromatics past the surface layer. It's all about time under tension for maximum results.\"\n  - \"The Perfect Char: Garlic and ginger sugars caramelise under high heat for elite 'tandoori-style' crispy edges.\"\n  - \"Lean Macros: A massive flavour punch without touching heavy creams or oils.\""
    }
}

for path, updates in recipes.items():
    with open(path, 'r') as f:
        content = f.read()
    
    # Replace description
    desc_pattern = re.compile(r'^description:\s*".*?"$', re.MULTILINE | re.DOTALL)
    content = desc_pattern.sub(f"description: |\n{updates['desc']}", content)
    
    # Replace works section
    if updates.get('works'):
        works_pattern = re.compile(r'^works:\n(?:  - ".*?"\n)*', re.MULTILINE)
        content = works_pattern.sub(f"works:\n{updates['works']}\n", content)
        
    # Replace why section
    if updates.get('why'):
        why_pattern = re.compile(r'^why:\n(?:  - ".*?"\n)*', re.MULTILINE)
        content = why_pattern.sub(f"why:\n{updates['why']}\n", content)
        
    # British spellings & general text replacements outside of frontmatter keys
    content = content.replace("flavor", "flavour")
    content = content.replace("flavorful", "flavourful")
    content = content.replace("caramelize", "caramelise")
    content = content.replace("caramelizes", "caramelises")
    content = content.replace("gelatinize", "gelatinise")
    content = content.replace("stabilize", "stabilise")
    content = content.replace("stabilizers", "stabilisers")
    content = content.replace("yogurt", "yoghurt")
    content = content.replace("Yogurt", "Yoghurt")
    
    # Remove hardcoded amounts from text (like '10g of protein', '289 kcal', etc.)
    # I've handled the description ones in the replacement strings. 
    # Let's do a few explicit ones in the rest of the text.
    content = re.sub(r'Packing 10g of protein for 289 kcal, ', '', content)
    content = re.sub(r'saves you an easy 300 calories', 'saves you a massive amount of calories', content)
    content = re.sub(r'Clocking in at just 150 kcal with 6g of protein, ', '', content)
    content = re.sub(r'Delivering 24g of protein and 88g of carbs for 780 kcal, ', '', content)
    content = re.sub(r'A massive 62g protein hit', 'A massive protein hit', content)
    
    with open(path, 'w') as f:
        f.write(content)

print("Updates applied successfully.")
