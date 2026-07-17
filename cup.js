document.addEventListener('DOMContentLoaded', () => {
  // --- Image Security Layer ---
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield') || e.target.classList.contains('tumbler-shading')) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield') || e.target.classList.contains('tumbler-shading')) {
      e.preventDefault();
    }
  });

  // --- Theme Toggler (Coffee Light & Deep Mocha Dark) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('cup-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cup-theme', newTheme);
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
      { title: 'Vintage Forest Owl', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T150952.682.jpg', type: 'cup' },
      { title: 'Midnight Howling Wolf', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T151241.128.jpg', type: 'cup' },
      { title: 'Ornate Mandala Elephant', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T151727.785.jpg', type: 'cup' },
      
      { title: 'Majestic Sailing Galleon', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T150743.331.jpg', type: 'cup' },
      { title: 'Luxury Ocean Liner', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T193424.883.jpg', type: 'cup' },
      { title: 'Celestial Navigational Compass', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T142842.125.jpg', type: 'cup' },
      
      { title: 'Majestic Hot Air Balloon', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T152717.538.jpg', type: 'cup' },
      { title: 'Antique Pocket Watch', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T153105.992.jpg', type: 'cup' },
      { title: 'Vintage Explorer Globe', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T153358.062.jpg', type: 'cup' },
      
      { title: 'Elegant Potted Botanical', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192058.620.jpg', type: 'cup' },
      { title: 'Cozy Wax Candle', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192340.572.jpg', type: 'cup' },
      { title: 'Vintage Metal Lantern', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192409.331.jpg', type: 'cup' },
      
      { title: 'Golden Phoenix Rising', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T144438.308.jpg', type: 'cup' },
      { title: 'Mystical Fire Phoenix', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T144439.591.jpg', type: 'cup' },
      { title: 'Imperial Eastern Dragon', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T150036.289.jpg', type: 'cup' }
    ],
    wildlife: [
      { title: 'Vintage Forest Owl', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T150952.682.jpg', type: 'cup' },
      { title: 'Midnight Howling Wolf', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T151241.128.jpg', type: 'cup' },
      { title: 'Ornate Mandala Elephant', category: 'Wildlife & Animals', filename: 'cup-download - 2026-07-02T151727.785.jpg', type: 'cup' }
    ],
    nautical: [
      { title: 'Majestic Sailing Galleon', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T150743.331.jpg', type: 'cup' },
      { title: 'Luxury Ocean Liner', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T193424.883.jpg', type: 'cup' },
      { title: 'Celestial Navigational Compass', category: 'Nautical & Adventure', filename: 'cup-download - 2026-07-02T142842.125.jpg', type: 'cup' }
    ],
    vintage: [
      { title: 'Majestic Hot Air Balloon', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T152717.538.jpg', type: 'cup' },
      { title: 'Antique Pocket Watch', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T153105.992.jpg', type: 'cup' },
      { title: 'Vintage Explorer Globe', category: 'Vintage Wonders', filename: 'cup-download - 2026-07-02T153358.062.jpg', type: 'cup' }
    ],
    botanical: [
      { title: 'Elegant Potted Botanical', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192058.620.jpg', type: 'cup' },
      { title: 'Cozy Wax Candle', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192340.572.jpg', type: 'cup' },
      { title: 'Vintage Metal Lantern', category: 'Botanical & Cozy', filename: 'cup-download - 2026-07-02T192409.331.jpg', type: 'cup' }
    ],
    fantasy: [
      { title: 'Golden Phoenix Rising', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T144438.308.jpg', type: 'cup' },
      { title: 'Mystical Fire Phoenix', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T144439.591.jpg', type: 'cup' },
      { title: 'Imperial Eastern Dragon', category: 'Mythical & Fantasy', filename: 'cup-download - 2026-07-02T150036.289.jpg', type: 'cup' }
    ]
  }; function renderGallery(category) {
    if (!galleryGrid) return;
    
    // Clear current grid
    galleryGrid.innerHTML = '';

    const items = artData[category] || artData.all;

    items.forEach((item, index) => {
      // Relative path to the file inside workspace
      const relativePath = `${item.filename}`;
      
      const card = document.createElement('div');
      card.className = 'art-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Use encoded file path for the src attribute
      const encodedPath = encodeURIComponent(relativePath).replace(/%2F/g, '/');

      card.innerHTML = `
        <div class="art-card-frame-container">
          <div class="art-card-img-wrapper">
            <img src="${encodedPath}" class="art-card-img" alt="${item.title}" loading="lazy">
            <div class="image-shield"></div>
          </div>
        </div>
        <div class="art-card-info">
          <div>
            <h4 class="art-card-title">${item.title}</h4>
            <span class="art-card-category">${item.category}</span>
          </div>
          <button class="art-card-action btn-preview" data-src="${encodedPath}" data-title="${item.title}" data-category="${item.category}" data-type="${item.type}" title="Preview Wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      `;

      galleryGrid.appendChild(card);

      // Staggered entry animation
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 40);
    });

    // Re-attach visualizer event listeners to new cards
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

  // --- Interactive Mockup Visualizer ---
  const visualizerRoom = document.querySelector('.visualizer-room');
  const visualizerWrapper = document.querySelector('.visualizer-mockup-wrapper');
  const visualizerOptions = document.querySelectorAll('.visualizer-option');
  const activeWrapTitleEl = document.getElementById('active-wrap-title');
  const activeWrapCategoryEl = document.getElementById('active-wrap-category');

  // Interactive mockup state
  let activeDesign = {
    src: 'cup-download - 2026-07-02T151241.128.jpg',
    title: 'Midnight Howling Wolf',
    category: 'Wildlife & Animals',
    type: 'cup'
  };
  let activeCupStyle = 'tapered';

  // Cup switcher controls
  const mockupButtons = document.querySelectorAll('.mockup-btn');
  mockupButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mockupButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCupStyle = btn.getAttribute('data-mockup');
      
      // Re-trigger visualizer with new style
      changeVisualizerArt(activeDesign.src, activeDesign.title, activeDesign.category, activeDesign.type);
    });
  });

  function changeVisualizerArt(src, title, category, type) {
    if (!visualizerWrapper || !visualizerRoom) return;
    
    // Save current design state
    activeDesign.src = src;
    activeDesign.title = title;
    activeDesign.category = category;
    activeDesign.type = type;

    // Reset background class on room environment
    visualizerRoom.className = 'visualizer-room reveal-left revealed ' + type + '-active';

    // Add smooth fade-out and scale
    visualizerWrapper.style.opacity = '0';
    visualizerWrapper.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      // Load type-specific template with selected style format
      if (type === 'cup') {
        if (activeCupStyle === 'tapered') {
          visualizerWrapper.innerHTML = `
            <div class="tumbler-mockup large-mockup tapered-style fade-in-scale">
              <div class="tumbler-lid"></div>
              <div class="tumbler-body">
                <img src="${src}" class="tumbler-art" id="visualizer-cup-img" alt="${title}">
                <div class="tumbler-shading"></div>
              </div>
              <div class="tumbler-shadow"></div>
            </div>
          `;
        } else if (activeCupStyle === 'straight') {
          visualizerWrapper.innerHTML = `
            <div class="tumbler-mockup large-mockup straight-style fade-in-scale">
              <div class="tumbler-lid"></div>
              <div class="tumbler-body">
                <img src="${src}" class="tumbler-art" id="visualizer-cup-img" alt="${title}">
                <div class="tumbler-shading"></div>
              </div>
              <div class="tumbler-shadow"></div>
            </div>
          `;
        } else if (activeCupStyle === 'mug') {
          visualizerWrapper.innerHTML = `
            <div class="mug-mockup large-mockup fade-in-scale">
              <div class="mug-handle"></div>
              <div class="mug-body">
                <img src="${src}" class="mug-art" id="visualizer-cup-img" alt="${title}">
                <div class="mug-shading"></div>
              </div>
              <div class="mug-shadow"></div>
            </div>
          `;
        } else if (activeCupStyle === 'glass') {
          visualizerWrapper.innerHTML = `
            <div class="glass-mockup large-mockup fade-in-scale">
              <div class="glass-wooden-lid"></div>
              <div class="glass-body">
                <img src="${src}" class="glass-art" id="visualizer-cup-img" alt="${title}">
                <div class="glass-shading"></div>
              </div>
              <div class="glass-shadow"></div>
            </div>
          `;
        }
      } else if (type === 'skateboard') {
        visualizerWrapper.innerHTML = `
          <div class="skateboard-mockup-container fade-in-scale">
            <img src="${src}" class="skateboard-view" id="visualizer-cup-img" alt="${title}">
          </div>
        `;
      } else if (type === 'typography') {
        visualizerWrapper.innerHTML = `
          <div class="framed-print-container typography-frame fade-in-scale">
            <div class="art-frame">
              <img src="${src}" class="typography-view" id="visualizer-cup-img" alt="${title}">
            </div>
          </div>
        `;
      } else if (type === 'gym') {
        visualizerWrapper.innerHTML = `
          <div class="framed-print-container gym-frame fade-in-scale">
            <div class="art-frame modern-metal">
              <img src="${src}" class="gym-view" id="visualizer-cup-img" alt="${title}">
            </div>
          </div>
        `;
      }

      if (activeWrapTitleEl) activeWrapTitleEl.textContent = title;
      if (activeWrapCategoryEl) activeWrapCategoryEl.textContent = category;
      
      const newImg = document.getElementById('visualizer-cup-img');
      if (newImg) {
        newImg.addEventListener('load', function onLoad() {
          visualizerWrapper.style.opacity = '1';
          visualizerWrapper.style.transform = 'scale(1)';
          newImg.removeEventListener('load', onLoad);
        });
        // Fallback for cached images
        if (newImg.complete) {
          visualizerWrapper.style.opacity = '1';
          visualizerWrapper.style.transform = 'scale(1)';
        }
      }
    }, 150);
  }

  // Handle click on sidebar visualizer options
  visualizerOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      visualizerOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const src = opt.getAttribute('data-src');
      const title = opt.getAttribute('data-title');
      const category = opt.getAttribute('data-category');
      const type = opt.getAttribute('data-type');
      changeVisualizerArt(src, title, category, type);
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
        const type = btn.getAttribute('data-type');
        
        // Scroll to visualizer section smoothly
        const visualizerSection = document.getElementById('visualizer-section');
        if (visualizerSection) {
          visualizerSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Update active class on option buttons if matching title is found
        visualizerOptions.forEach(o => {
          if (o.getAttribute('data-title') === title) {
            o.classList.add('active');
          } else {
            o.classList.remove('active');
          }
        });

        changeVisualizerArt(src, title, category, type);
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other open items
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

  // --- Intersection Observer Scroll Reveals ---
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
