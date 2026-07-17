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

  // --- Navigation Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });



  // --- Interactive Gallery Filter (Tabs) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const galleryGrid = document.querySelector('.collection-grid');

  // Hardcoded data with correct filenames reflecting the folder structure exactly
  const artData = {
    all: [
      { title: 'Golden Abstract Wave', category: 'Abstract', filename: 'wall-Modern Arts Premium Desgins (10).jpg' },
      { title: 'Chromatic Dream No. 17', category: 'Vibrant', filename: 'wall-Premium Colourful Wall Arts  (17).jpg' },
      { title: 'Abstract Collage No. 10', category: 'Mixed Media', filename: 'wall-Collage Arts (10).jpg' },
      { title: 'Satin Blue Composition', category: 'Minimalist', filename: 'wall-Blue Premium Component Desgines (1).jpg' },
      { title: 'Warm Charcoal Minimal', category: 'Minimalist', filename: 'wall-Black Component Desgines (15).jpg' },
      { title: 'Slate Neutral Component', category: 'Minimalist', filename: 'wall-Grey Component Desgines (10).jpg' },
      { title: 'Solitary Pine Tree', category: 'Nature', filename: 'wall-Tree (1).png' },
      { title: 'Arched Sunset Coast', category: 'Seascape', filename: 'wall-Sunset (1).png' },
      { title: 'Serenity Lake', category: 'Landscape', filename: 'wall-Lake (3).png' },
      { title: 'Golden Hour Botanical', category: 'Botanical', filename: 'wall-Flower Pot (8).png' },
      { title: 'Terracotta Botanical Vase', category: 'Botanical', filename: 'wall-Flower Pot (2).png' },
      { title: 'Bohemian Flower Pot', category: 'Botanical', filename: 'wall-Flower Pot (1).png' }
    ],
    abstract: [
      { title: 'Golden Abstract Wave', category: 'Abstract', filename: 'wall-Modern Arts Premium Desgins (10).jpg' },
      { title: 'Chromatic Dream No. 17', category: 'Vibrant', filename: 'wall-Premium Colourful Wall Arts  (17).jpg' },
      { title: 'Abstract Collage No. 10', category: 'Mixed Media', filename: 'wall-Collage Arts (10).jpg' }
    ],
    minimalist: [
      { title: 'Satin Blue Composition', category: 'Minimalist', filename: 'wall-Blue Premium Component Desgines (1).jpg' },
      { title: 'Warm Charcoal Minimal', category: 'Minimalist', filename: 'wall-Black Component Desgines (15).jpg' },
      { title: 'Slate Neutral Component', category: 'Minimalist', filename: 'wall-Grey Component Desgines (10).jpg' }
    ],
    nature: [
      { title: 'Solitary Pine Tree', category: 'Nature', filename: 'wall-Tree (1).png' },
      { title: 'Arched Sunset Coast', category: 'Seascape', filename: 'wall-Sunset (1).png' },
      { title: 'Serenity Lake', category: 'Landscape', filename: 'wall-Lake (3).png' }
    ],
    botanical: [
      { title: 'Golden Hour Botanical', category: 'Botanical', filename: 'wall-Flower Pot (8).png' },
      { title: 'Terracotta Botanical Vase', category: 'Botanical', filename: 'wall-Flower Pot (2).png' },
      { title: 'Bohemian Flower Pot', category: 'Botanical', filename: 'wall-Flower Pot (1).png' }
    ]
  };

  function renderGallery(category) {
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
          <div class="art-card-img-wrapper" style="position: relative;">
            <img src="${encodedPath}" class="art-card-img" alt="${item.title}" loading="lazy">
            <div class="image-shield" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; background-color: transparent;"></div>
          </div>
        </div>
        <div class="art-card-info">
          <div>
            <h4 class="art-card-title">${item.title}</h4>
            <span class="art-card-category">${item.category}</span>
          </div>
          <button class="art-card-action btn-preview" data-src="${encodedPath}" data-title="${item.title}" data-category="${item.category}" title="Visualize in Space">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      `;

      galleryGrid.appendChild(card);

      // Staggered entry animation
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 80);
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

  // --- Interactive Wall Visualizer ---
  const visualizerFrameImg = document.getElementById('visualizer-frame-img');
  const visualizerOptions = document.querySelectorAll('.visualizer-option');
  const frameStyleButtons = document.querySelectorAll('.frame-style-btn');
  const visualizerFrameContainer = document.getElementById('visualizer-frame-container');
  const activeArtTitleEl = document.getElementById('active-art-title');
  const activeArtCategoryEl = document.getElementById('active-art-category');

  function changeVisualizerArt(src, title, category) {
    if (!visualizerFrameImg) return;
    
    // Add smooth fade-out
    visualizerFrameImg.style.opacity = '0';
    visualizerFrameImg.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
      visualizerFrameImg.src = src;
      if (activeArtTitleEl) activeArtTitleEl.textContent = title;
      if (activeArtCategoryEl) activeArtCategoryEl.textContent = category;
      
      visualizerFrameImg.addEventListener('load', function onLoad() {
        visualizerFrameImg.style.opacity = '1';
        visualizerFrameImg.style.transform = 'scale(1)';
        visualizerFrameImg.removeEventListener('load', onLoad);
      });
    }, 250);
  }

  // Handle click on sidebar visualizer options
  visualizerOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      visualizerOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const src = opt.getAttribute('data-src');
      const title = opt.getAttribute('data-title');
      const category = opt.getAttribute('data-category');
      changeVisualizerArt(src, title, category);
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

        changeVisualizerArt(src, title, category);
      });
    });
  }

  // Change Frame Border Styling
  frameStyleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      frameStyleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const style = btn.getAttribute('data-style');
      if (visualizerFrameContainer) {
        const mockupDiv = visualizerFrameContainer.querySelector('.frame-mockup');
        if (mockupDiv) {
          // Reset classes on the inner mockup div rather than container layout
          mockupDiv.className = 'frame-mockup';
          if (style === 'oak') {
            mockupDiv.classList.add('oak');
          } else if (style === 'gold') {
            mockupDiv.classList.add('gold');
          }
        }
      }
    });
  });

  // --- FAQ Accordions ---
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

  // --- Premium Theme Toggler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Set initial theme state from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
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

  // --- Intersection Observer Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  const observerOptions = {
    root: null,
    rootMargin: '0px -10% -5% 0px', // Trigger before element enters viewport for a smoother feel
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- Back to Top Toggle & Scroll ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
