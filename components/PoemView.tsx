import React, { useState } from 'react';
import type { Qasida } from '../diwan/types';
import { بلا_تشكيل, تنزيل_ملف, قصيدة_كنص } from '../diwan/store';
import { رقم } from '../diwan/format';

interface Props {
  q: Qasida;
  others: Qasida[];
  onOpen: (id: string) => void;
}

const PoemView: React.FC<Props> = ({ q, others, onOpen }) => {
  const [تشكيل, setتشكيل] = useState(true);
  const [خبر, setخبر] = useState('');

  const اعرض = (s: string) => (تشكيل ? s : بلا_تشكيل(s));

  const نسخ = async (نص: string, رسالة: string) => {
    try {
      await navigator.clipboard.writeText(نص);
      setخبر(رسالة);
    } catch {
      setخبر('تعذّر النسخ من المتصفح — استخدم التنزيل.');
    }
    setTimeout(() => setخبر(''), 2500);
  };

  return (
    <article className="للطباعة mx-auto max-w-4xl px-4 py-10">
      <a href="#الفهرس" className="no-print inline-block text-sm text-ذهب-200/60 hover:text-ذهب-100">
        ← رجوع للفهرس
      </a>

      <header className="mt-6 border-b border-ذهب-700/30 pb-6">
        <h1 className="font-shaer text-5xl font-bold text-ذهب-100">{q.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ذهب-200/75">
          {[
            `البحر: ${q.baher}`,
            `قافية الصدر: ${q.sadrRhyme}`,
            `قافية العجز: ${q.ajzRhyme}`,
            `الضمير: ${q.pronoun}`,
            `عدد الأبيات: ${رقم(q.bayt.length)}`,
            q.date ? `التاريخ: ${q.date}` : '',
          ]
            .filter(Boolean)
            .map((t) => (
              <span key={t} className="rounded-full border border-ذهب-700/40 px-3 py-1">
                {t}
              </span>
            ))}
        </div>
        {q.note && <p className="mt-4 text-sm text-ذهب-200/60">{q.note}</p>}
      </header>

      <div className="no-print mt-6 flex flex-wrap items-center gap-2 text-sm">
        <button
          onClick={() => setتشكيل((v) => !v)}
          className="rounded-full border border-ذهب-400/50 px-5 py-2 font-semibold text-ذهب-100 transition hover:bg-ذهب-500/10"
        >
          {تشكيل ? 'اعرض بلا تشكيل' : 'اعرض بالتشكيل'}
        </button>
        <button
          onClick={() => نسخ(قصيدة_كنص(q), 'تم نسخ القصيدة كاملة.')}
          className="rounded-full border border-ذهب-700/40 px-5 py-2 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          نسخ القصيدة
        </button>
        <button
          onClick={() => {
            const رابط = `${window.location.origin}${window.location.pathname}#/قصيدة/${q.id}`;
            void نسخ(رابط, 'تم نسخ رابط القصيدة.');
          }}
          className="rounded-full border border-ذهب-700/40 px-5 py-2 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          نسخ الرابط
        </button>
        <button
          onClick={() => تنزيل_ملف(`${q.title}.txt`, قصيدة_كنص(q))}
          className="rounded-full border border-ذهب-700/40 px-5 py-2 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          تنزيل نصّي
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-full border border-ذهب-700/40 px-5 py-2 text-ذهب-200/80 transition hover:text-ذهب-100"
        >
          طباعة
        </button>
        {خبر && <span className="text-xs text-ذهب-300">{خبر}</span>}
      </div>

      <ol className="mt-10 space-y-8">
        {q.bayt.map((b, i) => (
          <li key={i} className="بيت grid gap-2 rounded-2xl border border-ذهب-700/20 bg-ليل٢/50 p-5 sm:grid-cols-2 sm:gap-6">
            <p className="flex gap-3 text-xl text-ذهب-100/95 sm:text-2xl">
              <span className="select-none pt-2 font-sans text-xs text-ذهب-400/70">{رقم(i + 1)}</span>
              <span>{اعرض(b.sadr)}</span>
            </p>
            <p className="flex gap-3 text-xl text-ذهب-100/95 sm:text-2xl sm:border-r sm:border-ذهب-700/30 sm:pr-6">
              <span className="pt-2 font-sans text-xs text-ذهب-400/0 sm:text-ذهب-400/0">·</span>
              <span>{اعرض(b.ajz)}</span>
            </p>
          </li>
        ))}
      </ol>

      <footer className="no-print mt-14 border-t border-ذهب-700/30 pt-8">
        <h3 className="mb-4 font-shaer text-2xl text-ذهب-100">من بقية الديوان</h3>
        <div className="flex flex-wrap gap-3">
          {others
            .filter((o) => o.id !== q.id)
            .map((o) => (
              <button
                key={o.id}
                onClick={() => onOpen(o.id)}
                className="rounded-2xl border border-ذهب-700/30 px-5 py-3 text-sm text-ذهب-100/85 transition hover:border-ذهب-400/50 hover:bg-ذهب-500/10"
              >
                {o.title} <span className="text-ذهب-300/60">— {o.baher}</span>
              </button>
            ))}
        </div>
      </footer>
    </article>
  );
};

export default PoemView;
