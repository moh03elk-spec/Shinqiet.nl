
import os

def refine_mobile_toggle_css():
    style_path = 'assets/styles.css'
    
    new_css = """

/* --- Refine Mobile Toggle (Premium Look) --- */
@media (max-width: 968px) {
  .ssedon-toggle-pill {
    background-color: #f7f3f0 !important; /* Lighter beige for contrast */
    border: 1px solid rgba(0,0,0,0.05) !important;
    border-radius: 999px !important;
    padding: 6px !important;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.03) !important;
    height: 54px !important; /* Fixed height for consistency */
    display: flex !important;
    align-items: center !important;
  }
  
  .ssedon-toggle-pill label {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 100% !important;
    border-radius: 999px !important;
    font-weight: 600 !important;
    font-size: 0.95rem !important;
    color: #555 !important;
    transition: all 0.3s ease !important;
    position: relative !important; /* For badge positioning */
    z-index: 2;
  }
  
  /* Active State (Visualized via the checked input's sibling label usually, 
     but since we have a sliding pill bg, we just ensure text contrast) */
  /* Assuming the sliding bg handles the red background. */
  /* If the text color isn't changing, we can force it: */
  input:checked + label {
      color: white !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
  }

  /* Refine the Badge */
  .ssedon-badge-impact {
      position: absolute !important;
      top: -8px !important;
      right: 0 !important;
      font-size: 0.6rem !important;
      padding: 2px 6px !important;
      background: #B6382E !important;
      color: white !important;
      border-radius: 10px !important;
      box-shadow: 0 2px 4px rgba(182, 56, 46, 0.3) !important;
      white-space: nowrap !important;
      transform: scale(0.9) !important;
      /* Ensure it doesn't overlap text too much */
      pointer-events: none !important;
  }
  
  /* If badge is inside the label, just scaling it down helps */
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile toggle refinement applied.")

if __name__ == '__main__':
    refine_mobile_toggle_css()
