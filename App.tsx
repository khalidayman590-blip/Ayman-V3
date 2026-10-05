import React, { useEffect, useMemo, useState } from 'react';
import { QASAID, QAWAEED } from './diwan/data';
import { loadQasaid, saveQasaid } from './diwan/store';
import type { Qasida } from './diwan/types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PoemList from './components/PoemList';
import PoemView from './components/PoemView';
import RulesPage from './components/RulesPage';
import AddPoem from './components/AddPoem';

type Route = { name: 'home' } | { name: 'poem'; id: string } | { name: 'rules' } | { name: 'add' };

const readRoute = (): Route => {
  const h = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
  if (h.startsWith('قصيدة/')) return { name: 'poem', id: h.slice('قصيدة/'.length) };
  if (h === 'قواعد') return { name: 'rules' };
  if (h === 'إضافة') return { name: 'add' };
  return { name: 'home' };
};

const App: React.FC = () => {
  const [qasaid, setQasaid] = useState<Qasida[]>(() => loadQasaid(QASAID));
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    saveQasaid(qasaid);
  }, [qasaid]);

  useEffect(() => {
    const onHash = () => {
      const التالي = readRoute();
      setRoute(التالي);
      if (التالي.name === 'poem') window.scrollTo({ top: 0, behavior: 'smooth' });
      // رابط (#الفهرس) من صفحة قصيدة: ننزل على الفهرس بعد ما تُرسَم الصفحة الرئيسية
      if (window.location.hash === '#الفهرس')
        setTimeout(() => document.getElementById('الفهرس')?.scrollIntoView({ behavior: 'smooth' }), 80);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const إحصاء = useMemo(
    () => ({
      قصائد: qasaid.length,
      أبيات: qasaid.reduce((a, q) => a + q.bayt.length, 0),
      بحور: new Set(qasaid.map((q) => q.baher)).size,
    }),
    [qasaid]
  );

  const فتح_قصيدة = (id: string) => {
    window.location.hash = `#/قصيدة/${id}`;
  };

  const الحالية = route.name === 'poem' ? qasaid.find((q) => q.id === route.id) : undefined;

  return (
    <div className="min-h-screen bg-ليل">
      <Navbar route={window.location.hash || '#/'} poems={qasaid.length} />

      {route.name === 'home' && (
        <>
          <Hero poems={إحصاء.قصائد} verses={إحصاء.أبيات} bohoor={إحصاء.بحور} />
          <PoemList qasaid={qasaid} onOpen={فتح_قصيدة} />
        </>
      )}

      {route.name === 'poem' && !الحالية && (
        <section className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-shaer text-3xl text-ذهب-100">ما لقينا هاي القصيدة بالديوان</h1>
          <a href="#/" className="mt-6 inline-block rounded-full border border-ذهب-400/50 px-6 py-3 text-ذهب-100">
            رجوع للفهرس
          </a>
        </section>
      )}

      {route.name === 'poem' && الحالية && (
        <PoemView q={الحالية} others={qasaid} onOpen={فتح_قصيدة} />
      )}

      {route.name === 'rules' && <RulesPage rules={QAWAEED} />}

      {route.name === 'add' && (
        <AddPoem
          onAdd={(q) => {
            setQasaid((prev) => [q, ...prev]);
            window.location.hash = `#/قصيدة/${q.id}`;
          }}
          onImport={(ق) => setQasaid((prev) => [...ق, ...prev])}
        />
      )}

      <footer className="no-print border-t border-ذهب-700/30 bg-ليل٢/60 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
          <div>
            <p className="font-shaer text-xl text-ذهب-100">ديوان المجالي</p>
            <p className="mt-1 text-xs text-ذهب-200/50">
              شعر نبطي كركي — بلسان أهل الكَرَك، وصفر أخطاء قبل النشر.
            </p>
          </div>
          <p className="text-xs text-ذهب-200/50">
            القصائد محفوظة في متصفحك، ومعك زر تصدير واستيراد حتى ما يضيع شي.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
