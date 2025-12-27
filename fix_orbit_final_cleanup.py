
import os

def fix_orbit_final_cleanup():
    style_path = 'assets/styles.css'
    
    with open(style_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We found the problematic block around line 6240.
    # It has `transform: translate(-50%, -50%) scale(0.8) !important;`
    # and `transform: translate(-50%, -50%) scale(1) !important;`
    
    # These static transforms with !important are BLOCKING the rotation animation.
    # We must disable them.
    
    new_content = content.replace(
        "transform: translate(-50%, -50%) scale(0.8) !important;",
        "/* transform: translate(-50%, -50%) scale(0.8) !important; DISABLED to allow rotation */ transform: none !important;"
    )
    
    new_content = new_content.replace(
        "transform: translate(-50%, -50%) scale(1) !important;",
        "/* transform: translate(-50%, -50%) scale(1) !important; DISABLED to allow rotation */ transform: none !important;"
    )

    # Note: I'm setting `transform: none !important` momentarily to ensure the old scale is gone,
    # BUT wait, if I set `transform: none !important`, I block the animation again!
    
    # CORRECT APPROACH: Just comment it out.
    # If I comment it out, the cascade falls back to the Desktop styles or the Animation.
    # Desktop style: .ssehero-orbit-container { transform: translate(-50%, -50%); ... animation: ... }
    # Since Animation is running, it controls the transform.
    # So replacing with EMPTY string or comment is best.
    
    # Retrying with commenting out only.
    
    new_content = content.replace(
        "transform: translate(-50%, -50%) scale(0.8) !important;",
        "/* transform scale 0.8 disabled */"
    )
    
    new_content = new_content.replace(
        "transform: translate(-50%, -50%) scale(1) !important;",
        "/* transform scale 1 disabled */"
    )

    with open(style_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed orbit final cleanup: Disabled static transforms that blocked animation.")

if __name__ == '__main__':
    fix_orbit_final_cleanup()
