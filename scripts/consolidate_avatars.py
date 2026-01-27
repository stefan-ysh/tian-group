
import os
import re
import shutil

CONTENT_DIR = 'src/content/members'
PUBLIC_IMAGES = 'public/images'
AVATAR_DIR = 'public/images/avatar'

def main():
    # 1. Ensure AVATAR_DIR exists
    if not os.path.exists(AVATAR_DIR):
        os.makedirs(AVATAR_DIR)
        print(f"Created {AVATAR_DIR}")

    # 2. Move & Rename tiantian-avatar.jpg if it exists in parent dir
    old_tiantian = os.path.join(PUBLIC_IMAGES, 'tiantian-avatar.jpg')
    new_tiantian = os.path.join(AVATAR_DIR, 'tiantian.jpg')
    if os.path.exists(old_tiantian):
        shutil.move(old_tiantian, new_tiantian)
        print(f"Moved {old_tiantian} to {new_tiantian}")

    # 3. Update all .md files in src/content/members
    files = [f for f in os.listdir(CONTENT_DIR) if f.endswith('.md')]
    for filename in files:
        filepath = os.path.join(CONTENT_DIR, filename)
        slug = filename.replace('.md', '')
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Update avatar field in frontmatter
        # We assume they all use .jpg as per the listing in public/images/avatar/
        new_avatar_path = f"/images/avatar/{slug}.jpg"
        
        # Special case for tiantian if slug doesn't match perfectly or if we want to be sure
        if slug == 'tiantian':
            new_avatar_path = "/images/avatar/tiantian.jpg"
            
        content = re.sub(r"avatar: '.*?'", f"avatar: '{new_avatar_path}'", content)
        
        # Update any inline img tags (specifically for tiantian.md)
        content = re.sub(r'<img src="/images/tiantian-avatar.jpg"', f'<img src="/images/avatar/tiantian.jpg"', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

if __name__ == "__main__":
    main()
