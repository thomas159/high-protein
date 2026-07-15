import urllib.request
import urllib.parse
import json
import ssl
import yaml
import glob
import os

keys_to_translate = {
    "title", "seoMetaDescription", "description", "alt", "tipsTitle", 
    "tips", "works", "use", "variations", "servingSuggestions", 
    "storageInstructions", "item", "type", "question", "answer", 
    "steps", "text"
}

def count_strings(obj):
    count = 0
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in keys_to_translate:
                if isinstance(v, str): count += 1
                elif isinstance(v, list):
                    for item in v:
                        if isinstance(item, str): count += 1
                        else: count += count_strings(item)
            else:
                count += count_strings(v)
    elif isinstance(obj, list):
        for item in obj:
            count += count_strings(item)
    return count

total = 0
for f in glob.glob("content/recipes/*.md") + glob.glob("content/collections/*.md"):
    if ".es." in f: continue
    with open(f, 'r') as file:
        content = file.read()
        try:
            parts = content.split('---')
            if len(parts) >= 3:
                frontmatter = parts[1]
                data = yaml.safe_load(frontmatter)
                total += count_strings(data)
        except Exception as e:
            pass
print("Total strings:", total)
