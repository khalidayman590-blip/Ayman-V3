import type { Qasida } from './types';

const TASHKEEL = /[\u064B-\u0652\u0670\u0640]/g;

/** تجريد الشطر من التشكيل وتوحيد الهمزات والتاء المربوطة والألف المقصورة */
export const جَرِّد = (نص: string): string =>
  نص
    .replace(TASHKEEL, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ـ/g, '')
    .trim();

/** كلمة القافية = آخر كلمة في الشطر بعد التجريد */
export const كلمة_القافية = (شطر: string): string => {
  const ws = جَرِّد(شطر).split(/\s+/).filter(Boolean);
  return ws.length ? ws[ws.length - 1] : '';
};

/** حرف الروي التقريبي: آخر حرف صحيح في كلمة القافية بعد إزالة حروف المد الطرفية */
export const حرف_الروي = (كلمه: string): string => {
  const w = جَرِّد(كلمه).replace(/[اوي]$/, '');
  return w ? w[w.length - 1] : '';
};

export interface نتيجة_الفحص {
  أخطاء: string[];
  تنبيهات: string[];
}

export function افحص(q: Qasida): نتيجة_الفحص {
  const أخطاء: string[] = [];
  const تنبيهات: string[] = [];

  if (!q.title.trim()) أخطاء.push('العنوان مطلوب.');
  if (q.bayt.length < 2) أخطاء.push('القصيدة أقل من بيتين — لا تُعدّ قصيدة.');

  const صدر: string[] = [];
  const عجز: string[] = [];
  q.bayt.forEach((b, i) => {
    if (!b.sadr.trim() || !b.ajz.trim()) أخطاء.push(`البيت ${i + 1}: في شطر ناقص.`);
    صدر.push(كلمة_القافية(b.sadr));
    عجز.push(كلمة_القافية(b.ajz));
  });

  // ١) قافية الصدر
  const صدر_متكرر = صدر.filter((w, i) => w && صدر.indexOf(w) !== i);
  if (صدر_متكرر.length)
    أخطاء.push(`تكرار في قافية الصدر: ${[...new Set(صدر_متكرر)].join('، ')} — كل بيت لازم قافية جديدة.`);

  // ٢) قافية العجز
  const عجز_متكرر = عجز.filter((w, i) => w && عجز.indexOf(w) !== i);
  if (عجز_متكرر.length)
    أخطاء.push(`تكرار في قافية العجز: ${[...new Set(عجز_متكرر)].join('، ')} — كل بيت لازم قافية جديدة.`);

  // ٣) الصدر لازم يختلف عن العجز
  const متقاطع = صدر.filter((w, i) => w && w === عجز[i]);
  if (متقاطع.length)
    أخطاء.push(`الصدر والعجز اتّفقا في القافية داخل البيت نفسه (${متقاطع[0]}) — لازم تختلف.`);

  // ٤) وحدة حرف الروي
  const روي_صدر = [...new Set(صدر.map(حرف_الروي).filter(Boolean))];
  const روي_عجز = [...new Set(عجز.map(حرف_الروي).filter(Boolean))];
  if (روي_صدر.length > 1) أخطاء.push(`حرف روي الصدر غير موحّد: ${روي_صدر.join('، ')}`);
  if (روي_عجز.length > 1) أخطاء.push(`حرف روي العجز غير موحّد: ${روي_عجز.join('، ')}`);
  if (روي_صدر.length === 1 && روي_عجز.length === 1 && روي_صدر[0] === روي_عجز[0])
    أخطاء.push('حرف الروي واحد في الصدر والعجز — القافيتان لازم تختلفان.');

  // ٥) العدد الأدنى
  if (q.bayt.length < 20)
    تنبيهات.push(`عدد الأبيات ${q.bayt.length} — وأمر أبو خالد ألا تقل القصيدة عن ٢٠ بيتاً.`);

  // ٦) الضمير الموحّد (فحص تقريبي: ما يختلط (حنّا) مع (هُم) في القصيدة نفسها)
  const كلمات = جَرِّد(q.bayt.map((b) => `${b.sadr} ${b.ajz}`).join(' ')).split(/\s+/);
  const يظهر_المتكلم = كلمات.some((w) => ['حنا', 'نحنا', 'نحن', 'احنا'].includes(w));
  const يظهر_الغائب = كلمات.some((w) => ['هم', 'وهم', 'هن', 'وهن'].includes(w));
  if (يظهر_المتكلم && يظهر_الغائب)
    تنبيهات.push('الضمير مختلط بين المتكلم (حِنّا) والغائب (هُم) — وحّد الضمير في القصيدة كلها.');

  // ٧) طول الشطر (تقدير مقاطع صوتية) — يقارب عدد المقاطع ويتقارب بين الشطرين
  const مقاطع = (شطر: string): number =>
    جَرِّد(شطر)
      .split(/\s+/)
      .filter(Boolean)
      .reduce((a, w) => a + Math.max(1, w.length - [...w].filter((c, i) => i > 0 && 'اوي'.includes(c)).length - (w.startsWith('ال') && w.length > 2 ? 1 : 0)), 0);

  const طول_صدر = q.bayt.map((b) => مقاطع(b.sadr));
  const طول_عجز = q.bayt.map((b) => مقاطع(b.ajz));
  const متوسط = (أ: number[]) => (أ.length ? أ.reduce((x, y) => x + y, 0) / أ.length : 0);
  const فوارق = q.bayt
    .map((_, i) => Math.abs(طول_صدر[i] - طول_عجز[i]))
    .filter((d) => d > 4);
  if (فوارق.length) تنبيهات.push(`${فوارق.length} بيت فيه تفاوت كبير في الطول بين الصدر والعجز — راجع الوزن.`);

  const صدر_شاذ = طول_صدر.filter((l) => Math.abs(l - متوسط(طول_صدر)) > 4).length;
  const عجز_شاذ = طول_عجز.filter((l) => Math.abs(l - متوسط(طول_عجز)) > 4).length;
  if (صدر_شاذ || عجز_شاذ) تنبيهات.push(`${صدر_شاذ + عجز_شاذ} شطر خرج عن طول باقي الشطور — يُحتمل كسر وزني.`);

  return { أخطاء, تنبيهات };
}
