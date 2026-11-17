# AGENTS.md — معرفة المستودع

## نظرة عامة
بروتوفوليو شخصي (مازن مدحت) — HTML/CSS/JS بسيط (بدون build) + RTL عربي.
- `index.html` — الصفحة، `app.js` — المنطق والبيانات، `assets/` — الصور.
- منشور على GitHub Pages: https://mazenasc3-cmd.github.io/My-Private-Space/
- فرع العمل `master` يدفع إلى `main` (الفرع المنشور).

## مشروع ذو صلة
- `mazenasc3-cmd/rawdat-almuhibbin-` — موقع دار روضة المحبين (Vercel + Upstash Redis).

## ملاحظات مهمة
- بيانات التواصل في `app.js` (كائن `data.socials`): البريد `mazen@example.com` (افتراضي، يحتاج تحديثًا حقيقيًا)، وباقي الروابط فارغة.
- دالة التعقيم `esc()` كانت مكسورة في مشروع الروضة (no-op) وتم إصلاحها.

## بيئة التطوير
- خادم محلي: `python3 -m http.server 8123` من جذر المشروع.
- Playwright (chromium) متاح للاختبار في `/tmp`.

## قيود معروفة
- توكن GitHub في البيئة قد يكون **للقراءة فقط** (`metadata=read`)؛ الدفع يفشل بـ 403. عندها احفظ الالتزام محليًا وأنشئ `git format-patch` وأبلغ المستخدم.
