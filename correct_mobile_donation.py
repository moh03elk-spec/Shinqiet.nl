
import os

def correct_mobile_donation_css():
    style_path = 'assets/styles.css'
    
    # HTML Classes (Verified):
    # - Container: .ssedon-grid (already targeted, but confirm grid stacking)
    # - Frequency: .ssedon-toggle-pill (This is the pill container).
    # - Amounts : .ssedon-presets (Flex or Grid needed).
    # - Custom  : .ssedon-input-row.
    # - Switches: .ssedon-toggles-extra.
    
    new_css = """

/* --- Mobile Donation Section Fixes (CORRECTED) --- */
@media (max-width: 968px) {
  /* 1. Stack Left/Right Layout */
  .ssedon-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  
  /* 2. Fix Frequency Toggle Widths */
  /* Structure: .ssedon-toggle-pill > input + label + input + label ... */
  .ssedon-toggle-pill {
    display: flex !important;
    width: 100% !important;
    padding: 4px !important;
    position: relative !important;
  }
  
  .ssedon-toggle-pill label {
    flex: 1 !important; /* Force equal width */
    text-align: center !important;
    z-index: 2;
    padding: 10px 0 !important;
    font-size: 0.9rem !important;
    width: 50% !important;
  }
  /* Ensure background pill also respects width if absolute */
  /* Assuming .ssedon-pill-bg moves via JS or CSS peer checked */
  
  /* 3. Fix Amount Grid (Chips) */
  .ssedon-presets {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important; /* 3 columns grid */
    gap: 0.5rem !important;
    flex-wrap: wrap !important; /* Override flex if it was flex */
  }
  
  .ssedon-chip {
    width: 100% !important;
    padding: 0.75rem 0 !important;
    margin: 0 !important; /* Reset any margins */
    text-align: center !important;
  }
  
  /* 4. Fix Input and Switches Row */
  .ssedon-input-row {
    flex-direction: column !important; /* Stack input on top of switches */
    align-items: stretch !important;
    gap: 1rem !important;
    margin-bottom: 1rem !important;
  }
  
  .ssedon-input-wrapper {
      width: 100% !important;
  }

  .ssedon-toggles-extra {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    gap: 0.75rem !important;
    margin-left: 0 !important; /* Reset margin */
  }
  
  .ssedon-switch-label {
      width: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important; /* Toggle ends */
  }

  .ssedon-actions {
      flex-direction: column !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Corrected mobile donation CSS applied.")

if __name__ == '__main__':
    correct_mobile_donation_css()
