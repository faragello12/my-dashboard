export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expected = process.env.DASHBOARD_PIN;
  if (!expected) {
    return res.status(500).json({ ok: false, error: 'PIN_NOT_SET' });
  }

  const { pin } = req.body || {};
  if (!pin || String(pin) !== String(expected)) {
    return res.status(401).json({ ok: false, error: 'INVALID_PIN' });
  }

  return res.status(200).json({ ok: true });
}
