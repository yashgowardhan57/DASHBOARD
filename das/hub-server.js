'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const { spawn } = require('node:child_process');

const ROOT = __dirname;
const PORT = Number(process.env.HUB_PORT || 3000);
const MIME = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.jsx':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg',
  '.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon',
  '.sql':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8',
  '.woff':'font/woff','.woff2':'font/woff2'
};

const targets = [
  { port: 3001, path: '/api/health', name: 'Authentication' },
  { port: 3002, path: '/api/health', name: 'News portal' },
  { port: 3003, path: '/api/health', name: 'Student profiles' }
];

const subServices = [
  { name: 'Authentication (P4)', dir: 'practical-4-authentication', script: 'server.js', port: 3001, path: '/api/health' },
  { name: 'News portal (P5)', dir: 'practical-5-news-portal', script: 'server.js', port: 3002, path: '/api/health' },
  { name: 'Student profiles (P6)', dir: 'practical-6-student-profile', script: 'server.js', port: 3003, path: '/api/health' }
];

const managedChildren = new Map();

function probe(port, route) {
  return new Promise(resolve => {
    const req = http.request({ hostname: '127.0.0.1', port, path: route, method: 'GET', timeout: 1200 }, res => {
      res.resume();
      resolve({ online: res.statusCode >= 200 && res.statusCode < 500, statusCode: res.statusCode });
    });
    req.on('timeout', () => { req.destroy(); resolve({ online: false, statusCode: null }); });
    req.on('error', () => resolve({ online: false, statusCode: null }));
    req.end();
  });
}

async function startSubService(svc) {
  const current = await probe(svc.port, svc.path);
  if (current.online) {
    return { name: svc.name, port: svc.port, status: 'already-running' };
  }
  const existingChild = managedChildren.get(svc.port);
  if (existingChild && !existingChild.killed) {
    return { name: svc.name, port: svc.port, status: 'spawning' };
  }

  const cwd = path.join(ROOT, svc.dir);
  try {
    const child = spawn(process.execPath, [svc.script], {
      cwd,
      env: { ...process.env, PORT: String(svc.port) },
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false
    });

    managedChildren.set(svc.port, child);

    child.stdout.on('data', data => {
      const msg = data.toString().trim();
      if (msg) console.log(`[${svc.name}] ${msg}`);
    });

    child.stderr.on('data', data => {
      const msg = data.toString().trim();
      if (msg && !msg.includes('DeprecationWarning')) console.error(`[${svc.name} Error] ${msg}`);
    });

    child.on('exit', (code, signal) => {
      managedChildren.delete(svc.port);
      console.log(`[${svc.name}] stopped (code: ${code}, signal: ${signal})`);
    });

    return { name: svc.name, port: svc.port, status: 'started' };
  } catch (err) {
    console.error(`[Auto-Start Error] ${svc.name}:`, err.message);
    return { name: svc.name, port: svc.port, status: 'error', error: err.message };
  }
}

async function startAllSubServices() {
  const results = [];
  for (const svc of subServices) {
    const res = await startSubService(svc);
    results.push(res);
  }
  return results;
}

function cleanupChildren() {
  for (const [port, child] of managedChildren.entries()) {
    try {
      if (child && !child.killed) {
        child.kill();
      }
    } catch {}
  }
  managedChildren.clear();
}

function send(res, code, contentType, body) {
  res.writeHead(code, { 'Content-Type': contentType, 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'no-referrer', 'Cache-Control':'no-store' });
  res.end(body);
}

function safeFilePath(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch { return null; }
  if (decoded.includes('\0') || decoded.split(/[\\/]/).some(segment => segment === '.env' || segment === 'node_modules' || segment === '.git')) return null;
  const resolved = path.resolve(ROOT, '.' + decoded);
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) return null;
  return resolved;
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'POST') return send(res, 405, 'text/plain; charset=utf-8', 'Method not allowed');

  if (reqUrl.pathname === '/api/status') {
    const results = await Promise.all(targets.map(async target => [String(target.port), { ...await probe(target.port, target.path), name: target.name, port: target.port }]));
    return send(res, 200, MIME['.json'], JSON.stringify({ ok: true, checkedAt: new Date().toISOString(), servers: Object.fromEntries(results) }));
  }

  if (reqUrl.pathname === '/api/start-services') {
    const results = await startAllSubServices();
    return send(res, 200, MIME['.json'], JSON.stringify({ ok: true, results }));
  }

  if (reqUrl.pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }

  let filePath = safeFilePath(reqUrl.pathname === '/' ? '/index.html' : reqUrl.pathname);
  if (!filePath) return send(res, 403, 'text/plain; charset=utf-8', 'Forbidden');
  try {
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    const file = await fs.promises.readFile(filePath);
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'no-referrer', 'Cache-Control': type.startsWith('text/html') ? 'no-cache' : 'public, max-age=300' });
    if (req.method === 'HEAD') return res.end();
    return res.end(file);
  } catch (err) {
    if (err && err.code === 'ENOENT') return send(res, 404, 'text/plain; charset=utf-8', 'Not found');
    return send(res, 500, 'text/plain; charset=utf-8', 'Unable to read this file');
  }
});

server.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n======================================================`);
  console.log(`  PracticalOS Dashboard is running at http://localhost:${PORT}`);
  console.log(`======================================================`);
  console.log(`  Auto-launching backend practical servers (ports 3001–3003)...`);
  await startAllSubServices();
  console.log(`  All services initialized. Open http://localhost:${PORT} in your browser.\n`);
});

process.on('SIGINT', () => { cleanupChildren(); server.close(() => process.exit(0)); });
process.on('SIGTERM', () => { cleanupChildren(); server.close(() => process.exit(0)); });
process.on('exit', cleanupChildren);
