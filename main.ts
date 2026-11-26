// NusaStat — the hand-in program for best-national-statistics-site-20261126-0539.
// Node 22, standard library only. It copies the site (app/) and its screenshots
// (screenshots/) from beside this file into /output and writes /output/dossier.json,
// the summary the judge reads, using the vendored make.fun library.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Start from a clean output directory so a stale file can never leak in.
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const appDir = join(here, 'app');
const shotsDir = join(here, 'screenshots');

cpSync(appDir, join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });
}

// The scorer's caps for this competition: at most 4 screenshots, each at most
// 256 KiB; at most 993 files and directories in app/, 16 MiB of app files in all;
// the dossier text is capped at 160 KiB. The library refuses anything past them,
// so a bad hand-in fails here instead of at the gate.
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});

writeFileSync(join(out, 'dossier.json'), dossier);
