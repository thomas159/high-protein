import urllib.request
import urllib.parse
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + urllib.parse.quote('Hello') + '&q=' + urllib.parse.quote('World')
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
result = json.loads(response.read().decode('utf-8'))
for item in result[0]:
    print(item[0])
