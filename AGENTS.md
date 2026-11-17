# AGENTS.md — معرفة المستودع

## نظرة عامة
بروتوفوليو شخصي (مازن مدحت) — HTML/CSS/JS بسيط (بدون build) + RTL عربي.
- `index.html` — الصفحة، `app.js` — المنطق والبيانات، `assets/` — الصور.
- `api/data.js` — خادم بيانات Vercel (Upstash Redis REST) لحفظ تعديلات لوحة التحكم ونشرها لكل الزوار.

## مهم — نشر التعديلات
- Vercel متصل بـ GitHub ويتحدّث تلقائيًا عند الدفع إلى `main`. فرع Git المحلي اسمه `master`، فيُدفع بـ `git push origin master:main`.
- تعديلات لوحة التحكم تُحفظ على السيرفر عبر `POST /api/data` (تتطلب `ADMIN_PASSWORD` ومتغيّرات Upstash). بدونها تُحفظ في `localStorage` فقط ولا يراها الزوار.
- كلمة سر المدير تُخزّن مؤقتًا في `sessionStorage` (`mps_admin_session_p`) لتُرسل مع الحفظ.
- منشور على GitHub Pages: https://mazenasc3-cmd.github.io/My-Private-Space/
- فرع العمل `master` يدفع إلى `main` (الفرع المنشور).

## مشروع ذو صلة
- `mazenasc3-cmd/rawdat-almuhibbin-` — موقع دار روضة المحبين (Vercel + Upstash Redis).

## ملاحظات مهمة
- بيانات التواصل في `app.js` (كائن `DEFAULTS`): البريد `mazen@example.com` (افتراضي، يحتاج تحديثًا حقيقيًا)، وباقي الروابط فارغة.
- كلمة سر المدير الافتراضية `Mazen@2026` (هاش SHA-256 في `app.js`).

## بيئة التطوير
- خادم محلي: `python3 -m http.server 8123` من جذر المشروع.
- Playwright (chromium) متاح للاختبار في `/tmp`.

## قيود معروفة
- توكن GitHub في البيئة قد يكون محدود الصلاحيات؛ إن فشل الدفع بـ 403، احفظ الالتزام محليًا وأبلغ المستخدم. (الدفع نجح حاليًا عبر `GH_PAT` في البيئة.)
