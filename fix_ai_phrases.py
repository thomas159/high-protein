import os
import re
import glob

def capitalize_match(match):
    return match.group(1).upper()

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace "Minimal prep, maximum flavour, and " (case insensitive, flavour/flavor)
    # capturing the next character to capitalize it.
    content = re.sub(
        r'(?i)minimal prep, maximum flavo[u]?r,\s*and\s+([a-z])',
        capitalize_match,
        content
    )
    
    # Replace "Minimal prep, maximum flavour." or similar at the end of a sentence
    content = re.sub(r'(?i)[.,]?\s*minimal prep, maximum flavo[u]?r[!.,]*', '', content)
    
    # Replace "Start your day right with these" -> "These"
    content = re.sub(r'(?i)Start your day right with these\s+([a-z])', capitalize_match, content)
    content = re.sub(r'(?i)Start your day right with\s+([a-z])', capitalize_match, content)
    content = re.sub(r'(?i)Start your day right\.', '', content)

    # Replace "Elevate your"
    content = re.sub(r'(?i)Elevate your meal prep with\s+([a-z])', capitalize_match, content)
    content = re.sub(r'(?i)Elevate your side dish game with\s+([a-z])', capitalize_match, content)
    content = re.sub(r'(?i)Elevate your', 'Upgrade your', content)

    # Replace "guilt-free"
    content = re.sub(r'(?i)guilt-free', 'macro-friendly', content)

    # Replace "Indulge in the" -> "Enjoy the"
    content = re.sub(r'(?i)Indulge in', 'Dig into', content)
    content = re.sub(r'(?i)Indulge', 'Dig in', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for filepath in glob.glob("content/recipes/*.md"):
    process_file(filepath)
