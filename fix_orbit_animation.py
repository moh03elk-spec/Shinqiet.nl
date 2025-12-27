
import os

def fix_orbit_animation_css():
    style_path = 'assets/styles.css'
    
    # PROBLEM: The previous mobile interaction CSS used `transform: scale(...) !important`.
    # This overrides the keyframe animation `ssehero-orbit-spin` which relies on `transform: rotate(...)`.
    # RESULT: Icons appear but stay frozen.
    
    # SOLUTION: Animate `width`, `height`, and `opacity` instead.
    # We leave `transform` controlled ONLY by the animation.
    
    new_css = """

/* --- Fix Mobile Orbit Animation (Remove Transform Conflict) --- */
@media (max-width: 968px) {
  .ssehero-orbit-container {
    /* Reset transform to rely on animation only */
    transform: translate(-50%, -50%) !important; 
    
    /* Hide by shrinking to center */
    width: 0 !important;
    height: 0 !important;
    opacity: 0;
    visibility: hidden;
    
    /* Smooth transition for size and fade */
    transition: 
        width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.4s ease;
  }

  .ssehero-orbit-container.is-visible {
    /* Expand to target size */
    width: 90% !important;
    height: 90% !important;
    opacity: 1;
    visibility: visible;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Fix: Applied width/height transition for mobile orbit interaction.")

if __name__ == '__main__':
    fix_orbit_animation_css()
