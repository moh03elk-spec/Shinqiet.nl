
import os

def refine_orbit_css_v2():
    style_path = 'assets/styles.css'
    marker = "/* --- Dynamic Orbiting Logo Icons --- */"
    
    # Requirements:
    # 1. "Rechtop" (Upright) -> Ensure counter-spin matches spin.
    # 2. "Langzamer" (Slower) -> Increase duration (e.g. 100s).
    # 3. "Afstand en terug" (Distance and back) -> Animate orbit size (breathing).
    
    new_css_block = """/* --- Dynamic Orbiting Logo Icons --- */
.ssehero-logo-container {
  position: relative;
  /* Ensure container establishes a positioning context */
}

/* Wrapper for the orbit to handle the breathing (in/out) independent of rotation if needed, 
   but we can just animate width/height on the container directly for simplicity. */
.ssehero-orbit-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* Base size */
  width: 130%;
  height: 130%;
  
  /* Animations: 
     1. Spin (Rotation) - Very slow (120s)
     2. Breathe (Distance in/out) - Subtle, independent timing (8s)
  */
  animation: 
    ssehero-orbit-spin 120s linear infinite, 
    ssehero-orbit-breathe 8s ease-in-out infinite alternate;
    
  pointer-events: none;
  z-index: 10;
}

.ssehero-orbit-item {
  position: absolute;
  width: 40px; 
  height: 40px;
  color: var(--ssenav-gold);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Counter spin must match the orbit speed (120s) to keep icons upright relative to screen */
  animation: ssehero-orbit-counter-spin 120s linear infinite;
}

/* Positioning 6 items in a hexagon (0, 60, 120, 180, 240, 300 degrees) */
/* 1: Top (0 deg) */
.ssehero-orbit-item.item-1 { top: 0; left: 50%; margin-left: -20px; margin-top: -20px; }
/* 2: Top-Right (60 deg) -> x: 93.3%, y: 25% */
.ssehero-orbit-item.item-2 { top: 25%; left: 93.3%; margin-left: -20px; margin-top: -20px; }
/* 3: Bottom-Right (120 deg) -> x: 93.3%, y: 75% */
.ssehero-orbit-item.item-3 { top: 75%; left: 93.3%; margin-left: -20px; margin-top: -20px; }
/* 4: Bottom (180 deg) */
.ssehero-orbit-item.item-4 { top: 100%; left: 50%; margin-left: -20px; margin-top: -20px; }
/* 5: Bottom-Left (240 deg) -> x: 6.7%, y: 75% */
.ssehero-orbit-item.item-5 { top: 75%; left: 6.7%; margin-left: -20px; margin-top: -20px; }
/* 6: Top-Left (300 deg) -> x: 6.7%, y: 25% */
.ssehero-orbit-item.item-6 { top: 25%; left: 6.7%; margin-left: -20px; margin-top: -20px; }

@keyframes ssehero-orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes ssehero-orbit-counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes ssehero-orbit-breathe {
  0% { width: 125%; height: 125%; }
  100% { width: 145%; height: 145%; } /* Subtle expansion */
}
"""

    with open(style_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if marker in content:
        parts = content.split(marker)
        pre_content = parts[0]
        # Overwrite everything after marker
        with open(style_path, 'w', encoding='utf-8') as f:
            f.write(pre_content + new_css_block)
        print("CSS successfully refined for slower, breathing orbit.")
    else:
        with open(style_path, 'a', encoding='utf-8') as f:
            f.write("\n" + new_css_block)
        print("Marker not found, appended refined styles v2.")

if __name__ == '__main__':
    refine_orbit_css_v2()
