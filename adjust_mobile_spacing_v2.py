
import os

def adjust_mobile_spacing_v2():
    style_path = 'assets/styles.css'
    
    # Requirements:
    # 1. "zet alles meer omhoog" -> Reduce padding-top further (e.g. 60px).
    # 2. "tekst in het grijs in het kleiner" -> Target .ssehero-subtitle (or relevant class) on mobile.
    
    new_css = """

/* --- Mobile Spacing V2 & Text Styling --- */
@media (max-width: 968px) {
  /* 1. Even higher up */
  .ssehero-section {
    padding-top: 50px !important; /* Reduced from 90px to 50px */
    min-height: auto !important;
  }
  
  .ssehero-visual-col {
    margin-bottom: 1rem !important; /* Tighter gap below logo */
  }
  
  /* 2. Specific Text Styling */
  /* "Een warme thuisbasis..." is inside .ssehero-subtitle */
  .ssehero-subtitle {
    color: #777 !important; /* Grijs */
    font-size: 0.85rem !important; /* Kleiner */
    line-height: 1.5 !important;
    font-weight: 400 !important;
    max-width: 90%; /* Prevent too wide text */
    margin-inline: auto; /* Keep centered */
  }
  
  /* Ensure title is also tight */
  .ssehero-title {
    margin-bottom: 1rem !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile spacing v2 and text styling applied.")

if __name__ == '__main__':
    adjust_mobile_spacing_v2()
