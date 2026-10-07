import React from 'react';
import { رقم } from '../diwan/format';

interface Props {
  route: string;
  poems: number;
}

const روابط: { مسار: string; نص: string }[] = [
  { مسار: '#/', نص: 'الديوان' },
  { مسار: '#/قواعد', نص: 'قواعد الديوان' },
  { مسار: '#/إضافة', نص: 'أضف قصيدة' },
];

const Navbar: React.FC<Props> = ({ route, poems }) => (
  <header className="no-print sticky top-0 z-40 border-b border-ذهب-700/30 bg-ليل/90 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
      <a href="#/" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-ذهب-400/50 bg-ذهب-600/10 text-ذهب-200">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
          </svg>
        </span>
        <span className="leading-tight">
          <span className="block font-shaer text-xl font-bold text-ذهب-100">ديوان المجالي</span>
          <span className="block text-[11px] tracking-wide text-ذهب-300/70">شعر نبطي كركي — {رقم(poems)} قصيدة</span>
        </span>
      </a>

      <nav className="flex items-center gap-1 text-sm">
        {روابط.map((ر) => {
          const فعّال = route === ر.مسار || (ر.مسار !== '#/' && route.startsWith(ر.مسار));
          return (
            <a
              key={ر.مسار}
              href={ر.مسار}
              className={`rounded-full px-3 py-2 transition-colors sm:px-4 ${
                فعّال
                  ? 'bg-ذهب-500/15 text-ذهب-100'
                  : 'text-ذهب-200/70 hover:bg-ذهب-500/10 hover:text-ذهب-100'
              }`}
            >
              {ر.نص}
            </a>
          );
        })}
      </nav>
    </div>
  </header>
);

export default Navbar;
