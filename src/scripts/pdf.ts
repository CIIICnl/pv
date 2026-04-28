import {
  categorieen,
  openVraag,
  projectMeta,
  waarden,
  isPar,
  isUl,
  isOl,
  type Block,
  type Vraag,
} from '../data/pwz';
import { appMeta } from '../data/app-meta';
import { strings } from '../data/strings';
import { tokens } from '../data/tokens';
import { isAllDeclared } from './validation';
import { loadPdfMake } from './pdf-make-loader';
import type { FormValues } from './form-io';
import type { Lang } from '../data/i18n';

interface PdfDeps {
  voorwaarden: readonly string[];
}

const COLOR_TEAL = tokens.teal.dark;
const COLOR_TEAL_MID = tokens.teal.mid;
const COLOR_LIME = tokens.limePrint;
const COLOR_TEXT = tokens.text.body;
const COLOR_MUTED = tokens.text.muted;
const COLOR_BG_CALLOUT = tokens.surface.callout;
const COLOR_BORDER = tokens.border.base;
const COLOR_ERROR = tokens.status.error;

function valueOrDash(values: FormValues, id: string): string {
  const v = values[id];
  if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  return '—';
}

function renderBlocks(blocks: Block[]): unknown[] {
  return blocks.map((b) => {
    if (isPar(b)) return { text: b, margin: [0, 0, 0, 6] };
    if (isUl(b)) return { ul: b.ul.map((it) => ({ text: it })), margin: [0, 0, 0, 6] };
    if (isOl(b)) return { ol: b.ol.map((it) => ({ text: it })), margin: [0, 0, 0, 6] };
    return { text: '' };
  });
}

function answerForVraag(values: FormValues, v: Vraag, lang: Lang): unknown[] {
  const blocks: unknown[] = [];

  if (v.intro) blocks.push({ text: v.intro[lang], style: 'questionIntro' });

  if (v.bullets && v.bullets[lang].length > 0) {
    blocks.push({
      ul: v.bullets[lang].map((b) => ({ text: b, style: 'bullet' })),
      margin: [0, 0, 0, 6],
    });
  }

  if (v.field) {
    blocks.push({
      stack: [
        { text: v.field.label[lang], style: 'answerLabel' },
        { text: valueOrDash(values, v.field.id), style: 'answer' },
      ],
      margin: [0, 4, 0, 0],
    });
  }

  if (v.yesno) {
    const keuze = (values[`${v.id}-keuze`] as string) || '—';
    const yesText = strings.pdf.yes[lang];
    const noText = strings.pdf.no[lang];
    const display = keuze === 'ja' ? yesText : keuze === 'nee' ? noText : '—';
    blocks.push({ text: v.yesno.prompt[lang], style: 'questionIntro' });
    blocks.push({
      text: [
        { text: strings.pdf.answerLabel[lang], style: 'answerLabel' },
        { text: display, bold: true, color: COLOR_TEAL },
      ],
      margin: [0, 0, 0, 4],
    });
    const followups = keuze === 'ja' ? v.yesno.onYes : v.yesno.onNo;
    if (followups) {
      for (const f of followups) {
        blocks.push({
          stack: [
            { text: f.label[lang], style: 'answerLabel' },
            { text: valueOrDash(values, f.id), style: 'answer' },
          ],
          margin: [0, 4, 0, 0],
        });
      }
    }
  }

  return blocks;
}

export async function generatePdf(
  values: FormValues,
  deps: PdfDeps,
  lang: Lang = 'nl',
): Promise<void> {
  const pdfMake = await loadPdfMake();
  const declaredAll = isAllDeclared(values, deps.voorwaarden.length);

  // pdfmake emits untagged PDFs (no PDF/UA, no outline) — see pdfmake issue
  // #942. The accessible re-readable artefact is the Markdown export; the web
  // form is the accessible authoring surface. Here we only set what pdfmake
  // exposes that screen readers can still use: /Lang via top-level language,
  // and richer document info metadata.
  const docDefinition = {
    info: {
      title: `${appMeta.name[lang]} — ${valueOrDash(values, 'meta-project')}`,
      author: `${appMeta.org} — ${appMeta.orgLong}`,
      subject: strings.pdf.subjectLong[lang],
      keywords: strings.pdf.keywords[lang],
      creator: `${appMeta.org} ${appMeta.name[lang]}`,
    },
    language: lang === 'en' ? 'en-GB' : 'nl-NL',
    pageSize: 'A4',
    pageMargins: [55, 80, 55, 65],

    header: (currentPage: number) =>
      currentPage === 1
        ? null
        : {
            margin: [55, 30, 55, 0],
            columns: [
              { text: strings.pdf.headerBrand[lang], style: 'headerText' },
              {
                text: valueOrDash(values, 'meta-project'),
                style: 'headerText',
                alignment: 'right',
              },
            ],
          },
    footer: (currentPage: number, pageCount: number) => ({
      margin: [55, 0, 55, 25],
      columns: [
        { text: strings.pdf.footerSite, style: 'footerText' },
        {
          text: `${currentPage} / ${pageCount}`,
          style: 'footerText',
          alignment: 'right',
        },
      ],
    }),

    content: [
      // ---- Cover ----
      { text: appMeta.org, style: 'brand' },
      { text: appMeta.name[lang], style: 'title' },
      { text: appMeta.versionLine[lang], style: 'subtitle' },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 70, y2: 0, lineWidth: 3, lineColor: COLOR_LIME }],
        margin: [0, 6, 0, 18],
      },

      {
        style: 'metaTable',
        table: {
          widths: ['35%', '65%'],
          body: projectMeta.map((m) => [
            { text: m.label[lang], style: 'metaLabel' },
            { text: valueOrDash(values, m.id), style: 'metaValue' },
          ]),
        },
        layout: {
          hLineColor: COLOR_BORDER,
          vLineColor: COLOR_BORDER,
          hLineWidth: () => 0.5,
          vLineWidth: () => 0,
          paddingTop: () => 6,
          paddingBottom: () => 6,
        },
        margin: [0, 0, 0, 18],
      },

      // ---- Sectie B Deel 1 ----
      { text: strings.pdf.sectionB1[lang], style: 'h1', pageBreak: 'before' },
      { text: strings.pdf.declare[lang], margin: [0, 0, 0, 8] },
      {
        ul: deps.voorwaarden.map((tekst, i) => {
          // Roboto (pdfmake's only embedded font) lacks the U+2611/2610 box
          // glyphs, so we use ASCII to stay font-safe.
          const checked = values[`voorwaarde-${i + 1}`] === true;
          return {
            text: [
              { text: checked ? '[X]  ' : '[ ]  ', color: checked ? COLOR_TEAL : COLOR_MUTED, bold: true },
              { text: tekst },
            ],
            margin: [0, 2, 0, 2],
          };
        }),
      },
      {
        margin: [0, 16, 0, 0],
        text: declaredAll
          ? strings.pdf.declaredAll[lang]
          : strings.pdf.declaredIncomplete[lang],
        color: declaredAll ? COLOR_TEAL : COLOR_ERROR,
        bold: true,
      },
      {
        columns: [
          {
            stack: [
              { text: strings.pdf.signerName[lang], style: 'metaLabel' },
              { text: valueOrDash(values, 'meta-naam'), style: 'metaValue' },
            ],
          },
          {
            stack: [
              { text: strings.pdf.date[lang], style: 'metaLabel' },
              { text: valueOrDash(values, 'meta-datum'), style: 'metaValue' },
            ],
          },
        ],
        margin: [0, 16, 0, 0],
      },

      // ---- Sectie B Deel 2 ----
      { text: strings.pdf.sectionB2[lang], style: 'h1', pageBreak: 'before' },
      ...categorieen.flatMap((cat) => [
        { text: `${cat.number}. ${cat.title[lang]}`, style: 'h2', margin: [0, 12, 0, 6] },
        ...cat.vragen.flatMap((v) => [
          { text: `${strings.pdf.questionPrefix[lang]}${v.number}`, style: 'questionNumber' },
          ...answerForVraag(values, v, lang),
          { text: '', margin: [0, 0, 0, 8] },
        ]),
      ]),

      // ---- Sectie B Deel 3 ----
      { text: strings.pdf.sectionB3[lang], style: 'h1', pageBreak: 'before' },
      { text: openVraag.intro[lang], margin: [0, 0, 0, 10] },
      {
        text: [
          { text: strings.pdf.chosenValue[lang], style: 'answerLabel' },
          { text: valueOrDash(values, 'open-waarde'), bold: true, color: COLOR_TEAL },
        ],
        margin: [0, 0, 0, 8],
      },
      { text: strings.pdf.toelichting[lang], style: 'answerLabel' },
      { text: valueOrDash(values, 'open-toelichting'), style: 'answer' },

      // ---- Bijlage: Richtlijn (Sectie A) ----
      { text: strings.pdf.sectionA[lang], style: 'h1', pageBreak: 'before' },
      ...waarden.flatMap((w) => [
        { text: `${w.number}. ${w.title[lang]}`, style: 'h2', margin: [0, 10, 0, 6] },
        ...renderBlocks(w.blocks[lang]),
      ]),
    ],

    styles: {
      brand: { fontSize: 9, characterSpacing: 2, color: COLOR_TEAL_MID, bold: true },
      title: { fontSize: 28, color: COLOR_TEAL, bold: true, margin: [0, 6, 0, 2] },
      subtitle: { fontSize: 10, color: COLOR_MUTED, margin: [0, 0, 0, 4] },
      h1: { fontSize: 18, color: COLOR_TEAL, bold: true, margin: [0, 0, 0, 8] },
      h2: { fontSize: 13, color: COLOR_TEAL, bold: true },
      questionNumber: { fontSize: 8, color: COLOR_TEAL_MID, characterSpacing: 1.2, bold: true, margin: [0, 4, 0, 2] },
      questionIntro: { fontSize: 10, color: COLOR_TEXT, margin: [0, 0, 0, 4] },
      bullet: { fontSize: 10, color: COLOR_TEXT, margin: [0, 1, 0, 1] },
      answerLabel: { fontSize: 9, color: COLOR_MUTED, bold: true, margin: [0, 4, 0, 1] },
      answer: { fontSize: 10, color: COLOR_TEXT, fillColor: COLOR_BG_CALLOUT, margin: [6, 4, 6, 4] },
      metaLabel: { fontSize: 9, color: COLOR_MUTED, bold: true },
      metaValue: { fontSize: 11, color: COLOR_TEXT },
      metaTable: { fontSize: 10 },
      headerText: { fontSize: 8, color: COLOR_MUTED },
      footerText: { fontSize: 8, color: COLOR_MUTED },
    },
    defaultStyle: {
      fontSize: 10,
      color: COLOR_TEXT,
      lineHeight: 1.35,
    },
  };

  const projectName = (values['meta-project'] as string)?.trim() || 'PWZ';
  const slug = projectName.replace(/[^\w-]+/g, '-');
  const base = lang === 'en' ? 'Public-Values-Self-Assessment' : 'Publieke-Waarden-Zelftoets';
  const filename = `${base}_${slug}.pdf`;

  pdfMake.createPdf(docDefinition).download(filename);
}
