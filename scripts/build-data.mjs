// يبني ملف بيانات الديوان (diwan/data.ts) من ملفات القصائد في مجلد "قصائد"
// الاستخدام: node scripts/build-data.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SOURCES = [
  {
    file: 'قصائد/عز-الكرك.md',
    id: 'izz-alkarak',
    title: 'عِزّ الكَرَك',
    baher: 'المسحوب',
    sadrRhyme: 'ـالْ',
    ajzRhyme: 'ـينْ',
    pronoun: 'حِنّا / نِـ',
    note: 'قصيدة فخر بالعشيرة والدار — تُقال في مجلس العيال والكبار.',
    date: '١٤٤٧هـ',
  },
  {
    file: 'قصائد/مقدمة-الديوان.md',
    id: 'muqaddimat-aldiwan',
    title: 'مُقَدِّمة الدِّيوان',
    baher: 'المسحوب',
    sadrRhyme: 'ـاهْ',
    ajzRhyme: 'ـارْ',
    pronoun: 'حِنّا / نِـ',
    note: 'فاتحة الديوان: عهدٌ على الصدق وحفظ الأصول.',
    date: '١٤٤٧هـ',
  },
];

function parsePoem(md) {
  const afterHeader = md.split(/\n---\n/).pop() ?? '';
  const lines = afterHeader
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('**') && !l.startsWith('#') && l !== '---');
  const bayt = [];
  for (let i = 0; i < lines.length; i += 2) {
    if (!lines[i + 1]) break;
    bayt.push({ sadr: lines[i], ajz: lines[i + 1] });
  }
  return bayt;
}

const qasaid = SOURCES.map((s) => {
  const md = fs.readFileSync(path.join(ROOT, s.file), 'utf8');
  const bayt = parsePoem(md);
  const { file: _file, ...meta } = s;
  return { ...meta, bayt };
});

const out = `// ملف مُوَلَّد آلياً — لا تُحرّره مباشرة.
// المصدر: ملفات مجلد "قصائد" — عِد التوليد بالأمر: node scripts/build-data.mjs
import type { Qasida } from './types';

export const QAWAEED: string[] = [
  'قافية الصدر تُلتزم في كل بيت، وتكون مختلفة تماماً عن قافية العجز.',
  'قافية العجز تُلتزم في كل بيت، ولا تتداخل مع الصدر.',
  'كلمات القافية كلها جديدة — يُمنع تكرار كلمة قافية في القصيدة.',
  'الضمير موحّد: إما (حِنّا / نِـ) في الشطرين، أو (هُم / يِـ) — بلا انتقال بينهما.',
  'يُمنع الحشو الميكانيكي (مثل تكرار "وهُم يِـ..." قبل كل فعل).',
  'الوزن مُضبوط ومتقارب طول الشطور — بلا كسر.',
  'مطابقة الجنس في الضمير (رايتنا بيضا / ما تعرف الزوال).',
  'الحد الأدنى ٢٠ بيتاً في القصيدة الجديدة، إلا إذا أمر أبو خالد بغير ذلك.',
  'يُمنع ذكر اسم أي شخص داخل الأبيات إلا بأمر صريح من أبو خالد.',
];

export const QASAID: Qasida[] = ${JSON.stringify(qasaid, null, 2)};
`;

fs.mkdirSync(path.join(ROOT, 'diwan'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'diwan', 'data.ts'), out, 'utf8');
console.log(`تم توليد diwan/data.ts — ${qasaid.length} قصيدة، ${qasaid.reduce((a, q) => a + q.bayt.length, 0)} بيت.`);
