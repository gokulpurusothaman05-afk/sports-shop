import os
import sys
import urllib.request
import io

from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "images")
os.makedirs(OUTPUT_DIR, exist_ok=True)

IMAGES_CONFIG = [
    {
        "filename": "hero-athlete.webp",
        "url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop&q=80",
        "size": (800, 950),
        "quality": 75
    },
    {
        "filename": "shoe-purple.webp",
        "url": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-pink.webp",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-green.webp",
        "url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-silver-pink.webp",
        "url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-blue-orange.webp",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-black-gold.webp",
        "url": "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "training-card-red.webp",
        "url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80",
        "size": (800, 600),
        "quality": 75
    },
    {
        "filename": "training-shoes-detail.webp",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "gear-runner-stairs.webp",
        "url": "https://images.unsplash.com/photo-1483721074573-58030f179b07?w=700&auto=format&fit=crop&q=80",
        "size": (600, 800),
        "quality": 75
    },
    {
        "filename": "gear-dunk.webp",
        "url": "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=600&auto=format&fit=crop&q=80",
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
        "filename": "cricket-bat-pro.webp",
        "url": "https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=700&auto=format&fit=crop&q=80",
        "size": (600, 600),
        "quality": 75
    },
    {
        "filename": "badminton-racquet.webp",
        "url": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=700&auto=format&fit=crop&q=80",
        "size": (600, 600),
        "quality": 75
    },
    {
        "filename": "men-apparel-1.webp",
        "url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
        "size": (500, 650),
        "quality": 75
    },
    {
        "filename": "women-apparel-1.webp",
        "url": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80",
        "size": (500, 650),
        "quality": 75
    },
    {
        "filename": "kids-sports-1.webp",
        "url": "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80",
        "size": (500, 650),
        "quality": 75
    },
    {
        "filename": "accessories-bag.webp",
        "url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "shoe-cricket-spikes.webp",
        "url": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
        "size": (500, 500),
        "quality": 75
    },
    {
        "filename": "banner-marathon.webp",
        "url": "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=900&auto=format&fit=crop&q=80",
        "size": (800, 450),
        "quality": 75
    }
]

def create_fallback_image(filename, size, text):
    img = Image.new('RGB', size, color=(242, 244, 248))
    draw = ImageDraw.Draw(img)
    draw.rectangle([20, 20, size[0]-20, size[1]-20], fill=(230, 235, 242), outline=(200, 205, 215), width=2)
    draw.text((size[0]//2 - 60, size[1]//2 - 10), text, fill=(50, 55, 65))
    target_path = os.path.join(OUTPUT_DIR, filename)
    img.save(target_path, 'WEBP', quality=75)
    print(f"[Fallback] Created: {filename} ({os.path.getsize(target_path)/1024:.1f} KB)")

def download_and_optimize():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    for item in IMAGES_CONFIG:
        filename = item['filename']
        target_path = os.path.join(OUTPUT_DIR, filename)
        try:
            req = urllib.request.Request(item['url'], headers=headers)
            with urllib.request.urlopen(req, timeout=12) as response:
                data = response.read()
                img = Image.open(io.BytesIO(data))
                img = img.convert('RGB')
                img.thumbnail(item['size'], Image.Resampling.LANCZOS)
                
                # Progressive compression check to guarantee < 100KB
                q = item['quality']
                img.save(target_path, 'WEBP', quality=q, method=6)
                
                while os.path.getsize(target_path) > 95 * 1024 and q > 25:
                    q -= 10
                    img.save(target_path, 'WEBP', quality=q, method=6)
                    
                file_size_kb = os.path.getsize(target_path) / 1024
                print(f"[OK] Saved {filename}: {file_size_kb:.1f} KB (Target < 100KB)")
        except Exception as e:
            print(f"[Warn] Error downloading {filename}: {e}, creating graphic fallback...")
            create_fallback_image(filename, item['size'], filename.replace(".webp", ""))

if __name__ == '__main__':
    download_and_optimize()
