function initSlideshows() {
  const slideshows = document.querySelectorAll('.slideshow');

  slideshows.forEach((ss) => {
    const slides = Array.from(ss.querySelectorAll('.slide'));
    const prevBtn = ss.querySelector('.prev');
    const nextBtn = ss.querySelector('.next');
    const dotsWrap = ss.querySelector('.dots');
    let current = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    if (current === -1) current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' is-active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i+1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function render() {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('is-active', i === current));
    }
    function goTo(i) { current = (i + slides.length) % slides.length; render(); }
    function next()  { goTo(current + 1); }
    function prev()  { goTo(current - 1); }

    nextBtn?.addEventListener('click', next);
    prevBtn?.addEventListener('click', prev);

    ss.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });
    ss.setAttribute('tabindex', '0');

    const autoplay = ss.getAttribute('data-autoplay') === 'true';
    if (autoplay && slides.length > 1) setInterval(next, 3500);

    render();
  });
}

// Make it global so main.js can call it
window.initSlideshows = initSlideshows;
