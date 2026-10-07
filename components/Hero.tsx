import React from 'react';
import { رقم } from '../diwan/format';

interface Props {
  poems: number;
  verses: number;
  bohoor: number;
}

const Hero: React.FC<Props> = ({ poems, verses, bohoor }) => (
  <section className="relative isolate overflow-hidden">
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: 'url(/hero-karak.jpg)' }}
      aria-hidden
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ليل via-ليل/85 to-ليل/40" aria-hidden />

    <div className="mx-auto flex min-h-[86vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-4 rounded-full border border-ذهب-400/40 bg-ليل/50 px-4 py-1 text-xs tracking-[0.25em] text-ذهب-200">
        الكَرَك — حِصْنٌ وحَديدُ نَسَب
      </p>

      <h1 className="ذهبي font-shaer text-5xl font-bold leading-[1.3] sm:text-6xl md:text-7xl">
        ديوان المجالي
      </h1>

      <p className="mt-5 max-w-2xl font-shaer text-xl leading-relaxed text-ذهب-100/90 sm:text-2xl">
        شِعرٌ نبطيٌّ أصيل بلسان أهل الكَرَك: قافيةٌ مُلتَزَمة، ووزنٌ مضبوط، وصِدقٌ في الفَخر بلا مبالغة.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#الفهرس"
          className="rounded-full bg-ذهب-400 px-7 py-3 font-semibold text-ليل shadow-lg shadow-ذهب-600/25 transition hover:bg-ذهب-300"
        >
          افتح فهرس القصائد
        </a>
        <a
          href="#/قواعد"
          className="rounded-full border border-ذهب-400/50 px-7 py-3 font-semibold text-ذهب-100 transition hover:bg-ذهب-500/10"
        >
          قواعد الديوان
        </a>
      </div>

      <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3 text-center">
        {[
          { ع: 'القصائد', ق: رقم(poems) },
          { ع: 'الأبيات', ق: رقم(verses) },
          { ع: 'البحور', ق: رقم(bohoor) },
        ].map((س) => (
          <div key={س.ع} className="rounded-2xl border border-ذهب-700/30 bg-ليل٢/70 px-3 py-4 backdrop-blur">
            <dt className="text-xs text-ذهب-200/70">{س.ع}</dt>
            <dd className="mt-1 font-shaer text-2xl text-ذهب-100">{س.ق}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;
