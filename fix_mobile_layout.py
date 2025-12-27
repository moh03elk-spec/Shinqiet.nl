
import os

def fix_mobile_layout_css():
    style_path = 'assets/styles.css'
    
    # Fixes:
    # 1. More space (padding-top) for hero content so text is readable (not under header).
    # 2. Icon orbit closer to logo (reduce container size on mobile).
    # 3. Center everything neatly.
    # 4. Fix scroll hint overlap (add padding bottom or move hint down).
    
    new_css = """

/* --- Mobile Layout Fixes (Final Polish) --- */
@media (max-width: 968px) {
  /* 1. Spacing & Centering */
  .ssehero-section {
    padding-top: 140px !important; /* Push content down further from fixed header */
    padding-bottom: 6rem !important; /* Space for scroll hint */
    height: auto; /* Allow growth */
    min-height: 90vh;
  }
  
  .ssehero-grid {
    gap: 4rem !important; /* More space between logo and text */
  }
  
  .ssehero-text-col {
    order: 2; /* Text below logo */
    padding: 0 1rem; /* Horizontal breathing room */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center text align */
    text-align: center;
  }
  
  /* 2. Logo & Orbit Sizing */
  .ssehero-visual-col {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  
  .ssehero-logo-container {
    width: 240px !important; /* Compact container */
    height: 240px !important;
  }
  
  .ssehero-logo {
    width: 120px !important; /* Smaller logo */
  }
  
  /* Bring icons closer on mobile */
  .ssehero-orbit-container {
    width: 135% !important; /* Tighter orbit radius relative to container */
    height: 135% !important;
  }
  
  .ssehero-orbit-item {
    width: 32px !important; /* Smaller icons */
    height: 32px !important;
    padding: 6px !important;
  }
  
  /* 3. Text Readability */
  .ssehero-title {
    margin-bottom: 1.5rem;
  }
  
  .ssehero-line {
    font-size: 2rem !important; /* Readable but not huge */
  }
  
  .ssehero-line.highlight {
    font-size: 2.5rem !important;
  }
  
  .ssehero-subtitle {
     font-size: 1rem !important;
     padding: 0 1rem !important; /* No left border indentation on mobile */
     border: none !important;
  }
  
  /* 4. Scroll Hint */
  .ssehero-scroll-hint {
    bottom: 2rem !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile layout fixes applied.")

if __name__ == '__main__':
    fix_mobile_layout_css()
