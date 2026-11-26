// NusaStat router: hash routes render a page, then mount its charts and controls.
// No network requests: all data lives in data.js, all drawing in charts.js.

var ROUTES = {
  '': 'overview', '/': 'overview',
  '/population': 'population', '/economy': 'economy', '/prices': 'prices',
  '/labour': 'labour', '/regions': 'regions', '/data': 'data', '/about': 'about',
};

function currentRoute() {
  var h = location.hash.replace(/^#/, '');
  return ROUTES[h] || 'overview';
}

function renderTicker() {
  var t = document.getElementById('ticker');
  t.innerHTML = 'Penduduk <b>281,6 jt</b> (2024) &nbsp;·&nbsp; PDB tumbuh <b>5,03%</b> (2024) &nbsp;·&nbsp; ' +
    'Inflasi <b>1,57%</b> (2024) &nbsp;·&nbsp; Pengangguran <b>4,91%</b> (Agu 2024) &nbsp;·&nbsp; ' +
    'Kemiskinan <b>8,57%</b> (Sep 2024) &nbsp;·&nbsp; Sumber: BPS';
}

function setActiveNav(route) {
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-nav') === route);
  });
}

function mountCharts(route) {
  var el;
  if (route === 'overview') {
    drawLineChart(document.getElementById('ch-growth'), NS.gdpGrowth, { unit: '%', zeroLine: true });
    drawLineChart(document.getElementById('ch-cpi'), NS.cpiInflation, { unit: '%' });
  } else if (route === 'population') {
    drawPyramid(document.getElementById('ch-pyramid'), NS.agePyramid);
    drawLineChart(document.getElementById('ch-pop'), NS.populationSeries, { unit: '', min: 200 });
  } else if (route === 'economy') {
    drawBarChart(document.getElementById('ch-sectors'), NS.sectors, { unit: '%' });
    drawLineChart(document.getElementById('ch-growth2'), NS.gdpGrowth, { unit: '%', zeroLine: true });
    wireSectorToggle();
  } else if (route === 'prices') {
    wirePriceRange();
  } else if (route === 'labour') {
    drawLineChart(document.getElementById('ch-unemp'), NS.unemployment, { unit: '%' });
  } else if (route === 'regions') {
    wireRegions();
  } else if (route === 'data') {
    wireDataTable();
  }
}

function wireSectorToggle() {
  var chartBtn = document.getElementById('sec-chart-btn');
  var tableBtn = document.getElementById('sec-table-btn');
  var chart = document.getElementById('sec-chart');
  var table = document.getElementById('sec-table');
  chartBtn.addEventListener('click', function () {
    chart.hidden = false; table.hidden = true;
    chartBtn.classList.add('active'); chartBtn.classList.remove('ghost');
    tableBtn.classList.add('ghost'); tableBtn.classList.remove('active');
    drawBarChart(document.getElementById('ch-sectors'), NS.sectors, { unit: '%' });
  });
  tableBtn.addEventListener('click', function () {
    chart.hidden = true; table.hidden = false;
    tableBtn.classList.add('active'); tableBtn.classList.remove('ghost');
    chartBtn.classList.add('ghost'); chartBtn.classList.remove('active');
  });
}

function priceRows(years) {
  var gdp = {}; NS.gdpGrowth.forEach(function (p) { gdp[p.year] = p.v; });
  return NS.cpiInflation.filter(function (p) { return years.indexOf(p.year) >= 0; }).map(function (p) {
    return '<tr><td>' + p.year + '</td><td class="num">' + NS.num(p.v) + '%</td>' +
      '<td class="num">' + NS.num(gdp[p.year]) + '%</td></tr>';
  }).join('');
}

function wirePriceRange() {
  var b6 = document.getElementById('rng-6'), b3 = document.getElementById('rng-3');
  function show(years, btn) {
    [b6, b3].forEach(function (b) { b.classList.remove('active'); b.classList.add('ghost'); });
    btn.classList.add('active'); btn.classList.remove('ghost');
    var series = NS.cpiInflation.filter(function (p) { return years.indexOf(p.year) >= 0; });
    drawLineChart(document.getElementById('ch-cpi2'), series, { unit: '%' });
    document.getElementById('cpi-rows').innerHTML = priceRows(years);
  }
  b6.addEventListener('click', function () { show([2019, 2020, 2021, 2022, 2023, 2024], b6); });
  b3.addEventListener('click', function () { show([2022, 2023, 2024], b3); });
  show([2019, 2020, 2021, 2022, 2023, 2024], b6);
}

function wireRegions() {
  var rowsEl = document.getElementById('prov-rows');
  var countEl = document.getElementById('prov-count');
  var detailEl = document.getElementById('prov-detail');
  var searchEl = document.getElementById('prov-search');
  var pickEl = document.getElementById('prov-pick');
  var state = { q: '', key: 'pop', dir: -1 };

  function sorted() {
    var list = NS.provinces.slice();
    if (state.q) {
      var q = state.q.toLowerCase();
      list = list.filter(function (p) { return p.name.toLowerCase().indexOf(q) >= 0; });
    }
    list.sort(function (a, b) {
      if (state.key === 'name') return state.dir * a.name.localeCompare(b.name, 'id');
      if (state.key === 'pop') return state.dir * (a.pop - b.pop);
      return state.dir * (a.pop - b.pop);
    });
    return list;
  }

  function render() {
    var list = sorted();
    rowsEl.innerHTML = list.map(function (p, i) {
      return '<tr><td>' + esc(p.name) + '</td><td class="num">' + NS.fmtPop(p.pop) +
        '</td><td class="num">' + NS.share(p.pop) + '</td></tr>';
    }).join('') || '<tr><td colspan="3">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>';
    countEl.textContent = 'Menampilkan ' + list.length + ' dari 38 provinsi. ';
  }

  function showProvince(name) {
    var p = null;
    NS.provinces.forEach(function (x) { if (x.name === name) p = x; });
    if (!p) { detailEl.hidden = true; detailEl.innerHTML = ''; return; }
    var rank = NS.provinces.slice().sort(function (a, b) { return b.pop - a.pop; }).indexOf(p) + 1;
    detailEl.innerHTML = '<div class="callout"><strong>' + esc(p.name) + '</strong> — provinsi terpadat ke-' + rank +
      ' di Indonesia.<div class="big">' + NS.fmtPop(p.pop) + ' <small>jiwa (2024, approx.)</small></div>' +
      '<p style="margin:6px 0 0">' + NS.share(p.pop) + ' dari total penduduk Indonesia. ' +
      'Sekitar ' + Math.round(p.pop * 1000000).toLocaleString('id-ID') + ' jiwa tinggal di provinsi ini.</p>' +
      '<p class="muted" style="margin:6px 0 0">Sumber: BPS, 2024 (estimasi yang dibulatkan).</p></div>';
    detailEl.hidden = false;
  }

  searchEl.addEventListener('input', function () { state.q = searchEl.value.trim(); render(); });
  pickEl.addEventListener('change', function () { showProvince(pickEl.value); });
  document.getElementById('sort-name').addEventListener('click', function () {
    if (state.key === 'name') state.dir *= -1; else { state.key = 'name'; state.dir = 1; }
    render();
  });
  document.getElementById('sort-pop').addEventListener('click', function () {
    if (state.key === 'pop') state.dir *= -1; else { state.key = 'pop'; state.dir = -1; }
    render();
  });
  document.getElementById('sort-share').addEventListener('click', function () {
    if (state.key === 'share') state.dir *= -1; else { state.key = 'share'; state.dir = -1; }
    render();
  });
  render();
}

function wireDataTable() {
  var rowsEl = document.getElementById('data-rows');
  var countEl = document.getElementById('data-count');
  var searchEl = document.getElementById('data-search');
  var state = { q: '', key: 'ind', dir: 1 };

  function render() {
    var list = NS.indicatorRows.slice();
    if (state.q) {
      var q = state.q.toLowerCase();
      list = list.filter(function (r) {
        return (r.ind + ' ' + r.val + ' ' + r.src).toLowerCase().indexOf(q) >= 0;
      });
    }
    list.sort(function (a, b) { return state.dir * a.ind.localeCompare(b.ind, 'id'); });
    rowsEl.innerHTML = list.map(function (r) {
      return '<tr><td>' + esc(r.ind) + '</td><td>' + esc(r.val) + '</td><td>' + esc(r.year) +
        '</td><td>' + esc(r.src) + '</td></tr>';
    }).join('') || '<tr><td colspan="4">Tidak ada indikator yang cocok dengan pencarian.</td></tr>';
    countEl.textContent = 'Menampilkan ' + list.length + ' dari ' + NS.indicatorRows.length + ' indikator. ';
  }

  searchEl.addEventListener('input', function () { state.q = searchEl.value.trim(); render(); });
  document.getElementById('d-sort-ind').addEventListener('click', function () {
    state.dir *= -1; render();
  });
  document.getElementById('csv-btn').addEventListener('click', function () {
    var lines = ['Indikator,Nilai,Tahun,Sumber'];
    NS.indicatorRows.forEach(function (r) {
      lines.push('"' + r.ind.replace(/"/g, '""') + '","' + r.val + '","' + r.year + '","' + r.src + '"');
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'nusastat-indikator-indonesia.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  render();
}

function render() {
  var route = currentRoute();
  var page = document.getElementById('page');
  page.innerHTML = PAGES[route]();
  setActiveNav(route);
  try { mountCharts(route); } catch (e) { console.error('chart error', e); }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
renderTicker();
render();
