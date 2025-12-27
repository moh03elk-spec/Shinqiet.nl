
import os

def add_orbit_js():
    html_path = 'index.html'
    
    # We want to add the interaction logic.
    # We can search for the existing mobile toggle logic and append after it.
    
    anchor = "mobileToggle.classList.remove('is-active');"
    
    js_code = """
        });
      });
    }

    // Mobile Orbit Interaction (Click Logo to Show/Hide)
    const heroLogo = document.querySelector('.ssehero-logo');
    const orbitContainer = document.querySelector('.ssehero-orbit-container');
    
    if (heroLogo && orbitContainer) {
      heroLogo.addEventListener('click', (e) => {
        // e.preventDefault(); // Only if needed
        orbitContainer.classList.toggle('is-visible');
      });
    }
  </script>"""

    # We need to be careful not to break the syntax.
    # The anchor is inside a forEach loop inside an if statement.
    # The closing brackets need to be matched.
    
    # Current structure in index.html (from memory of previous edits):
    # const mobileLinks = ...
    # mobileLinks.forEach(link => {
    #   link.addEventListener('click', () => {
    #        mobileMenu.classList.remove('is-open');
    #        mobileToggle.classList.remove('is-active');
    #   });
    # });
    # }
    # </script>
    
    # So if we search for the LAST occurrence of "mobileToggle.classList.remove('is-active');",
    # we are inside the click handler.
    # We should look for the END of the script block to be safe and just append independent code?
    # NO, because variables might be scoped?
    # Actually, appending before `</script>` is safe if we close previous blocks or if were at top level.
    # The previous code was inside `if(mobileToggle && mobileMenu) { ... }`.
    # It's cleaner to just append before `</script>`.
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the last </script> tag
    if "</script>" in content:
        # We can just insert before the last </script>
        # ensure we are in the right script block (the one at the bottom).
        # We know it's near the end.
        
        # New independent block
        new_block = """
    
    // Mobile Orbit Interaction
    document.addEventListener('DOMContentLoaded', () => {
        const heroLogo = document.querySelector('.ssehero-logo');
        const orbitContainer = document.querySelector('.ssehero-orbit-container');
        
        if (heroLogo && orbitContainer) {
          heroLogo.addEventListener('click', () => {
            orbitContainer.classList.toggle('is-visible');
          });
        }
    });
"""
        # Replace the last occurrence of </script> with code + </script>
        # split by </script>, rejoin all but last, append code + last part.
        
        parts = content.rsplit('</script>', 1)
        if len(parts) == 2:
            new_content = parts[0] + new_block + "\n  </script>" + parts[1]
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Orbit JS added successfully.")
        else:
             print("Could not find script tag.")
    else:
        print("No script tag found.")

if __name__ == '__main__':
    add_orbit_js()
