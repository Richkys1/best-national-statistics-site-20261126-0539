// NusaStat chart helpers: small hand-written canvas charts, no libraries.
// Every chart draws from the data passed in, with labelled axes and values.

function chartSetup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const h = height || 260;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function chartFont(ctx, size, weight) {
  ctx.font = (weight || 600) + ' ' + size + 'px system-ui, -apple-system, "Segoe UI", sans-serif';
}

function drawLineChart(canvas, series, opts) {
  const o = opts || {};
  const s = chartSetup(canvas, o.height || 260);
  const ctx = s.ctx, padL = 46, padR = 14, padT = 14, padB = 30;
  const iw = s.w - padL - padR, ih = s.h - padT - padB;
  const vals = series.map(function (p) { return p.v; });
  let lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
  if (o.min !== undefined) lo = Math.min(lo, o.min);
  if (o.max !== undefined) hi = Math.max(hi, o.max);
  if (hi === lo) hi = lo + 1;
  const span = hi - lo, pad = span * 0.12;
  lo -= pad; hi += pad;
  const x = function (i) { return padL + (series.length === 1 ? iw / 2 : iw * i / (series.length - 1)); };
  const y = function (v) { return padT + ih - (v - lo) / (hi - lo) * ih; };

  ctx.strokeStyle = '#d7dee8'; ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b'; chartFont(ctx, 11, 400);
  for (let g = 0; g <= 4; g++) {
    const gv = lo + (hi - lo) * g / 4, gy = y(gv);
    ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(s.w - padR, gy); ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(String(gv.toFixed(1)).replace('.', ',') + (o.unit || ''), padL - 6, gy + 4);
  }
  // Area fill.
  const grad = ctx.createLinearGradient(0, padT, 0, s.h - padB);
  grad.addColorStop(0, 'rgba(13, 92, 138, 0.22)');
  grad.addColorStop(1, 'rgba(13, 92, 138, 0.02)');
  ctx.beginPath();
  series.forEach(function (p, i) { i === 0 ? ctx.moveTo(x(i), y(p.v)) : ctx.lineTo(x(i), y(p.v)); });
  ctx.lineTo(x(series.length - 1), s.h - padB); ctx.lineTo(x(0), s.h - padB); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  // Line + points + labels.
  ctx.beginPath();
  series.forEach(function (p, i) { i === 0 ? ctx.moveTo(x(i), y(p.v)) : ctx.lineTo(x(i), y(p.v)); });
  ctx.strokeStyle = '#0d5c8a'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.textAlign = 'center';
  series.forEach(function (p, i) {
    ctx.beginPath(); ctx.arc(x(i), y(p.v), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.strokeStyle = '#0d5c8a'; ctx.lineWidth = 2; ctx.stroke();
    chartFont(ctx, 11, 700); ctx.fillStyle = '#0f2a3d';
    ctx.fillText(String(p.v).replace('.', ',') + (o.unit || ''), x(i), y(p.v) - 10);
    chartFont(ctx, 11, 400); ctx.fillStyle = '#64748b';
    ctx.fillText(String(p.year), x(i), s.h - 10);
  });
  if (o.zeroLine && lo < 0 && hi > 0) {
    ctx.beginPath(); ctx.moveTo(padL, y(0)); ctx.lineTo(s.w - padR, y(0));
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
  }
}

function drawBarChart(canvas, rows, opts) {
  const o = opts || {};
  const rowH = o.rowH || 30;
  const s = chartSetup(canvas, rows.length * rowH + 34);
  const ctx = s.ctx, padL = o.labelW || 210, padR = 52, padT = 8, padB = 8;
  const iw = s.w - padL - padR;
  const max = Math.max.apply(null, rows.map(function (r) { return r.v; }));
  ctx.textAlign = 'left';
  rows.forEach(function (r, i) {
    const y = padT + i * rowH;
    const bw = Math.max(2, iw * r.v / max);
    chartFont(ctx, 12, 400); ctx.fillStyle = '#1e293b';
    ctx.fillText(r.name, 0, y + 15);
    ctx.fillStyle = i % 2 ? '#0d5c8a' : '#128a6e';
    ctx.fillRect(padL, y + 4, bw, 16);
    chartFont(ctx, 12, 700); ctx.fillStyle = '#0f2a3d';
    ctx.fillText(String(r.v).replace('.', ',') + (o.unit || '%'), padL + bw + 8, y + 17);
  });
}

function drawPyramid(canvas, rows) {
  const rowH = 24;
  const s = chartSetup(canvas, rows.length * rowH + 46);
  const ctx = s.ctx, mid = s.w / 2, padT = 26, padB = 20;
  const max = Math.max.apply(null, rows.map(function (r) { return Math.max(r.m, r.f); }));
  const half = mid - 52;
  chartFont(ctx, 12, 700); ctx.textAlign = 'center';
  ctx.fillStyle = '#0d5c8a'; ctx.fillText('Laki-laki', mid - half / 2, 14);
  ctx.fillStyle = '#b3541e'; ctx.fillText('Perempuan', mid + half / 2, 14);
  rows.forEach(function (r, i) {
    const y = padT + i * rowH;
    const mw = half * r.m / max, fw = half * r.f / max;
    ctx.fillStyle = '#0d5c8a'; ctx.fillRect(mid - mw, y + 3, mw, 15);
    ctx.fillStyle = '#b3541e'; ctx.fillRect(mid, y + 3, fw, 15);
    chartFont(ctx, 11, 400); ctx.fillStyle = '#475569'; ctx.textAlign = 'center';
    ctx.fillText(r.group, mid, y + 15);
    ctx.textAlign = 'right'; ctx.fillStyle = '#0f2a3d';
    ctx.fillText(String(r.m).replace('.', ','), mid - mw - 5, y + 15);
    ctx.textAlign = 'left';
    ctx.fillText(String(r.f).replace('.', ','), mid + fw + 5, y + 15);
  });
  chartFont(ctx, 11, 400); ctx.fillStyle = '#64748b'; ctx.textAlign = 'center';
  ctx.fillText('% dari total penduduk · laki-laki ke kiri, perempuan ke kanan', mid, s.h - 6);
}

function drawDonut(canvas, parts) {
  const s = chartSetup(canvas, 220);
  const ctx = s.ctx, cx = 110, cy = 110, r = 82, ir = 52;
  const colors = ['#0d5c8a', '#128a6e', '#b3541e'];
  let a = -Math.PI / 2;
  parts.forEach(function (p, i) {
    const sweep = p.v / 100 * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep); ctx.closePath();
    ctx.fillStyle = colors[i % colors.length]; ctx.fill();
    a += sweep;
  });
  ctx.beginPath(); ctx.arc(cx, cy, ir, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
  chartFont(ctx, 13, 700); ctx.fillStyle = '#0f2a3d'; ctx.textAlign = 'center';
  ctx.fillText('100%', cx, cy + 5);
}
