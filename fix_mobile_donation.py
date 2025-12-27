
import os

def fix_mobile_donation_css():
    style_path = 'assets/styles.css'
    
    # CSS overrides for .ssedonate-section on mobile
    
    new_css = """

/* --- Mobile Donation Section Fixes --- */
@media (max-width: 968px) {
  /* 1. Container & Grid */
  .ssedonate-section {
    padding: 3rem 1rem;
    background-size: cover; /* Ensure no white patches if bg image used */
  }

  .ssedon-container {
      width: 100%;
      padding: 0;
  }

  .ssedon-grid {
    grid-template-columns: 1fr; /* Stack Left and Right panels */
    gap: 2rem;
  }

  /* 2. Card Styling */
  .ssedon-card {
    padding: 1.5rem; /* Reduce padding from desktop size */
    border-radius: 20px;
  }
  
  .ssedon-heading {
      font-size: 2rem;
      text-align: center;
  }
  
  .ssedon-intro {
      text-align: center;
      font-size: 1rem;
  }

  /* 3. Interval Toggle (Eenmalig / Maandelijks) */
  .ssedon-interval-toggle {
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    padding: 4px;
    height: auto;
    border-radius: 99px;
  }
  
  .toggle-option {
    flex: 1; /* Each takes 50% */
    text-align: center;
    padding: 10px 0;
    font-size: 0.95rem;
    white-space: nowrap;
  }

  /* 4. Amount Grid (Buttons €10, €25, etc) */
  .ssedon-amount-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cols fits nicely */
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .amount-btn {
      width: 100%; 
      font-size: 1rem;
      padding: 0.75rem 0;
  }

  /* 5. Custom Amount & Switches Row */
  .ssedon-custom-row {
    flex-direction: column; /* Stack input on top of switches */
    align-items: stretch;
    gap: 1.5rem;
  }

  .ssedon-input-group {
    width: 100%;
  }
  
  .ssedon-input-wrapper {
      width: 100%;
  }

  .ssedon-switches {
    width: 100%;
    display: flex;
    flex-direction: column; /* Stack switches vertically for clarity or row if fits */
    gap: 1rem;
  }
  
  .ssedon-switch-group {
      width: 100%;
      justify-content: space-between; /* Label left, toggle right */
  }
  
  .switch-label {
      font-size: 0.9rem;
  }

  /* 6. Allocation Buttons (Algemeen, Onderwijs etc) */
  .ssedon-allocation-grid {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping */
    gap: 0.5rem;
    justify-content: center;
  }
  
  .alloc-btn {
      flex: 1 1 auto; /* Grow/shrink */
      min-width: 80px;
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
  }
  
  /* 7. Impact Panel (Right side) */
  .ssedon-panel-impact {
      margin-top: 1rem;
  }
  
  .ssedon-mini-story {
      text-align: center;
  }
  
  .ssedon-calc-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
  }
  
  .ssedon-calc-item {
      padding: 0.5rem;
  }
  
  .ssedon-bars-group {
      padding: 0 1rem;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile donation CSS fix applied.")

if __name__ == '__main__':
    fix_mobile_donation_css()
