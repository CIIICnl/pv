import { TOTAL_STEPS } from '../data/steps';
import { writeStoredStep } from './storage';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clampStep(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(TOTAL_STEPS, Math.trunc(n)));
}

export function currentStep(): number {
  const visible = Array.from(document.querySelectorAll<HTMLElement>('[data-pwz-step]'))
    .find((el) => !el.hidden);
  return visible ? Number(visible.dataset.pwzStep) : 1;
}

export function goToStep(
  n: number,
  opts: { scroll?: boolean; focus?: boolean } = {},
): void {
  const target = clampStep(n);
  const previous = currentStep();
  const { scroll = true, focus = true } = opts;
  const reduced = prefersReducedMotion();
  const scrollBehavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

  document.querySelectorAll<HTMLElement>('[data-pwz-step]').forEach((el) => {
    const s = Number(el.dataset.pwzStep);
    el.hidden = s !== target;
  });

  document.querySelectorAll<HTMLButtonElement>('[data-pwz-step-nav]').forEach((btn) => {
    const s = Number(btn.dataset.pwzStepNav);
    if (s === target) {
      btn.setAttribute('aria-current', 'step');
      btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: scrollBehavior });
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  writeStoredStep(target);

  if (scroll) window.scrollTo({ top: 0, behavior: scrollBehavior });

  if (focus && target !== previous) {
    const heading = document.querySelector<HTMLElement>(
      `[data-pwz-step="${target}"] h1, [data-pwz-step="${target}"] h2`,
    );
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}

export function bindStepControls(): void {
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const nav = target.closest<HTMLElement>('[data-pwz-step-nav]');
    if (nav) {
      const n = Number(nav.dataset.pwzStepNav);
      if (n) goToStep(n);
      return;
    }

    const goto = target.closest<HTMLElement>('[data-pwz-step-goto]');
    if (goto) {
      const n = Number(goto.dataset.pwzStepGoto);
      if (n) goToStep(n);
      return;
    }

    if (target.closest('[data-pwz-step-prev]')) {
      goToStep(currentStep() - 1);
      return;
    }

    if (target.closest('[data-pwz-step-next]')) {
      goToStep(currentStep() + 1);
    }
  });
}
