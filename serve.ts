// NusaStat dev server: serves app/ at http://localhost:8080 for local testing.
// Node 22, standard library only. Usage: node serve.ts [--port 8080]

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const root = join(here, 'app');
const port = Number(process.argv[process.argv.indexOf('--port') + 1] || 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  const file = resolve(join(root, normalize(path).replace(/^(\.\.[/\\])+/, '')));
  if (!file.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }
  const target = file === root ? join(root, 'index.html') : file;
  if (!existsSync(target) || !statSync(target).isFile()) {
    res.writeHead(404); res.end('not found'); return;
  }
  const ext = target.slice(target.lastIndexOf('.'));
  res.writeHead(200, { 'content-type': TYPES[ext] || 'application/octet-stream' });
  createReadStream(target).pipe(res);
});

server.listen(port, () => {
  console.log('NusaStat dev server: http://localhost:' + port + '/');
});
