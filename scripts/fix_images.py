import os
import urllib.request
import io
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

FIX_IMAGES = [
    {
        "filename": "gear-runner-stairs.webp",
        "url": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&auto=format&fit=crop&q=80",
        "size": (600, 800),
        "quality": 75
    },
    {
        "filename": "gear-dunk.webp",
        "url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
        "size": (500, 600),
        "quality": 75
    },
    {
        "filename": "cricket-bat-pro.webp",
        "url": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=700&auto=format&fit=crop&q=80",
        "size": (600, 600),
        "quality": 75
    }
]

headers = {'User-Agent': 'Mozilla/5.0'}
for item in FIX_IMAGES:
    try:
        req = urllib.request.Request(item['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            img = Image.open(io.BytesIO(resp.read())).convert('RGB')
            img.thumbnail(item['size'], Image.Resampling.LANCZOS)
            target = os.path.join(OUTPUT_DIR, item['filename'])
            img.save(target, 'WEBP', quality=item['quality'])
            print(f"[OK] Fixed {item['filename']}: {os.path.getsize(target)/1024:.1f} KB")
    except Exception as e:
        print(f"[Warn] Error {item['filename']}: {e}")
