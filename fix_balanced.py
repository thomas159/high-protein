import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Replace the generic "perfectly balanced" phrase with more natural persona phrasing
    content = content.replace(
        "A perfectly balanced hit of carbs and protein disguised as an elite dessert.",
        "Solid macros disguised as a premium dessert."
    )
    content = content.replace(
        "A perfectly balanced hit of protein and carbs disguised as an elite dessert.",
        "Spot-on macros disguised as a premium dessert."
    )
    content = content.replace(
        "A perfectly balanced hit of fast-digesting carbs.",
        "A solid hit of fast-digesting carbs."
    )
    content = content.replace(
        "A perfectly balanced hit of carbs and protein.",
        "A solid hit of carbs and protein."
    )
    content = content.replace(
        "Perfectly balanced with salty soy sauce and a zing of lemon.",
        "Balances out beautifully with salty soy sauce and a sharp zing of lemon."
    )
    content = content.replace(
        "Perfectly balanced to fuel your recovery.",
        "Dialled in to fuel your recovery."
    )
    content = content.replace(
        "zero messy cleanup, perfectly balanced macros, and maximum gains.",
        "zero messy cleanup, solid macros, and maximum gains."
    )
    content = content.replace(
        "keeps the macros perfectly balanced.",
        "keeps the macros dialled in."
    )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for filepath in glob.glob("content/recipes/*.md"):
    process_file(filepath)
