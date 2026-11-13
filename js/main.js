/**
 * 24FPS PRODUCTION — MAIN INTERACTIVE SCRIPT
 * Moteur d'interactions cinématiques & Système bilingue FR / EN
 */

document.addEventListener('DOMContentLoaded', () => {
  initTimecodeHUD();
  initNavigation();
  initPortfolioFilters();
  initVideoModal();
  initWhatsAppBrief();
  initCustomSelects();
  initCustomDatePicker();
  initLanguageSwitcher();
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
      const isEnglish = document.documentElement.lang === 'en';
      if (isOpen) {
        menuBtn.textContent = isEnglish ? 'Close −' : 'Fermer −';
      } else {
        menuBtn.textContent = 'Menu +';
      }
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
   03. Portfolio Filter Tabs
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
   04. Cinematic Video Lightbox Modal (Bilingual Content)
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  'brand-1': {
    title: {
      fr: 'L’Élégance du Mouvement — Salon du Cheval',
      en: 'The Elegance of Motion — Luxury Brand Campaign'
    },
    client: {
      fr: 'Palais & Joaillerie Casablanca',
      en: 'Casablanca Palace & High Jewelry'
    },
    category: {
      fr: 'Film de Marque · Publicité Web & TV',
      en: 'Brand Film · Commercial TV & Web'
    },
    camera: 'Sony FX3 Cinema Line',
    optics: 'Sony G Master 24-70mm f/2.8 & 85mm f/1.4',
    format: '4K UHD · 2.39:1 CinemaScope',
    duration: '00:47 min',
    year: '2026',
    description: {
      fr: 'Une captation cinématographique d’exception réalisée par 24FPS. Direction de la photographie pensée pour sublimer la noblesse, les matières dorées et le mouvement sous une lumière naturelle ciselée.',
      en: 'Exceptional cinematic film produced by 24FPS. Cinematography crafted to capture noble movement, golden hues, and vibrant emotion in radiant natural light.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/XCNdk9tg3UI?autoplay=1&mute=0&rel=0'
  },
  'event-1': {
    title: {
      fr: 'Rythme & Transe — Aftermovie Festival International',
      en: 'Rhythm & Trance — International Festival Aftermovie'
    },
    client: {
      fr: 'Festival des Musiques du Monde',
      en: 'World Sacred Music Festival'
    },
    category: {
      fr: 'Événementiel · Concert & Cérémonie',
      en: 'Events · Live Concert & Ceremony'
    },
    camera: 'Dual Sony FX3 + Stabilisateur DJI Ronin RS3 Pro',
    optics: 'Sony 16-35mm f/2.8 GM + 50mm f/1.2',
    format: '4K UHD · 16:9 Broadcast',
    duration: '02:30 min',
    year: '2026',
    description: {
      fr: 'Captation en immersion complète au cœur de plus de 15 000 festivaliers. Gestion des basses lumières extrêmes, montées d’énergie synchronisées sur le sound design et plans séquences au plus près des artistes.',
      en: 'Full immersion capture amidst over 15,000 festivalgoers. Extreme low-light performance, energy builds synchronized with sound design, and intimate sequence shots with performing artists.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  },
  'life-1': {
    title: {
      fr: 'L’Appel de l’Atlantique — Destination & Hôtellerie',
      en: 'Call of the Atlantic — Destination & Hospitality'
    },
    client: {
      fr: 'Taghazout Ocean Retreat & Spa',
      en: 'Taghazout Ocean Retreat & Spa'
    },
    category: {
      fr: 'Destination · Tourisme & Drone Aérien',
      en: 'Destination · Tourism & Aerial Drone'
    },
    camera: 'DJI Mavic 3 Cine & Sony FX3',
    optics: 'Optique Hasselblad 4/3 & Sony 35mm GM',
    format: '5.1K Apple ProRes 422 HQ · 2.39:1',
    duration: '02:10 min',
    year: '2025',
    description: {
      fr: 'Révéler la grandeur de la côte marocaine, le fracas des vagues et la sérénité des espaces architecturaux. Prises de vue aériennes au lever du soleil et étalonnage chaud aux teintes sable et cyan.',
      en: 'Revealing the majesty of the Moroccan coastline, roaring waves, and serene architecture. Sunrise aerial cinema with warm golden sand and deep ocean cyan color grading.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&mute=0&rel=0'
  },
  'brand-2': {
    title: {
      fr: 'Horizons Industriels — Film Corporate & Énergie',
      en: 'Industrial Horizons — Corporate & Clean Energy'
    },
    client: {
      fr: 'Groupe OCP & Green Energy Maroc',
      en: 'OCP Group & Green Energy Morocco'
    },
    category: {
      fr: 'Film Corporate · Documentaire Industriel',
      en: 'Corporate Film · Industrial Documentary'
    },
    camera: 'Sony FX3 Cinema Line',
    optics: 'Série Sony GM Prime & Zoom Cinéma',
    format: '4K DCI · S-Log3 / S-Gamut3.Cine',
    duration: '03:15 min',
    year: '2026',
    description: {
      fr: 'Raconter l’ambition technologique et humaine d’un fleuron national. Interviews soignées de scientifiques et ingénieurs, lumière sculptée aux projecteurs Aputure et plans drone immersifs.',
      en: 'Narrating technological and human ambition for a national flagship. Polished C-level interviews, sculpted lighting with Aputure fixtures, and immersive drone sequences.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0'
  },
  'social-1': {
    title: {
      fr: 'Vibrations Urbaines — Série Reels & TikTok Premium',
      en: 'Urban Pulse — Premium Reels & TikTok Series'
    },
    client: {
      fr: 'Casablanca Streetwear & Lifestyle',
      en: 'Casablanca Streetwear & Lifestyle'
    },
    category: {
      fr: 'Social Media · Format Vertical 9:16',
      en: 'Social Media · 9:16 Vertical Format'
    },
    camera: 'Sony FX3 Vertical Rig',
    optics: 'Sony 24mm f/1.4 GM',
    format: '4K Vertical 9:16 · 60fps',
    duration: '00:35 s (Pack 6 Reels)',
    year: '2026',
    description: {
      fr: 'Du contenu taillé pour retenir l’attention dès la première seconde. Montage percutant, sound design immersif et étalonnage contrasté ayant généré plus de 450 000 vues organiques.',
      en: 'Engineered to stop thumbs within the first second. High-impact editing, immersive sound design, and rich contrast generating over 450,000 organic impressions.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  },
  'life-2': {
    title: {
      fr: 'Les Silences du Sud — Documentaire Court Ouarzazate',
      en: 'Silences of the South — Ouarzazate Short Documentary'
    },
    client: {
      fr: 'Production Cinématographique Indépendante',
      en: 'Independent Film Production'
    },
    category: {
      fr: 'Court-Métrage & Patrimoine Culturel',
      en: 'Short Film & Cultural Heritage'
    },
    camera: 'Sony FX3 Cinema Line',
    optics: 'Optiques Cinéma Anamorphiques 1.33x',
    format: 'CinemaScope 2.39:1 · 24.000 FPS',
    duration: '05:40 min',
    year: '2025',
    description: {
      fr: 'Hommage à la terre de formation de Hamza Azizi (ISMC Ouarzazate). Une méditation visuelle sur les kasbahs centenaires, les ombres ocres et la lumière intemporelle du grand Sud marocain.',
      en: 'Tribute to Hamza Azizi’s film school roots (ISMC Ouarzazate). A cinematic meditation on centuries-old kasbahs, ochre shadows, and timeless desert light in southern Morocco.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/EngW7tLk6R8?autoplay=1&mute=0&rel=0'
  },
  'event-2': {
    title: {
      fr: 'Gala d’Excellence — Cérémonie & Sommet des Décideurs',
      en: 'Gala of Excellence — Leadership Summit & Awards'
    },
    client: {
      fr: 'Morocco Business Summit Marrakech',
      en: 'Morocco Business Summit Marrakech'
    },
    category: {
      fr: 'Cérémonie & Soirée Institutionnelle',
      en: 'Ceremony & Institutional Gala'
    },
    camera: 'Multi-caméras Sony FX3 & FX6',
    optics: 'Sony GM 70-200mm f/2.8 & 24-70mm',
    format: '4K UHD · Étalonnage Rec.709 Direct',
    duration: '02:00 min',
    year: '2026',
    description: {
      fr: 'Restitution de l’élégance et de la diplomatie économique lors d’un dîner de gala à Marrakech. Captation discrète, son broadcast irréprochable et livraison du teaser en moins de 48 heures.',
      en: 'Capturing prestige and economic diplomacy at a private Marrakech gala. Unobtrusive multi-cam setup, broadcast audio, and delivery of a cinematic teaser in under 48 hours.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0'
  },
  'brand-3': {
    title: {
      fr: 'Terroirs & Saveurs — Publicité Gastronomie Marocaine',
      en: 'Heritage & Flavor — Moroccan Gastronomy Commercial'
    },
    client: {
      fr: 'Maison Culinaire Fès & Casablanca',
      en: 'Culinary House Fez & Casablanca'
    },
    category: {
      fr: 'Publicité Produits & Table d’Auteur',
      en: 'Product Commercial & Culinary Table'
    },
    camera: 'Sony FX3 High-Speed 120fps',
    optics: 'Sony 90mm Macro f/2.8 & 35mm GM',
    format: '4K Slow-Motion · 2.39:1',
    duration: '01:15 min',
    year: '2026',
    description: {
      fr: 'Plans macro gourmands au ralenti 120 images par seconde. Vapeur, découpe, épices et dressage mis en valeur avec une précision d’orfèvre et une lumière naturelle ciselée.',
      en: 'Appetite-driven macro imagery at 120 frames per second. Steam, delicate cuts, rich spices, and plate styling captured with artisanal precision and sculpted light.'
    },
    videoSrc: 'https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1&mute=0&rel=0'
  }
};

let currentModalProjectId = null;

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
    if (typeof closeBrand1Inline === 'function') {
      closeBrand1Inline();
    }
    currentModalProjectId = projectId;
    const data = PROJECT_DETAILS[projectId] || PROJECT_DETAILS['brand-1'];
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

    modalTitle.textContent = data.title[lang];
    modalClient.textContent = `${data.client[lang].toUpperCase()} // ${data.category[lang].toUpperCase()}`;
    modalDesc.textContent = data.description[lang];

    const labels = lang === 'en' ? {
      cam: 'Camera',
      opt: 'Optics',
      fmt: 'Format / Ratio',
      dur: 'Runtime',
      yr: 'Year',
      dir: 'Director & DoP'
    } : {
      cam: 'Caméra',
      opt: 'Optiques',
      fmt: 'Format / Ratio',
      dur: 'Durée du film',
      yr: 'Année',
      dir: 'Réalisation & DoP'
    };

    modalSpecsList.innerHTML = `
      <li><span>${labels.cam}</span> <strong>${data.camera}</strong></li>
      <li><span>${labels.opt}</span> <strong>${data.optics}</strong></li>
      <li><span>${labels.fmt}</span> <strong>${data.format}</strong></li>
      <li><span>${labels.dur}</span> <strong>${data.duration}</strong></li>
      <li><span>${labels.yr}</span> <strong>${data.year}</strong></li>
      <li><span>${labels.dir}</span> <strong>Hamza Azizi (24FPS)</strong></li>
    `;

    modalFrame.innerHTML = `
      <iframe src="${data.videoSrc}" 
              title="${data.title[lang]}" 
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
    currentModalProjectId = null;
  }

  // Handle Project 1 (The Elegance of Motion) Inline Embed & Fast Player
  const brand1Card = document.querySelector('.project[data-id="brand-1"]');
  const brand1Picture = document.getElementById('picture-brand-1');

  function playBrand1Inline() {
    if (!brand1Picture) return;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const cinemaLabel = lang === 'en' ? 'Cinema Mode' : 'Mode Cinéma';
    const closeLabel = lang === 'en' ? 'Close' : 'Fermer';

    if (!brand1Picture.dataset.initialMarkup) {
      brand1Picture.dataset.initialMarkup = brand1Picture.innerHTML;
    }

    brand1Picture.classList.add('video-playing');
    brand1Picture.innerHTML = `
      <iframe class="project-embed-iframe"
              src="https://www.youtube-nocookie.com/embed/XCNdk9tg3UI?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1" 
              title="24FPS Production — Salon du Cheval El Jadida" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
      </iframe>
      <div class="inline-video-controls">
        <button type="button" class="inline-expand-btn" id="inline-expand-brand1" aria-label="${cinemaLabel}" title="${cinemaLabel}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
          <span class="btn-label-text">${cinemaLabel}</span>
        </button>
        <button type="button" class="inline-close-btn" id="inline-close-brand1" aria-label="${closeLabel}" title="${closeLabel}">✕</button>
      </div>
    `;

    document.getElementById('inline-expand-brand1')?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeBrand1Inline();
      openProject('brand-1');
    });

    document.getElementById('inline-close-brand1')?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeBrand1Inline();
    });
  }

  function closeBrand1Inline() {
    if (brand1Picture && brand1Picture.dataset.initialMarkup && brand1Picture.classList.contains('video-playing')) {
      brand1Picture.innerHTML = brand1Picture.dataset.initialMarkup;
      brand1Picture.classList.remove('video-playing');
      attachBrand1PlayListener();
    }
  }

  function attachBrand1PlayListener() {
    const playBtn = brand1Picture?.querySelector('.play-action-btn');
    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      playBrand1Inline();
    });
  }

  attachBrand1PlayListener();

  // If user clicks on picture background outside button, play inline
  brand1Picture?.addEventListener('click', (e) => {
    if (!brand1Picture.classList.contains('video-playing')) {
      e.stopPropagation();
      playBrand1Inline();
    }
  });

  // Open from cards
  document.querySelectorAll('.project[data-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (card.dataset.id === 'brand-1') {
        // If clicked inside picture (handled by inline player), don't trigger modal
        if (e.target.closest('#picture-brand-1')) {
          return;
        }
      }
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

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Expose re-renderer for modal when language toggles
  window.refreshModalLanguage = function() {
    if (modal.classList.contains('open') && currentModalProjectId) {
      openProject(currentModalProjectId);
    }
    const expandBtnLabel = document.querySelector('#inline-expand-brand1 .btn-label-text');
    if (expandBtnLabel) {
      const isEn = document.documentElement.lang === 'en';
      expandBtnLabel.textContent = isEn ? 'Cinema Mode' : 'Mode Cinéma';
    }
  };
}

/* --------------------------------------------------------------------------
   05. Interactive WhatsApp Brief Builder
   -------------------------------------------------------------------------- */
function initWhatsAppBrief() {
  const form = document.getElementById('brief');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

    const name = data.get('name')?.toString().trim() || (lang === 'en' ? 'Not specified' : 'Non renseigné');
    const company = data.get('company')?.toString().trim() || (lang === 'en' ? 'Individual / Brand' : 'Particulier / Marque');
    const service = data.get('service')?.toString() || (lang === 'en' ? 'Video Production' : 'Production vidéo');
    const location = data.get('location')?.toString() || (lang === 'en' ? 'Morocco' : 'Maroc');
    const timeline = data.get('timeline')?.toString() || (lang === 'en' ? 'To be agreed' : 'À convenir');
    const details = data.get('message')?.toString().trim() || (lang === 'en' ? 'Hello Hamza, let’s discuss our project.' : 'Bonjour Hamza, discutons de notre projet.');

    const structuredMessage = lang === 'en' ? [
      '🎬 *BRIEF & QUOTE REQUEST — 24FPS PRODUCTION*',
      '━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${name}`,
      `🏢 *Company / Brand:* ${company}`,
      `🎥 *Service:* ${service}`,
      `📍 *Shoot Location:* ${location}`,
      `⏱️ *Target Timeline:* ${timeline}`,
      '━━━━━━━━━━━━━━━━━━━━',
      '📝 *Project Details:*',
      details,
      '━━━━━━━━━━━━━━━━━━━━',
      '_Message sent via 24fps.ma portfolio_'
    ].join('\n') : [
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
   06. Custom Cinematic Select Dropdowns
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
   07. Custom Cinematic Calendar Date Picker (No past dates, bilingual)
   -------------------------------------------------------------------------- */
let datepickerRenderFn = null;

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

  const monthNamesFR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const monthNamesEN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  function renderCalendar(year, month) {
    if (!daysGrid || !monthYearDisplay) return;

    const isEN = document.documentElement.lang === 'en';
    const monthNames = isEN ? monthNamesEN : monthNamesFR;

    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Disable prev button if on current month
    if (prevBtn) {
      const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
      prevBtn.disabled = isCurrentMonth;
    }

    daysGrid.innerHTML = '';

    // First day of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const firstDay = new Date(year, month, 1);
    let startingDay = (firstDay.getDay() + 6) % 7; // Monday = 0

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day empty';
      daysGrid.appendChild(emptyCell);
    }

    // Days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'cal-day';
      dayBtn.textContent = day.toString();

      // Past dates strictly disabled!
      if (dayDate < today) {
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
        dayBtn.setAttribute('aria-disabled', 'true');
      } else {
        if (dayDate.getTime() === today.getTime()) {
          dayBtn.classList.add('today');
        }
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
    const isEN = document.documentElement.lang === 'en';
    const monthNames = isEN ? monthNamesEN : monthNamesFR;
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

  datepickerRenderFn = () => renderCalendar(viewYear, viewMonth);

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

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) return;
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    renderCalendar(viewYear, viewMonth);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    renderCalendar(viewYear, viewMonth);
  });

  todayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    selectDate(new Date(today));
  });

  renderCalendar(viewYear, viewMonth);
}

/* --------------------------------------------------------------------------
   08. Internationalization (FR / EN) Language Switcher
   -------------------------------------------------------------------------- */
const DICTIONARY = {
  fr: {
    pageTitle: '24FPS Production — Hamza Azizi | Réalisateur & Directeur de la Photographie Maroc',
    nav: {
      confiance: 'Clients & Confiance',
      univers: 'Films & Projets',
      services: 'Expertises',
      plateau: 'Sur le Plateau',
      studio: 'Le Réalisateur',
      materiel: 'Matériel',
      contact: 'Contact',
      cta: 'Devis rapide <span class="arrow">↗</span>',
      menu: 'Menu +'
    },
    hero: {
      eyebrow: '<span class="dot"></span> Équipe de production audiovisuelle · Tout le Maroc',
      h1: 'CHAQUE IMAGE<br>RACONTE.<br><em>LA VÔTRE AUSSI.</em>',
      desc: 'Des films de marque qui captent l’attention. Des récits cinématographiques qui durent. Autour du réalisateur Hamza Azizi, 24FPS conjugue regard d’auteur et exigences commerciales pour donner vie à votre vision, partout au Maroc.',
      ctaWork: 'Explorer les réalisations <span class="arrow">↗</span>',
      showreelBtn: '<span class="play-icon-circle">▶</span> Voir la Showreel 2026',
      vertical: 'BASÉS À MOHAMMEDIA — TOURNAGES PARTOUT AU MAROC'
    },
    ticker: '<span>FILMS PUBLICITAIRES</span><b>✳</b><span>DIRECTION DE LA PHOTOGRAPHIE</span><b>✳</b><span>DRONE HOMOLOGUÉ</span><b>✳</b><span>AFTERMOVIES ÉVÉNEMENTIELS</span><b>✳</b><span>SOCIAL MEDIA & REELS</span><b>✳</b><span>POSTPRODUCTION & ÉTALONNAGE</span>',
    trust: {
      label: '01 / Références & Confiance',
      h2: 'ILS NOUS FONT<br>CONFIANCE.',
      muted: 'Des marques exigeantes, institutions prestigieuses et créateurs d’événements qui choisissent notre regard pour incarner leur identité visuelle.',
      stat1Label: 'Films Réalisés',
      stat1Desc: 'Publicités, documentaires & contenus digitaux livrés avec succès.',
      stat2Label: 'Couverture Nationale',
      stat2Desc: 'Présence active dans les 12 régions du Royaume, de Tanger à Dakhla.',
      stat3Label: 'Workflow Cinéma',
      stat3Desc: 'Caméras Sony FX3 Cinema Line, optiques G Master & étalonnage DaVinci.',
      stat4Label: 'Satisfaction Client',
      stat4Desc: 'Fidélité éprouvée auprès des agences, marques et directions de communication.',
      quote1: '« 24FPS a su capter l’ADN de notre marque avec une signature visuelle d’une rare élégance. Le film publicitaire a dépassé nos objectifs en générant plus de 450 000 vues organiques. Un professionnalisme exemplaire. »',
      role1: 'Directrice Marketing · Luxury Hospitality',
      quote2: '« Réactivité remarquable, maîtrise absolue du cadre et de la lumière même dans l’urgence du direct. Hamza et son équipe ont livré un aftermovie époustouflant en un temps record. Une confiance totale. »',
      role2: 'Commissaire Général · Festival & Concerts',
      quote3: '« Travailler avec Hamza, c’est l’assurance d’apporter une véritable sensibilité cinéma à des sujets institutionnels. La rigueur technique et le sens du détail font toute la différence à l’écran. »',
      role3: 'Directeur de la Communication · Groupe Industriel'
    },
    projects: {
      label: '02 / L’image, sous toutes ses formes',
      h2: 'UN REGARD.<br>PLUSIEURS UNIVERS.',
      muted: 'De la rigueur d’un film institutionnel à l’énergie brute d’un concert, chaque projet bénéficie d’un découpage technique sur mesure et d’une identité colorimétrique unique.',
      filterAll: 'Tout explorer (08)',
      filterBrand: 'Films de marque & Corporate',
      filterEvent: 'Événementiel & Live',
      filterLife: 'Destination & Lieux',
      filterSocial: 'Social Media & Reels',
      note: '// Direction visuelle et extrait de portfolio. Cliquez sur chaque projet pour visionner la vidéo et consulter les détails de production.'
    },
    services: {
      label: '03 / De l’idée à l’écran',
      h2: 'NOS EXPERTISES<br>CINÉMA & DIGITAL.',
      muted: 'Un accompagnement créatif complet pour concevoir des images cohérentes avec votre positionnement de marque et vos objectifs de conversion.',
      s1Title: 'Production Vidéo & Publicité',
      s1Desc: 'Scénarisation, découpage technique, direction d’acteurs et tournage haute précision. Nous traduisons vos messages complexes en émotions fortes et mémorables.',
      s2Title: 'Direction de la Photographie',
      s2Desc: 'Diplômé de l’ISMC Ouarzazate, Hamza Azizi sculpte la lumière pour conférer à chaque plan une texture organique et une intensité cinématique affirmée.',
      s3Title: 'Prises de Vue Aériennes & Drone',
      s3Desc: 'Révéler la grandeur d’un domaine hôtelier, l’immensité d’un paysage ou l’envergure d’un chantier industriel grâce à un pilotage fluide et certifié.',
      s4Title: 'Social Media & Contenus Verticaux',
      s4Desc: 'Des vidéos courtes spécialement pensées pour les formats verticaux. Rythme effréné, montage au milliseconde et sound design immersif pour maximiser l’engagement.',
      s5Title: 'Postproduction & Étalonnage DaVinci',
      s5Desc: 'Le travail en salle de montage donne le pouls final au film. Étalonnage sur écran calibré, harmonisation des teintes et finitions aux standards du grand écran.'
    },
    plateau: {
      label: '04 / En Action sur le Terrain',
      h2: 'L’EXIGENCE SUR LE PLATEAU.<br>L’EXCELLENCE À L’ÉCRAN.',
      muted: 'Un film réussi est le fruit d’une préparation rigoureuse et d’une maîtrise technique sans compromis, quel que soit le lieu de tournage.',
      c1: 'Cadrage précis & retour moniteur étalonné',
      c2: 'Sculpture de la lumière aux projecteurs Aputure',
      c3: 'Télépilotage drone et repérages aériens',
      c4: 'Coordination d’équipe sur plateau de tournage'
    },
    studio: {
      stamp: 'L’INTENTION DERRIÈRE CHAQUE PLAN.',
      label: '05 / Un regard, une signature',
      h2: 'PLUSIEURS TALENTS.<br>UNE MÊME EXIGENCE.',
      p1: 'Diplômé de la prestigieuse école de cinéma de Ouarzazate (<strong>Institut Supérieur des Métiers du Cinéma — ISMC</strong>), Hamza Azizi fonde 24FPS avec une conviction chevillée au corps : chaque marque, chaque histoire mérite la puissance narrative et la sophistication visuelle du septième art.',
      p2: 'Réalisation, direction de la photographie, éclairage, machinerie et postproduction : nous dimensionnons l’équipe technique exactement selon l’ambition de votre projet, avec une même rigueur du premier découpage jusqu’à la livraison du master final.',
      badge1: 'Diplômé ISMC Ouarzazate',
      badge2: '+8 Années d’Expérience',
      badge3: 'Télépilote Drone Homologué',
      badge4: 'Directeur de la Photo Certifié',
      role: 'RÉALISATEUR & DIRECTEUR DE LA PHOTOGRAPHIE · 24FPS PRODUCTION',
      teamLabel: 'Les pôles d’excellence derrière vos images',
      p1Title: 'Réalisation<br>& Production Exécutive',
      p1Desc: 'Scénarisation, storyboarding, repérages des décors, autorisations de tournage et direction générale des opérations.',
      p2Title: 'Direction Photo,<br>Lumière & Cadre',
      p2Desc: 'Gestion de l’exposition, choix des focales, stabilisation gyroscopique et scénographie lumineuse cohérente.',
      p3Title: 'Montage, Étalonnage<br>& Formats Sociaux',
      p3Desc: 'Rythme narratif, colorimétrie de pointe, sound design immersif et déclinaisons optimisées multi-écrans.'
    },
    nation: {
      label: 'Mobilité & Terrain de Jeu',
      h2: 'VOTRE TOURNAGE.<br>PARTOUT AU MAROC.',
      desc: 'Basés à Mohammedia et connectés à l’axe Casablanca-Rabat, nous disposons d’une logistique de tournage mobile autonome permettant d’intervenir avec réactivité partout dans le Royaume et à l’international.',
      cta: 'Planifier un tournage dans votre ville <span class="arrow">↗</span>'
    },
    gear: {
      label: '07 / Arsenal Technique & Matériel',
      h2: 'LA TECHNOLOGIE<br>AU SERVICE DE L’HISTOIRE.',
      muted: 'Un parc matériel cinéma propriétaire et entretenu selon les plus hauts standards de l’industrie pour garantir une image irréprochable.',
      g1Label: 'CAMÉRA CINÉMA PRINCIPALE',
      g1Desc: 'Capteur plein format 4K 120fps, double ISO natif pour basses lumières extrêmes et colorimétrie cinéma S-Cinetone.',
      g2Label: 'OPTIQUES DE PRÉCISION',
      g2Desc: 'Focales fixes et zooms à grande ouverture (f/1.4 - f/2.8) pour un piqué chirurgical et un bokeh crémeux.',
      g3Label: 'MOUVEMENTS & STABILISATION',
      g3Desc: 'Mouvements d’une fluidité absolue, plans travellings immersifs et suivi de mise au point LiDAR en temps réel.',
      g4Label: 'PRISES DE VUE AÉRIENNES',
      g4Desc: 'Capteur Hasselblad 4/3, enregistrement Apple ProRes 422 HQ 5.1K et profils D-Log pour étalonnage poussé.',
      g5Label: 'ÉCLAIRAGE PROFESSIONNEL',
      g5Desc: 'Projecteurs 600d & 300x bi-color avec modificateurs Fresnel et boîtes à lumière pour sculpter chaque ambiance.',
      g6Label: 'PRISE DE SON BROADCAST',
      g6Desc: 'Microphones canons directifs MKH et capsules cravates sans fil numériques 32-bit float sans saturation.',
      note: '// Des configurations spécifiques (grues, steadycam lourd, caméras RED ou ARRI) peuvent être mobilisées selon l’envergure de la production.'
    },
    process: {
      label: '08 / Méthode de Travail',
      s1Badge: '01 — ÉCOUTER & SCÉNARISER',
      s1Title: 'Votre vision, notre point de départ.',
      s1Desc: 'Analyse de vos objectifs, définition de la ligne éditoriale, repérages et conception du découpage technique.',
      s2Badge: '02 — TOURNER & DIRIGER',
      s2Title: 'Donner forme à l’histoire.',
      s2Desc: 'Tournage avec une équipe dédiée, maîtrise de la lumière et des mouvements de caméra pour capturer l’émotion juste.',
      s3Badge: '03 — SUBLIMER & LIVRER',
      s3Title: 'L’excellence jusqu’au dernier pixel.',
      s3Desc: 'Montage rythmé, étalonnage DaVinci Resolve, mixage audio et exportation dans tous les formats de diffusion.'
    },
    contact: {
      label: '09 / Le prochain plan commence ici',
      h2: 'UNE IDÉE ?<br>ON TOURNE.',
      desc: 'Un film de marque, un aftermovie, une campagne publicitaire ou un projet aérien ? Décrivez-nous vos ambitions : nous vous recontactons sous 24 heures avec une proposition sur mesure.',
      office: '<strong>24FPS Production — Hamza Azizi</strong><br>Bureau : Mohammedia, Maroc<br>Tournages réguliers à Casablanca, Rabat, Marrakech et tout le Royaume',
      nameLabel: 'VOTRE NOM & PRÉNOM *',
      namePlaceholder: 'Ex. Yassine Alami',
      companyLabel: 'ENTREPRISE OU MARQUE',
      companyPlaceholder: 'Ex. Palais Marrakech',
      serviceLabel: 'TYPE DE PROJET *',
      locationLabel: 'VILLE OU LIEU DE TOURNAGE',
      timelineLabel: 'ÉCHÉANCE SOUHAITÉE (DATE DU PROJET)',
      timelinePlaceholder: 'Choisir une date sur le calendrier...',
      calNote: '// Dates passées désactivées',
      calToday: 'Aujourd\'hui',
      messageLabel: 'PARLEZ-NOUS DE VOTRE PROJET *',
      messagePlaceholder: 'Décrivez votre idée, le style recherché, les livrables souhaités...',
      submitBtn: '<span>Envoyer mon brief sur WhatsApp</span> <span class="arrow">↗</span>'
    },
    socials: {
      label: 'Dans les coulisses de 24FPS',
      h2: 'SUIVEZ LE MOUVEMENT.',
      instaDesc: '@24_fps.h<br>Reels réguliers, extraits de tournage et coulisses d’éclairage.',
      linkedinDesc: 'Hamza Azizi<br>Collaborations B2B, partenariats agences et actualités de production.'
    },
    footer: {
      copy: '© 2026 24FPS Production · Réalisation & Direction de la Photographie par Hamza Azizi · Tous droits réservés.',
      top: 'Retour en haut ↑'
    }
  },

  en: {
    pageTitle: '24FPS Production — Hamza Azizi | Director & Director of Photography Morocco',
    nav: {
      confiance: 'Clients & Trust',
      univers: 'Films & Projects',
      services: 'Expertise',
      plateau: 'On Set',
      studio: 'The Director',
      materiel: 'Equipment',
      contact: 'Contact',
      cta: 'Quick Quote <span class="arrow">↗</span>',
      menu: 'Menu +'
    },
    hero: {
      eyebrow: '<span class="dot"></span> Audiovisual Production Team · All Across Morocco',
      h1: 'EVERY FRAME<br>TELLS A STORY.<br><em>YOURS TOO.</em>',
      desc: 'Brand films that capture attention. Cinematic stories that endure. Led by director Hamza Azizi, 24FPS combines auteur vision with commercial excellence to bring your vision to life, all across Morocco.',
      ctaWork: 'Explore Our Work <span class="arrow">↗</span>',
      showreelBtn: '<span class="play-icon-circle">▶</span> Watch 2026 Showreel',
      vertical: 'BASED IN MOHAMMEDIA — SHOOTING ALL ACROSS MOROCCO'
    },
    ticker: '<span>COMMERCIAL FILMS</span><b>✳</b><span>CINEMATOGRAPHY</span><b>✳</b><span>CERTIFIED DRONE</span><b>✳</b><span>EVENT AFTERMOVIES</span><b>✳</b><span>SOCIAL MEDIA & REELS</span><b>✳</b><span>POST-PRODUCTION & COLOR GRADING</span>',
    trust: {
      label: '01 / References & Trust',
      h2: 'THEY TRUST<br>OUR VISION.',
      muted: 'Demanding brands, prestigious institutions, and event creators who choose our lens to embody their visual identity.',
      stat1Label: 'Films Completed',
      stat1Desc: 'Commercials, documentaries & digital content successfully delivered.',
      stat2Label: 'Nationwide Coverage',
      stat2Desc: 'Active presence across all 12 regions of Morocco, from Tangier to Dakhla.',
      stat3Label: 'Cinema Workflow',
      stat3Desc: 'Sony FX3 Cinema Line cameras, G Master lenses & DaVinci grading.',
      stat4Label: 'Client Satisfaction',
      stat4Desc: 'Proven loyalty across agencies, premier brands, and marketing leaders.',
      quote1: '“24FPS captured our brand\'s DNA with a visual signature of rare elegance. The commercial film exceeded our targets, generating over 450,000 organic views. Exemplary professionalism.”',
      role1: 'Marketing Director · Luxury Hospitality',
      quote2: '“Remarkable responsiveness, absolute mastery of framing and lighting even in live event conditions. Hamza and his crew delivered a breathtaking aftermovie in record time. Complete trust.”',
      role2: 'General Commissioner · Festivals & Concerts',
      quote3: '“Working with Hamza ensures a genuine cinematic sensibility brought to institutional subjects. Technical rigor and attention to detail make all the difference on screen.”',
      role3: 'Communications Director · Industrial Group'
    },
    projects: {
      label: '02 / Imagery in All Its Forms',
      h2: 'ONE VISION.<br>MULTIPLE REALMS.',
      muted: 'From the precision of a corporate film to the raw energy of a live concert, every project receives a tailored shot list and a unique color grade.',
      filterAll: 'Explore All (08)',
      filterBrand: 'Brand & Corporate Films',
      filterEvent: 'Events & Live',
      filterLife: 'Destination & Places',
      filterSocial: 'Social Media & Reels',
      note: '// Visual direction and portfolio excerpt. Click on each project to view the film and inspect production specs.'
    },
    services: {
      label: '03 / From Script to Screen',
      h2: 'OUR CINEMA &<br>DIGITAL EXPERTISE.',
      muted: 'Comprehensive creative support to craft visuals aligned with your brand positioning and conversion objectives.',
      s1Title: 'Video Production & Commercials',
      s1Desc: 'Scriptwriting, technical shot lists, talent direction, and high-precision filming. We translate complex brand messages into powerful, memorable emotions.',
      s2Title: 'Cinematography & Lighting',
      s2Desc: 'ISMC Ouarzazate graduate Hamza Azizi crafts lighting to give every shot an organic texture and an asserted cinematic intensity.',
      s3Title: 'Aerial Cinematography & Drone',
      s3Desc: 'Revealing the majesty of luxury resorts, vast landscapes, or the scale of industrial facilities through certified, fluid piloting.',
      s4Title: 'Social Media & Vertical Content',
      s4Desc: 'Short-form videos engineered specifically for vertical feeds. Dynamic pacing, frame-accurate editing, and immersive sound design to maximize engagement.',
      s5Title: 'Post-Production & DaVinci Color Grading',
      s5Desc: 'Post-production sets the final pulse of the film. Color grading on calibrated reference monitors, tone matching, and finishing to theatrical standards.'
    },
    plateau: {
      label: '04 / In Action On Set',
      h2: 'RIGOR ON SET.<br>EXCELLENCE ON SCREEN.',
      muted: 'A great film is the outcome of meticulous preparation and uncompromising technical mastery, wherever the shoot takes place.',
      c1: 'Precise framing & calibrated monitor reference',
      c2: 'Lighting design with Aputure fixtures',
      c3: 'Certified drone flight & aerial scouting',
      c4: 'Crew coordination on set'
    },
    studio: {
      stamp: 'THE INTENT BEHIND EVERY FRAME.',
      label: '05 / A Vision, A Signature',
      h2: 'MULTIPLE TALENTS.<br>ONE UNCOMPROMISING STANDARD.',
      p1: 'A graduate of the prestigious film academy in Ouarzazate (<strong>Institut Supérieur des Métiers du Cinéma — ISMC</strong>), Hamza Azizi founded 24FPS with a deep conviction: every brand, every story deserves the narrative power and visual sophistication of the seventh art.',
      p2: 'Directing, cinematography, lighting, grip, and post-production: we size the technical crew precisely to match your project\'s ambitions, with the same rigor from the first shot list to the delivery of the final master.',
      badge1: 'ISMC Ouarzazate Graduate',
      badge2: '+8 Years of Experience',
      badge3: 'Certified Drone Pilot',
      badge4: 'Accredited Cinematographer',
      role: 'DIRECTOR & DIRECTOR OF PHOTOGRAPHY · 24FPS PRODUCTION',
      teamLabel: 'Core Pillars Behind Your Imagery',
      p1Title: 'Directing<br>& Line Production',
      p1Desc: 'Scriptwriting, storyboarding, location scouting, shoot permits, and overall production management.',
      p2Title: 'Cinematography,<br>Lighting & Camera',
      p2Desc: 'Exposure management, lens selection, gyroscopic stabilization, and cohesive lighting design.',
      p3Title: 'Editing, Grading<br>& Social Formats',
      p3Desc: 'Narrative pacing, advanced color grading, immersive sound design, and multi-screen optimizations.'
    },
    nation: {
      label: 'Mobility & Scope',
      h2: 'YOUR PRODUCTION.<br>ALL ACROSS MOROCCO.',
      desc: 'Based in Mohammedia with direct access to the Casablanca-Rabat corridor, we maintain autonomous mobile production logistics to deploy promptly anywhere across Morocco and internationally.',
      cta: 'Plan a Shoot in Your City <span class="arrow">↗</span>'
    },
    gear: {
      label: '07 / Camera Arsenal & Gear',
      h2: 'TECHNOLOGY<br>IN SERVICE OF STORYTELLING.',
      muted: 'Proprietary cinema gear maintained to the industry\'s highest standards to guarantee immaculate image quality.',
      g1Label: 'PRIMARY CINEMA CAMERA',
      g1Desc: 'Full-frame 4K 120fps sensor, dual base ISO for extreme low-light performance, and S-Cinetone color science.',
      g2Label: 'PRECISION OPTICS',
      g2Desc: 'Fast prime and zoom lenses (f/1.4 - f/2.8) delivering razor-sharp clarity and creamy cinematic bokeh.',
      g3Label: 'CAMERA MOVEMENT & GIMBAL',
      g3Desc: 'Silky-smooth camera moves, immersive tracking shots, and real-time LiDAR autofocus tracking.',
      g4Label: 'AERIAL CINEMATOGRAPHY',
      g4Desc: 'Hasselblad 4/3 sensor, 5.1K Apple ProRes 422 HQ recording, and D-Log profiles for deep color grading.',
      g5Label: 'CINEMA LIGHTING',
      g5Desc: 'Aputure 600d and 300x bi-color fixtures with Fresnel modifiers and softboxes to sculpt mood.',
      g6Label: 'BROADCAST AUDIO',
      g6Desc: 'Directional MKH shotgun microphones and 32-bit float digital wireless lavaliers preventing audio clipping.',
      note: '// Specific custom setups (heavy cranes, steadicam rigs, RED or ARRI cameras) can be deployed based on production scale.'
    },
    process: {
      label: '08 / Production Process',
      s1Badge: '01 — LISTEN & SCRIPT',
      s1Title: 'Your vision, our starting point.',
      s1Desc: 'Analyzing your goals, defining the editorial tone, scouting locations, and designing the shot list.',
      s2Badge: '02 — SHOOT & DIRECT',
      s2Title: 'Bringing the story to life.',
      s2Desc: 'Filming with a dedicated crew, mastering light and camera motion to capture genuine emotion.',
      s3Badge: '03 — ELEVATE & DELIVER',
      s3Title: 'Excellence down to the last pixel.',
      s3Desc: 'Rhythmic editing, DaVinci Resolve color grading, audio mastering, and exporting in all required distribution formats.'
    },
    contact: {
      label: '09 / The Next Shot Starts Here',
      h2: 'GOT AN IDEA?<br>LET’S ROLL.',
      desc: 'A brand film, an aftermovie, a commercial campaign, or an aerial project? Share your ambitions with us: we will get back to you within 24 hours with a custom proposal.',
      office: '<strong>24FPS Production — Hamza Azizi</strong><br>Studio: Mohammedia, Morocco<br>Regular productions in Casablanca, Rabat, Marrakech, and nationwide',
      nameLabel: 'YOUR FULL NAME *',
      namePlaceholder: 'Ex. John Smith',
      companyLabel: 'COMPANY OR BRAND',
      companyPlaceholder: 'Ex. Luxury Brand',
      serviceLabel: 'PROJECT TYPE *',
      locationLabel: 'SHOOT LOCATION',
      timelineLabel: 'TARGET TIMELINE (PROJECT DATE)',
      timelinePlaceholder: 'Select a date on the calendar...',
      calNote: '// Past dates disabled',
      calToday: 'Today',
      messageLabel: 'TELL US ABOUT YOUR PROJECT *',
      messagePlaceholder: 'Describe your concept, desired visual aesthetic, deliverables...',
      submitBtn: '<span>Send My Brief on WhatsApp</span> <span class="arrow">↗</span>'
    },
    socials: {
      label: 'Behind the Scenes of 24FPS',
      h2: 'FOLLOW THE MOTION.',
      instaDesc: '@24_fps.h<br>Regular reels, production footage, and lighting breakdowns.',
      linkedinDesc: 'Hamza Azizi<br>B2B partnerships, agency collaborations, and production updates.'
    },
    footer: {
      copy: '© 2026 24FPS Production · Directing & Cinematography by Hamza Azizi · All rights reserved.',
      top: 'Back to top ↑'
    }
  }
};

function initLanguageSwitcher() {
  const switchContainer = document.getElementById('lang-switch-container');
  const toggleBtn = document.getElementById('lang-toggle-btn');
  const codeIndicator = document.getElementById('lang-code-indicator');
  const menuItems = document.querySelectorAll('.lang-menu-item');

  if (!switchContainer || !toggleBtn) return;

  function setLanguage(lang) {
    const target = lang === 'en' ? 'en' : 'fr';
    document.documentElement.lang = target;
    const t = DICTIONARY[target];

    // Update button text
    if (codeIndicator) {
      codeIndicator.textContent = target.toUpperCase();
    }

    // Update active state in menu
    menuItems.forEach(item => {
      const itemLang = item.dataset.lang;
      if (itemLang === target) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });

    // Update Page Title
    document.title = t.pageTitle;

    // Helper to safely set innerHTML
    const setHtml = (selector, html) => {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    };

    // Helper to safely set textContent
    const setText = (selector, text) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = text;
    };

    // Helper to safely set placeholder
    const setPlaceholder = (selector, ph) => {
      const el = document.querySelector(selector);
      if (el) el.placeholder = ph;
    };

    // 1. Navigation
    setHtml('nav a[href="#confiance"]', t.nav.confiance);
    setHtml('nav a[href="#univers"]', t.nav.univers);
    setHtml('nav a[href="#services"]', t.nav.services);
    setHtml('nav a[href="#plateau"]', t.nav.plateau);
    setHtml('nav a[href="#studio"]', t.nav.studio);
    setHtml('nav a[href="#materiel"]', t.nav.materiel);
    setHtml('nav a[href="#contact"]', t.nav.contact);
    setHtml('#nav-cta-btn', t.nav.cta);

    // 2. Hero
    setHtml('.hero .eyebrow', t.hero.eyebrow);
    setHtml('.hero h1', t.hero.h1);
    setHtml('.hero-inner > p', t.hero.desc);
    setHtml('.hero-bottom .cta.orange', t.hero.ctaWork);
    setHtml('#btn-showreel', t.hero.showreelBtn);
    setHtml('.vertical-badge', t.hero.vertical);

    // 3. Ticker
    setHtml('.ticker', t.ticker);

    // 4. Trust Section
    setHtml('#confiance .label', t.trust.label);
    setHtml('#confiance h2', t.trust.h2);
    setHtml('#confiance .muted', t.trust.muted);
    setHtml('.trust-stats .stat-item:nth-child(1) .stat-label', t.trust.stat1Label);
    setHtml('.trust-stats .stat-item:nth-child(1) .stat-desc', t.trust.stat1Desc);
    setHtml('.trust-stats .stat-item:nth-child(2) .stat-label', t.trust.stat2Label);
    setHtml('.trust-stats .stat-item:nth-child(2) .stat-desc', t.trust.stat2Desc);
    setHtml('.trust-stats .stat-item:nth-child(3) .stat-label', t.trust.stat3Label);
    setHtml('.trust-stats .stat-item:nth-child(3) .stat-desc', t.trust.stat3Desc);
    setHtml('.trust-stats .stat-item:nth-child(4) .stat-label', t.trust.stat4Label);
    setHtml('.trust-stats .stat-item:nth-child(4) .stat-desc', t.trust.stat4Desc);
    setHtml('.testimonials-grid article:nth-child(1) .testimonial-quote', t.trust.quote1);
    setHtml('.testimonials-grid article:nth-child(1) .testimonial-meta p', t.trust.role1);
    setHtml('.testimonials-grid article:nth-child(2) .testimonial-quote', t.trust.quote2);
    setHtml('.testimonials-grid article:nth-child(2) .testimonial-meta p', t.trust.role2);
    setHtml('.testimonials-grid article:nth-child(3) .testimonial-quote', t.trust.quote3);
    setHtml('.testimonials-grid article:nth-child(3) .testimonial-meta p', t.trust.role3);

    // 5. Projects Section
    setHtml('#univers .label', t.projects.label);
    setHtml('#univers h2', t.projects.h2);
    setHtml('#univers .section-top .muted', t.projects.muted);
    setHtml('.filters button[data-filter="all"]', t.projects.filterAll);
    setHtml('.filters button[data-filter="brand"]', t.projects.filterBrand);
    setHtml('.filters button[data-filter="event"]', t.projects.filterEvent);
    setHtml('.filters button[data-filter="life"]', t.projects.filterLife);
    setHtml('.filters button[data-filter="social"]', t.projects.filterSocial);
    setHtml('#univers .note', t.projects.note);

    // Update project cards
    const p1 = PROJECT_DETAILS['brand-1'];
    const p2 = PROJECT_DETAILS['event-1'];
    const p3 = PROJECT_DETAILS['life-1'];
    const p4 = PROJECT_DETAILS['brand-2'];
    const p5 = PROJECT_DETAILS['social-1'];
    const p6 = PROJECT_DETAILS['life-2'];
    const p7 = PROJECT_DETAILS['event-2'];
    const p8 = PROJECT_DETAILS['brand-3'];

    setHtml('.project[data-id="brand-1"] h3', p1.title[target]);
    setHtml('.project[data-id="event-1"] h3', p2.title[target]);
    setHtml('.project[data-id="life-1"] h3', p3.title[target]);
    setHtml('.project[data-id="brand-2"] h3', p4.title[target]);
    setHtml('.project[data-id="social-1"] h3', p5.title[target]);
    setHtml('.project[data-id="life-2"] h3', p6.title[target]);
    setHtml('.project[data-id="event-2"] h3', p7.title[target]);
    setHtml('.project[data-id="brand-3"] h3', p8.title[target]);

    setHtml('.project[data-id="brand-1"] .duration-tag', '00:47 · 4K UHD');

    if (target === 'en') {
      setHtml('.project[data-id="brand-1"] .tag', 'BRAND FILM');
      setHtml('.project[data-id="event-1"] .tag', 'EVENTS');
      setHtml('.project[data-id="life-1"] .tag', 'DESTINATION & DRONE');
      setHtml('.project[data-id="brand-2"] .tag', 'CORPORATE');
      setHtml('.project[data-id="social-1"] .tag', 'SOCIAL MEDIA');
      setHtml('.project[data-id="life-2"] .tag', 'SHORT FILM');
      setHtml('.project[data-id="event-2"] .tag', 'GALA EVENT');
      setHtml('.project[data-id="brand-3"] .tag', 'PRODUCT COMMERCIAL');
      const expandBtn = document.querySelector('#inline-expand-brand1 .btn-label-text');
      if (expandBtn) expandBtn.textContent = 'Cinema Mode';
    } else {
      setHtml('.project[data-id="brand-1"] .tag', 'FILM DE MARQUE');
      setHtml('.project[data-id="event-1"] .tag', 'ÉVÉNEMENTIEL');
      setHtml('.project[data-id="life-1"] .tag', 'DESTINATION & DRONE');
      setHtml('.project[data-id="brand-2"] .tag', 'CORPORATE');
      setHtml('.project[data-id="social-1"] .tag', 'SOCIAL MEDIA');
      setHtml('.project[data-id="life-2"] .tag', 'COURT-MÉTRAGE');
      setHtml('.project[data-id="event-2"] .tag', 'CÉRÉMONIE');
      setHtml('.project[data-id="brand-3"] .tag', 'PUBLICITÉ PRODUIT');
      const expandBtn = document.querySelector('#inline-expand-brand1 .btn-label-text');
      if (expandBtn) expandBtn.textContent = 'Mode Cinéma';
    }

    // 6. Services Section
    setHtml('#services .label', t.services.label);
    setHtml('#services h2', t.services.h2);
    setHtml('#services .section-top .muted', t.services.muted);
    setHtml('.service:nth-of-type(1) h3', t.services.s1Title);
    setHtml('.service:nth-of-type(1) p', t.services.s1Desc);
    setHtml('.service:nth-of-type(2) h3', t.services.s2Title);
    setHtml('.service:nth-of-type(2) p', t.services.s2Desc);
    setHtml('.service:nth-of-type(3) h3', t.services.s3Title);
    setHtml('.service:nth-of-type(3) p', t.services.s3Desc);
    setHtml('.service:nth-of-type(4) h3', t.services.s4Title);
    setHtml('.service:nth-of-type(4) p', t.services.s4Desc);
    setHtml('.service:nth-of-type(5) h3', t.services.s5Title);
    setHtml('.service:nth-of-type(5) p', t.services.s5Desc);

    // 7. Plateau / On Set Section
    setHtml('#plateau .label', t.plateau.label);
    setHtml('#plateau h2', t.plateau.h2);
    setHtml('#plateau .section-top .muted', t.plateau.muted);
    setHtml('.bts-grid .bts-item:nth-child(1) .bts-caption', t.plateau.c1);
    setHtml('.bts-grid .bts-item:nth-child(2) .bts-caption', t.plateau.c2);
    setHtml('.bts-grid .bts-item:nth-child(3) .bts-caption', t.plateau.c3);
    setHtml('.bts-grid .bts-item:nth-child(4) .bts-caption', t.plateau.c4);

    // 8. Studio & Director Section
    setHtml('#studio .stamp', t.studio.stamp);
    setHtml('#studio .label', t.studio.label);
    setHtml('#studio h2', t.studio.h2);
    setHtml('#studio p:nth-of-type(1)', t.studio.p1);
    setHtml('#studio p:nth-of-type(2)', t.studio.p2);
    setHtml('.credentials-badges .cred-badge:nth-child(1)', t.studio.badge1);
    setHtml('.credentials-badges .cred-badge:nth-child(2)', t.studio.badge2);
    setHtml('.credentials-badges .cred-badge:nth-child(3)', t.studio.badge3);
    setHtml('.credentials-badges .cred-badge:nth-child(4)', t.studio.badge4);
    setHtml('.signature-block .role', t.studio.role);
    setHtml('.team .label', t.studio.teamLabel);
    setHtml('.team-grid article:nth-child(1) h3', t.studio.p1Title);
    setHtml('.team-grid article:nth-child(1) p', t.studio.p1Desc);
    setHtml('.team-grid article:nth-child(2) h3', t.studio.p2Title);
    setHtml('.team-grid article:nth-child(2) p', t.studio.p2Desc);
    setHtml('.team-grid article:nth-child(3) h3', t.studio.p3Title);
    setHtml('.team-grid article:nth-child(3) p', t.studio.p3Desc);

    // 9. Nation Section
    setHtml('.nation .label', t.nation.label);
    setHtml('.nation h2', t.nation.h2);
    setHtml('.nation p', t.nation.desc);
    setHtml('.nation .cta', t.nation.cta);

    // 10. Gear Section
    setHtml('#materiel .label', t.gear.label);
    setHtml('#materiel h2', t.gear.h2);
    setHtml('#materiel .section-top .muted', t.gear.muted);
    setHtml('.gear-grid article:nth-child(1) .gear-label', t.gear.g1Label);
    setHtml('.gear-grid article:nth-child(1) p', t.gear.g1Desc);
    setHtml('.gear-grid article:nth-child(2) .gear-label', t.gear.g2Label);
    setHtml('.gear-grid article:nth-child(2) p', t.gear.g2Desc);
    setHtml('.gear-grid article:nth-child(3) .gear-label', t.gear.g3Label);
    setHtml('.gear-grid article:nth-child(3) p', t.gear.g3Desc);
    setHtml('.gear-grid article:nth-child(4) .gear-label', t.gear.g4Label);
    setHtml('.gear-grid article:nth-child(4) p', t.gear.g4Desc);
    setHtml('.gear-grid article:nth-child(5) .gear-label', t.gear.g5Label);
    setHtml('.gear-grid article:nth-child(5) p', t.gear.g5Desc);
    setHtml('.gear-grid article:nth-child(6) .gear-label', t.gear.g6Label);
    setHtml('.gear-grid article:nth-child(6) p', t.gear.g6Desc);
    setHtml('#materiel .note', t.gear.note);

    // 11. Process Section
    setHtml('.process .label', t.process.label);
    setHtml('.steps div:nth-child(1) b', t.process.s1Badge);
    setHtml('.steps div:nth-child(1) h3', t.process.s1Title);
    setHtml('.steps div:nth-child(1) p', t.process.s1Desc);
    setHtml('.steps div:nth-child(2) b', t.process.s2Badge);
    setHtml('.steps div:nth-child(2) h3', t.process.s2Title);
    setHtml('.steps div:nth-child(2) p', t.process.s2Desc);
    setHtml('.steps div:nth-child(3) b', t.process.s3Badge);
    setHtml('.steps div:nth-child(3) h3', t.process.s3Title);
    setHtml('.steps div:nth-child(3) p', t.process.s3Desc);

    // 12. Contact Form
    setHtml('#contact .label', t.contact.label);
    setHtml('#contact h2', t.contact.h2);
    setHtml('#contact > div > p:nth-of-type(1)', t.contact.desc);
    setHtml('#contact > div > p:nth-of-type(2)', t.contact.office);
    setHtml('label.field:has(input[name="name"])', `${t.contact.nameLabel}<input type="text" name="name" required placeholder="${t.contact.namePlaceholder}" autocomplete="name">`);
    setHtml('label.field:has(input[name="company"])', `${t.contact.companyLabel}<input type="text" name="company" placeholder="${t.contact.companyPlaceholder}" autocomplete="organization">`);
    setHtml('.custom-select-field[data-name="service"] .field-label', t.contact.serviceLabel);
    setHtml('.custom-select-field[data-name="location"] .field-label', t.contact.locationLabel);
    setHtml('.custom-datepicker-field .field-label', t.contact.timelineLabel);
    setHtml('#cal-today-btn', t.contact.calToday);
    setHtml('.cal-note', t.contact.calNote);
    setHtml('label.field:has(textarea[name="message"])', `${t.contact.messageLabel}<textarea name="message" required placeholder="${t.contact.messagePlaceholder}"></textarea>`);
    setHtml('#brief-submit-btn', t.contact.submitBtn);

    // Update calendar weekdays
    const weekdaysEl = document.querySelector('.calendar-weekdays');
    if (weekdaysEl) {
      weekdaysEl.innerHTML = target === 'en'
        ? '<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>'
        : '<span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>';
    }

    // Refresh calendar view
    if (typeof datepickerRenderFn === 'function') {
      datepickerRenderFn();
    }

    // 13. Socials & Footer
    setHtml('.socials .label', t.socials.label);
    setHtml('.socials h2', t.socials.h2);
    setHtml('.social-list .social-item:nth-child(1) small', t.socials.instaDesc);
    setHtml('.social-list .social-item:nth-child(2) small', t.socials.linkedinDesc);
    setHtml('footer p', t.footer.copy);
    setHtml('footer .toplink', t.footer.top);

    // 14. Refresh modal if currently opened
    if (typeof window.refreshModalLanguage === 'function') {
      window.refreshModalLanguage();
    }
  }

  // Toggle dropdown on button click
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = switchContainer.classList.contains('open');
    closeAllPopovers();
    if (!isOpen) {
      switchContainer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Select language from menu
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const chosenLang = item.dataset.lang;
      setLanguage(chosenLang);
      switchContainer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // By default, always start in French!
  setLanguage('fr');
}

// Global closer for all floating popovers (Selects, Calendar, Language)
function closeAllPopovers() {
  document.querySelectorAll('.custom-select-field.open, .custom-datepicker-field.open, .lang-switch-container.open').forEach(el => {
    el.classList.remove('open');
    const trigger = el.querySelector('[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', closeAllPopovers);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllPopovers();
});
