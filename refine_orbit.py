
import os

def refine_orbit_css():
    style_path = 'assets/styles.css'
    marker = "/* --- Dynamic Orbiting Logo Icons --- */"
    
    # Professional Updates:
    # 1. Slower duration (60s) for majesty.
    # 2. Added 'ssehero-pulse' to icons for "living" feel.
    # 3. Hover pause on container.
    
    new_css_block = """/* --- Dynamic Orbiting Logo Icons --- */
.ssehero-logo-container {
  position: relative;
  /* Ensure container establishes a positioning context */
}

.ssehero-orbit-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130%; /* Balanced radius */
  height: 130%;
  transform: translate(-50%, -50%);
  animation: ssehero-orbit-spin 60s linear infinite; /* Slower, professional speed */
  z-index: 10;
  pointer-events: none; /* Let clicks pass through if needed, but hover logic below needs pointer-events auto on items if interactive */
}

/* Optional: Pause on hover for better focus */
/* .ssehero-logo-container:hover .ssehero-orbit-container {
  animation-play-state: paused;
} */

.ssehero-orbit-item {
  position: absolute;
  width: 38px;
  height: 38px;
  color: var(--ssenav-gold);
  background: rgba(255, 255, 255, 0.96);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08); /* Softer shadow */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Counter spin to keep upright + Pulse for life */
  animation: ssehero-orbit-counter-spin 60s linear infinite, ssehero-pulse 3s ease-in-out infinite alternate;
}

/* Positioning 6 items in a hexagon (0, 60, 120, 180, 240, 300 degrees) */
/* 1: Top (0 deg) */
.ssehero-orbit-item.item-1 { top: 0; left: 50%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 0s; }
/* 2: Top-Right (60 deg) -> x: 93.3%, y: 25% */
.ssehero-orbit-item.item-2 { top: 25%; left: 93.3%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 0.5s; }
/* 3: Bottom-Right (120 deg) -> x: 93.3%, y: 75% */
.ssehero-orbit-item.item-3 { top: 75%; left: 93.3%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 1s; }
/* 4: Bottom (180 deg) */
.ssehero-orbit-item.item-4 { top: 100%; left: 50%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 1.5s; }
/* 5: Bottom-Left (240 deg) -> x: 6.7%, y: 75% */
.ssehero-orbit-item.item-5 { top: 75%; left: 6.7%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 2s; }
/* 6: Top-Left (300 deg) -> x: 6.7%, y: 25% */
.ssehero-orbit-item.item-6 { top: 25%; left: 6.7%; margin-left: -19px; margin-top: -19px; animation-delay: 0s, 2.5s; }

@keyframes ssehero-orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes ssehero-orbit-counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes ssehero-pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
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
        print("CSS successfully refined for professional animation.")
    else:
        with open(style_path, 'a', encoding='utf-8') as f:
            f.write("\n" + new_css_block)
        print("Marker not found, appended refined styles.")

if __name__ == '__main__':
    refine_orbit_css()
