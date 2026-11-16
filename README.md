# My-Private-Space

موقع شخصي (Portfolio) — `index.html` + `app.js` + مجلد `assets/` للصور.

## الملفات
- `index.html` — هيكل الموقع + التصميم (CSS).
- `app.js` — منطق الموقع: البيانات، العرض، ونظام الأدمن.
- `assets/` — الصور (`portrait.png` + `photo1..5.webp`).

## الأقسام
Hero · نبذة عني · المهارات · معرض الصور · الخدمات · الرحلة العلمية · المشاريع · تواصل معي (نموذج + حسابات).

## نظام الأدمن (الخيار A)
زر ولوحة التعديل **مخفية عن الزوار** بالكامل. للدخول:

- اضغط على شعار الموقع (MM) **3 مرات**، أو
- اضغط `Shift + A`، أو
- افتح الرابط مع `#admin` (مثال: `.../index.html#admin`).

كلمة المرور الافتراضية: `Mazen@2026`

> لتغيير كلمة المرور: غيّر `ADMIN_PASSWORD_HASH` في `index.html` بهاش SHA-256 للكلمة الجديدة.
> مثال: `python3 -c "import hashlib;print(hashlib.sha256('كلمتك'.encode()).hexdigest())"`

الجلسة محفوظة في `sessionStorage` (بتنتهي بإغلاق التاب). زر الخروج موجود في شريط "وضع المدير".

## ربط البيانات بـ Vercel
طبقة البيانات معزولة في `DataStore` جوه `index.html`:

- **القراءة:** `window.SITE_DATA` ← ثم `GET /api/data` ← ثم `localStorage` ← ثم القيم الافتراضية.
- **الكتابة:** `POST /api/data` بالـ JSON الكامل ← وإلا `localStorage` كـ fallback.

عقد الـ API:

```
GET  /api/data   -> 200 + JSON  (نفس شكل DEFAULTS في index.html)
POST /api/data   -> 200 OK      (body = JSON كامل للبيانات)
```

ما عليك إلا إنك تعمل `/api/data` على Vercel (Serverless Function + KV/DB) وتخزّن/ترجّع نفس شكل الكائن.

## تشغيل محلي
```bash
python3 -m http.server 8000
# افتح http://localhost:8000
```
