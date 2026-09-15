import os
import glob

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def replace_checkout_with_404():
    files = glob.glob(os.path.join(WORKSPACE, "*.html")) + glob.glob(os.path.join(WORKSPACE, "js", "*.js"))
    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "checkout.html" in content:
            new_content = content.replace("checkout.html", "404.html")
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"[UPDATED] {os.path.basename(fpath)}: replaced checkout.html -> 404.html")

if __name__ == "__main__":
    replace_checkout_with_404()
