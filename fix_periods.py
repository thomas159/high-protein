import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If seoMetaDescription ends with a letter and then a double quote, add a period.
    # E.g., recovery meal" -> recovery meal."
    new_content = re.sub(r'(seoMetaDescription:\s*".*?[a-zA-Z0-9])"', r'\1."', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed periods in {filepath}")

for filepath in glob.glob("content/recipes/*.md"):
    process_file(filepath)
