
import os

def fix_mobile_orbit_rotation():
    style_path = 'assets/styles.css'
    
    with open(style_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The problematic code added earlier:
    # transform: translate(-50%, -50%) !important;
    
    # We need to remove the "!important" from this specific line inside the media query context if possible.
    # OR, we can just replace the whole block if we identify it.
    
    # We will search for the specific comment and the transform line.
    
    target_str = "/* Reset transform to rely on animation only */"
    
    if target_str in content:
        # We found the block. Let's try to replace the line.
        # It looks like:
        # transform: translate(-50%, -50%) !important; 
        
        # We want to replace it with:
        # /* transform: translate(-50%, -50%); removed !important to allow animation w/ rotate */
        
        # But wait, if we remove it, does the base style apply?
        # Base style has `transform: translate(-50%, -50%)`.
        # The animation also applies.
        # So removing the !important is exactly what we need.
        
        new_content = content.replace(
            "transform: translate(-50%, -50%) !important;", 
            "/* transform !important removed to allow rotation */"
        )
        
        # ALSO, we need to ensure the animation is actually running.
        # In CSS, if I previously had `animation: none !important` somewhere? No, I checked styles.css lines 6226.
        # Line 6226 said `animation: none !important` for `.ssehero-scroll-hint`.
        # Orbit container was not cleared.
        
        # However, to be SAFE and ensure "upright" movement:
        # We should append a rule that enforces the counter-rotation on items.
        
        with open(style_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # Now append a reinforcement rule at the end
        extra_css = """

/* --- Fix Mobile Orbit Rotation (Reinforcement) --- */
@media (max-width: 968px) {
  .ssehero-orbit-container.is-visible {
       /* Ensure animation plays when visible */
       animation-play-state: running !important;
  }
  
  .ssehero-orbit-item {
      /* Force counter-spin to keep icons upright */
      animation: ssehero-orbit-counter-spin 120s linear infinite !important;
  }
}
"""
        with open(style_path, 'a', encoding='utf-8') as f:
            f.write(extra_css)

        print("Fixed mobile orbit rotation: Removed conflicting transform !important and reinforced counter-spin.")
        
    else:
        print("Could not find the specific transform block to fix.")

if __name__ == '__main__':
    fix_mobile_orbit_rotation()
