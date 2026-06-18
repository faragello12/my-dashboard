# 📊 Home Dashboard

داشبورد شخصي شامل بالعربي - **مجاني 100%** - مظبوط للموبايل.

## ✨ المميزات

- 📱 **Mobile-first** - مصمم خصيصًا للموبايل
- ☁️ **مزامنة سحابية مجانية** - GitHub Gist (مش هتدفع ولا مليم)
- 💾 **يعمل بدون نت** - localStorage كـ backup دائم
- 🔒 **محمي بـ PIN**
- 💾 **Auto-save + Backup/Export**

---

## 🚀 خطوات الرفع (مجاني 100%)

### خطوة 1: جهّز حساب GitHub (لو مش عندك)
- اعمل حساب مجاني من [github.com](https://github.com)
- ⚠️ مهم: فعّل الـ 2FA عشان تقدر تعمل Token

### خطوة 2: اعمل Personal Access Token
1. روح [github.com/settings/tokens](https://github.com/settings/tokens)
2. اضغط **"Generate new token"** → **"Classic"**
3. في **Note** اكتب: `dashboard`
4. في **Expiration** اختار `No expiration` أو مدة طويلة
5. في **Scopes** فعّل بس **`gist`** (مش محتاج أي حاجة تانية)
6. اضغط **Generate token**
7. **انسخ الـ Token فورًا** (مش هتشوفه تاني!)

### خطوة 3: اعمل Gist فاضي
1. روح [gist.github.com](https://gist.github.com)
2. **Filename:** `dashboard.json`
3. **Content:** `{}`
4. **اختار "Secret"** (مش public)
5. اضغط **Create gist**
6. من الـ URL انسخ الـ ID - شكله كده:
   `https://gist.github.com/username/`**`abc123def456...`**
   - الـ ID هو الجزء الأخير بعد `/`
   - مثال: `7b09f8c1a2d3e4f5a6b7c8d9e0f1a2b3`

### خطوة 4: ارفع المشروع على Vercel
1. روح [vercel.com/new](https://vercel.com/new)
2. اسحب مجلد `dashboard` كله وارميه في الصفحة
   أو ارفعه على GitHub وربطه من Vercel
3. اضغط **Deploy**

### خطوة 5: حط Environment Variables
في صفحة المشروع على Vercel:
- **Settings** → **Environment Variables**
- ضيف 3 متغيرات:

| Name | Value |
|------|-------|
| `DASHBOARD_PIN` | أي رقم تختاره (مثلاً `7861`) |
| `GIST_ID` | الـ ID اللي نسخته من الخطوة 3 |
| `GH_TOKEN` | الـ Token اللي نسخته من الخطوة 2 |

- اضغط **Save** بعد كل واحد

### خطوة 6: Redeploy
- روح **Deployments**
- اضغط على آخر deployment → **⋮** (3 dots) → **Redeploy**
- استنى دقيقة

### خطوة 7: استخدمه! 🎉
افتح الرابط اللي Vercel ادّاهولك من الموبايل وحط الـ PIN اللي اخترته.

---

## 📱 نصائح للموبايل

### أضف للشاشة الرئيسية (عشان يبان زي التطبيق):
- **iPhone (Safari):** Share → Add to Home Screen
- **Android (Chrome):** ⋮ → Add to Home Screen

### استخدام سريع:
- اضغط **Enter** بعد أي كتابة عشان تتضيف
- الـ **"⋯"** (فوق يمين) فيها: Finance, Goals, SOPs, Backup, Logout
- زرار **+** (الدائرة اللي تحت) للإضافة السريعة

### بدون نت:
- الداشبورد بيشتغل من غير نت
- بس المزامنة هتتم أول ما تفتح نت

---

## 🛡️ الأمان

- الـ **PIN** اللي تحطه في Vercel هو اللي بيفتح الداشبورد
- الـ **GitHub Token** بيستخدمه السيرفر بس (مش بيتبعت للمتصفح)
- الداتا بتتخزن في Gist **Secret** (مش public)
- كل اتصال بـ HTTPS (Vercel بيوفر ده تلقائي)

### لو عايز تغير الـ PIN:
Vercel → Settings → Environment Variables → غيّر `DASHBOARD_PIN` → Redeploy

### لو عايز تمسح كل الداتا:
Vercel → Storage → احذف الـ Gist من GitHub

---

## 🆘 مشاكل شائعة وحلولها

### "GIST_NOT_CONFIGURED"
- تأكد إنك حطيت `GIST_ID` و `GH_TOKEN` في Environment Variables
- تأكد إنك عملت **Redeploy** بعد إضافة المتغيرات

### "INVALID_PIN"
- الـ PIN اللي كتبته مش زي اللي في Vercel
- روح Environment Variables وشوف الـ `DASHBOARD_PIN`

### "GitHub update failed (403)"
- الـ Token انتهت صلاحيته
- اعمل Token جديد وحدّث `GH_TOKEN` في Vercel

### "GitHub fetch failed (404)"
- الـ Gist ID غلط
- روح الـ Gist وتأكد من الـ ID في الـ URL

### الداشبورد بيشتغل بس مش بيسيف في السحابة
- افتح Console (F12 في المتصفح) وشوف الرسائل
- لو شفت "وضع محلي"، يبقى Cloud مش متظبط - راجع الخطوات

---

## 📊 حدود GitHub Gist المجانية

- ✅ غير محدود (عمليًا)
- ✅ 5000 طلب/ساعة (كافي جدًا للاستخدام الشخصي)
- ✅ مش هيطلب منك بطاقة ائتمان أبدًا
- ✅ مفيش حدود حجم معقولة (Gist بيشيل لحد 100 ملف)

---

## 📁 بنية الملفات

```
dashboard/
├── index.html         ← كل الداشبورد (HTML + CSS + JS)
├── api/
│   ├── data.js        ← GitHub Gist backend
│   └── verify.js      ← PIN auth
├── vercel.json        ← إعدادات Vercel
├── package.json       ← dependencies (فاضي - مش محتاجين حاجة)
└── README.md          ← هذا الملف
```

---

Built with ❤️ for personal productivity · 100% Free Forever
