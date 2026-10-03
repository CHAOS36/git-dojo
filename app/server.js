// Petit serveur web de la mini-boutique (l'application qu'on teste).
// Il fait deux choses :
//   1. il envoie au navigateur les pages du dossier public/ ;
//   2. il répond à une petite API : POST /api/login et GET /api/products.
// Lancement à la main : npm run app  ->  http://localhost:3000
// (pendant les tests, c'est Playwright qui le lance tout seul, voir playwright.config.ts)

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const users = require('./data/users.json');
const products = require('./data/products.json');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': CONTENT_TYPES['.json'] });
  res.end(JSON.stringify(body));
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // API : liste des produits (avec un petit délai, comme un vrai serveur sur Internet)
  if (url.pathname === '/api/products' && req.method === 'GET') {
    setTimeout(() => sendJson(res, 200, products), 400);
    return;
  }

  // API : connexion
  if (url.pathname === '/api/login' && req.method === 'POST') {
    const { username, password } = await readJsonBody(req);
    if (!username) return sendJson(res, 400, { error: 'Username is required' });
    if (!password) return sendJson(res, 400, { error: 'Password is required' });
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return sendJson(res, 401, { error: 'Invalid username or password' });
    if (user.locked) return sendJson(res, 403, { error: 'This user is locked out' });
    return sendJson(res, 200, { username: user.username, token: `token-${user.username}` });
  }

  // Sinon : un fichier du dossier public/ (la page de connexion pour "/")
  const filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': CONTENT_TYPES[path.extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => console.log(`Mini-boutique en ligne : http://localhost:${PORT}`));
