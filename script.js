document.addEventListener('DOMContentLoaded', () => {
  // ===== BILINGUAL (IND/ENG) DICTIONARY & TOGGLE =====
  const translations = {
    id: {
      nav_home: "Beranda",
      nav_about: "Tentang",
      nav_skills: "Keahlian",
      nav_exp: "Pengalaman",
      nav_project: "Project",
      nav_contact: "Kontak",
      hero_sub: "Mahasiswa Program Studi Informatika, Universitas Teknokrat Indonesia — fokus pada pengembangan teknologi, pemrograman, dan perancangan pengalaman digital yang efektif dan bermanfaat.",
      hero_cue: '<span class="dot"></span> SCROLL UNTUK LIHAT LEBIH LANJUT',
      about_eyebrow: "Yo!",
      about_p1: "Saya adalah <strong>Farhan Almasyah Nuryadi</strong>, mahasiswa Program Studi Informatika, Universitas Teknokrat Indonesia, yang memiliki minat dalam pengembangan teknologi, pemrograman, dan inovasi di bidang teknologi informasi. Saya berkomitmen untuk terus mengembangkan kemampuan teknis maupun soft skill melalui proses pembelajaran, proyek, serta pengalaman organisasi maupun kolaborasi.",
      about_p2: "Selama menempuh pendidikan di Program Studi Informatika, saya mempelajari berbagai bidang, seperti pengembangan perangkat lunak, basis data, algoritma dan struktur data, pemrograman web, kecerdasan buatan, serta analisis dan perancangan sistem. Pengetahuan tersebut menjadi bekal untuk menciptakan solusi digital yang efektif, efisien, dan bermanfaat.",
      about_p3: "Saya memiliki semangat belajar yang tinggi, mampu bekerja secara individu maupun dalam tim, serta selalu terbuka terhadap tantangan dan perkembangan teknologi terbaru. Bagi saya, setiap proyek merupakan kesempatan untuk meningkatkan kemampuan berpikir kritis, memecahkan masalah, dan menghasilkan karya yang berkualitas.",
      about_p4: "Melalui portofolio ini, saya menampilkan berbagai proyek, pengalaman, dan keterampilan yang telah saya kembangkan sebagai bentuk komitmen untuk terus bertumbuh sebagai calon profesional di bidang teknologi informasi.",
      about_badge: "S1 INFORMATIKA",
      skills_eyebrow: "// APA YANG SAYA KUASAI",
      skills_title: "Keahlian",
      skills_cap_label: "Kemampuan",
      sk_web: "Pemrograman Web",
      sk_db: "Basis Data",
      sk_algo: "Algoritma & Struktur Data",
      sk_ai: "Kecerdasan Buatan",
      sk_analys: "Analisis & Perancangan Sistem",
      exp_eyebrow: "// PERJALANAN SAYA",
      exp_title: "Pengalaman",
      exp1_yr: "Di Tahun 2024-2025",
      exp1_role: "Bekerja di salah satu Kelurahan diKampung",
      exp1_b1: "Menjadi Moderator yang sering membuatkan surat-surat buat masyarakat",
      exp1_b2: "Mempelajari salah satu aplikasi Microsoft Word",
      exp2_yr: "Di Tahun 2025",
      exp2_role: "Himpunan Mahasiswa Informatika",
      exp2_b1: "Sedang menjadi Anggota Pasif di HIMA",
      proj_eyebrow: "// KARYA TERPILIH",
      proj_title: "Project",
      proj1_tag: "STRUKTUR DATA",
      proj1_desc: "Game klasik Snake yang dibuat dengan JavaScript — mainkan langsung! Kendalikan ular dengan WASD / Arrow Keys. Setiap makanan menambah skor 10 poin. Game over jika menabrak dinding atau tubuh sendiri.",
      proj2_title: "Web Portofolio Pribadi",
      proj2_desc: "Website portofolio yang sedang kamu lihat sekarang, dibangun dengan HTML, CSS, JavaScript",
      proj3_tag: "DESAIN GRAFIS",
      proj3_title: "Packaging",
      proj3_desc: "Desain kemasan makanan Roti Bakar, dibuat sebagai projek akhir mata kuliah Desain Grafis",
      proj_card_action: "Lihat Detail ↗",
      proj_card_action_game: "Mainkan Game 🎮",
      music_sub: "Album: Membangun & Menghancurkan",
      contact_eyebrow: "// AYO TERHUBUNG",
      contact_title: "Mari<br>Berkolaborasi",
      contact_sub: "Terbuka untuk diskusi proyek, magang, atau sekadar bertukar ide seputar teknologi dan desain. Hubungi saya melalui salah satu tautan berikut.",
      footer_built: "Dibuat dengan HTML, CSS & JS"
    },
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_exp: "Experience",
      nav_project: "Projects",
      nav_contact: "Contact",
      hero_sub: "Informatics Student at Universitas Teknokrat Indonesia — focusing on technology development, programming, and crafting effective and impactful digital experiences.",
      hero_cue: '<span class="dot"></span> SCROLL TO EXPLORE MORE',
      about_eyebrow: "Yo!",
      about_p1: "I am <strong>Farhan Almasyah Nuryadi</strong>, an Informatics student at Universitas Teknokrat Indonesia with a strong passion for technology development, programming, and IT innovation. I am committed to continuously building both my technical and soft skills through learning, projects, organizational involvement, and teamwork.",
      about_p2: "Throughout my studies in Informatics, I have explored areas such as software development, databases, data structures & algorithms, web development, artificial intelligence, and system analysis & design. This knowledge forms the foundation for creating effective, efficient, and meaningful digital solutions.",
      about_p3: "I possess a high enthusiasm for learning, work effectively both individually and in teams, and remain ever-open to new technology challenges. For me, every project is an opportunity to sharpen critical thinking, solve problems, and deliver quality work.",
      about_p4: "Through this portfolio, I showcase various projects, experiences, and skills I have developed as a reflection of my commitment to growing into a technology professional.",
      about_badge: "BACHELOR OF INFORMATICS",
      skills_eyebrow: "// WHAT I MASTER",
      skills_title: "Skills",
      skills_cap_label: "Capabilities",
      sk_web: "Web Development",
      sk_db: "Databases",
      sk_algo: "Algorithms & Data Structures",
      sk_ai: "Artificial Intelligence",
      sk_analys: "System Analysis & Design",
      exp_eyebrow: "// MY JOURNEY",
      exp_title: "Experience",
      exp1_yr: "In 2024-2025",
      exp1_role: "Staff at Village Community Office (Kelurahan)",
      exp1_b1: "Served as an administrative coordinator producing official correspondence for citizens",
      exp1_b2: "Mastered document processing and formatting using Microsoft Word",
      exp2_yr: "In 2025",
      exp2_role: "Informatics Student Association (HIMA)",
      exp2_b1: "Currently active member of HIMA Informatics",
      proj_eyebrow: "// FEATURED WORKS",
      proj_title: "Projects",
      proj1_tag: "DATA STRUCTURES",
      proj1_desc: "Classic Snake Game built with JavaScript — play live! Control the snake with WASD / Arrow Keys. Every food item adds 10 points. Game over upon hitting walls or self.",
      proj2_title: "Personal Portfolio Website",
      proj2_desc: "The portfolio website you are viewing right now, built with HTML, CSS, and JavaScript",
      proj3_tag: "GRAPHIC DESIGN",
      proj3_title: "Packaging Design",
      proj3_desc: "Food packaging design for Roti Bakar, created as a final project for Graphic Design course",
      proj_card_action: "View Details ↗",
      proj_card_action_game: "Play Game 🎮",
      music_sub: "Album: Membangun & Menghancurkan",
      contact_eyebrow: "// LET'S CONNECT",
      contact_title: "Let's<br>Collaborate",
      contact_sub: "Open for project discussions, internships, or exchanging ideas about technology and design. Reach out to me via any of the links below.",
      footer_built: "Built with HTML, CSS & JS"
    }
  };

  let currentLang = localStorage.getItem('pref_lang') || 'id';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pref_lang', lang);
    
    // Update toggle button active indicator
    const langIdSpan = document.querySelector('.lang-opt.lang-id');
    const langEnSpan = document.querySelector('.lang-opt.lang-en');
    if (langIdSpan && langEnSpan) {
      if (lang === 'id') {
        langIdSpan.classList.add('active');
        langEnSpan.classList.remove('active');
      } else {
        langEnSpan.classList.add('active');
        langIdSpan.classList.remove('active');
      }
    }

    // Update text content for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  // Initialize Language
  setLanguage(currentLang);

  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'id' ? 'en' : 'id';
      setLanguage(newLang);
    });
  }

  // Mobile Burger Menu
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  if (burger && navList) {
    burger.addEventListener('click', () => navList.classList.toggle('open'));
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));
  }

  // Header Scrolled State
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Custom Cursor Glow Follower
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // Scroll Reveal Observer
  const animateElements = document.querySelectorAll('[data-animate]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  animateElements.forEach(el => revealObs.observe(el));

  // Active Navbar Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a.nav-link');
  
  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  // 3D tilt effect on tech stack icons
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotX = ((y / r.height) - .5) * -18;
      const rotY = ((x / r.width) - .5) * 18;
      el.style.transform = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // Spotlight Mouse Tracking for Cards
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });

  // Animated skill bars
  const skillRows = document.querySelectorAll('.skill-bar-row');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const row = entry.target;
        const target = parseInt(row.dataset.percent, 10) || 0;
        const fill = row.querySelector('.sb-fill');
        const label = row.querySelector('.sb-percent');
        fill.style.width = target + '%';

        let current = 0;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          current = Math.round(progress * target);
          label.textContent = current + '%';
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        skillObs.unobserve(row);
      }
    });
  }, { threshold: 0.3 });
  skillRows.forEach(row => skillObs.observe(row));

  // ===== PROJECT CARD CLICK & MODAL LIGHTBOX =====
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openProjectModal(imgSrc, tagText, titleText, descText) {
    if (!modal) return;
    if (imgSrc) {
      modalImg.src = imgSrc;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    modalTag.textContent = tagText || '';
    modalTitle.textContent = titleText || '';
    modalDesc.innerHTML = descText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  document.querySelectorAll('.p-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // If clicking inside snake canvas, let game handle controls
      if (e.target.closest('#snake-canvas') || e.target.closest('#snake-game-container')) {
        return;
      }
      
      const tag = card.querySelector('.p-tag')?.textContent || '';
      const title = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.innerHTML || '';
      const img = card.querySelector('img')?.getAttribute('src') || '';

      if (img) {
        openProjectModal(img, tag, title, desc);
      } else if (index === 0) {
        const snakeContainer = document.getElementById('snake-game-container');
        if (snakeContainer) {
          snakeContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

});
