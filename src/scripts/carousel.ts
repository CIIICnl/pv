export function bindCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-pwz-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-pwz-carousel-track]');
    const slides = Array.from(
      root.querySelectorAll<HTMLElement>('[data-pwz-carousel-slide]'),
    );
    const dots = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-pwz-carousel-goto]'),
    );
    const prev = root.querySelector<HTMLButtonElement>('[data-pwz-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-pwz-carousel-next]');
    if (!track || slides.length === 0) return;

    const total = slides.length;
    let idx = 0;

    const render = () => {
      track.style.transform = `translateX(-${idx * 100}%)`;
      slides.forEach((s, i) => {
        const active = i === idx;
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
        if (active) s.removeAttribute('inert');
        else s.setAttribute('inert', '');
      });
      dots.forEach((d, i) => {
        if (i === idx) d.setAttribute('aria-current', 'step');
        else d.removeAttribute('aria-current');
      });
      if (prev) prev.disabled = idx === 0;
      if (next) next.disabled = idx === total - 1;
    };

    const go = (n: number) => {
      idx = Math.max(0, Math.min(total - 1, n));
      render();
    };

    prev?.addEventListener('click', () => go(idx - 1));
    next?.addEventListener('click', () => go(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    root.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight': go(idx + 1); e.preventDefault(); break;
        case 'ArrowLeft':  go(idx - 1); e.preventDefault(); break;
        case 'Home':       go(0); e.preventDefault(); break;
        case 'End':        go(total - 1); e.preventDefault(); break;
      }
    });

    render();
  });
}
