import React from 'react';

interface Props {
  rules: string[];
}

const بحور_نبطية = [
  { اسم: 'المسحوب', أصل: 'من السريع', تفعيلات: 'مستفعلن مستفعلن فاعلاتن' },
  { اسم: 'الهجيني', أصل: 'من الرجز أو البسيط', تفعيلات: 'فاعلاتن فاعلن فاعلاتن' },
  { اسم: 'الصخري', أصل: 'من الوافر', تفعيلات: 'مفاعيلن مفاعيلن فعولن' },
  { اسم: 'الحداء', أصل: 'من الرجز', تفعيلات: 'مستفعلن مستفعلن مستفعلن' },
  { اسم: 'الهلالي', أصل: 'من الطويل', تفعيلات: 'فعولن مفاعيلن فعولن مفاعيلن' },
  { اسم: 'السامري', أصل: 'من الرجز', تفعيلات: 'مستفعلن مستفعلن مفعولات' },
  { اسم: 'الرمل النبطي', أصل: 'من الرمل', تفعيلات: 'فاعلاتن فاعلاتن فاعلاتن' },
  { اسم: 'المديد النبطي', أصل: 'من المديد', تفعيلات: 'فاعلاتن فاعلن فاعلاتن' },
];

const RulesPage: React.FC<Props> = ({ rules }) => (
  <section className="mx-auto max-w-4xl px-4 py-12">
    <p className="text-xs tracking-[0.3em] text-ذهب-300/70">عهدُ الدِّيوان</p>
    <h1 className="mt-2 font-shaer text-4xl font-bold text-ذهب-100">قواعد الكتابة المُثبَّتة</h1>
    <p className="mt-4 text-ذهب-200/70">
      هاي القواعد مو كلام إنشائي — كل قصيدة تنزل بالديوان تمرّ عليها، وأي مخالفة تُرفَض قبل النشر.
    </p>

    <ol className="mt-8 space-y-3">
      {rules.map((r, i) => (
        <li key={r} className="flex gap-4 rounded-2xl border border-ذهب-700/25 bg-ليل٢/50 p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ذهب-400/40 text-sm text-ذهب-200">
            {i + 1}
          </span>
          <span className="leading-relaxed text-ذهب-100/90">{r}</span>
        </li>
      ))}
    </ol>

    <h2 className="mt-14 font-shaer text-3xl font-bold text-ذهب-100">مصفوفة البحور النبطية</h2>
    <div className="no-scrollbar mt-6 overflow-x-auto rounded-2xl border border-ذهب-700/25">
      <table className="w-full min-w-[560px] text-right text-sm">
        <thead className="bg-ذهب-600/10 text-ذهب-200">
          <tr>
            <th className="px-4 py-3">البحر</th>
            <th className="px-4 py-3">أصله الفصيح</th>
            <th className="px-4 py-3">تفعيلاته القياسية</th>
          </tr>
        </thead>
        <tbody className="text-ذهب-100/85">
          {بحور_نبطية.map((ب) => (
            <tr key={ب.اسم} className="border-t border-ذهب-700/20">
              <td className="px-4 py-3 font-semibold text-ذهب-100">{ب.اسم}</td>
              <td className="px-4 py-3">{ب.أصل}</td>
              <td className="px-4 py-3 font-shaer text-base">{ب.تفعيلات}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default RulesPage;
