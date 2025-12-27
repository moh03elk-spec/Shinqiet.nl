
import os

def force_mobile_donation_css():
    style_path = 'assets/styles.css'
    
    # User says "no difference". 
    # Current CSS IS in file, but maybe overridden by specificity or missing `!important` on layout properties.
    # We will append a "Forced" block with !important on critical grid/flex props.
    
    new_css = """

/* --- Mobile Donation Section Fixes (FORCED) --- */
@media (max-width: 968px) {
  /* Force Stack Grid */
  .ssedon-grid {
    grid-template-columns: 1fr !important; 
    gap: 2rem !important;
  }
  
  /* Force Toggle Widths */
  .ssedon-interval-toggle {
    display: flex !important;
    width: 100% !important;
  }
  .toggle-option {
    flex: 1 1 0px !important; /* Force equal width */
    width: 50% !important; 
    min-width: 0 !important;
  }

  /* Force 3-col buttons */
  .ssedon-amount-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    display: grid !important;
  }
  
  /* Force Stack Custom Row */
  .ssedon-custom-row {
    flex-direction: column !important;
    display: flex !important;
  }
  
  .ssedon-switches {
     flex-direction: column !important;
     width: 100% !important;
  }
  
  .ssedon-switch-group {
      width: 100% !important;
  }
  
  /* Force Container Padding */
  .ssedon-card {
      padding: 1.25rem !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile donation CSS forced with !important.")

if __name__ == '__main__':
    force_mobile_donation_css()
