import { STORE_KEY, type Qasida } from './types';

export function loadQasaid(defaults: Qasida[]): Qasida[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw) as Qasida[];
    if (!Array.isArray(saved) || !saved.length) return defaults;
    // القصائد المحفوظة أولاً، ثم قصائد الديوان الأصلية (بلا تكرار في المعرّف)
    const ids = new Set(saved.map((q) => q.id));
    return [...saved, ...defaults.filter((q) => !ids.has(q.id))];
  } catch {
    return defaults;
  }
}

export function saveQasaid(qasaid: Qasida[]): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(qasaid));
  } catch {
    /* التخزين ممتلئ أو محجوب */
  }
}

export function تنزيل_ملف(اسم: string, نص: string, نوع = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([نص], { type: نوع });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = اسم;
  a.click();
  URL.revokeObjectURL(url);
}

export function قصيدة_كنص(q: Qasida): string {
  const رأس = [
    q.title,
    `البحر: ${q.baher}`,
    `القافية: الصدر (${q.sadrRhyme}) / العجز (${q.ajzRhyme})`,
    `الضمير: ${q.pronoun}`,
    '',
  ].join('\n');
  const أبيات = q.bayt
    .map((b, i) => `${i + 1}\n${b.sadr}\n${b.ajz}`)
    .join('\n\n');
  return `${رأس}${أبيات}\n`;
}

export function بلا_تشكيل(نص: string): string {
  return نص.replace(/[\u064B-\u0652\u0670]/g, '');
}

export function مفتاح_قصير(عنوان: string): string {
  const base = عنوان
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '');
  return `${base || 'قصيدة'}-${Date.now().toString(36)}`;
}
