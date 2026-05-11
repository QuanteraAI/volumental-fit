import urllib.request
import json
import random

queries = [
    ("ecommerce", "sizing returns"),
    ("FemaleFashionAdvice", "sizing inconsistent"),
    ("supplychain", "returns apparel")
]

results = []
req_headers = {'User-Agent': 'Mozilla/5.0'}

for sub, q in queries:
    url = f"https://www.reddit.com/r/{sub}/search.json?q={urllib.parse.quote(q)}&restrict_sr=on&sort=relevance&t=all"
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            for child in data['data']['children'][:6]:
                results.append({
                    'user': 'u/' + child['data']['author'],
                    'quote': child['data']['title'][:150] + "...",
                    'source': 'r/' + sub,
                    'category': sub.lower()
                })
    except Exception as e:
        print(f"Error fetching {sub}: {e}")

print(json.dumps(results, indent=2))
