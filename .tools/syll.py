# -*- coding: utf-8 -*-
"""عدّ المقاطع الصوتية: كل مقطع = مجموعة حركة واحدة (قصيرة أو طويلة)."""
import re, sys, io
STRIP = re.compile(r'[\u064B\u064C\u064D\u0651\u0652\u0670\u0640]')  # تنوين، شدة، سكون، مدّ بدل، تطويل
VOWEL = set('\u064E\u064F\u0650')   # فتحة ضمة كسرة
LONG  = set('اوي')

def count(w):
    w = STRIP.sub('', w)
    n = 0; i = 0; prev_vowel = False
    while i < len(w):
        ch = w[i]
        if ch in VOWEL:
            n += 1; prev_vowel = True; i += 1
        elif ch in LONG:
            if prev_vowel: prev_vowel = False          # مدّ بعد حركة = نفس المقطع
            else: n += 1; prev_vowel = False           # ألف وصل ونحوها
            i += 1
        else:
            prev_vowel = False; i += 1
    return n

p = sys.argv[1]
txt = io.open(p, encoding='utf-8').read()
body = txt.split('---',2)[-1]
lines=[l.strip() for l in body.split('\n') if l.strip() and not l.startswith('**') and not l.startswith('#')]
tot=[]
for i,l in enumerate(lines,1):
    c=count(l); tot.append(c)
    print(f"{i:2d} {c:2d}  {l}")
print("\nالمعدل:", round(sum(tot)/len(tot),2), "| المدى:", min(tot), "-", max(tot))
