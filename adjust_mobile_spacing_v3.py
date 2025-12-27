
import os

def adjust_mobile_spacing_v3():
    style_path = 'assets/styles.css'
    
    # Requirements:
    # 1. "View iets lager" -> Increase padding-top slightly (50px -> 75px).
    # 2. "Ontdek meer knop los van tekst" -> Make it relative flow instead of absolute bottom.
    # 3. "Netjes gecentreerd" -> Margin auto.
    
    new_css = """

/* --- Mobile Spacing V3 & Scroll Hint Fix --- */
@media (max-width: 968px) {
  /* 1. Position Content Lower (75px) */
  .ssehero-section {
    padding-top: 75px !important; 
    padding-bottom: 4rem !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Ensure top alignment */
  }

  /* 2. Scroll Hint: Flow naturally below text */
  .ssehero-scroll-hint {
    position: static !important; /* No longer absolute at bottom */
    transform: none !important;
    margin-top: 2rem !important; /* Space from text */
    margin-inline: auto !important; /* Centered */
    opacity: 1 !important; /* Ensure visible */
    animation: none !important; /* Simplify mobile paint */
  }
  
  /* Ensure text column takes height needed */
  .ssehero-text-col {
    margin-bottom: 2rem;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Mobile spacing v3 and relative scroll hint applied.")

if __name__ == '__main__':
    adjust_mobile_spacing_v3()
