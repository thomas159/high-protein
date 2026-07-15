import urllib.request
import urllib.parse
import json
import ssl
import yaml
import glob
import os
import time

ssl._create_default_https_context = ssl._create_unverified_context

keys_to_translate = {
    "title", "seoMetaDescription", "description", "alt", "tipsTitle", 
    "tips", "works", "use", "variations", "servingSuggestions", 
    "storageInstructions", "item", "type", "question", "answer", 
    "steps", "text"
}

def translate_text(text):
    if not isinstance(text, str) or not text.strip():
        return text
    
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    retries = 3
    for attempt in range(retries):
        try:
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode('utf-8'))
            time.sleep(0.05) # small delay to avoid rate limits
            return ''.join([sentence[0] for sentence in result[0]])
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print("Rate limited. Waiting 2 seconds...")
                time.sleep(2)
            else:
                raise
        except Exception as e:
            print("Error translating:", e)
            time.sleep(1)
            
    return text

def translate_obj(obj):
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            if k in keys_to_translate:
                if isinstance(v, str): 
                    new_obj[k] = translate_text(v)
                elif isinstance(v, list):
                    new_list = []
                    for item in v:
                        if isinstance(item, str): new_list.append(translate_text(item))
                        else: new_list.append(translate_obj(item))
                    new_obj[k] = new_list
                else:
                    new_obj[k] = v
            else:
                new_obj[k] = translate_obj(v)
        return new_obj
    elif isinstance(obj, list):
        return [translate_obj(item) for item in obj]
    else:
        return obj

def process_file(f):
    target = f.replace('.md', '.es.md')
    if os.path.exists(target):
        return
        
    with open(f, 'r') as file:
        content = file.read()
            
    parts = content.split('---')
    if len(parts) >= 3:
        frontmatter = parts[1]
        try:
            data = yaml.safe_load(frontmatter)
            translated_data = translate_obj(data)
            
            with open(target, 'w') as out_file:
                out_file.write('---\n')
                # dump translated data with good formatting
                yaml.dump(translated_data, out_file, default_flow_style=False, allow_unicode=True, sort_keys=False)
                out_file.write('---\n')
                
            print(f"Translated {f} -> {target}")
        except Exception as e:
            print(f"Error processing {f}: {e}")

files = glob.glob("content/recipes/*.md") + glob.glob("content/collections/*.md")
# Filter out existing .es.md
files = [f for f in files if ".es.md" not in f]

print(f"Processing {len(files)} files...")
for f in files:
    process_file(f)

