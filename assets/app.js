document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isVisible = mainNav.getAttribute('data-visible') === 'true';
      mainNav.setAttribute('data-visible', !isVisible);
      navToggle.setAttribute('aria-expanded', !isVisible);
    });
  }

  // --- Dropdown Menu Logic ---
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownToggle) {
    const dropdownContainer = dropdownToggle.parentElement; // li.has-dropdown
    const dropdown = dropdownToggle.nextElementSibling;
    const panels = dropdown.querySelectorAll('.dropdown-panel');

    const setDropdownHeight = (targetPanel) => {
      if (targetPanel) {
        const panelHeight = targetPanel.offsetHeight;
        dropdown.style.height = `${panelHeight}px`;
      }
    };

    dropdownContainer.addEventListener('mouseenter', () => {
      dropdownToggle.setAttribute('aria-expanded', 'true');
      const activePanel = dropdown.querySelector('.dropdown-panel.is-active');
      setDropdownHeight(activePanel);
    });

    dropdownContainer.addEventListener('mouseleave', () => {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      // Reset to level 1 when closing, after the transition
      setTimeout(() => {
        panels.forEach(panel => {
          const level = panel.dataset.level;
          if (level === '1') {
            panel.classList.add('is-active');
          } else {
            panel.classList.remove('is-active');
          }
        });
      }, 300); // Match transition duration
    });

    // --- Multi-level Dropdown Logic (remains click-based) ---
    const submenuToggles = dropdown.querySelectorAll('.dropdown-submenu-toggle');
    const backButtons = dropdown.querySelectorAll('.dropdown-back');

    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the dropdown from closing
        const targetLevel = toggle.dataset.targetLevel;
        const currentPanel = toggle.closest('.dropdown-panel');
        const targetPanel = dropdown.querySelector(`[data-level="${targetLevel}"]`);

        if (currentPanel && targetPanel) {
          currentPanel.classList.remove('is-active');
          targetPanel.classList.add('is-active');
          setDropdownHeight(targetPanel);
        }
      });
    });

    backButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the dropdown from closing
        const targetLevel = button.dataset.targetLevel;
        const currentPanel = button.closest('.dropdown-panel');
        const targetPanel = dropdown.querySelector(`[data-level="${targetLevel}"]`);
        
        if (currentPanel && targetPanel) {
          currentPanel.classList.remove('is-active');
          targetPanel.classList.add('is-active');
          setDropdownHeight(targetPanel);
        }
      });
    });
  }

  // --- Dynamic Year in Footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Animation for welcome title ---
  const welcomeTitle = document.querySelector('.welcome-title');
  if (welcomeTitle) {
    const nodes = [...welcomeTitle.childNodes];
    welcomeTitle.innerHTML = '';
    let charIndex = 0;

    const processText = (text, isColored = false) => {
      // Use regex to split by space but keep the space
      const words = text.split(/(\s+)/);
      words.forEach(part => {
        if (part.trim() === '') {
          // It's a space or multiple spaces
          welcomeTitle.append(document.createTextNode(part));
        } else if (part) {
          // It's a word
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          if (isColored) {
            wordSpan.classList.add('no-hover-color');
          }

          part.split('').forEach(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'letter';
            if (isColored) {
              letterSpan.classList.add('colored');
            }
            letterSpan.style.animationDelay = `${charIndex * 0.05}s`;
            charIndex++;
            wordSpan.appendChild(letterSpan);
          });
          welcomeTitle.appendChild(wordSpan);
        }
      });
    };

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        processText(node.textContent);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        processText(node.textContent, true);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        welcomeTitle.appendChild(document.createElement('br'));
      }
    });
  }

  // --- Prayer Times Placeholder ---
  const prayerTimes = { fajr: '05:00', dhuhr: '13:30', asr: '16:00', maghrib: '18:45', isha: '20:00' };
  Object.entries(prayerTimes).forEach(([key, value]) => {
    const el = document.querySelector(`[data-pt="${key}"]`);
    if (el) el.textContent = value;
  });

  // --- Stripe Donation Logic ---
  // 1. Simple Payment Link
  const paymentLink = document.getElementById('payment-link');
  if (paymentLink) {
    paymentLink.href = 'https://buy.stripe.com/test_...'; // VERVANGEN MET ECHTE STRIPE PAYMENT LINK
  }

  // 2. Dynamic Checkout Session
  const donationForm = document.getElementById('donation-form');
  const donateButton = document.getElementById('donate-button');
  if (donationForm && donateButton) {
    donationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      donateButton.setAttribute('disabled', 'true');
      try {
        const amountInput = document.getElementById('amount');
        const amount = Number(amountInput.value) || 10;

        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amountEuro: amount }),
        });

        if (!res.ok) throw new Error('Server response not ok');
        
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Kon geen betaalpagina openen. Probeer het later opnieuw.');
        }
      } catch (err) {
        console.error('Donation Error:', err);
        alert('Er ging iets mis bij het verwerken van de donatie.');
      } finally {
        donateButton.removeAttribute('disabled');
      }
    });
  }

  // --- Registration Form Logic ---
  const registrationForm = document.getElementById('aanmeld-formulier');
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const voornaam = document.getElementById('voornaam').value;
      const achternaam = document.getElementById('achternaam').value;
      const geboortedatum = document.getElementById('geboortedatum').value;
      const email = document.getElementById('email_aanmelden').value;
      const telefoon = document.getElementById('telefoon').value;
      const activiteit = document.getElementById('activiteit').value;
      const bericht = document.getElementById('bericht_aanmelden').value;

      const subject = `Nieuwe aanmelding voor ${activiteit}`;
      const body = `
        Nieuwe aanmelding ontvangen voor de activiteit: ${activiteit}
        --------------------------------------------------
        Naam: ${voornaam} ${achternaam}
        Geboortedatum: ${geboortedatum}
        E-mail: ${email}
        Telefoonnummer: ${telefoon}
        --------------------------------------------------

        Bericht:
        ${bericht}
      `;

      window.location.href = `mailto:stichtingsseo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});