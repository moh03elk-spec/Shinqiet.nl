
import os

def interactive_orbit_css():
    style_path = 'assets/styles.css'
    
    new_css = """

/* --- Mobile Interactive Orbit Interaction --- */
@media (max-width: 968px) {
  .ssehero-logo {
    cursor: pointer; /* Indication it is clickable */
    /* Add a subtle pulse or hint? Optional. */
    -webkit-tap-highlight-color: transparent;
  }

  .ssehero-orbit-container {
    /* Hide by default on mobile */
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%) scale(0.8) !important; /* Start small */
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy pop */
  }

  .ssehero-orbit-container.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1) !important;
  }
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Interactive orbit CSS applied.")

if __name__ == '__main__':
    interactive_orbit_css()
