
import os

def hide_mobile_topbar_css():
    style_path = 'assets/styles.css'
    
    new_css = """

/* --- Hide Top Announcement Bar on Mobile --- */
@media (max-width: 968px) {
  .top-bar {
    display: none !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile top bar hidden.")

if __name__ == '__main__':
    hide_mobile_topbar_css()
