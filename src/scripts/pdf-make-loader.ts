/**
 * pdfmake's shipped typings don't cover the VFS font shapes, and the runtime
 * structure varies between versions:
 *   <0.2:  pdfFontsMod.default.pdfMake.vfs
 *    0.2+: pdfFontsMod.vfs   OR   pdfFontsMod.default (IS the vfs map)
 *
 * This module isolates the `any` needed to reconcile those shapes so the
 * rest of the PDF code stays strictly typed.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PdfMake {
  vfs: unknown;
  createPdf: (doc: unknown) => { download: (name: string) => void };
}

export async function loadPdfMake(): Promise<PdfMake> {
  const [pdfMakeMod, pdfFontsMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ]);
  const pdfMake: PdfMake = (pdfMakeMod as any).default ?? pdfMakeMod;
  const fonts: any = pdfFontsMod;
  pdfMake.vfs =
    fonts.default?.pdfMake?.vfs ??
    fonts.pdfMake?.vfs ??
    fonts.vfs ??
    fonts.default ??
    fonts;
  return pdfMake;
}
