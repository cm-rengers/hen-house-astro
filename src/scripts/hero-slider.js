/**
 * Hero slider: Embla Carousel, portrait ratio, controls below image.
 * Autoplay 4.5s, loop; pause on hover/focus; resume on mouseleave/blur.
 * Respects prefers-reduced-motion (no autoplay when reduced).
 */

import EmblaCarousel from 'embla-carousel';

const AUTOPLAY_INTERVAL_MS = 4500;

function initHeroSlider() {
  const viewport = document.querySelector('[data-embla-viewport]');
  if (!viewport) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const embla = EmblaCarousel(viewport, {
    align: 'start',
    loop: true,
    duration: 450,
  });

  const prevBtn = document.querySelector('[data-embla-prev]');
  const nextBtn = document.querySelector('[data-embla-next]');
  const counterEl = document.querySelector('[data-embla-counter]');
  const sliderRoot = viewport.closest('[data-hero-slider]');

  if (prevBtn) prevBtn.addEventListener('click', () => embla.scrollPrev());
  if (nextBtn) nextBtn.addEventListener('click', () => embla.scrollNext());

  function updateCounter() {
    if (!counterEl) return;
    const total = embla.scrollSnapList().length;
    const index = embla.selectedScrollSnap() + 1;
    counterEl.textContent = `${index} / ${total}`;
  }

  embla.on('select', updateCounter);
  updateCounter();

  let autoplayTimer = null;

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      embla.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (sliderRoot && !prefersReducedMotion) {
    sliderRoot.addEventListener('mouseenter', stopAutoplay);
    sliderRoot.addEventListener('mouseleave', startAutoplay);
    sliderRoot.addEventListener('focusin', stopAutoplay);
    sliderRoot.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!sliderRoot.contains(document.activeElement)) startAutoplay();
      }, 0);
    });
  }

  startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}
