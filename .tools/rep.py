# -*- coding: utf-8 -*-
import re, sys, collections
p = sys.argv[1]
txt = open(p, encoding='utf-8').read()
body = txt.split('---',2)[-1]
lines = [l.strip() for l in body.split('\n') if l.strip() and not l.startswith('**') and not l.startswith('#')]
TASH = re.compile(r'[\u064B-\u0652\u0670\u0640]')
def clean(w):
    w = TASH.sub('', w)
    w = w.replace('أ','ا').replace('إ','ا').replace('آ','ا').replace('ة','ه').replace('ى','ي')
    return w.strip('.,،؛؟!')
def stem(w):
    for q in ('وال','فال','بال','كال','وب','ول','لل','و','ف','ب','ل','ال'):
        if w.startswith(q) and len(w) > len(q)+1:
            return w[len(q):]
    return w
STOP = {'و','ف','ب','ل','في','من','على','عن','مع','ما','لا','ولا','يا','هذا','هذه','هذي','ال','ان','او','به','له','بها','لها','هو','هي','هم','هل','ثم','بل','قد','لو','لم','لن','كي','وما','فما','لما','بنا','منا','عنا','معنا','ولا'}
watch = {'عنا','عندنا','فينا','فيها','اللي','الي','كل','واحده','بنا','لنا','منها','عليه','غير','معها'}
freq = collections.Counter(); order = {}
for i,l in enumerate(lines,1):
    for w in l.split():
        c = clean(w); s = stem(c)
        if len(s) >= 3 and c not in STOP:
            freq[s]+=1; order.setdefault(s,(i,c))
dups = {w:c for w,c in freq.items() if c>1}
print("== كلمات مكررة (٣ أحرف وأكثر) ==")
if not dups: print("  لا شيء")
for w,c in sorted(dups.items(), key=lambda x:-x[1]):
    mark = " (جسيم)" if w in watch else ""
    print(f"  {c}x  {w}{mark}   [أول موضع: بيت {order[w][0]}]")
rh = [clean(l.split()[-1]) for l in lines]
sadr = rh[0::2]; ajz = rh[1::2]
print("\nعدد الأبيات:", len(lines)//2)
print("صدر:", " ".join(sadr), "| فريد:", f"{len(set(sadr))}/{len(sadr)}")
print("عجز:", " ".join(ajz), "| فريد:", f"{len(set(ajz))}/{len(ajz)}")
print("تقاطع صدر/عجز:", set(sadr)&set(ajz) or "لا شيء")
