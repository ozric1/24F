/**
 * 24FPS PRODUCTION — MAIN INTERACTIVE SCRIPT
 * Moteur d'interactions cinématiques & Expérience utilisateur
 */

document.addEventListener('DOMContentLoaded', () => {
  initTimecodeHUD();
  initNavigation();
  initSoundFX();
  initPortfolioFilters();
  initVideoModal();
  initWhatsAppBrief();
  initCustomSelects();
  initCustomDatePicker();
});

/* --------------------------------------------------------------------------
   01. Timecode HUD (24 FPS Engine)
   -------------------------------------------------------------------------- */
function initTimecodeHUD() {
  const tcElement = document.getElementById('live-timecode');
  if (!tcElement) return;

  let frame = 0;
  let sec = 24;
  let min = 0;
  let hour = 0;

  setInterval(() => {
    frame++;
    if (frame >= 24) {
      frame = 0;
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
          min = 0;
          hour++;
        }
      }
    }

    const fStr = frame.toString().padStart(2, '0');
    const sStr = sec.toString().padStart(2, '0');
    const mStr = min.toString().padStart(2, '0');
    const hStr = hour.toString().padStart(2, '0');

    tcElement.textContent = `${hStr}:${mStr}:${sStr}:${fStr}`;
  }, 1000 / 24); // Exact 24 FPS ticker
}

/* --------------------------------------------------------------------------
   02. Navigation & Header Dynamics
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.menu');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id], .hero');

  // Sticky Header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? 'Fermer −' : 'Menu +';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu +';
      });
    });
  }

  // Active section spy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 150;
      const secHeight = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   03. Sound Effects (Synthesized Web Audio API — No External Files)
   -------------------------------------------------------------------------- */
function initSoundFX() {
  const toggleBtn = document.getElementById('sound-toggle');
  let audioCtx = null;
  let soundEnabled = false;

  function playShutter() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Shutter click oscillation
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio not allowed yet', e);
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      toggleBtn.setAttribute('aria-pressed', soundEnabled);
      toggleBtn.innerHTML = soundEnabled ? '🔊' : '🔇';
      toggleBtn.title = soundEnabled ? 'Désactiver les effets sonores' : 'Activer les retours sonores';
      if (soundEnabled) playShutter();
    });
  }

  // Bind clicks to buttons & interactive cards
  document.querySelectorAll('.cta, .filters button, .project').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled && audioCtx) {
        // High subtle tick on hover
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
      }
    });
    el.addEventListener('click', playShutter);
  });
}

/* --------------------------------------------------------------------------
   04. Portfolio Filter Tabs
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterVal = btn.dataset.filter;

      projects.forEach(p => {
        const pType = p.dataset.type;
        if (filterVal === 'all' || pType === filterVal) {
          p.hidden = false;
          p.style.opacity = '0';
          p.style.transform = 'translateY(12px)';
          setTimeout(() => {
            p.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 30);
        } else {
          p.hidden = true;
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   05. Cinematic Video Lightbox Modal
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  'brand-1': {
    title: 'L’Élégance du Mouvement — Campagne Brand & Luxe',
    client: 'Palais & Joaillerie Casablanca',
    category: 'Film de Marque · Publicité Web & TV',
    camera: 'Sony FX3 Cinema Line',
    optics: 'Sony G Master 24-70mm f/2.8 & 85mm f/1.4',
    format: '4K DCI · 2.39:1 CinemaScope',
    duration: '01:45 min',
    year: '2026',
    description: 'Une plongée intime dans l’artisanat d’exception et la haute joaillerie. Direction de la photographie pensée pour sublimer les matières dorées, le cuir et les reflets naturels de lumière sous le soleil de Casablanca.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0'
  },
  'event-1': {
    title: 'Rythme & Transe — Aftermovie Festival International',
    client: 'Festival des Musiques du Monde',
    category: 'Événementiel · Concert & Cérémonie',
    camera: 'Dual Sony FX3 + Stabilisateur DJI Ronin RS3 Pro',
    optics: 'Sony 16-35mm f/2.8 GM + 50mm f/1.2',
    format: '4K UHD · 16:9 Broadcast',
    duration: '02:30 min',
    year: '2026',
    description: 'Captation en immersion complète au cœur de plus de 15 000 festivaliers. Gestion des basses lumières extrêmes, montées d’énergie synchronisées sur le sound design et plans séquences au plus près des artistes.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  },
  'life-1': {
    title: 'L’Appel de l’Atlantique — Destination & Hôtellerie',
    client: 'Taghazout Ocean Retreat & Spa',
    category: 'Destination · Tourisme & Drone Aérien',
    camera: 'DJI Mavic 3 Cine & Sony FX3',
    optics: 'Optique Hasselblad 4/3 & Sony 35mm GM',
    format: '5.1K Apple ProRes 422 HQ · 2.39:1',
    duration: '02:10 min',
    year: '2025',
    description: 'Révéler la grandeur de la côte marocaine, le fracas des vagues et la sérénité des espaces architecturaux. Prises de vue aériennes au lever du soleil et étalonnage chaud aux teintes sable et cyan.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&mute=0&rel=0'
  },
  'brand-2': {
    title: 'Horizons Industriels — Film Corporate & Énergie',
    client: 'Groupe OCP & Green Energy Maroc',
    category: 'Film Corporate · Documentaire Industriel',
    camera: 'Sony FX3 Cinema Line',
    optics: 'Série Sony GM Prime & Zoom Cinéma',
    format: '4K DCI · S-Log3 / S-Gamut3.Cine',
    duration: '03:15 min',
    year: '2026',
    description: 'Raconter l’ambition technologique et humaine d’un fleuron national. Interviews soignées de scientifiques et ingénieurs, lumière sculptée aux projecteurs Aputure et plans drone immersifs.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0'
  },
  'social-1': {
    title: 'Vibrations Urbaines — Série Reels & TikTok Premium',
    client: 'Casablanca Streetwear & Lifestyle',
    category: 'Social Media · Format Vertical 9:16',
    camera: 'Sony FX3 Vertical Rig',
    optics: 'Sony 24mm f/1.4 GM',
    format: '4K Vertical 9:16 · 60fps',
    duration: '00:35 s (Pack 6 Reels)',
    year: '2026',
    description: 'Du contenu taillé pour retenir l’attention dès la première seconde. Montage percutant, sound design immersif et étalonnage contrasté ayant généré plus de 450 000 vues organiques.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  },
  'life-2': {
    title: 'Les Silences du Sud — Documentaire Court Ouarzazate',
    client: 'Production Cinématographique Indépendante',
    category: 'Court-Métrage & Patrimoine Culturel',
    camera: 'Sony FX3 Cinema Line',
    optics: 'Optiques Cinéma Anamorphiques 1.33x',
    format: 'CinemaScope 2.39:1 · 24.000 FPS',
    duration: '05:40 min',
    year: '2025',
    description: 'Hommage à la terre de formation de Hamza Azizi (ISMC Ouarzazate). Une méditation visuelle sur les kasbahs centenaires, les ombres ocres et la lumière intemporelle du grand Sud marocain.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&mute=0&rel=0'
  },
  'event-2': {
    title: 'Gala d’Excellence — Cérémonie & Sommet des Décideurs',
    client: 'Morocco Business Summit Marrakech',
    category: 'Cérémonie & Soirée Institutionnelle',
    camera: 'Multi-caméras Sony FX3 & FX6',
    optics: 'Sony GM 70-200mm f/2.8 & 24-70mm',
    format: '4K UHD · Étalonnage Rec.709 Direct',
    duration: '02:00 min',
    year: '2026',
    description: 'Restitution de l’élégance et de la diplomatie économique lors d’un dîner de gala à Marrakech. Captation discrète, son broadcast irréprochable et livraison du teaser en moins de 48 heures.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0'
  },
  'brand-3': {
    title: 'Terroirs & Saveurs — Publicité Gastronomie Marocaine',
    client: 'Maison Culinaire Fès & Casablanca',
    category: 'Publicité Produits & Table d’Auteur',
    camera: 'Sony FX3 High-Speed 120fps',
    optics: 'Sony 90mm Macro f/2.8 & 35mm GM',
    format: '4K Slow-Motion · 2.39:1',
    duration: '01:15 min',
    year: '2026',
    description: 'Plans macro gourmands au ralenti 120 images par seconde. Vapeur, découpe, épices et dressage mis en valeur avec une précision d’orfèvre et une lumière naturelle ciselée.',
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  }
};

function initVideoModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalFrame = document.getElementById('modal-media-frame');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecsList = document.getElementById('modal-specs-list');
  const showreelBtn = document.getElementById('btn-showreel');

  if (!modal) return;

  function openProject(projectId) {
    const data = PROJECT_DETAILS[projectId] || PROJECT_DETAILS['brand-1'];

    modalTitle.textContent = data.title;
    modalClient.textContent = `${data.client.toUpperCase()} // ${data.category.toUpperCase()}`;
    modalDesc.textContent = data.description;

    modalSpecsList.innerHTML = `
      <li><span>Caméra</span> <strong>${data.camera}</strong></li>
      <li><span>Optiques</span> <strong>${data.optics}</strong></li>
      <li><span>Format / Ratio</span> <strong>${data.format}</strong></li>
      <li><span>Durée du film</span> <strong>${data.duration}</strong></li>
      <li><span>Année</span> <strong>${data.year}</strong></li>
      <li><span>Réalisation & DoP</span> <strong>Hamza Azizi (24FPS)</strong></li>
    `;

    modalFrame.innerHTML = `
      <iframe src="${data.videoSrc}" 
              title="${data.title}" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modalFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Open from cards
  document.querySelectorAll('.project[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      openProject(card.dataset.id);
    });
  });

  // Open Showreel
  if (showreelBtn) {
    showreelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openProject('brand-1');
    });
  }

  // Close handlers
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   06. Interactive WhatsApp Brief Builder
   -------------------------------------------------------------------------- */
function initWhatsAppBrief() {
  const form = document.getElementById('brief');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = data.get('name')?.toString().trim() || 'Non renseigné';
    const company = data.get('company')?.toString().trim() || 'Particulier / Marque';
    const service = data.get('service')?.toString() || 'Production vidéo';
    const location = data.get('location')?.toString() || 'Maroc';
    const timeline = data.get('timeline')?.toString() || 'À convenir';
    const details = data.get('message')?.toString().trim() || 'Bonjour Hamza, discutons de notre projet.';

    const structuredMessage = [
      '🎬 *DEMANDE DE BRIEF & DEVIS — 24FPS PRODUCTION*',
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *Nom :* ${name}`,
      `🏢 *Entreprise / Marque :* ${company}`,
      `🎥 *Prestation :* ${service}`,
      `📍 *Lieu de tournage :* ${location}`,
      `⏱️ *Échéance souhaitée :* ${timeline}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '📝 *Détails du projet :*',
      details,
      '━━━━━━━━━━━━━━━━━━━━',
      '_Message généré depuis le portfolio 24fps.ma_'
    ].join('\n');

    const whatsappUrl = `https://wa.me/212661734499?text=${encodeURIComponent(structuredMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   07. Custom Cinematic Select Dropdowns (No generic white browser popups)
   -------------------------------------------------------------------------- */
function initCustomSelects() {
  const customSelects = document.querySelectorAll('.custom-select-field');

  customSelects.forEach(selectField => {
    const trigger = selectField.querySelector('.custom-select-trigger');
    const valueDisplay = selectField.querySelector('.custom-select-value');
    const hiddenInput = selectField.querySelector('input[type="hidden"]');
    const options = selectField.querySelectorAll('.custom-option');

    if (!trigger || !options.length) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = selectField.classList.contains('open');
      closeAllPopovers();
      if (!isOpen) {
        selectField.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        const text = option.querySelector('span')?.textContent || value;

        if (hiddenInput) hiddenInput.value = value;
        if (valueDisplay) valueDisplay.textContent = text;

        options.forEach(opt => {
          opt.classList.remove('selected');
          opt.setAttribute('aria-selected', 'false');
        });
        option.classList.add('selected');
        option.setAttribute('aria-selected', 'true');

        selectField.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      } else if (e.key === 'Escape') {
        selectField.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   08. Custom Cinematic Calendar Date Picker (No past dates, up to date)
   -------------------------------------------------------------------------- */
function initCustomDatePicker() {
  const datepickerField = document.querySelector('.custom-datepicker-field');
  if (!datepickerField) return;

  const trigger = datepickerField.querySelector('.custom-datepicker-trigger');
  const valueDisplay = datepickerField.querySelector('.custom-datepicker-value');
  const hiddenInput = datepickerField.querySelector('#field-timeline');
  const monthYearDisplay = document.getElementById('cal-month-year');
  const daysGrid = document.getElementById('calendar-days');
  const prevBtn = document.getElementById('cal-prev');
  const nextBtn = document.getElementById('cal-next');
  const todayBtn = document.getElementById('cal-today-btn');

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  function renderCalendar(year, month) {
    if (!daysGrid || !monthYearDisplay) return;

    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Disable prev button if viewing current month and year
    if (prevBtn) {
      const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
      prevBtn.disabled = isCurrentMonth;
    }

    daysGrid.innerHTML = '';

    // First day of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const firstDay = new Date(year, month, 1);
    // Convert to Monday = 0, ..., Sunday = 6
    let startingDay = (firstDay.getDay() + 6) % 7;

    // Days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty padding slots
    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day empty';
      daysGrid.appendChild(emptyCell);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'cal-day';
      dayBtn.textContent = day.toString();

      // Check if date is in the past
      if (dayDate < today) {
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
        dayBtn.setAttribute('aria-disabled', 'true');
      } else {
        // Today badge
        if (dayDate.getTime() === today.getTime()) {
          dayBtn.classList.add('today');
        }

        // Selected badge
        if (selectedDate && dayDate.getTime() === selectedDate.getTime()) {
          dayBtn.classList.add('selected');
        }

        dayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectDate(dayDate);
        });
      }

      daysGrid.appendChild(dayBtn);
    }
  }

  function selectDate(date) {
    selectedDate = date;
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formatted = `${day} ${month} ${year}`;

    if (hiddenInput) hiddenInput.value = formatted;
    if (valueDisplay) {
      valueDisplay.textContent = formatted;
      valueDisplay.classList.remove('placeholder');
    }

    datepickerField.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    renderCalendar(viewYear, viewMonth);
  }

  // Toggle calendar on trigger click
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = datepickerField.classList.contains('open');
    closeAllPopovers();
    if (!isOpen) {
      datepickerField.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      renderCalendar(viewYear, viewMonth);
    }
  });

  // Prev Month button
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
      return;
    }
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    renderCalendar(viewYear, viewMonth);
  });

  // Next Month button
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    renderCalendar(viewYear, viewMonth);
  });

  // Today button
  todayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    selectDate(new Date(today));
  });

  // Initial render
  renderCalendar(viewYear, viewMonth);
}

// Global closer for all floating popovers
function closeAllPopovers() {
  document.querySelectorAll('.custom-select-field.open, .custom-datepicker-field.open').forEach(el => {
    el.classList.remove('open');
    const trigger = el.querySelector('[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', closeAllPopovers);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllPopovers();
});

