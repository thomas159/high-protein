import urllib.request
import urllib.parse
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def translate(text):
    if not text.strip(): return text
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode('utf-8'))
    return ''.join([sentence[0] for sentence in result[0]])

text = '{"servingSuggestions": "Serve with rice", "faq": [{"question": "Why?", "answer": "Because."}]}'
out = translate(text)
print(repr(out))
try:
    print(json.loads(out))
except Exception as e:
    print("Failed to decode:", e)
