import React, { useMemo, useRef, useState } from 'react';
import { BOHOOR, DHAMAIR, type Bayt, type Qasida } from '../diwan/types';
import { افحص } from '../diwan/verify';
import { تنزيل_ملف, مفتاح_قصير } from '../diwan/store';

interface Props {
  onAdd: (q: Qasida) => void;
  onImport: (ق: Qasida[]) => void;
}

const تحليل_الأبيات = (نص: string): Bayt[] => {
  const سطور = نص
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const بالفاصل = سطور.some((l) => l.includes('#'));
  const أبيات: Bayt[] = [];
  if (بالفاصل) {
    سطور.forEach((l) => {
      const [ص, ع] = l.split('#');
      if (ص && ع) أبيات.push({ sadr: ص.trim(), ajz: ع.trim() });
    });
  } else {
    for (let i = 0; i + 1 < سطور.length; i += 2) أبيات.push({ sadr: سطور[i], ajz: سطور[i + 1] });
  }
  return أبيات;
};

const AddPoem: React.FC<Props> = ({ onAdd, onImport }) => {
  const [عنوان, setعنوان] = useState('');
  const [مناسبة, setمناسبة] = useState('');
  const [بحر, setبحر] = useState(BOHOOR[0]);
  const [قافية_صدر, setقافية_صدر] = useState('');
  const [قافية_عجز, setقافية_عجز] = useState('');
  const [ضمير, setضمير] = useState(DHAMAIR[0]);
  const [نص_الأبيات, setنص_الأبيات] = useState('');
  const [خبر, setخبر] = useState('');
  const ملف = useRef<HTMLInputElement>(null);

  const مسودة: Qasida = useMemo(
    () => ({
      id: مفتاح_قصير(عنوان),
      title: عنوان,
      baher: بحر,
      sadrRhyme: قافية_صدر,
      ajzRhyme: قافية_عجز,
      pronoun: ضمير,
      note: مناسبة || undefined,
      bayt: تحليل_الأبيات(نص_الأبيات),
    }),
    [عنوان, بحر, قافية_صدر, قافية_عجز, ضمير, مناسبة, نص_الأبيات]
  );

  const فحص = useMemo(() => افحص(مسودة), [مسودة]);

  const احفظ = () => {
    if (فحص.أخطاء.length) return;
    onAdd(مسودة);
    setخبر('تم حفظ القصيدة بالديوان.');
    setعنوان('');
    setمناسبة('');
    setقافية_صدر('');
    setقافية_عجز('');
    setنص_الأبيات('');
    setTimeout(() => setخبر(''), 3000);
  };

  const استورد = (f: File) => {
    const قارئ = new FileReader();
    قارئ.onload = () => {
      try {
        const بيانات = JSON.parse(String(قارئ.result)) as Qasida[];
        if (Array.isArray(بيانات) && بيانات.length) {
          onImport(بيانات);
          setخبر(`تم استيراد ${بيانات.length} قصيدة.`);
        } else {
          setخبر('الملف ما فيه قصائد.');
        }
      } catch {
        setخبر('تعذّر قراءة الملف — لازم ملف JSON مصدَّر من الديوان.');
      }
      setTimeout(() => setخبر(''), 3000);
    };
    قارئ.readAsText(f);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs tracking-[0.3em] text-ذهب-300/70">باب الشاعر</p>
      <h1 className="mt-2 font-shaer text-4xl font-bold text-ذهب-100">أضف قصيدة للديوان</h1>
      <p className="mt-4 text-ذهب-200/70">
        اكتب كل بيت في سطر، وافصل الصدر عن العجز بعلامة <span className="rounded bg-ليل٢ px-2 py-0.5">#</span>. أو
        الصق شطرين متتاليين لكل بيت. الفحص يشتغل وأنت تكتب.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">عنوان القصيدة</span>
          <input
            value={عنوان}
            onChange={(e) => setعنوان(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
            placeholder="مثال: عِزّ الكَرَك"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">المناسبة (اختياري)</span>
          <input
            value={مناسبة}
            onChange={(e) => setمناسبة(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
            placeholder="مجلس عيال العم — عرس — وسم…"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">البحر</span>
          <select
            value={بحر}
            onChange={(e) => setبحر(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
          >
            {BOHOOR.map((ب) => (
              <option key={ب} value={ب}>
                {ب}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">الضمير</span>
          <select
            value={ضمير}
            onChange={(e) => setضمير(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
          >
            {DHAMAIR.map((د) => (
              <option key={د} value={د}>
                {د}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">قافية الصدر</span>
          <input
            value={قافية_صدر}
            onChange={(e) => setقافية_صدر(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
            placeholder="ـالْ"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-ذهب-200/80">قافية العجز</span>
          <input
            value={قافية_عجز}
            onChange={(e) => setقافية_عجز(e.target.value)}
            className="rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
            placeholder="ـينْ"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="text-sm text-ذهب-200/80">الأبيات</span>
        <textarea
          value={نص_الأبيات}
          onChange={(e) => setنص_الأبيات(e.target.value)}
          rows={10}
          dir="rtl"
          className="بيت rounded-xl border border-ذهب-700/40 bg-ليل٢/80 px-4 py-3 text-xl text-ذهب-100 focus:border-ذهب-400/60 focus:outline-none"
          placeholder={'حِنّا عِيال المَجالي وهَل الطِّوال # وعِزّنا اللي وِرِثْناه مِن الأوَّلين\nوبِسْم الله نِفْتَح دَفْتَر الأَشْعار # …'}
        />
      </label>

      <div className="mt-6 rounded-2xl border border-ذهب-700/30 bg-ليل٢/60 p-5">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-ذهب-700/40 px-3 py-1 text-ذهب-200/80">
            الأبيات المُلتقَطة: {مسودة.bayt.length}
          </span>
          <span
            className={`rounded-full px-3 py-1 ${
              فحص.أخطاء.length
                ? 'bg-red-500/15 text-red-300'
                : 'bg-emerald-500/15 text-emerald-300'
            }`}
          >
            {فحص.أخطاء.length ? `${فحص.أخطاء.length} خطأ` : 'صفر أخطاء في الفحص'}
          </span>
          {فحص.تنبيهات.length > 0 && (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-300">
              {فحص.تنبيهات.length} تنبيه
            </span>
          )}
        </div>

        <ul className="mt-4 space-y-2 text-sm">
          {فحص.أخطاء.map((خ) => (
            <li key={خ} className="text-red-300">
              • {خ}
            </li>
          ))}
          {فحص.تنبيهات.map((ت) => (
            <li key={ت} className="text-amber-300/90">
              • {ت}
            </li>
          ))}
          {!فحص.أخطاء.length && !فحص.تنبيهات.length && مسودة.bayt.length > 0 && (
            <li className="text-emerald-300">القصيدة سليمة على قواعد الديوان — توكل على الله واحفظها.</li>
          )}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={احفظ}
          disabled={فحص.أخطاء.length > 0}
          className="rounded-full bg-ذهب-400 px-7 py-3 font-semibold text-ليل transition enabled:hover:bg-ذهب-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          احفظ القصيدة في الديوان
        </button>

        <button
          onClick={() => {
            const كل = JSON.stringify(مسودة.bayt.length ? [مسودة] : [], null, 2);
            تنزيل_ملف(`قصيدة-${عنوان || 'جديدة'}.json`, كل, 'application/json;charset=utf-8');
          }}
          className="rounded-full border border-ذهب-700/40 px-6 py-3 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          صدّر هذا النص JSON
        </button>

        <button
          onClick={() => ملف.current?.click()}
          className="rounded-full border border-ذهب-700/40 px-6 py-3 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          استورد قصائد
        </button>
        <input
          ref={ملف}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) استورد(f);
            e.target.value = '';
          }}
        />

        {خبر && <span className="text-sm text-ذهب-300">{خبر}</span>}
      </div>
    </section>
  );
};

export default AddPoem;
