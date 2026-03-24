#!/usr/bin/env python3
"""Download biography images using Wikipedia API for fresh URLs, then optimize."""

import json, urllib.request, urllib.parse, os, subprocess, time, re

BIOS_DIR = "public/images/bios"
DATA_FILE = "data/notable-christians.json"
ATTRIBUTION_FILE = "data/image-attribution.json"
DELAY = 1.5

os.makedirs(BIOS_DIR, exist_ok=True)

with open(DATA_FILE) as f:
    d = json.load(f)

# Map slug → person + Wikipedia title guess
people = []
for cat in d['categories']:
    for sub in cat.get('subcategories', []):
        for p in sub.get('people', []):
            img = p.get('image', '')
            if img and img.startswith('http'):
                people.append(p)

print(f"Found {len(people)} people with images")

# Load existing attribution
if os.path.exists(ATTRIBUTION_FILE):
    with open(ATTRIBUTION_FILE) as f:
        attribution = json.load(f)
else:
    attribution = []
existing_slugs = {a['slug'] for a in attribution}

def get_wiki_thumb(title, size=400):
    """Get thumbnail URL from Wikipedia API."""
    encoded = urllib.parse.quote(title)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={encoded}&prop=pageimages&format=json&pithumbsize={size}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'SDGChurch/1.0 (https://sdg.church) Python/3'
    })
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    pages = data.get('query', {}).get('pages', {})
    for pid, page in pages.items():
        if 'thumbnail' in page:
            return page['thumbnail']['source']
    return None

def extract_wiki_title(url):
    """Try to extract a Wikipedia article title from a Wikimedia image URL."""
    # The URL might have the person's name encoded in the filename
    return None

def name_to_wiki_title(name):
    """Convert a person's name to likely Wikipedia article title."""
    return name.replace(' ', '_')

def download_and_optimize(url, outpath):
    """Download image and optimize with ImageMagick."""
    req = urllib.request.Request(url, headers={
        'User-Agent': 'SDGChurch/1.0 (https://sdg.church) Python/3'
    })
    tmppath = outpath + '.tmp'
    with urllib.request.urlopen(req, timeout=30) as resp:
        with open(tmppath, 'wb') as out:
            out.write(resp.read())
    subprocess.run([
        'convert', tmppath,
        '-resize', '400x>',
        '-quality', '85',
        '-strip',
        outpath
    ], check=True, capture_output=True)
    os.remove(tmppath)
    return os.path.getsize(outpath) / 1024

# Special Wikipedia title mappings for tricky names
WIKI_TITLES = {
    'johann-sebastian-bach': 'Johann_Sebastian_Bach',
    'george-frideric-handel': 'George_Frideric_Handel',
    'felix-mendelssohn': 'Felix_Mendelssohn',
    'fanny-crosby': 'Fanny_Crosby',
    'cs-lewis': 'C._S._Lewis',
    'jrr-tolkien': 'J._R._R._Tolkien',
    'john-milton': 'John_Milton',
    'fyodor-dostoevsky': 'Fyodor_Dostoevsky',
    'gk-chesterton': 'G._K._Chesterton',
    'john-bunyan': 'John_Bunyan',
    'augustine-of-hippo': 'Augustine_of_Hippo',
    'leo-tolstoy': 'Leo_Tolstoy',
    'george-macdonald': 'George_MacDonald',
    'isaac-newton': 'Isaac_Newton',
    'blaise-pascal': 'Blaise_Pascal',
    'michael-faraday': 'Michael_Faraday',
    'gregor-mendel': 'Gregor_Mendel',
    'george-washington-carver': 'George_Washington_Carver',
    'louis-pasteur': 'Louis_Pasteur',
    'johannes-kepler': 'Johannes_Kepler',
    'robert-boyle': 'Robert_Boyle',
    'james-clerk-maxwell': 'James_Clerk_Maxwell',
    'francis-collins': 'Francis_Collins',
    'leonhard-euler': 'Leonhard_Euler',
    'bernhard-riemann': 'Bernhard_Riemann',
    'georg-cantor': 'Georg_Cantor',
    'michelangelo-buonarroti': 'Michelangelo',
    'rembrandt-van-rijn': 'Rembrandt',
    'albrecht-drer': 'Albrecht_Dürer',
    'antoni-gaud': 'Antoni_Gaudí',
    'martin-luther': 'Martin_Luther',
    'john-calvin': 'John_Calvin',
    'jonathan-edwards': 'Jonathan_Edwards_(theologian)',
    'charles-haddon-spurgeon': 'Charles_Spurgeon',
    'john-wesley': 'John_Wesley',
    'george-whitefield': 'George_Whitefield',
    'william-wilberforce': 'William_Wilberforce',
    'william-wilberforce-politicians': 'William_Wilberforce',
    'dietrich-bonhoeffer': 'Dietrich_Bonhoeffer',
    'billy-graham': 'Billy_Graham',
    'jim-elliot': 'Jim_Elliot',
    'hudson-taylor': 'Hudson_Taylor',
    'eric-liddell': 'Eric_Liddell',
    'william-carey': 'William_Carey_(missionary)',
    'adoniram-judson': 'Adoniram_Judson',
    'david-livingstone': 'David_Livingstone',
    'george-mller': 'George_Müller',
    'corrie-ten-boom': 'Corrie_ten_Boom',
    'john-macarthur': 'John_MacArthur_(pastor)',
    'rc-sproul': 'R._C._Sproul',
    'dl-moody': 'Dwight_L._Moody',
    'amy-carmichael': 'Amy_Carmichael',
    'francis-schaeffer': 'Francis_Schaeffer',
    'john-piper': 'John_Piper_(theologian)',
    'aw-tozer': 'A._W._Tozer',
    'lottie-moon': 'Lottie_Moon',
    'watchman-nee': 'Watchman_Nee',
    'charles-finney': 'Charles_Grandison_Finney',
    'william-booth': 'William_Booth',
    'gladys-aylward': 'Gladys_Aylward',
    'tim-tebow': 'Tim_Tebow',
    'stephen-curry': 'Stephen_Curry',
    'jeremy-lin': 'Jeremy_Lin',
    'allyson-felix': 'Allyson_Felix',
    'russell-wilson': 'Russell_Wilson',
    'kirk-cousins': 'Kirk_Cousins',
    'manny-pacquiao': 'Manny_Pacquiao',
    'david-robinson': 'David_Robinson_(basketball)',
    'simone-biles': 'Simone_Biles',
    'sadie-robertson-huff': 'Sadie_Robertson',
    'gabby-douglas': 'Gabby_Douglas',
    'coco-gauff': 'Coco_Gauff',
    'dak-prescott': 'Dak_Prescott',
    'drew-brees': 'Drew_Brees',
    'lecrae': 'Lecrae',
    'lauren-daigle': 'Lauren_Daigle',
    'tobymac': 'TobyMac',
    'carrie-underwood': 'Carrie_Underwood',
    'chance-the-rapper': 'Chance_the_Rapper',
    'switchfoot': 'Switchfoot',
    'for-king-and-country': 'For_King_%26_Country',
    'denzel-washington': 'Denzel_Washington',
    'chris-pratt': 'Chris_Pratt',
    'mark-wahlberg': 'Mark_Wahlberg',
    'candace-cameron-bure': 'Candace_Cameron_Bure',
    'jim-caviezel': 'Jim_Caviezel',
    'chuck-norris': 'Chuck_Norris',
    'kirk-cameron': 'Kirk_Cameron',
    'patrick-bet-david': 'Patrick_Bet-David',
    'pat-gelsinger': 'Pat_Gelsinger',
    's-truett-cathy': 'S._Truett_Cathy',
    'fred-smith': 'Frederick_W._Smith',
    'james-tour': 'James_Tour',
    'john-lennox': 'John_Lennox',
    'rosalind-picard': 'Rosalind_Picard',
    'william-d-phillips': 'William_Daniel_Phillips',
    'pete-hegseth': 'Pete_Hegseth',
    'oliver-north': 'Oliver_North',
    'desmond-doss': 'Desmond_Doss',
    'alvin-york': 'Alvin_C._York',
    'marcus-luttrell': 'Marcus_Luttrell',
    'mike-pence': 'Mike_Pence',
    'ben-carson': 'Ben_Carson',
    'tim-scott': 'Tim_Scott',
    'mike-pompeo': 'Mike_Pompeo',
    'abraham-lincoln': 'Abraham_Lincoln',
    'george-washington': 'George_Washington',
    'marco-rubio': 'Marco_Rubio',
    'charlie-kirk': 'Charlie_Kirk_(activist)',
    'jimmy-carter': 'Jimmy_Carter',
}

success = 0
skipped = 0
failed = []

for i, p in enumerate(people):
    slug = p['slug']
    outpath = os.path.join(BIOS_DIR, f"{slug}.jpg")
    
    if os.path.exists(outpath):
        skipped += 1
        continue
    
    wiki_title = WIKI_TITLES.get(slug, name_to_wiki_title(p['name']))
    
    try:
        # Get fresh thumbnail URL from Wikipedia API
        thumb_url = get_wiki_thumb(wiki_title)
        if not thumb_url:
            # Try with just the name
            thumb_url = get_wiki_thumb(name_to_wiki_title(p['name']))
        
        if not thumb_url:
            failed.append((slug, p['name'], 'No Wikipedia thumbnail found'))
            continue
        
        size_kb = download_and_optimize(thumb_url, outpath)
        success += 1
        
        if slug not in existing_slugs:
            attribution.append({
                'slug': slug,
                'name': p['name'],
                'source_url': thumb_url,
                'wikipedia_article': f"https://en.wikipedia.org/wiki/{wiki_title}",
                'license': 'Public Domain / CC BY-SA (Wikimedia Commons)',
                'local_path': f"/images/bios/{slug}.jpg"
            })
            existing_slugs.add(slug)
        
        print(f"  [{success + skipped}/{len(people)}] {p['name']} ({size_kb:.0f}KB)")
        time.sleep(DELAY)
        
    except Exception as e:
        failed.append((slug, p['name'], str(e)[:100]))
        print(f"  FAILED: {p['name']}: {str(e)[:80]}")
        time.sleep(DELAY)

print(f"\nDone: {success} downloaded, {skipped} already existed, {len(failed)} failed")
if failed:
    print("\nFailed:")
    for slug, name, err in failed:
        print(f"  {name} ({slug}): {err}")

with open(ATTRIBUTION_FILE, 'w') as f:
    json.dump(attribution, f, indent=2, ensure_ascii=False)
    f.write('\n')

print(f"Attribution saved for {len(attribution)} images")
