
import os

def fix_css():
    style_path = 'assets/styles.css'
    footer_path = 'assets/footer_styles.css'

    with open(style_path, 'rb') as f:
        content = f.read()

    # Find the marker for the last good block
    # .sseform-btn-submit:hover { ... text-decoration: none !important; ... }
    # We look for the last closing brace after "sseform-btn-submit:hover"
    
    marker_str = b'.sseform-btn-submit:hover'
    idx = content.rfind(marker_str)
    
    if idx == -1:
        print("Could not find anchor point.")
        return

    # Find the next closing brace }
    end_brace_idx = content.find(b'}', idx)
    if end_brace_idx == -1:
        print("Could not find closing brace.")
        return

    # Trim everything after the brace
    clean_content = content[:end_brace_idx+1]

    # Read the footer styles
    with open(footer_path, 'rb') as f:
        footer_content = f.read()

    # Write back
    with open(style_path, 'wb') as f:
        f.write(clean_content + b'\n\n' + footer_content)
    
    print("Fixed styles.css")

if __name__ == '__main__':
    fix_css()
