
import os

def append_css():
    style_path = 'assets/styles.css'
    new_css = """

/* --- Dynamic Orbiting Logo Icons --- */
.ssehero-logo-container {
  position: relative;
  /* Ensure container establishes a positioning context */
}

.ssehero-orbit-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160%; /* Adjust based on logo size */
  height: 160%;
  transform: translate(-50%, -50%);
  animation: ssehero-orbit-spin 40s linear infinite;
  pointer-events: none;
  z-index: 10;
}

.ssehero-orbit-item {
  position: absolute;
  width: 40px;
  height: 40px;
  color: var(--ssenav-gold);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ssehero-orbit-counter-spin 40s linear infinite;
}

/* Positioning items in a circle */
.ssehero-orbit-item.item-1 { top: 0; left: 50%; margin-left: -20px; margin-top: -20px; }
.ssehero-orbit-item.item-2 { top: 50%; right: 0; margin-top: -20px; margin-right: -20px; }
.ssehero-orbit-item.item-3 { bottom: 0; left: 50%; margin-left: -20px; margin-bottom: -20px; }
.ssehero-orbit-item.item-4 { top: 50%; left: 0; margin-top: -20px; margin-left: -20px; }

@keyframes ssehero-orbit-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes ssehero-orbit-counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Appended orbit styles.")

if __name__ == '__main__':
    append_css()
