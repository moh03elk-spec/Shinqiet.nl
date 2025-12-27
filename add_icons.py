
import os

def add_icons_html():
    html_path = 'index.html'
    
    # We want to insert Items 5 & 6 before the closing </div> of .ssehero-orbit-container
    # A safe unique anchor is the closing of Item 4.
    
    anchor = """                <!-- Icon 4: Scroll/Paper (Tradition) -->
                <div class="ssehero-orbit-item item-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>"""
    
    new_icons = """
                <!-- Icon 5: Open Book (Study) -->
                <div class="ssehero-orbit-item item-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <!-- Icon 6: User/Student (Community) -->
                <div class="ssehero-orbit-item item-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>"""

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize newlines slightly for matching if needed, but python read usually keeps them.
    # If exact match fails, we try a smaller anchor.
    
    if anchor in content:
        # Check if Item 5 is already there to avoid duplicates
        if "item-5" in content:
            print("Items already present.")
        else:
            new_content = content.replace(anchor, anchor + new_icons)
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully added Items 5 & 6.")
    else:
        # Fallback: find the line with "Icon 4" and try to append after its closing div manually using string manipulation
        # This is riskier but necessary if whitespace implies failure
        print("Detailed anchor not found. Trying simpler insertion.")
        
        # Simpler anchor
        simple_anchor = '<div class="ssehero-orbit-item item-4">'
        if simple_anchor in content:
            # Find the position
            idx = content.find(simple_anchor)
            # Find the closing div of this item. It is the second </div> after this pos.
            # 1. First </div> closes SVG? No, SVG closes with </svg>
            # The structure is <div> <svg> ... </svg> </div>
            
            # Let's look for the next "<!-- Orbiting Icons -->" or the closing of container.
            # Actually, let's just use the end of Item 4's SVG as a pivot if we can find it.
            pass
        else:
             print("Could not find Item 4 anchor.")

if __name__ == '__main__':
    add_icons_html()
