import urllib.request
import json
import urllib.parse
import re

queries = [
    ("ecommerce", "sizing returns", 3),
    ("ecommerce", "apparel returns", 2),
    ("FemaleFashionAdvice", "sizing inconsistent", 4),
    ("FemaleFashionAdvice", "vanity sizing", 3),
    ("supplychain", "clothing returns", 3),
    ("logistics", "reverse logistics apparel", 3)
]

results = []

def clean_quote(text):
    text = re.sub(r'http\S+', '', text)
    text = text.replace('\n', ' ').strip()
    # take first ~150 chars, up to last full word
    if len(text) > 150:
        text = text[:150]
        text = text.rsplit(' ', 1)[0] + '...'
    return text.replace('"', "'")

for sub, q, count in queries:
    url = f"https://api.pullpush.io/reddit/search/comment/?q={urllib.parse.quote(q)}&subreddit={sub}&size={count*2}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            added = 0
            for item in data.get('data', []):
                if added >= count:
                    break
                body = item.get('body', '')
                if len(body) > 30 and '[removed]' not in body and '[deleted]' not in body:
                    results.append({
                        'user': 'u/' + item.get('author', 'anonymous'),
                        'quote': clean_quote(body),
                        'source': 'r/' + sub,
                        'category': 'fashion' if sub == 'FemaleFashionAdvice' else sub.lower()
                    })
                    added += 1
    except Exception as e:
        print(f"Error for {sub} - {q}: {e}")

print(json.dumps(results, indent=4))
