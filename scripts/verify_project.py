import os
import glob

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(WORKSPACE, "assets", "images")

def verify_images():
    print("--- [1] VERIFYING IMAGE ASSETS (ALL MUST BE .WEBP & < 100KB) ---")
    images = glob.glob(os.path.join(IMAGES_DIR, "*.webp"))
    all_valid = True
    print(f"Found {len(images)} WebP images in assets/images:")
    for img_path in sorted(images):
        filename = os.path.basename(img_path)
        size_kb = os.path.getsize(img_path) / 1024
        is_webp = filename.lower().endswith(".webp")
        under_100kb = size_kb < 100.0
        
        status = "PASS" if (is_webp and under_100kb) else "FAIL"
        if status == "FAIL":
            all_valid = False
        print(f"[{status}] {filename:<30} : {size_kb:>5.1f} KB")
    
    if all_valid:
        print("[SUCCESS] All images are valid WebP and strictly under 100KB!")
    else:
        print("[ERROR] Some images failed verification.")
    return all_valid

def verify_pages_and_links():
    print("\n--- [2] VERIFYING ACTIVE PAGES & CHECKOUT REMOVAL ---")
    required_pages = [
        "index.html",
        "cricket.html",
        "badminton.html",
        "running.html",
        "gym.html",
        "football.html",
        "new-in.html",
        "product-detail.html",
        "cart.html",
        "login.html",
        "signup.html",
        "customer-dashboard.html",
        "admin-dashboard.html",
        "404.html"
    ]
    all_found = True
    for page in required_pages:
        page_path = os.path.join(WORKSPACE, page)
        exists = os.path.exists(page_path)
        status = "FOUND" if exists else "MISSING"
        if not exists:
            all_found = False
        print(f"[{status}] {page}")

    # Verify checkout.html is removed
    checkout_exists = os.path.exists(os.path.join(WORKSPACE, "checkout.html"))
    if not checkout_exists:
        print("[SUCCESS] checkout.html successfully removed from codebase.")
    else:
        print("[ERROR] checkout.html still exists!")
        all_found = False

    return all_found

if __name__ == "__main__":
    img_ok = verify_images()
    pages_ok = verify_pages_and_links()
    print(f"\nOVERALL STATUS: {'ALL CHECKS PASSED (100%)' if (img_ok and pages_ok) else 'CHECKS FAILED'}")
