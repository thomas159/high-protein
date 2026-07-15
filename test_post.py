import urllib.request
import urllib.parse
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t'
data = urllib.parse.urlencode([('q', 'Hello'), ('q', 'World')]).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
result = json.loads(response.read().decode('utf-8'))
for item in result[0]:
    print(repr(item[0]))
