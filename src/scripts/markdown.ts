import {
  categorieen,
  openVraag,
  projectMeta,
  richtlijnIntro,
  waarden,
  isPar,
  isUl,
  isOl,
  type Block,
  type Vraag,
} from '../data/pwz';
import { appMeta } from '../data/app-meta';
import { strings } from '../data/strings';
import { isAllDeclared } from './validation';
import type { FormValues } from './form-io';
import type { Lang } from '../data/i18n';

interface MdDeps {
  voorwaarden: readonly string[];
}

function valueOrDash(values: FormValues, id: string): string {
  const v = values[id];
  if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  return '—';
}

function renderBlocksMd(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (isPar(b)) return b;
      if (isUl(b)) return b.ul.map((it) => `- ${it}`).join('\n');
      if (isOl(b)) return b.ol.map((it, i) => `${i + 1}. ${it}`).join('\n');
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

function answerForVraagMd(values: FormValues, v: Vraag, lang: Lang): string {
  const out: string[] = [];

  if (v.intro) out.push(v.intro[lang]);

  if (v.bullets && v.bullets[lang].length > 0) {
    out.push(v.bullets[lang].map((b) => `- ${b}`).join('\n'));
  }

  if (v.field) {
    out.push(`**${v.field.label[lang]}**\n\n${valueOrDash(values, v.field.id)}`);
  }

  if (v.yesno) {
    const keuze = (values[`${v.id}-keuze`] as string) || '';
    const yesText = strings.pdf.yes[lang];
    const noText = strings.pdf.no[lang];
    const display = keuze === 'ja' ? yesText : keuze === 'nee' ? noText : '—';
    out.push(v.yesno.prompt[lang]);
    out.push(`**${strings.pdf.answerLabel[lang].trim()}** ${display}`);
    const followups = keuze === 'ja' ? v.yesno.onYes : v.yesno.onNo;
    if (followups) {
      for (const f of followups) {
        out.push(`**${f.label[lang]}**\n\n${valueOrDash(values, f.id)}`);
      }
    }
  }

  return out.join('\n\n');
}

export function generateMarkdown(
  values: FormValues,
  deps: MdDeps,
  lang: Lang,
): string {
  const declaredAll = isAllDeclared(values, deps.voorwaarden.length);
  const project = valueOrDash(values, 'meta-project');
  const out: string[] = [];

  out.push(`# ${appMeta.name[lang]} — ${project}`);
  out.push(`*${appMeta.versionLine[lang]} · ${appMeta.org}*`);

  out.push('');
  out.push(
    projectMeta
      .map((m) => `- **${m.label[lang]}:** ${valueOrDash(values, m.id)}`)
      .join('\n'),
  );

  out.push('');
  out.push(`## ${strings.pdf.sectionB1[lang]}`);
  out.push(strings.pdf.declare[lang]);
  out.push(
    deps.voorwaarden
      .map((tekst, i) => {
        const checked = values[`voorwaarde-${i + 1}`] === true;
        return `- [${checked ? 'x' : ' '}] ${tekst}`;
      })
      .join('\n'),
  );
  out.push(
    declaredAll ? strings.pdf.declaredAll[lang] : strings.pdf.declaredIncomplete[lang],
  );
  out.push(
    `**${strings.pdf.signerName[lang]}:** ${valueOrDash(values, 'meta-naam')}  \n` +
      `**${strings.pdf.date[lang]}:** ${valueOrDash(values, 'meta-datum')}`,
  );

  out.push('');
  out.push(`## ${strings.pdf.sectionB2[lang]}`);
  for (const cat of categorieen) {
    out.push(`### ${cat.number}. ${cat.title[lang]}`);
    for (const v of cat.vragen) {
      out.push(`#### ${strings.pdf.questionPrefix[lang]}${v.number}`);
      out.push(answerForVraagMd(values, v, lang));
    }
  }

  out.push('');
  out.push(`## ${strings.pdf.sectionB3[lang]}`);
  out.push(openVraag.intro[lang]);
  out.push(
    `**${strings.pdf.chosenValue[lang].trim()}** ${valueOrDash(values, 'open-waarde')}`,
  );
  out.push(`**${strings.pdf.toelichting[lang]}**\n\n${valueOrDash(values, 'open-toelichting')}`);

  out.push('');
  out.push(`## ${strings.pdf.sectionA[lang]}`);
  out.push(renderBlocksMd(richtlijnIntro[lang]));
  for (const w of waarden) {
    out.push(`### ${w.number}. ${w.title[lang]}`);
    out.push(renderBlocksMd(w.blocks[lang]));
  }

  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export function downloadMarkdown(
  values: FormValues,
  deps: MdDeps,
  lang: Lang,
): void {
  const md = generateMarkdown(values, deps, lang);
  const projectName = (values['meta-project'] as string)?.trim() || 'PWZ';
  const slug = projectName.replace(/[^\w-]+/g, '-');
  const base = lang === 'en' ? 'Public-Values-Self-Assessment' : 'Publieke-Waarden-Zelftoets';
  const filename = `${base}_${slug}.md`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
