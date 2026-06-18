// API endpoint for dashboard data using GitHub Gist as free backend.
// Auth: PIN in Authorization header (matches DASHBOARD_PIN env var).
// Storage: Single Gist file "dashboard.json" containing all data.

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1) PIN auth
  const expected = process.env.DASHBOARD_PIN;
  if (!expected) {
    return res.status(500).json({ error: 'PIN_NOT_SET' });
  }

  const auth = req.headers.authorization || '';
  const pin = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!pin || String(pin) !== String(expected)) {
    return res.status(401).json({ error: 'INVALID_PIN' });
  }

  // 2) Gist config
  const gistId = process.env.GIST_ID;
  const ghToken = process.env.GH_TOKEN;
  if (!gistId || !ghToken) {
    return res.status(500).json({ error: 'GIST_NOT_CONFIGURED', message: 'Set GIST_ID and GH_TOKEN env vars' });
  }

  const gistUrl = `https://api.github.com/gists/${gistId}`;
  const ghHeaders = {
    'Authorization': `Bearer ${ghToken}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'home-dashboard'
  };

  try {
    if (req.method === 'GET') {
      const r = await fetch(gistUrl, { headers: ghHeaders, cache: 'no-store' });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`GitHub fetch failed (${r.status}): ${txt.slice(0,200)}`);
      }
      const gist = await r.json();
      const file = gist.files && gist.files['dashboard.json'];
      const data = file && file.content ? safeParse(file.content) : null;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const payload = { ...body };
      delete payload.__pin;
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return res.status(400).json({ error: 'Invalid payload' });
      }
      payload._updatedAt = new Date().toISOString();

      const r = await fetch(gistUrl, {
        method: 'PATCH',
        headers: { ...ghHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: 'Home Dashboard data',
          files: {
            'dashboard.json': {
              content: JSON.stringify(payload, null, 2)
            }
          }
        })
      });

      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`GitHub update failed (${r.status}): ${txt.slice(0,200)}`);
      }

      return res.status(200).json({ success: true, _updatedAt: payload._updatedAt });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Gist error:', err);
    return res.status(500).json({ error: 'STORAGE_ERROR', details: String(err.message || err) });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}
