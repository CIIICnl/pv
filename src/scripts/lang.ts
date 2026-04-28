import { DEFAULT_LANG, type Lang, isLang } from '../data/i18n';

const KEY = 'pwz-lang-v1';

export function readStoredLang(): Lang {
  try {
    const raw = localStorage.getItem(KEY);
    if (isLang(raw)) return raw;
  } catch { /* ignore */ }
  return DEFAULT_LANG;
}

function writeStoredLang(lang: Lang): void {
  try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
}

export function currentLang(): Lang {
  const l = document.documentElement.lang;
  return isLang(l) ? l : DEFAULT_LANG;
}

type LangListener = (lang: Lang) => void;
const listeners = new Set<LangListener>();

export function onLangChange(fn: LangListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Apply the given language to the page:
 *  - set <html lang>
 *  - swap attributes captured in `data-aria-label-{nl,en}`, `data-label-{nl,en}`,
 *    `data-title-{nl,en}`, `data-desc-{nl,en}` onto their host element.
 *  - swap select <option> text via `data-label-{nl,en}`.
 *  - toggle pressed state on language-switcher buttons.
 *  - notify registered listeners.
 */
function isVisible(el: HTMLElement): boolean {
  return el.offsetParent !== null || el === document.documentElement;
}

function rescueFocusIfHidden(): void {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || active === document.body) return;
  if (isVisible(active)) return;
  // If focused element is now hidden (e.g. other-language sibling), move focus
  // to the corresponding visible sibling if one exists, else to <main>.
  const parent = active.parentElement;
  if (parent) {
    const sibling = Array.from(parent.children).find(
      (c): c is HTMLElement => c instanceof HTMLElement && c !== active && isVisible(c),
    );
    if (sibling && sibling.matches('button, a, input, textarea, select, [tabindex]')) {
      sibling.focus({ preventScroll: true });
      return;
    }
  }
  const main = document.querySelector<HTMLElement>('main');
  if (main) {
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }
}

export function applyLang(lang: Lang): void {
  const html = document.documentElement;
  html.lang = lang;
  writeStoredLang(lang);

  const other: Lang = lang === 'nl' ? 'en' : 'nl';
  const suffix = lang === 'nl' ? 'Nl' : 'En';

  // aria-label rewriters
  document.querySelectorAll<HTMLElement>(`[data-aria-label-${lang}]`).forEach((el) => {
    const v = el.dataset[`ariaLabel${suffix}` as 'ariaLabelNl' | 'ariaLabelEn'];
    if (v) el.setAttribute('aria-label', v);
  });

  // aria-roledescription rewriters
  document
    .querySelectorAll<HTMLElement>(`[data-aria-roledescription-${lang}]`)
    .forEach((el) => {
      const v = el.dataset[
        `ariaRoledescription${suffix}` as 'ariaRoledescriptionNl' | 'ariaRoledescriptionEn'
      ];
      if (v) el.setAttribute('aria-roledescription', v);
    });

  // option/label text rewriters
  document.querySelectorAll<HTMLElement>(`[data-label-${lang}]`).forEach((el) => {
    const v = el.dataset[`label${suffix}` as 'labelNl' | 'labelEn'];
    if (typeof v === 'string') el.textContent = v;
  });

  // <title> (not selectable via data-label without changing meaning)
  const title = document.querySelector<HTMLTitleElement>(
    `title[data-title-${lang}]`,
  );
  if (title) {
    const v = title.dataset[`title${suffix}` as 'titleNl' | 'titleEn'];
    if (typeof v === 'string') title.textContent = v;
  }

  // <meta name="description">
  const desc = document.querySelector<HTMLMetaElement>(
    `meta[name="description"][data-desc-${lang}]`,
  );
  if (desc) {
    const v = desc.dataset[`desc${suffix}` as 'descNl' | 'descEn'];
    if (typeof v === 'string') desc.setAttribute('content', v);
  }

  // language switcher button pressed state
  document.querySelectorAll<HTMLButtonElement>('[data-pwz-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.pwzLang === lang ? 'true' : 'false');
  });

  // Belt-and-suspenders: even though `display: none` in _i18n.scss removes the
  // inactive-language twin from the accessibility tree, mark it aria-hidden so
  // outline viewers and edge-case ATs don't announce duplicate headings/legends.
  document.querySelectorAll<HTMLElement>('[data-lang]').forEach((el) => {
    const active = el.dataset.lang === lang;
    if (active) el.removeAttribute('aria-hidden');
    else el.setAttribute('aria-hidden', 'true');
  });

  // suppress unused var warning for `other` — used implicitly via data-attribute pruning
  void other;

  rescueFocusIfHidden();

  listeners.forEach((fn) => {
    try { fn(lang); } catch (err) { console.error('[pwz] lang listener', err); }
  });
}

export function bindLangSwitcher(): void {
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest<HTMLElement>('[data-pwz-lang]');
    if (!btn) return;
    const next = btn.dataset.pwzLang;
    if (isLang(next) && next !== currentLang()) applyLang(next);
  });
}
