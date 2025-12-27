
import os

def fix_mobile_impact_css():
    style_path = 'assets/styles.css'
    
    # CSS overrides for Impact Panel on mobile
    
    new_css = """

/* --- Mobile Impact Panel Fixes --- */
@media (max-width: 968px) {
  /* 1. Calc Grid (3 calculator cards) */
  .ssedon-calc-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.5rem !important;
    margin-bottom: 2rem !important;
  }
  
  .ssedon-calc-item {
    padding: 0.75rem 0.25rem !important; /* Tighter padding */
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 0 !important; /* Allow shrinking */
  }
  
  .ssedon-calc-item strong {
      font-size: 1.5rem !important;
      line-height: 1.2 !important;
  }
  
  .ssedon-calc-item span {
      font-size: 0.75rem !important; /* Smaller label text */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
  }

  /* 2. Progress Bars */
  .ssedon-bars-group {
    padding: 0 !important;
    margin-bottom: 2rem !important;
  }
  
  .ssedon-bar-wrapper {
      margin-bottom: 1rem !important;
  }
  
  .bar-header {
      font-size: 0.9rem !important;
      margin-bottom: 0.25rem !important;
  }
  
  /* 3. Checklist */
  .ssedon-checklist-box {
      border: 1px solid rgba(0,0,0,0.05) !important;
      border-radius: 12px !important;
      padding: 1rem !important;
  }
  
  .ssedon-checklist li {
      font-size: 0.9rem !important;
      margin-bottom: 0.5rem !important;
  }
  
  /* 4. Mini Story Text */
  .ssedon-mini-story {
      font-size: 0.95rem !important;
      line-height: 1.5 !important;
      padding: 0 0.5rem !important;
      margin-bottom: 1.5rem !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile impact panel CSS fix applied.")

if __name__ == '__main__':
    fix_mobile_impact_css()
