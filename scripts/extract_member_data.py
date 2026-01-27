
import os
import zipfile
import re
import shutil
import xml.etree.ElementTree as ET

SOURCE_DIR = 'public/组员信息'
CONTENT_DIR = 'src/content/members'
IMAGE_DIR = 'public/images/members'

os.makedirs(CONTENT_DIR, exist_ok=True)
os.makedirs(IMAGE_DIR, exist_ok=True)

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as zf:
            xml_content = zf.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text_parts = []
            for node in tree.iter():
                if node.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t':
                    if node.text:
                        text_parts.append(node.text)
                elif node.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p':
                     text_parts.append('\n')
            return ''.join(text_parts).strip()
    except Exception as e:
        print(f"Error reading {docx_path}: {e}")
        return ""

def get_pinyin_slug(name):
    # Very basic placeholder, ideally use pinyin lib but standard lib only
    # Returning original for now, user might have to rename or we handle in next step
    # formatting specifically for file paths
    return name 

def main():
    files = os.listdir(SOURCE_DIR)
    members = {}

    # Group files by name
    for f in files:
        if f.startswith('~$'): continue
        
        name_part = f.split('.')[0].replace('个人信息', '').replace(' 信息', '').strip()
        name_part = name_part.split('-')[0].strip() # Handle 汪守顺-个人信息
        
        if name_part not in members:
            members[name_part] = {'doc': None, 'img': None}
        
        if f.endswith('.docx'):
            members[name_part]['doc'] = f
        elif f.lower().endswith(('.jpg', '.jpeg', '.png')):
            members[name_part]['img'] = f

    print(f"Found {len(members)} members.")

    for name, data in members.items():
        print(f"Processing {name}...")
        
        content = ""
        if data['doc']:
            content = extract_text_from_docx(os.path.join(SOURCE_DIR, data['doc']))
        
        image_path = ""
        if data['img']:
            ext = data['img'].split('.')[-1]
            new_img_name = f"{name}.{ext}"
            shutil.copy(os.path.join(SOURCE_DIR, data['img']), os.path.join(IMAGE_DIR, new_img_name))
            image_path = f"/images/members/{new_img_name}"

        # Heuristic for position
        position = "Member"
        if "硕士" in content:
            position = "Master Student"
        elif "博士" in content:
            position = "PhD Student"
        elif "教授" in content or "老师" in content:
            position = "Professor"
        
        md_content = f"""---
name: '{name}'
title: '{name}'
description: '{name} - {position}'
avatar: '{image_path}'
position: '{position}'
order: 10
tags: [member]
---

{content}
"""
        with open(os.path.join(CONTENT_DIR, f"{name}.md"), 'w') as f:
            f.write(md_content)

if __name__ == "__main__":
    main()
