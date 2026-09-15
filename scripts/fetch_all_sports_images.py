import os
import urllib.request
import io
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Curated high-res sports photography with 100% accurate visual match
PRODUCTS_IMAGES = [
    # 1. Hero and Section banners
    {
        "filename": "hero-athlete.webp",
        "url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop&q=80",
        "size": (800, 950),
        "quality": 75
    },
    {
        "filename": "training-card-red.webp",
        "url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80",
        "size": (800, 600),
        "quality": 75
    },
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
        "filename": "gear-sitting-athlete.webp",
        "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
        "size": (500, 600),
        "quality": 75
    },
    {
        "filename": "training-shoes-detail.webp",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 2. Cricket Products
    {
        "filename": "cricket-bat.webp",
        "url": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "cricket-ball.webp",
        "url": "https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "cricket-spikes.webp",
        "url": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "cricket-pads.webp",
        "url": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 3. Badminton Products
    {
        "filename": "badminton-racquet.webp",
        "url": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shuttlecock.webp",
        "url": "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "badminton-shoes.webp",
        "url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 4. Running & Track Products
    {
        "filename": "running-shoes-volt.webp",
        "url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "running-trail-shoes.webp",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "running-vest.webp",
        "url": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 5. Gym & Fitness Products
    {
        "filename": "dumbbells-hex.webp",
        "url": "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "kettlebell.webp",
        "url": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "resistance-bands.webp",
        "url": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "gym-shaker.webp",
        "url": "https://images.unsplash.com/photo-1570831739421-ea0543946214?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "yoga-mat.webp",
        "url": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "gym-duffle.webp",
        "url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 6. Football Products
    {
        "filename": "football-match.webp",
        "url": "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "football-cleats.webp",
        "url": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "goalkeeper-gloves.webp",
        "url": "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    # 7. Basketball & Apparel Products
    {
        "filename": "basketball-ball.webp",
        "url": "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "basketball-shoes.webp",
        "url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "training-jersey.webp",
        "url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "sports-cap.webp",
        "url": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    }
]

def fetch_and_save_all():
    headers = {'User-Agent': 'Mozilla/5.0'}
    for item in PRODUCTS_IMAGES:
        filename = item['filename']
        target_path = os.path.join(OUTPUT_DIR, filename)
        try:
            req = urllib.request.Request(item['url'], headers=headers)
            with urllib.request.urlopen(req, timeout=12) as resp:
                img = Image.open(io.BytesIO(resp.read())).convert('RGB')
                img.thumbnail(item['size'], Image.Resampling.LANCZOS)
                
                q = item['quality']
                img.save(target_path, 'WEBP', quality=q, method=6)
                
                while os.path.getsize(target_path) > 95 * 1024 and q > 20:
                    q -= 10
                    img.save(target_path, 'WEBP', quality=q, method=6)
                
                print(f"[OK] {filename}: {os.path.getsize(target_path)/1024:.1f} KB")
        except Exception as e:
            print(f"[Warn] Error {filename}: {e}")

if __name__ == '__main__':
    fetch_and_save_all()
