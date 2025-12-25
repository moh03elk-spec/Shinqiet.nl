
import os

def append_css():
    style_path = 'assets/styles.css'
    new_css = """

/* 2. Top Bar - Closable */
.top-bar {
  background-color: var(--primary-dark);
  color: var(--white);
  padding: 0.5rem 0;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.container-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.top-bar-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
  transition: color 0.2s;
}

.top-bar-close:hover {
  color: white;
}
"""
    with open(style_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Appended top-bar styles.")

if __name__ == '__main__':
    append_css()
