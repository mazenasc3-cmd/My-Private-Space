/* /api/data — تخزين دائم لبيانات البروتوفوليو على Vercel (Upstash Redis REST).
   GET  /api/data                       -> 200 + JSON (نفس شكل DEFAULTS في app.js)
   POST /api/data  (JSON)               -> 200 {ok:1}
        يقبل إمّا الكائن مباشرةً (العقد القديم) أو {pass, data}.
        إن كان ADMIN_PASSWORD مضبوطًا على Vercel فيجب إرسال pass الصحيح.

   متغيّرات Vercel:
     KV_REST_API_URL / KV_REST_API_TOKEN   (أو UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
     ADMIN_PASSWORD                        (اختياري لكن مستحسن: يحمي الكتابة) */
const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'mps:data';

const kv = async (cmds) => {
  const r = await fetch(U + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + T, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error('storage ' + r.status);
  return (await r.json()).map((x) => x.result);
};

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (!U || !T) return res.status(500).json({ error: 'storage-not-connected' });

    if (req.method === 'GET') {
      const [raw] = await kv([['GET', KEY]]);
      if (!raw) return res.status(200).json({});
      try { return res.status(200).json(JSON.parse(raw)); }
      catch { return res.status(200).json({}); }
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const AP = process.env.ADMIN_PASSWORD;
    if (AP && b.pass !== AP) return res.status(401).json({ error: 'auth' });

    const data = b.data && typeof b.data === 'object' ? b.data : b;
    const s = JSON.stringify(data);
    if (s.length > 900000) return res.status(413).json({ error: 'too-large' });
    await kv([['SET', KEY, s]]);
    return res.status(200).json({ ok: 1 });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
