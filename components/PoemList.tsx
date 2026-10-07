import React, { useMemo, useState } from 'react';
import type { Qasida } from '../diwan/types';
import { بلا_تشكيل } from '../diwan/store';
import { جَرِّد } from '../diwan/verify';
import { رقم } from '../diwan/format';

interface Props {
  qasaid: Qasida[];
  onOpen: (id: string) => void;
}

const PoemList: React.FC<Props> = ({ qasaid, onOpen }) => {
  const [بحث, setبحث] = useState('');
  const [بحر, setبحر] = useState('الكل');

  const بحور = useMemo(() => ['الكل', ...new Set(qasaid.map((q) => q.baher))], [qasaid]);

  const نتيجة = useMemo(() => {
    const مفتاح = جَرِّد(بحث);
    return qasaid.filter((q) => {
      const يطابق_البحر = بحر === 'الكل' || q.baher === بحر;
      if (!يطابق_البحر) return false;
      if (!مفتاح) return true;
      const نص = جَرِّد(
        [q.title, q.baher, q.note ?? '', ...q.bayt.map((b) => `${b.sadr} ${b.ajz}`)].join(' ')
      );
      return نص.includes(مفتاح);
    });
  }, [qasaid, بحث, بحر]);

  return (
    <section id="الفهرس" className="نقش scroll-mt-20 border-t border-ذهب-700/25 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-ذهب-300/70">فِهرِس الدِّيوان</p>
            <h2 className="mt-2 font-shaer text-4xl font-bold text-ذهب-100">القصائد المُوَثَّقة</h2>
          </div>

          <div className="flex w-full max-w-md flex-col gap-2">
            <input
              value={بحث}
              onChange={(e) => setبحث(e.target.value)}
              placeholder="ابحث بكلمة أو شطر…"
              className="w-full rounded-full border border-ذهب-700/40 bg-ليل٢/80 px-5 py-3 text-sm text-ذهب-100 placeholder:text-ذهب-200/40 focus:border-ذهب-400/60 focus:outline-none"
            />
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {بحور.map((ب) => (
                <button
                  key={ب}
                  onClick={() => setبحر(ب)}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs transition ${
                    بحر === ب
                      ? 'border-ذهب-400/70 bg-ذهب-500/20 text-ذهب-100'
                      : 'border-ذهب-700/30 text-ذهب-200/60 hover:text-ذهب-100'
                  }`}
                >
                  {ب}
                </button>
              ))}
            </div>
          </div>
        </div>

        {نتيجة.length === 0 && (
          <p className="rounded-2xl border border-ذهب-700/30 bg-ليل٢/60 p-6 text-center text-ذهب-200/70">
            ما لقينا قصيدة بهذا البحث يا أبو خالد.
          </p>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {نتيجة.map((q) => (
            <article
              key={q.id}
              className="group flex flex-col justify-between rounded-3xl border border-ذهب-700/30 bg-gradient-to-b from-ليل٢/90 to-ليل/90 p-6 transition hover:border-ذهب-400/50 hover:shadow-2xl hover:shadow-ذهب-700/10"
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-ذهب-200/70">
                  <span className="rounded-full border border-ذهب-700/40 px-3 py-1">{q.baher}</span>
                  <span className="rounded-full border border-ذهب-700/40 px-3 py-1">
                    صدر {q.sadrRhyme} / عجز {q.ajzRhyme}
                  </span>
                  <span className="rounded-full border border-ذهب-700/40 px-3 py-1">{رقم(q.bayt.length)} بيت</span>
                </div>

                <h3 className="font-shaer text-3xl font-bold text-ذهب-100">{q.title}</h3>
                {q.note && <p className="mt-2 text-sm text-ذهب-200/60">{q.note}</p>}

                <div className="mt-5 space-y-1 border-r-2 border-ذهب-500/40 pr-4 font-shaer text-lg leading-loose text-ذهب-100/85">
                  <p>{بلا_تشكيل(q.bayt[0]?.sadr ?? '')}</p>
                  <p>{بلا_تشكيل(q.bayt[0]?.ajz ?? '')}</p>
                </div>
              </div>

              <button
                onClick={() => onOpen(q.id)}
                className="mt-6 self-start rounded-full bg-ذهب-500/15 px-5 py-2.5 text-sm font-semibold text-ذهب-100 transition group-hover:bg-ذهب-400 group-hover:text-ليل"
              >
                اقرأ القصيدة كاملة
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoemList;
