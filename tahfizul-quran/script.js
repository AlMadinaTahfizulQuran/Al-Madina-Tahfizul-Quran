document.addEventListener('DOMContentLoaded', function () {

  function wireToggle(toggleId, groupsId) {
    const toggle = document.getElementById(toggleId);
    const groups = document.getElementById(groupsId);
    if (toggle && groups) {
      toggle.addEventListener('click', function () {
        groups.classList.toggle('open');
      });
    }
  }
  wireToggle('navToggle', 'navGroups');
  wireToggle('navToggleClone', 'navGroupsClone');

  const headerWrap = document.getElementById('headerWrap');
  const cloneHeader = document.getElementById('stickyCloneHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function updateOnScroll() {
    if (headerWrap && cloneHeader) {
      const headerBottom = headerWrap.getBoundingClientRect().bottom;
      if (headerBottom <= 0) {
        cloneHeader.classList.add('visible');
        const navGroupsClone = document.getElementById('navGroupsClone');
        if (navGroupsClone) {
          navGroupsClone.classList.remove('open');
        }
      } else {
        cloneHeader.classList.remove('visible');
      }
    }
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', updateOnScroll);
  updateOnScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const slides = document.querySelectorAll('.hero-single-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(c => c.classList.remove('active'));
    if (cards[index]) {
      cards[index].classList.add('active');
    }

    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.slide)));
  });

  const heroNext = document.getElementById('heroNext');
  const heroPrev = document.getElementById('heroPrev');
  if (heroNext) heroNext.addEventListener('click', nextSlide);
  if (heroPrev) heroPrev.addEventListener('click', prevSlide);

  if (slides.length > 0) {
    setInterval(nextSlide, 8000);
  }

  const canvas = document.getElementById('pdfCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const pdfPath = 'pdfs/CALENDAR & PRAYER TIME 2026.pdf';
    let pdfDoc = null;
    let pageNum = 1;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    function renderPage(num) {
      pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale: 1.4 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: ctx, viewport: viewport });
        document.getElementById('pageInfo').textContent = 'Page ' + num + ' of ' + pdfDoc.numPages;
      });
    }

    pdfjsLib.getDocument(pdfPath).promise.then(function (doc) {
      pdfDoc = doc;
      const currentMonth = new Date().getMonth() + 1;
      pageNum = currentMonth;
      renderPage(pageNum);
    }).catch(function (err) {
      document.getElementById('pageInfo').textContent = 'Unable to load calendar PDF.';
      console.error(err);
    });

    document.getElementById('prevPage').addEventListener('click', function () {
      if (pageNum <= 1) return;
      pageNum--;
      renderPage(pageNum);
    });

    document.getElementById('nextPage').addEventListener('click', function () {
      if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
      pageNum++;
      renderPage(pageNum);
    });
  }
});