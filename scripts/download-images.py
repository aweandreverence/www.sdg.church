#!/usr/bin/env python3
"""Download, optimize, and self-host biography images from Wikimedia Commons."""

import json, urllib.request, os, subprocess, time, sys

BIOS_DIR = "public/images/bios"
DATA_FILE = "data/notable-christians.json"
ATTRIBUTION_FILE = "data/image-attribution.json"
DELAY = 2  # seconds between requests to avoid rate limiting

os.makedirs(BIOS_DIR, exist_ok=True)

with open(DATA_FILE) as f:
    d = json.load(f)

# Collect all people with external images (not placeholders)
people = []
for cat in d['categories']:
    for sub in cat.get('subcategories', []):
        for p in sub.get('people', []):
            img = p.get('image', '')
            if img and img.startswith('http'):
                people.append(p)

print(f"Found {len(people)} people with external images to download")

# Load existing attribution
if os.path.exists(ATTRIBUTION_FILE):
    with open(ATTRIBUTION_FILE) as f:
        attribution = json.load(f)
else:
    attribution = []
existing_slugs = {a['slug'] for a in attribution}

success = 0
skipped = 0
failed = []

for i, p in enumerate(people):
    slug = p['slug']
    url = p['image']
    outpath = os.path.join(BIOS_DIR, f"{slug}.jpg")
    
    if os.path.exists(outpath):
        skipped += 1
        continue
    
    try:
        # Download with proper User-Agent
        req = urllib.request.Request(url, headers={
            'User-Agent': 'SDGChurch/1.0 (https://sdg.church; contact@aweandreverence.net) Python/3'
        })
        tmppath = f"/tmp/bio_{slug}_orig"
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(tmppath, 'wb') as out:
                out.write(resp.read())
        
        # Resize to 400px wide, compress to 85% quality, strip metadata
        subprocess.run([
            'convert', tmppath,
            '-resize', '400x>',
            '-quality', '85',
            '-strip',
            outpath
        ], check=True, capture_output=True)
        
        os.remove(tmppath)
        
        size_kb = os.path.getsize(outpath) / 1024
        success += 1
        
        # Track attribution
        if slug not in existing_slugs:
            attribution.append({
                'slug': slug,
                'name': p['name'],
                'source_url': url,
                'license': 'Public Domain / CC BY-SA (Wikimedia Commons)',
                'local_path': f"/images/bios/{slug}.jpg"
            })
            existing_slugs.add(slug)
        
        print(f"  [{success + skipped}/{len(people)}] {p['name']} ({size_kb:.0f}KB)")
        
        # Rate limit
        time.sleep(DELAY)
        
    except Exception as e:
        failed.append((slug, p['name'], str(e)[:100]))
        print(f"  FAILED: {p['name']}: {str(e)[:80]}")
        time.sleep(DELAY)

print(f"\nDone: {success} downloaded, {skipped} already existed, {len(failed)} failed")
if failed:
    print("\nFailed downloads:")
    for slug, name, err in failed:
        print(f"  {name} ({slug}): {err}")

# Save attribution
with open(ATTRIBUTION_FILE, 'w') as f:
    json.dump(attribution, f, indent=2, ensure_ascii=False)
    f.write('\n')

print(f"Attribution saved for {len(attribution)} images")
