import os
import urllib.request
import io
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "images")

FIX_ITEMS = [
    {
        "filename": "cricket-ball.webp",
        "url": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "gym-shaker.webp",
        "url": "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "basketball-ball.webp",
        "url": "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    }
]

headers = {'User-Agent': 'Mozilla/5.0'}
for item in FIX_ITEMS:
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
