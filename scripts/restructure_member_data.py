
import os
import re
import yaml

CONTENT_DIR = 'src/content/members'

def extract_info(content):
    # Try to find joined year
    joined_year = None
    year_match = re.search(r'(20\d{2})级|入组时间[：:]\s*(20\d{2})', content)
    if year_match:
        joined_year = year_match.group(1) or year_match.group(2)
    
    # Try to find research area
    research_areas = None
    ra_match = re.search(r'研究方向为[：:]\s*([^。\n]+)|research interests are\s*([^。\n]+)|mainly focuses on\s*([^。\n]+)', content, re.I)
    if ra_match:
        research_areas = (ra_match.group(1) or ra_match.group(2) or ra_match.group(3)).strip()
        
    # Try to find email
    email = None
    email_match = re.search(r'邮箱[：:]\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|Email[：:]\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', content, re.I)
    if email_match:
        email = email_match.group(1) or email_match.group(2)
        
    return joined_year, research_areas, email

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        full_content = f.read()
    
    parts = re.split(r'---', full_content)
    if len(parts) < 3:
        return
    
    frontmatter_raw = parts[1]
    body = parts[2].strip()
    
    # Extract
    joined_year, research_areas, email = extract_info(body)
    
    # Update frontmatter
    try:
        data = yaml.safe_load(frontmatter_raw)
    except Exception:
        return

    if joined_year: data['joined_year'] = joined_year
    if research_areas: data['research_areas'] = research_areas
    if email: data['email'] = email
    
    # Optional: remove redundant Name from body if it starts with "Name, ..."
    name = data.get('name', '')
    if name:
        # Remove "Name，..." or "Name is ..."
        body = re.sub(rf'^{name}[，,\s]+现?为', '现为', body)
        body = re.sub(rf'^{name}\s+is\s+currently', 'is currently', body)
    
    new_frontmatter = yaml.dump(data, allow_unicode=True, default_flow_style=False)
    new_content = f"--- \n{new_frontmatter}--- \n\n{body}\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {os.path.basename(filepath)}")

def main():
    files = [f for f in os.listdir(CONTENT_DIR) if f.endswith('.md')]
    for filename in files:
        if filename == 'tiantian.md': continue # Skip prof for now as bio is complex
        process_file(os.path.join(CONTENT_DIR, filename))

if __name__ == "__main__":
    main()
