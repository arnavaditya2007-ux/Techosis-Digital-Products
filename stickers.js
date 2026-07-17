document.addEventListener('DOMContentLoaded', () => {
  // --- Image Security Layer ---
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield') || e.target.classList.contains('peel-highlight')) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield') || e.target.classList.contains('peel-highlight')) {
      e.preventDefault();
    }
  });

  // --- Neobrutalist Theme Toggler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sticker-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sticker-theme', newTheme);
    });
  }

  // --- Scroll Progress Bar ---
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // --- Interactive Gallery Filter (Tabs) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const galleryGrid = document.querySelector('.collection-grid');

  // Hardcoded data with correct filenames reflecting the folder structure exactly
  const artData = {
    all: [
      { title: 'Midnight Howling Wolf', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T111918.119.jpg' },
      { title: 'Playful Panda Bear', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T121703.143.jpg' },
      { title: 'Majestic Golden Eagle', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T143840.961.jpg' },
      
      { title: 'Sweet Rainbow Sheep', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T115229.617.jpg' },
      { title: 'Cozy Tabby Cat', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T121035.107.jpg' },
      { title: 'Friendly Little Ghost', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T121910.698.jpg' },
      
      { title: 'Summer Wildflower Bouquet', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T122139.171.jpg' },
      { title: 'Velvet Red Rose', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T122528.915.jpg' },
      { title: 'Tropical Palm Tree', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T155416.506.jpg' },
      
      { title: 'Desert Saguaro Cactus', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T152221.861.jpg' },
      { title: 'Mountain Explorer Hike', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T153423.726.jpg' },
      { title: 'Super Turbo Sportscar', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T153807.362.jpg' },
      
      { title: 'Celestial Crescent Moon', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T143049.983.jpg' },
      { title: 'Imperial Crowned Peacock', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T144138.334.jpg' },
      { title: 'Rainbow Scale Crocodile', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T143656.534.jpg' }
    ],
    wildlife: [
      { title: 'Midnight Howling Wolf', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T111918.119.jpg' },
      { title: 'Playful Panda Bear', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T121703.143.jpg' },
      { title: 'Majestic Golden Eagle', category: 'Animals & Wildlife', filename: 'sticker-download - 2026-07-03T143840.961.jpg' }
    ],
    cute: [
      { title: 'Sweet Rainbow Sheep', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T115229.617.jpg' },
      { title: 'Cozy Tabby Cat', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T121035.107.jpg' },
      { title: 'Friendly Little Ghost', category: 'Cute Kawaii', filename: 'sticker-download - 2026-07-03T121910.698.jpg' }
    ],
    botanical: [
      { title: 'Summer Wildflower Bouquet', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T122139.171.jpg' },
      { title: 'Velvet Red Rose', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T122528.915.jpg' },
      { title: 'Tropical Palm Tree', category: 'Botanical & Floral', filename: 'sticker-download - 2026-07-03T155416.506.jpg' }
    ],
    adventure: [
      { title: 'Desert Saguaro Cactus', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T152221.861.jpg' },
      { title: 'Mountain Explorer Hike', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T153423.726.jpg' },
      { title: 'Super Turbo Sportscar', category: 'Sports & Adventure', filename: 'sticker-download - 2026-07-03T153807.362.jpg' }
    ],
    fantasy: [
      { title: 'Celestial Crescent Moon', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T143049.983.jpg' },
      { title: 'Imperial Crowned Peacock', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T144138.334.jpg' },
      { title: 'Rainbow Scale Crocodile', category: 'Whimsical & Fantasy', filename: 'sticker-download - 2026-07-03T143656.534.jpg' }
    ]
  };

  function renderGallery(category) {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    const items = artData[category] || artData.all;

    items.forEach((item, index) => {
      // Relative path inside stickers folder
      const relativePath = `${item.filename}`;
      const card = document.createElement('div');
      card.className = 'art-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      const encodedPath = encodeURIComponent(relativePath).replace(/%2F/g, '/');

      card.innerHTML = `
        <div class="art-card-frame-container">
          <div class="art-card-img-wrapper" style="position: relative;">
            <img src="${encodedPath}" class="art-card-img" alt="${item.title}" loading="lazy">
            <div class="peel-highlight"></div>
            <div class="image-shield" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; background-color: transparent;"></div>
          </div>
        </div>
        <div class="art-card-info">
          <div>
            <h4 class="art-card-title">${item.title}</h4>
            <span class="art-card-category">${item.category}</span>
          </div>
          <button class="art-card-action btn-preview" data-src="${encodedPath}" data-title="${item.title}" data-category="${item.category}" title="Stick It!">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      `;

      galleryGrid.appendChild(card);

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 60);
    });

    attachPreviewListeners();
  }

  // Initial render
  renderGallery('all');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderGallery(cat);
    });
  });

  // --- Interactive Sticker Board & Device Switcher ---
  const visualizerStickerImg = document.querySelector('#visualizer-sticker img');
  const visualizerOptions = document.querySelectorAll('.visualizer-option');
  const activeStickerTitleEl = document.getElementById('active-sticker-title');
  const activeStickerCategoryEl = document.getElementById('active-sticker-category');

  function changeVisualizerSticker(src, title, category) {
    if (!visualizerStickerImg) return;
    
    // Add peel out effect
    visualizerStickerImg.style.opacity = '0';
    visualizerStickerImg.style.transform = 'scale(0.8) rotate(15deg)';
    
    setTimeout(() => {
      visualizerStickerImg.src = src;
      if (activeStickerTitleEl) activeStickerTitleEl.textContent = title;
      if (activeStickerCategoryEl) activeStickerCategoryEl.textContent = category;
      
      visualizerStickerImg.addEventListener('load', function onLoad() {
        visualizerStickerImg.style.opacity = '1';
        visualizerStickerImg.style.transform = 'scale(1) rotate(0deg)';
        visualizerStickerImg.removeEventListener('load', onLoad);
      });
    }, 150);
  }

  // Handle click on sidebar options
  visualizerOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      visualizerOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const src = opt.getAttribute('data-src');
      const title = opt.getAttribute('data-title');
      const category = opt.getAttribute('data-category');
      changeVisualizerSticker(src, title, category);
    });
  });

  // Handle preview click inside gallery cards
  function attachPreviewListeners() {
    const previewButtons = document.querySelectorAll('.btn-preview');
    previewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const src = btn.getAttribute('data-src');
        const title = btn.getAttribute('data-title');
        const category = btn.getAttribute('data-category');
        
        const visualizerSection = document.getElementById('visualizer-section');
        if (visualizerSection) {
          visualizerSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        visualizerOptions.forEach(o => {
          if (o.getAttribute('data-title') === title) {
            o.classList.add('active');
          } else {
            o.classList.remove('active');
          }
        });

        changeVisualizerSticker(src, title, category);
      });
    });
  }

  // --- FAQ Accordions ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Intersection Observer Reveals ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  const observerOptions = {
    root: null,
    rootMargin: '0px -10% -5% 0px',
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
