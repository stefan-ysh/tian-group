
import os
import re

CONTENT_DIR = 'src/content/members'
IMAGE_DIR = 'public/images/members'

# Mapping based on what I just renamed (or I can infer it, but explicit is safer to avoid errors)
# Actually, the MD files are already renamed. I can open them, read the 'name' field (which is Chinese), 
# and find the image that matches that Chinese name.
# Then rename that image to match the MD filename (pinyin).
# Then update the MD file's avatar field.

def main():
    md_files = [f for f in os.listdir(CONTENT_DIR) if f.endswith('.md')]
    
    for md_file in md_files:
        if md_file == 'tiantian.md': continue 
        
        md_path = os.path.join(CONTENT_DIR, md_file)
        pinyin_slug = md_file.replace('.md', '')
        
        with open(md_path, 'r') as f:
            content = f.read()
        
        # Extract name
        name_match = re.search(r"name: '(.*?)'", content)
        if not name_match:
            print(f"Skipping {md_file}, no name found")
            continue
            
        chinese_name = name_match.group(1)
        
        # Look for image with Chinese name
        # The extension might vary (jpg, png, etc), need to find it
        extensions = ['jpg', 'jpeg', 'png', 'webp']
        found_image = None
        for ext in extensions:
            img_name = f"{chinese_name}.{ext}"
            img_path = os.path.join(IMAGE_DIR, img_name)
            if os.path.exists(img_path):
                found_image = img_name
                break
        
        if found_image:
            ext = found_image.split('.')[-1]
            new_img_name = f"{pinyin_slug}.{ext}"
            old_img_path = os.path.join(IMAGE_DIR, found_image)
            new_img_path = os.path.join(IMAGE_DIR, new_img_name)
            
            # Rename image
            os.rename(old_img_path, new_img_path)
            print(f"Renamed image: {found_image} -> {new_img_name}")
            
            # Update MD content
            new_avatar_path = f"/images/members/{new_img_name}"
            # Replace avatar: '...' with new path
            # The regex handles the quote style in the file
            new_content = re.sub(r"avatar: '.*?'", f"avatar: '{new_avatar_path}'", content)
            
            with open(md_path, 'w') as f:
                f.write(new_content)
            print(f"Updated {md_file} avatar to {new_avatar_path}")
        else:
            print(f"Warning: No image found for {chinese_name} (expected at {IMAGE_DIR})")

if __name__ == "__main__":
    main()
