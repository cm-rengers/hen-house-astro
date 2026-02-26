/**
 * Hero slider: Embla Carousel, square viewport, prev/next + counter.
 * No manual translateX; overflow clip only at viewport.
 */

import EmblaCarousel from 'embla-carousel';

function initHeroSlider() {
  const viewport = document.querySelector('[data-embla-viewport]');
  if (!viewport) return;

  const embla = EmblaCarousel(viewport, {
    align: 'start',
    loop: true,
    duration: 450,
  });

  const prevBtn = document.querySelector('[data-embla-prev]');
  const nextBtn = document.querySelector('[data-embla-next]');
  const counterEl = document.querySelector('[data-embla-counter]');

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}
