document.addEventListener('DOMContentLoaded', () => {


  // --- Dropdown Menu Logic ---
  // --- Dropdown Menu Logic ---
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(dropdownToggle => {
    const dropdownContainer = dropdownToggle.parentElement; // li.has-dropdown
    const dropdown = dropdownToggle.nextElementSibling;
    const panels = dropdown.querySelectorAll('.dropdown-panel');

    const setDropdownHeight = (targetPanel) => {
      if (targetPanel) {
        const panelHeight = targetPanel.offsetHeight;
        dropdown.style.height = `${panelHeight}px`;
      }
    };

    // Hover logic for the main dropdown
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
        // Reset height to 0 or auto if needed, but usually hidden by CSS
      }, 300); // Match transition duration
    });

    // --- Multi-level Dropdown Logic (Event Delegation) ---
    dropdown.addEventListener('click', (e) => {
      const toggle = e.target.closest('.dropdown-submenu-toggle');
      const backBtn = e.target.closest('.dropdown-back');

      if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        const targetLevel = toggle.dataset.targetLevel;
        const currentPanel = toggle.closest('.dropdown-panel');
        const targetPanel = dropdown.querySelector(`.dropdown-panel[data-level="${targetLevel}"]`);

        if (currentPanel && targetPanel) {
          currentPanel.classList.remove('is-active');
          targetPanel.classList.add('is-active');

          // Force a reflow/recalc if needed, or just set height immediately
          // Use scrollHeight as fallback if offsetHeight is 0 (e.g. during transition)
          const height = targetPanel.offsetHeight || targetPanel.scrollHeight;
          dropdown.style.height = `${height}px`;
        }
      }

      if (backBtn) {
        e.preventDefault();
        e.stopPropagation();
        const targetLevel = backBtn.dataset.targetLevel;
        const currentPanel = backBtn.closest('.dropdown-panel');
        const targetPanel = dropdown.querySelector(`.dropdown-panel[data-level="${targetLevel}"]`);

        if (currentPanel && targetPanel) {
          currentPanel.classList.remove('is-active');
          targetPanel.classList.add('is-active');

          const height = targetPanel.offsetHeight || targetPanel.scrollHeight;
          dropdown.style.height = `${height}px`;
        }
      }
    });
  });

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



  // --- Stripe Donation Logic ---
  // 1. Simple Payment Link
  const paymentLink = document.getElementById('payment-link');
  if (paymentLink) {
    paymentLink.href = 'https://buy.stripe.com/test_...'; // VERVANGEN MET ECHTE STRIPE PAYMENT LINK
  }

  // 2. Dynamic Checkout Session
  const donationForm = document.getElementById('donation-form');
  const donateButton = document.getElementById('donate-button');
  const amountInput = document.getElementById('amount');
  const presetButtons = document.querySelectorAll('.btn-preset');

  if (presetButtons.length > 0 && amountInput) {
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        presetButtons.forEach(b => b.classList.remove('is-active'));
        // Add active class to clicked
        btn.classList.add('is-active');
        // Update input
        amountInput.value = btn.dataset.amount;
      });
    });

    // Also update active state if user types manually
    amountInput.addEventListener('input', () => {
      const val = amountInput.value;
      presetButtons.forEach(btn => {
        if (btn.dataset.amount === val) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    });
  }

  if (donationForm && donateButton) {
    donationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      donateButton.setAttribute('disabled', 'true');
      try {
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

  /* --- SSEACT MODAL & ACTIVITIES LOGIC (Redesign) --- */
  const sseactOverlay = document.getElementById('sseact-modal-overlay');

  // content dictionary
  const sseactContent = {
    onderwijs: {
      title: "Onderwijs",
      desc: "Taalonderwijs, memoriseren en geloofsleer zijn de kern van onze aanpak. Wij bieden gestructureerde lessen voor kinderen en jongeren, waarbij persoonlijke aandacht centraal staat.",
      list: ["Gekwalificeerde docenten", "Kleine groepen voor focus", "Integratie van taal en identiteit"],
      media: ["assets/class1.jpg", "assets/class2.jpg"] // Placeholders really
    },
    sport: {
      title: "Sport & Excursies",
      desc: "Beweging is essentieel voor een gezonde geest. We organiseren wekelijkse voetbaltrainingen, zwemlessen en uitstapjes naar natuurgebieden om broederschap en fitheid te bevorderen.",
      list: ["Wekelijkse zaalvoetbal", "Zwemvaardigheid", "Survival weekends"],
      media: []
    },
    bijles: {
      title: "Bijles & Club",
      desc: "Naast regulier onderwijs bieden we huiswerkbegeleiding en een warme plek waar jongeren elkaar kunnen ontmoeten, vragen kunnen stellen en samen kunnen werken aan hun schoolprestaties.",
      list: ["Huiswerkbegeleiding op maat", "Mentorgesprekken", "Warme sfeer en thee"],
      media: []
    }
  };

  if (sseactOverlay) {
    const sseactCloseBtn = document.getElementById('sseact-modal-close');
    const sseactTabs = sseactOverlay.querySelectorAll('.sseact-tab');
    const modalTitle = document.getElementById('sseact-modal-title');
    const modalDesc = document.getElementById('sseact-modal-desc');
    let lastFocusedElement;

    function openSseactModal(id) {
      lastFocusedElement = document.activeElement;

      // Populate Content
      const data = sseactContent[id];
      if (data) {
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDesc) modalDesc.textContent = data.desc;
        // Reset tabs to first
        resetTabs();
      }

      // Show
      sseactOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Trap Focus
      const focusable = sseactOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) focusable[0].focus();
    }

    function closeSseactModal() {
      sseactOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    function resetTabs() {
      sseactTabs.forEach((tab, index) => {
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (index === 0) {
          tab.classList.add('is-active');
          tab.setAttribute('aria-selected', 'true');
          if (panel) panel.classList.add('is-active');
        } else {
          tab.classList.remove('is-active');
          tab.setAttribute('aria-selected', 'false');
          if (panel) panel.classList.remove('is-active');
        }
      });
    }

    // Event Listeners
    document.querySelectorAll('[data-sseact-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-sseact-id');
        openSseactModal(id);
      });
    });

    if (sseactCloseBtn) sseactCloseBtn.addEventListener('click', closeSseactModal);

    sseactOverlay.addEventListener('click', (e) => {
      if (e.target === sseactOverlay) closeSseactModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sseactOverlay.getAttribute('aria-hidden') === 'false') {
        closeSseactModal();
      }
    });

    // Tab Logic
    sseactTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Deactivate all
        sseactTabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
          const pId = t.getAttribute('aria-controls');
          document.getElementById(pId)?.classList.remove('is-active');
        });

        // Activate clicked
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        const panelId = tab.getAttribute('aria-controls');
        document.getElementById(panelId)?.classList.add('is-active');
      });
    });
  }



  /* --- SSE FORMS LOGIC (Intro & Main Registration) --- */

  // Helper: Simple Validator
  const validateField = (input) => {
    const val = input.value.trim();
    const name = input.name;
    let valid = true;

    // Basic rules based on type/name
    if (input.hasAttribute('required') && !val) valid = false;
    if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) valid = false;
    if (input.type === 'tel' && val && !/^[0-9\+\s]{8,}$/.test(val)) valid = false;

    // Visual feedback
    if (!valid) {
      input.style.borderColor = '#d32f2f';
      input.style.backgroundColor = '#fff8f8';
    } else {
      input.style.borderColor = '';
      input.style.backgroundColor = '';
    }
    return valid;
  };

  // 1. INTRO FORM (sseintro-form)
  const introForm = document.getElementById('sseintro-form');
  if (introForm) {
    introForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = introForm.querySelectorAll('input, select, textarea');
      let allValid = true;
      inputs.forEach(i => { if (!validateField(i)) allValid = false; });

      if (allValid) {
        const btn = introForm.querySelector('.sseintro-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Versturen...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          introForm.reset();

          // Show Success
          const successMsg = document.getElementById('sseintro-success');
          introForm.style.display = 'none';
          if (successMsg) successMsg.hidden = false;
        }, 1200);
      }
    });

    // Reset handler
    const resetIntro = document.getElementById('sseintro-reset');
    if (resetIntro) {
      resetIntro.addEventListener('click', () => {
        document.getElementById('sseintro-success').hidden = true;
        introForm.style.display = 'flex';
      });
    }
  }

  // 2. MAIN FORM (sseform-form)
  const mainForm = document.getElementById('sseform-form');
  if (mainForm) {
    const inputs = mainForm.querySelectorAll('.sseform-input, .sseform-select, .sseform-textarea');
    const submitBtn = document.getElementById('sseform-submit');
    const successState = document.getElementById('sseform-success-state');

    // Live update summary
    const updateSummary = () => {
      // Name
      const fn = document.getElementById('sseform-firstname')?.value || '';
      const ln = document.getElementById('sseform-lastname')?.value || '';
      const nameSum = document.getElementById('summary-name');
      if (nameSum) nameSum.textContent = (fn || ln) ? `${fn} ${ln}` : '-';

      // Registrant (Radio)
      const reg = mainForm.querySelector('input[name="registrant"]:checked');
      const regSum = document.getElementById('summary-registrant');
      if (regSum && reg) regSum.textContent = reg.nextElementSibling.textContent;

      // Activity (Checkbox)
      const acts = Array.from(mainForm.querySelectorAll('input[name="activity"]:checked'))
        .map(cb => cb.parentNode.querySelector('.chip-title').textContent);
      const actSum = document.getElementById('summary-activity');
      if (actSum) actSum.textContent = acts.length > 0 ? acts.join(', ') : '-';

      // Start
      const start = mainForm.querySelector('input[name="start_time"]:checked');
      const startSum = document.getElementById('summary-start');
      if (startSum && start) startSum.textContent = start.getAttribute('value');
    };

    inputs.forEach(input => input.addEventListener('input', updateSummary));
    // Also listeners for radios/checkboxes
    mainForm.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(i => {
      i.addEventListener('change', updateSummary);
    });

    // Toggle Child Fields
    const regRadios = mainForm.querySelectorAll('input[name="registrant"]');
    const childFields = document.getElementById('sseform-child-fields');
    regRadios.forEach(r => {
      r.addEventListener('change', () => {
        if (r.value === 'child' && r.checked) {
          childFields.hidden = false;
        } else if (r.value === 'self' && r.checked) {
          childFields.hidden = true;
        }
      });
    });

    // Submit
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      inputs.forEach(i => {
        // Skip child fields if hidden
        if (childFields && childFields.hidden && (i.id.includes('child'))) return;
        if (!validateField(i)) allValid = false;
      });

      if (allValid) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          mainForm.reset();
          // Hide form, show success
          mainForm.style.display = 'none';
          if (successState) successState.hidden = false;
          successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
      }
    });

    // Reset Main
    const resetMain = document.getElementById('sseform-reset-btn');
    if (resetMain) {
      resetMain.addEventListener('click', () => {
        if (successState) successState.hidden = true;
        mainForm.style.display = 'grid'; // Restore grid layout
      });
    }
  }
  /* --- SSEIMP STATS INTERACTION (Redesign) --- */
  const sseimpCards = document.querySelectorAll('.sseimp-card');
  sseimpCards.forEach(card => {
    // Mouse
    card.addEventListener('mousedown', () => card.classList.add('is-pressed'));
    ['mouseup', 'mouseleave'].forEach(evt => {
      card.addEventListener(evt, () => card.classList.remove('is-pressed'));
    });

    // Keyboard (Enter/Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent scrolling for Space
        card.classList.add('is-pressed');
        // Visual feedback time
        setTimeout(() => card.classList.remove('is-pressed'), 200);
      }
    });

    // Optional: Click handler if we wanted to open something, but user said "klikbaar zonder echte link"
    card.addEventListener('click', () => {
      // Just a visual ripple effect handled by CSS or pressed state
    });
  });

  /* --- SSEDON FORM LOGIC --- */
  const ssedonForm = document.getElementById('ssedon-form');
  if (ssedonForm) {
    // Elements
    const inputAmount = document.getElementById('ssedon-input-amount');
    const rangeAmount = document.getElementById('ssedon-slider');
    const chips = document.querySelectorAll('.ssedon-chip');

    // Toggles
    const freqRadios = document.querySelectorAll('input[name="ssedon-freq"]');
    const destRadios = document.querySelectorAll('.ssedon-chip-dest'); // Note: These are BUTTONS now, or inputs?
    // Wait, HTML lines 407-412 show <button class="ssedon-chip-dest" data-dest="...">
    // So destRadios logic needs to handle buttons, not inputs.

    const checkRound = document.getElementById('ssedon-roundup');
    const checkDouble = document.getElementById('ssedon-double');

    // Outputs
    const calcVal1 = document.getElementById('calc-val-1');
    const calcVal2 = document.getElementById('calc-val-2');
    const calcVal3 = document.getElementById('calc-val-3');

    const storyText = document.getElementById('ssedon-mini-story');
    const freqMsg = document.getElementById('ssedon-freq-msg');
    const monthlyBtn = document.getElementById('ssedon-btn-monthly');
    const submitBtn = document.getElementById('ssedon-btn-primary');
    const ctaText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const errorMsg = document.getElementById('ssedon-error');

    // Dest Buttons Handling (since they are buttons, not radios in HTML view)
    // HTML: <button ... data-dest="algemeen">
    const destButtons = document.querySelectorAll('.ssedon-chip-dest');
    let currentDest = 'algemeen';

    // 1. Sync Amount
    function updateAmount(val, source) {
      if (val === 'custom') return; // Handled by click listener

      let numVal = parseInt(val) || 0;
      if (source !== 'input') inputAmount.value = numVal;
      if (source !== 'range') rangeAmount.value = numVal;

      // Update chips
      chips.forEach(c => c.classList.remove('is-active'));
      let match = false;
      chips.forEach(c => {
        if (c.dataset.amount == numVal) {
          c.classList.add('is-active');
          match = true;
        }
      });

      // If no match, highlight custom (if specific logic needed, or just leave unhighlighted)
      if (!match) {
        const customBtn = document.querySelector('.ssedon-chip[data-amount="custom"]');
        if (customBtn) customBtn.classList.add('is-active');
      }

      updateImpact();
    }

    chips.forEach(btn => {
      btn.addEventListener('click', () => {
        const amt = btn.dataset.amount;
        if (amt === 'custom') {
          updateAmount(inputAmount.value, 'preset'); // Keep value, just highlight
          inputAmount.focus();
        } else {
          updateAmount(amt, 'preset');
        }
      });
    });

    if (rangeAmount) rangeAmount.addEventListener('input', (e) => updateAmount(e.target.value, 'range'));
    if (inputAmount) inputAmount.addEventListener('input', (e) => updateAmount(e.target.value, 'input'));

    // 2. Round Up
    if (checkRound) {
      checkRound.addEventListener('change', () => {
        if (checkRound.checked) {
          let val = parseInt(inputAmount.value) || 0;
          let rem = val % 5;
          if (rem !== 0) {
            let next = val + (5 - rem);
            updateAmount(next, 'preset');
          }
        }
      });
    }

    // 3. Impact Calculation
    function updateImpact() {
      let val = parseInt(inputAmount.value) || 0;
      let displayVal = val;
      // Fake doubling removed: value is now updated directly in input


      const isMonthly = document.getElementById('freq-monthly').checked;
      const multiplier = isMonthly ? 12 : 1;
      const totalVal = displayVal * multiplier;

      // Simple formulas matching the icons:
      // Book (Lesuren) ~ 12 eur/hr?
      if (calcVal1) calcVal1.textContent = Math.max(1, Math.floor(totalVal / 12));
      // Box (Pakketten) ~ 25 eur/pkg?
      if (calcVal2) calcVal2.textContent = Math.max(1, Math.floor(totalVal / 25));
      // Heart (Momenten) ~ 50 eur?
      if (calcVal3) calcVal3.textContent = Math.max(1, Math.floor(totalVal / 50));
    }

    if (checkDouble) {
      checkDouble.addEventListener('change', () => {
        let currentVal = parseInt(inputAmount.value) || 0;
        if (checkDouble.checked) {
          updateAmount(currentVal * 2, 'preset');
        } else {
          updateAmount(Math.floor(currentVal / 2), 'preset');
        }
      });
    }

    // 4. Frequency
    freqRadios.forEach(r => {
      r.addEventListener('change', () => {
        if (r.value === 'monthly' && r.checked) {
          if (freqMsg) freqMsg.classList.remove('hidden');
          if (monthlyBtn) monthlyBtn.classList.add('hidden');
          if (ctaText) ctaText.textContent = "Doneer maandelijks met Stripe";
        } else if (r.value === 'once' && r.checked) {
          if (freqMsg) freqMsg.classList.add('hidden');
          if (monthlyBtn) monthlyBtn.classList.remove('hidden');
          if (ctaText) ctaText.textContent = "Doneer nu met Stripe";
        }
        updateImpact();
      });
    });

    if (monthlyBtn) {
      monthlyBtn.addEventListener('click', () => {
        const m = document.getElementById('freq-monthly');
        if (m) {
          m.checked = true;
          m.dispatchEvent(new Event('change'));
        }
      });
    }

    // 5. Destination Logic (Buttons)
    const stories = {
      algemeen: "Samen bouwen we aan een sterke basis voor de toekomst van onze kinderen.",
      onderwijs: "Met uw steun financieren we boeken, digitale leermiddelen en professionele docenten.",
      jeugd: "We organiseren sportdagen, excursies en mentor-trajecten die jongeren inspireren.",
      moskee: "Onderhoud en faciliteiten van de moskee worden direct door uw bijdrage ondersteund.",
      nood: "Voor gezinnen die het moeilijk hebben, bieden we directe voedsel- en basishulp."
    };

    destButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        destButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        currentDest = btn.dataset.dest;

        // Update story
        if (storyText) {
          storyText.style.opacity = 0;
          setTimeout(() => {
            storyText.textContent = stories[currentDest] || stories.algemeen;
            storyText.style.opacity = 1;
          }, 200);
        }

        // Update Impact Panel Color/Style? (Optional, per design)
      });
    });

    // 6. Character Count
    const noteArea = document.getElementById('ssedon-note');
    const charCount = document.getElementById('ssedon-char-count');
    if (noteArea && charCount) {
      noteArea.addEventListener('input', () => {
        charCount.textContent = `${noteArea.value.length}/140`;
      });
    }

    // 7. Round Up Logic (New)
    const checkRoundUp = document.getElementById('ssedon-roundup');
    if (checkRoundUp) {
      checkRoundUp.addEventListener('change', () => {
        if (checkRoundUp.checked) {
          let val = parseInt(inputAmount.value) || 0;
          let next = val;
          if (val % 10 === 0) {
            // Already round, maybe do nothing or add 10? 
            // usually "Round Up" means to *next* round number.
            // If 50, stays 50? Or 60? Let's say rounds to next 5.
          } else if (val % 5 === 0) {
            // Already multiple of 5.
          } else {
            // Round to next 5
            next = Math.ceil(val / 5) * 5;
            inputAmount.value = next;
            // Trigger slider update manually if needed (slider usually linked to input)
            // But slider is range... sync them.
            if (slider) slider.value = next;
            updateImpact();
          }
        }
      });
    }

    // 8. Fake Submit
    ssedonForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseInt(inputAmount.value) || 0;

      if (val < 5) {
        if (errorMsg) errorMsg.textContent = "Het minimale donatiebedrag is €5.";
        return;
      }
      if (errorMsg) errorMsg.textContent = "";

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
      if (ctaText) {
        ctaText.style.opacity = 0;
      }

      setTimeout(() => {
        // DONE STATE
        if (submitBtn) submitBtn.classList.remove('loading');
        if (ctaText) {
          ctaText.textContent = "Betaling gestart...";
          ctaText.style.opacity = 1;
        }

        const banner = document.getElementById('ssedon-success-banner');
        if (banner) {
          banner.classList.remove('hidden');
          banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => {
          if (submitBtn) submitBtn.disabled = false;
          if (banner) banner.classList.add('hidden');

          const isMonthly = document.getElementById('freq-monthly').checked;
          if (ctaText) ctaText.textContent = isMonthly ? "Doneer maandelijks met Stripe" : "Doneer nu met Stripe";
        }, 6000);
      }, 900);
    });

    // Init
    updateImpact();
  }
});
/* --- SSEABOUT - Interactive & Counters --- */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.sseabout-section');
  const counters = document.querySelectorAll('.sseabout-stat-number');

  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');

        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1200;
          const start = 0;
          let startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const ease = 1 - Math.pow(1 - percentage, 4); // EaseOutQuart

            counter.innerText = Math.floor(start + (target - start) * ease) + suffix;

            if (percentage < 1) {
              window.requestAnimationFrame(step);
            }
          }
          window.requestAnimationFrame(step);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
});

/* --- SSEFLOW PROGRAM GUIDE INTERACTIVITY --- */
(function () {
  const container = document.querySelector('.sseflow-grid');
  if (!container) return;

  const cards = container.querySelectorAll('.sseflow-card');

  // Activate card logic
  function activateCard(card) {
    cards.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('active');
    card.setAttribute('aria-pressed', 'true');
  }

  cards.forEach(card => {
    // Click
    card.addEventListener('click', () => {
      activateCard(card);
    });

    // Keyboard (Enter/Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCard(card);
      }
      // Arrow keys (Previous/Next)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = card.nextElementSibling;
        if (next) { next.focus(); activateCard(next); }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = card.previousElementSibling;
        if (prev) { prev.focus(); activateCard(prev); }
      }
    });
  });
})();

/* --- SSEFORM 3-COLUMN LOGIC --- */
(function () {
  const form = document.getElementById('sseform-form');
  const successState = document.getElementById('sseform-success-state');
  const childFields = document.getElementById('sseform-child-fields');

  // Summary Elements
  const sName = document.getElementById('summary-name');
  const sRegistrant = document.getElementById('summary-registrant');
  const sActivity = document.getElementById('summary-activity');
  const sStart = document.getElementById('summary-start');

  if (!form) return;

  // 1. Live Summary Updates
  function updateSummary() {
    // Name
    const fname = form.querySelector('[name="firstname"]').value;
    const lname = form.querySelector('[name="lastname"]').value;
    sName.textContent = (fname || lname) ? `${fname} ${lname}` : '-';

    // Registrant
    const reg = form.querySelector('[name="registrant"]:checked');
    sRegistrant.textContent = reg ? (reg.value === 'self' ? 'Mijzelf' : 'Mijn kind') : '-';

    // Toggle Child Fields
    if (reg && reg.value === 'child') {
      childFields.hidden = false;
    } else {
      childFields.hidden = true;
    }

    // Activity
    const acts = Array.from(form.querySelectorAll('[name="activity"]:checked')).map(cb => cb.value);
    sActivity.textContent = acts.length > 0 ? acts.join(', ') : '-';

    // Start
    const start = form.querySelector('[name="start_time"]:checked');
    sStart.textContent = start ? start.value : '-';
  }

  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);

  // 2. Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('sseform-submit');

    // Simple verification
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
      btn.classList.remove('loading');
      btn.disabled = false;
      form.hidden = true;
      successState.hidden = false;
      successState.setAttribute('aria-hidden', 'false');

      // Scroll to container
      const container = document.getElementById('sseform-container');
      if (container) container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });

  // 3. Reset
  const resetBtn = document.getElementById('sseform-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.hidden = false;
      successState.hidden = true;
      updateSummary();
    });
  }

  // Initial update
  updateSummary();

})();

/* --- SSEINTRO FORM LOGIC (Compact Form) --- */
(function () {
  const form = document.getElementById('sseintro-form');
  const success = document.getElementById('sseintro-success');
  const resetBtn = document.getElementById('sseintro-reset');

  if (!form) return;

  // Validation
  function validate(input) {
    if (input.required && !input.value.trim()) {
      input.style.borderColor = '#d32f2f';
      return false;
    }
    input.style.borderColor = '';
    return true;
  }

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(i => {
    i.addEventListener('input', () => validate(i));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    inputs.forEach(i => {
      if (!validate(i)) valid = false;
    });

    if (!valid) return;

    // Fake submit
    const btn = form.querySelector('.sseintro-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Even geduld...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;

      // Hide form content properly
      const content = form.querySelectorAll('.sseintro-field, .sseintro-footer');
      content.forEach(el => el.style.display = 'none');
      success.hidden = false;
    }, 1000);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      success.hidden = true;
      const content = form.querySelectorAll('.sseintro-field, .sseintro-footer');
      content.forEach(el => el.style.display = 'flex'); // or block, but check css
      // Actually field is flex, footer is flex

      form.reset();
    });
  }
})();

/* --- SSENAV HEADER LOGIC --- */
(function () {
  const header = document.getElementById('ssenav-header');
  const toggle = document.querySelector('.ssenav-toggle');
  const mobileMenu = document.querySelector('.ssenav-mobile-menu');

  if (!header) return;

  // 1. Sticky Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.hidden = isExpanded; // If was expanded, now hidden

      if (!isExpanded) {
        mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Lock scroll
        toggle.innerHTML = '<span style="font-size:24px;line-height:1;">✕</span>'; // Simple close icon switch
        mobileMenu.setAttribute('aria-hidden', 'false');
      } else {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        // Restore bars
        toggle.innerHTML = '<span class="ssenav-bar"></span><span class="ssenav-bar"></span><span class="ssenav-bar"></span>';
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span class="ssenav-bar"></span><span class="ssenav-bar"></span><span class="ssenav-bar"></span>';
      });
    });
  }

  // 3. Dropdown Keyboard Accessibility (simple)
  const dropdownToggles = header.querySelectorAll('.ssenav-link[aria-expanded]');

  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle for touch/click (desktop hover is CSS, but click support is good)
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!btn.parentElement.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

})();

/* --- SSEHERO HERO LOGIC --- */
(function () {
  const heroSection = document.querySelector('.ssehero-section');
  if (!heroSection) return;

  const logoContainer = heroSection.querySelector('.ssehero-logo-container');
  const bgOrb = heroSection.querySelector('.ssehero-gradient-orb');

  // Parallax on Mouse Move
  document.addEventListener('mousemove', (e) => {
    // Only if user prefers motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Performance optimization: use requestAnimationFrame
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      if (logoContainer) {
        // Logo moves opposite to mouse slightly
        logoContainer.style.transform = `translate(${-x}px, ${-y}px) translateY(var(--float-y, 0px))`;
      }

      if (bgOrb) {
        bgOrb.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scrolled = window.scrollY;
    if (scrolled > 1000) return; // Stop calc if far down

    const rateLogo = scrolled * 0.15;
    const rateText = scrolled * 0.05;
  });

})();

/* --- SSESUPPORT DYNAMIC REVEAL --- */
document.addEventListener('DOMContentLoaded', () => {
  const transitionLayer = document.querySelector('.ssesupport-transition-layer');
  const donationCards = document.querySelectorAll('.ssedon-card');
  const section = document.querySelector('.ssedon-section');

  if (!transitionLayer || !section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger Line Animation
        transitionLayer.classList.add('is-visible');

        // Trigger Card Stagger after a slight delay matching the line animation
        setTimeout(() => {
          donationCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('is-visible');
            }, index * 150); // Stagger 150ms
          });
        }, 800); // Wait for line to be partially down

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

  observer.observe(transitionLayer);
});

/* --- SSE STEPS TABS LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.sse-step-tab');
  const contents = document.querySelectorAll('.sse-step-content');

  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const step = tab.dataset.step;

        // Switch tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Switch content
        contents.forEach(c => c.classList.remove('active'));
        const target = document.querySelector(`.sse-step-content[data-step="${step}"]`);
        if (target) target.classList.add('active');
      });
    });
  }
});
