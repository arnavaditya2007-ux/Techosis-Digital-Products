document.addEventListener('DOMContentLoaded', () => {
  // --- Image Security Layer ---
  // Disable right click on images & shields to block unauthorized downloads
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield')) {
      e.preventDefault();
    }
  });

  // Disable drag & drop on images & shields to block desktop saving
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-shield')) {
      e.preventDefault();
    }
  });

  // --- Dynamic Designs Dataset ---
  const designs = [
    // Streetwear & Cyberpunk
    { title: "Cyber Wolf", category: "streetwear", filename: "tshirt-download (13).jpg" },
    { title: "Cyber DJ Skull", category: "streetwear", filename: "tshirt-download (22).jpg" },
    { title: "Street Doodler", category: "streetwear", filename: "tshirt-download (23).jpg" },
    { title: "Robo Helmet", category: "streetwear", filename: "tshirt-download (24).jpg" },
    
    // Retro Vintage
    { title: "Vintage Wolf", category: "retro", filename: "tshirt-download (2).jpg" },
    { title: "Mountain Peak", category: "retro", filename: "tshirt-download (54).jpg" },
    { title: "Outdoors Sunset", category: "retro", filename: "tshirt-download (55).jpg" },
    { title: "Wild Wilderness", category: "retro", filename: "tshirt-download (59).jpg" },

    // Anime Vectors
    { title: "Dreamy Petals", category: "anime", filename: "tshirt-download (10).jpg" },
    { title: "Neon Samurai", category: "anime", filename: "tshirt-download (11).jpg" },
    { title: "Shades Graffiti", category: "anime", filename: "tshirt-download (12).jpg" },
    { title: "Cybernetic Owl", category: "anime", filename: "tshirt-download (21).jpg" },

    // Minimalist & Line Art
    { title: "Chevron Diamond", category: "minimalist", filename: "tshirt-download (14).jpg" },
    { title: "Spiky Crown", category: "minimalist", filename: "tshirt-download (15).jpg" },
    { title: "Abstract Flame", category: "minimalist", filename: "tshirt-download (16).jpg" },
    { title: "Linear Mask", category: "minimalist", filename: "tshirt-download (30).jpg" },

    // Skulls & Grunge
    { title: "Spiky Skull", category: "grunge", filename: "tshirt-download (1).jpg" },
    { title: "Ornate Skull", category: "grunge", filename: "tshirt-download (3).jpg" },
    { title: "Crowned Skull", category: "grunge", filename: "tshirt-download (4).jpg" },
    { title: "Swords Skull", category: "grunge", filename: "tshirt-download (5).jpg" }
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const tabButtons = document.querySelectorAll('.tab-btn');

  // --- Render Gallery Function ---
  function renderGallery(categoryFilter) {
    if (!galleryGrid) return;
    
    // Clear current grid content
    galleryGrid.innerHTML = '';

    // Filter items
    const filteredDesigns = designs.filter(item => item.category === categoryFilter);

    // Create cards with staggered animation
    filteredDesigns.forEach((item, index) => {
      // Relative path to files
      const imgPath = `${item.filename}`;
      
      const card = document.createElement('div');
      card.className = 'art-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

      card.innerHTML = `
        <div class="art-card-img-wrapper" style="position: relative;">
          <img src="${imgPath}" class="art-card-img" alt="${item.title}" loading="lazy">
          <div class="image-shield" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; background-color: transparent;"></div>
        </div>
        <div class="art-card-info">
          <div>
            <h4 class="art-card-title">${item.title}</h4>
            <span class="art-card-category">${item.category}</span>
          </div>
          <button class="art-card-action btn-visualize-trigger" data-filename="${item.filename}" data-title="${item.title}" title="Visualize on Tee">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      `;

      galleryGrid.appendChild(card);

      // Staggered trigger
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 80);
    });

    // Re-attach visualizer listener to the preview action button
    attachGalleryVisualizerListeners();
  }

  // --- Initial Gallery Render ---
  renderGallery('streetwear');

  // --- Tab Switch Listeners ---
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      renderGallery(category);
    });
  });

  // --- Apparel Visualizer Setup ---
  const visualizerSelectedArt = document.getElementById('visualizer-selected-art');
  const teeCanvas = document.getElementById('tee-canvas');
  const teePrintZone = document.getElementById('tee-print-zone');
  const visualizerArtPicker = document.getElementById('visualizer-art-picker');

  // Load a subset of 6 designs into visualizer picker sidebar
  const visualizerThumbs = [
    designs[1], // Cyber DJ Skull
    designs[5], // Mountain Peak
    designs[9], // Neon Samurai
    designs[12], // Chevron Diamond
    designs[16], // Spiky Skull
    designs[0]  // Cyber Wolf
  ];

  if (visualizerArtPicker) {
    visualizerThumbs.forEach((item, index) => {
      const imgPath = `${item.filename}`;
      const thumbBtn = document.createElement('button');
      thumbBtn.className = `thumb-btn ${index === 0 ? 'active' : ''}`;
      thumbBtn.setAttribute('data-filename', item.filename);
      thumbBtn.setAttribute('title', item.title);
      thumbBtn.innerHTML = `<img src="${imgPath}" alt="${item.title}">`;
      visualizerArtPicker.appendChild(thumbBtn);

      thumbBtn.addEventListener('click', () => {
        document.querySelectorAll('.thumb-btn').forEach(btn => btn.classList.remove('active'));
        thumbBtn.classList.add('active');
        visualizerSelectedArt.src = imgPath;
      });
    });
  }

  // Gallery Visualizer Action listener
  function attachGalleryVisualizerListeners() {
    document.querySelectorAll('.btn-visualize-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const filename = btn.getAttribute('data-filename');
        const imgPath = `${filename}`;
        
        // Update visualizer image source
        if (visualizerSelectedArt) {
          visualizerSelectedArt.src = imgPath;
        }

        // De-activate all thumb list highlights
        document.querySelectorAll('.thumb-btn').forEach(thumb => {
          thumb.classList.remove('active');
          if (thumb.getAttribute('data-filename') === filename) {
            thumb.classList.add('active');
          }
        });

        // Scroll to visualizer
        const visualizerSection = document.getElementById('visualizer');
        if (visualizerSection) {
          visualizerSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Layout placement selection
  const layoutButtons = document.querySelectorAll('.layout-btn');
  layoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layout = btn.getAttribute('data-layout');
      
      // Remove previous layout styles
      teePrintZone.classList.remove('layout-oversized', 'layout-pocket');

      if (layout === 'oversized') {
        teePrintZone.classList.add('layout-oversized');
      } else if (layout === 'pocket') {
        teePrintZone.classList.add('layout-pocket');
      }
    });
  });

  // --- Scroll Progress Bar & Back to Top Toggle ---
  const backToTopBtn = document.getElementById('back-to-top');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // 1. Scroll Progress
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // 2. Back to Top visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Smooth scroll to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Premium Theme Toggler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.querySelector('.theme-icon-moon');
  const sunIcon = document.querySelector('.theme-icon-sun');

  function updateThemeUI(currentTheme) {
    if (!themeToggleBtn) return;
    if (currentTheme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }

  // Initialize UI State
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('tshirt-theme', newTheme);
      updateThemeUI(newTheme);
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQs first
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
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
