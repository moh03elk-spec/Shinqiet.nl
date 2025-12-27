
import os

def fix_orbit_css():
    style_path = 'assets/styles.css'
    marker = "/* --- Dynamic Orbiting Logo Icons --- */"
    
    new_css_block = """/* --- Dynamic Orbiting Logo Icons --- */
.ssehero-logo-container {
  position: relative;
  /* Ensure container establishes a positioning context */
}

.ssehero-orbit-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 125%; /* Closer radius (was 160%) */
  height: 125%;
  transform: translate(-50%, -50%);
  animation: ssehero-orbit-spin 40s linear infinite;
  pointer-events: none;
  z-index: 10;
}

.ssehero-orbit-item {
  position: absolute;
  width: 36px; /* Slightly smaller to fit 6 items */
  height: 36px;
  color: var(--ssenav-gold);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  padding: 7px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ssehero-orbit-counter-spin 40s linear infinite;
}

/* Positioning 6 items in a hexagon (0, 60, 120, 180, 240, 300 degrees) */
/* 1: Top (0 deg) */
.ssehero-orbit-item.item-1 { top: 0; left: 50%; margin-left: -18px; margin-top: -18px; }
/* 2: Top-Right (60 deg) -> x: 93.3%, y: 25% */
.ssehero-orbit-item.item-2 { top: 25%; left: 93.3%; margin-left: -18px; margin-top: -18px; }
/* 3: Bottom-Right (120 deg) -> x: 93.3%, y: 75% */
.ssehero-orbit-item.item-3 { top: 75%; left: 93.3%; margin-left: -18px; margin-top: -18px; }
/* 4: Bottom (180 deg) */
.ssehero-orbit-item.item-4 { top: 100%; left: 50%; margin-left: -18px; margin-top: -18px; }
/* 5: Bottom-Left (240 deg) -> x: 6.7%, y: 75% */
.ssehero-orbit-item.item-5 { top: 75%; left: 6.7%; margin-left: -18px; margin-top: -18px; }
/* 6: Top-Left (300 deg) -> x: 6.7%, y: 25% */
.ssehero-orbit-item.item-6 { top: 25%; left: 6.7%; margin-left: -18px; margin-top: -18px; }

@keyframes ssehero-orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes ssehero-orbit-counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
"""

    with open(style_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if marker in content:
        # Split and keep everything before the marker
        parts = content.split(marker)
        pre_content = parts[0]
        
        # Write back the pre-content plus the new block
        with open(style_path, 'w', encoding='utf-8') as f:
            f.write(pre_content + new_css_block)
        print("CSS successfully updated with 6-item hex layout.")
    else:
        # If marker not found, just append (fallback)
        with open(style_path, 'a', encoding='utf-8') as f:
            f.write("\n" + new_css_block)
        print("Marker not found, appended new styles.")

if __name__ == '__main__':
    fix_orbit_css()
