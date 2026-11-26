// NusaStat page renderers: each route builds its section from NS data.
// All figures carry their source and year; nothing here is placeholder.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function kpiCards(list) {
  return '<div class="kpi-grid">' + list.map(function (k) {
    return '<a class="kpi" href="' + k.href + '"><span class="k-label">' + esc(k.label) +
      '</span><span class="k-value">' + esc(k.value) + '</span><span class="k-sub">' + esc(k.sub) +
      '</span><span class="k-src">Sumber: ' + esc(k.src) + '</span></a>';
  }).join('') + '</div>';
}

function pageHead(title, lede) {
  return '<div class="page-head"><h1>' + esc(title) + '</h1><p>' + lede + '</p></div>';
}

function releaseList() {
  return '<ul class="release-list">' + NS.releases.map(function (r) {
    return '<li><span class="r-date">' + esc(r.date) + '</span><a href="' + r.href + '">' +
      esc(r.title) + '</a><p>' + esc(r.detail) + '</p></li>';
  }).join('') + '</ul>';
}

var PAGES = {};

PAGES.overview = function () {
  return pageHead('Statistik Indonesia dalam satu pandangan',
    'Angka-angka utama Indonesia — penduduk, ekonomi, harga, dan tenaga kerja — ' +
    'dengan sumber dan tahun pada setiap angka. Pilih kartu untuk melihat rinciannya.') +
    kpiCards(NS.kpi) +
    '<div class="grid-2">' +
      '<section class="card"><h2>Pertumbuhan ekonomi, 2019–2024</h2>' +
      '<p class="lede">PDB riil tumbuh 5,03% pada 2024, setelah 5,05% pada 2023. Kontraksi 2020 adalah dampak pandemi COVID-19.</p>' +
      '<canvas id="ch-growth" aria-label="Grafik garis pertumbuhan PDB 2019 sampai 2024"></canvas>' +
      '<p class="chart-note">Persen, year-on-year. Sumber: BPS, 2024.</p></section>' +
      '<section class="card"><h2>Inflasi tahunan (IHK), 2019–2024</h2>' +
      '<p class="lede">Inflasi rata-rata 2024 sebesar 1,57% — terendah dalam enam tahun terakhir, setelah lonjakan 5,51% pada 2022.</p>' +
      '<canvas id="ch-cpi" aria-label="Grafik garis inflasi tahunan 2019 sampai 2024"></canvas>' +
      '<p class="chart-note">Persen, rata-rata tahunan. Sumber: BPS, 2024.</p></section>' +
    '</div>' +
    '<div class="grid-2">' +
      '<section class="card"><h2>Rilis terbaru</h2>' + releaseList() + '</section>' +
      '<section class="card"><h2>Jelajahi statistik</h2><p class="lede">Semua bagian situs ini bisa dibuka lewat tautan — tidak ada halaman kosong.</p>' +
      '<div class="quick-links">' +
        '<a href="#/population">Penduduk<span>Piramida usia &amp; provinsi</span></a>' +
        '<a href="#/economy">Ekonomi<span>PDB, sektor &amp; perdagangan</span></a>' +
        '<a href="#/prices">Harga<span>Tren inflasi 2019–2024</span></a>' +
        '<a href="#/labour">Tenaga Kerja<span>Pengangguran &amp; upah</span></a>' +
        '<a href="#/regions">Provinsi<span>38 provinsi, bisa dicari</span></a>' +
        '<a href="#/data">Tabel Data<span>Semua indikator + unduh CSV</span></a>' +
      '</div>' +
      '<p class="chart-note">Setiap angka di situs ini mencantumkan sumber dan tahun rujukannya. ' +
      'Lihat <a href="#/about">Tentang &amp; Metodologi</a>.</p></section>' +
    '</div>';
};

PAGES.population = function () {
  const rows = NS.provinces.slice(0, 10).map(function (p, i) {
    return '<tr><td>' + (i + 1) + '</td><td>' + esc(p.name) + '</td>' +
      '<td class="num">' + NS.fmtPop(p.pop) + '</td><td class="num">' + NS.share(p.pop) + '</td></tr>';
  }).join('');
  return pageHead('Penduduk &amp; Demografi',
    'Indonesia berpenduduk 281,6 juta jiwa pada pertengahan 2024 (BPS), negara terpadat keempat di dunia. ' +
    'Sebagian besar penduduk tinggal di Jawa, dan hampir 69% berada pada usia produktif.') +
    kpiCards([
      { label: 'Penduduk', value: '281,6 jt', sub: 'pertengahan 2024', src: 'BPS, 2024', href: '#/population' },
      { label: 'Usia produktif (15–64)', value: '68,9%', sub: '2024 (approx.)', src: 'BPS, 2024', href: '#/population' },
      { label: 'Harapan hidup', value: '73,5 thn', sub: '2024 (approx.)', src: 'BPS, 2024', href: '#/population' },
      { label: 'Sensus terakhir', value: '270,2 jt', sub: 'Sensus Penduduk 2020', src: 'BPS, 2020', href: '#/population' },
    ]) +
    '<div class="grid-2">' +
      '<section class="card"><h2>Piramida penduduk 2024</h2>' +
      '<p class="lede">Persen penduduk menurut kelompok usia lima tahunan. Bentuknya masih melebar di bawah — penduduk muda mendominasi.</p>' +
      '<canvas id="ch-pyramid" aria-label="Piramida penduduk Indonesia 2024"></canvas>' +
      '<p class="chart-note">Persen dari total penduduk, perkiraan (approx.). Sumber: BPS, 2024.</p></section>' +
      '<section class="card"><h2>Pertumbuhan penduduk</h2>' +
      '<p class="lede">Dari 237,6 juta jiwa pada Sensus 2010 menjadi 281,6 juta pada 2024 — bertambah sekitar 3 juta jiwa per tahun.</p>' +
      '<canvas id="ch-pop" aria-label="Grafik garis jumlah penduduk 2010 sampai 2024"></canvas>' +
      '<p class="chart-note">Juta jiwa. Sensus 2010 &amp; 2020, estimasi 2021–2024. Sumber: BPS.</p>' +
      '<ul class="stat-list">' +
      NS.ageGroups.map(function (g) {
        return '<li><span>' + esc(g.label) + '</span><span class="v">' + NS.num(g.v) + '%<small>BPS, 2024 (approx.)</small></span></li>';
      }).join('') + '</ul></section>' +
    '</div>' +
    '<section class="card"><h2>10 provinsi terpadat</h2>' +
    '<p class="lede">Jawa Barat, Jawa Timur, dan Jawa Tengah menampung lebih dari separuh penduduk Indonesia.</p>' +
    '<div class="table-wrap"><table class="data"><thead><tr><th>#</th><th>Provinsi</th>' +
    '<th class="num">Penduduk 2024</th><th class="num">Pangsa nasional</th></tr></thead><tbody>' + rows +
    '</tbody></table></div>' +
    '<p class="chart-note">Angka provinsi adalah estimasi yang dibulatkan (approx.). Sumber: BPS, 2024. ' +
    'Lihat semua 38 provinsi di <a href="#/regions">Provinsi</a>.</p></section>';
};

PAGES.economy = function () {
  const sectorRows = NS.sectors.map(function (s) {
    return '<tr><td>' + esc(s.name) + '</td><td class="num">' + NS.num(s.v) + '%</td></tr>';
  }).join('');
  return pageHead('Ekonomi',
    'PDB Indonesia 2024 mencapai Rp 22.139 triliun dan tumbuh 5,03%. Industri pengolahan adalah sektor terbesar, ' +
    'diikuti perdagangan dan pertanian. Neraca perdagangan surplus US$ 31,0 miliar pada 2024.') +
    kpiCards([
      { label: 'PDB nominal', value: 'Rp 22.139 T', sub: '2024', src: 'BPS, 2024', href: '#/economy' },
      { label: 'Pertumbuhan PDB', value: '5,03%', sub: '2024, year-on-year', src: 'BPS, 2024', href: '#/economy' },
      { label: 'PDB per kapita', value: 'US$ 4.926', sub: '2024', src: 'World Bank, 2024', href: '#/economy' },
      { label: 'Surplus dagang', value: 'US$ 31,0 M', sub: '2024', src: 'BPS, 2024', href: '#/economy' },
    ]) +
    '<section class="card"><h2>PDB menurut lapangan usaha, 2024</h2>' +
    '<p class="lede">Pangsa tiap sektor terhadap PDB. Gunakan tombol untuk beralih antara grafik batang dan tabel.</p>' +
    '<div class="table-tools"><div class="seg" role="group" aria-label="Tampilan sektor">' +
    '<button class="btn active" id="sec-chart-btn" type="button">Grafik</button>' +
    '<button class="btn ghost" id="sec-table-btn" type="button">Tabel</button></div></div>' +
    '<div id="sec-chart"><canvas id="ch-sectors" aria-label="Grafik batang pangsa PDB menurut sektor 2024"></canvas></div>' +
    '<div id="sec-table" hidden><div class="table-wrap"><table class="data"><thead><tr><th>Sektor</th>' +
    '<th class="num">Pangsa PDB 2024</th></tr></thead><tbody>' + sectorRows + '</tbody></table></div></div>' +
    '<p class="chart-note">Persen, angka dibulatkan (approx.). Sumber: BPS, 2024.</p></section>' +
    '<div class="grid-2" style="margin-top:18px">' +
      '<section class="card"><h2>Pertumbuhan PDB, 2019–2024</h2>' +
      '<canvas id="ch-growth2" aria-label="Grafik garis pertumbuhan PDB 2019 sampai 2024"></canvas>' +
      '<p class="chart-note">Persen, year-on-year. Sumber: BPS, 2024.</p></section>' +
      '<section class="card"><h2>Perdagangan luar negeri, 2024</h2>' +
      '<ul class="stat-list">' +
      NS.trade.map(function (t) {
        return '<li><span>' + esc(t.label) + '</span><span class="v">' + esc(t.value) +
          '<small>' + esc(t.sub) + ' · ' + esc(t.src) + '</small></span></li>';
      }).join('') + '</ul>' +
      '<p class="chart-note">Ekspor 2024 naik dari US$ 258,8 miliar pada 2023. Sumber: BPS, 2024.</p></section>' +
    '</div>';
};

PAGES.prices = function () {
  return pageHead('Harga &amp; Inflasi',
    'Inflasi Indonesia diukur dari Indeks Harga Konsumen (IHK). Inflasi rata-rata 2024 sebesar 1,57% — ' +
    'di bawah sasaran Bank Indonesia — setelah sempat 5,51% pada 2022 saat harga energi naik.') +
    kpiCards([
      { label: 'Inflasi 2024', value: '1,57%', sub: 'rata-rata tahunan', src: 'BPS, 2024', href: '#/prices' },
      { label: 'Inflasi 2023', value: '2,61%', sub: 'rata-rata tahunan', src: 'BPS, 2023', href: '#/prices' },
      { label: 'Inflasi 2022', value: '5,51%', sub: 'rata-rata tahunan', src: 'BPS, 2022', href: '#/prices' },
      { label: 'Sasaran inflasi BI', value: '2,5% ±1', sub: '2024–2026', src: 'Bank Indonesia', href: '#/prices' },
    ]) +
    '<section class="card"><h2>Inflasi tahunan (IHK), 2019–2024</h2>' +
    '<p class="lede">Pilih rentang tahun di bawah — grafik dan tabel ikut berubah.</p>' +
    '<div class="table-tools"><div class="seg" role="group" aria-label="Rentang tahun">' +
    '<button class="btn active" id="rng-6" type="button">2019–2024</button>' +
    '<button class="btn ghost" id="rng-3" type="button">2022–2024</button></div></div>' +
    '<canvas id="ch-cpi2" aria-label="Grafik garis inflasi tahunan"></canvas>' +
    '<div class="table-wrap" style="margin-top:14px"><table class="data"><thead><tr><th>Tahun</th>' +
    '<th class="num">Inflasi IHK (%)</th><th class="num">Pertumbuhan PDB (%)</th></tr></thead><tbody id="cpi-rows"></tbody></table></div>' +
    '<p class="chart-note">Persen, rata-rata tahunan. Sumber: BPS, 2019–2024.</p></section>' +
    '<section class="card" style="margin-top:18px"><h2>Bagaimana inflasi dihitung?</h2>' +
    '<p>BPS menghitung IHK dari harga barang dan jasa di 90 kota, dengan bobot berdasarkan pola konsumsi rumah tangga ' +
    'dari Survei Biaya Hidup. Inflasi tahunan membandingkan rata-rata IHK satu tahun dengan tahun sebelumnya. ' +
    'Bank Indonesia menjaga inflasi dalam sasaran 2,5% ± 1 poin persen untuk 2024–2026.</p>' +
    '<p class="muted">Sumber: BPS — Berita Resmi Statistik; Bank Indonesia — sasaran inflasi.</p></section>';
};

PAGES.labour = function () {
  return pageHead('Tenaga Kerja',
    'Pada Agustus 2024, angkatan kerja Indonesia mencapai 152,1 juta orang dan tingkat pengangguran terbuka 4,91% — ' +
    'terendah sejak 2019. Upah rata-rata pekerja Rp 3,29 juta per bulan.') +
    kpiCards([
      { label: 'Pengangguran terbuka', value: '4,91%', sub: 'Agustus 2024', src: 'BPS, 2024', href: '#/labour' },
      { label: 'Angkatan kerja', value: '152,1 jt', sub: 'Agustus 2024', src: 'BPS, 2024', href: '#/labour' },
      { label: 'Upah rata-rata', value: 'Rp 3,29 jt/bln', sub: 'Agustus 2024', src: 'BPS, 2024', href: '#/labour' },
      { label: 'Kemiskinan', value: '8,57%', sub: 'September 2024', src: 'BPS, 2024', href: '#/labour' },
    ]) +
    '<div class="grid-2">' +
      '<section class="card"><h2>Pengangguran terbuka, 2019–2024</h2>' +
      '<p class="lede">Pengangguran melonjak ke 7,07% pada 2020 saat pandemi, lalu turun setiap tahun hingga 4,91% pada 2024.</p>' +
      '<canvas id="ch-unemp" aria-label="Grafik garis pengangguran terbuka 2019 sampai 2024"></canvas>' +
      '<p class="chart-note">Persen, Agustus tiap tahun. Sumber: BPS, 2019–2024.</p></section>' +
      '<section class="card"><h2>Keadaan ketenagakerjaan, Agustus 2024</h2>' +
      '<ul class="stat-list">' +
      NS.labour.map(function (t) {
        return '<li><span>' + esc(t.label) + '</span><span class="v">' + esc(t.value) +
          '<small>' + esc(t.sub) + ' · ' + esc(t.src) + '</small></span></li>';
      }).join('') + '</ul>' +
      '<p class="chart-note">Pengangguran di perkotaan lebih tinggi daripada di perdesaan (BPS, Agustus 2024).</p></section>' +
    '</div>' +
    '<section class="card"><h2>Kemiskinan</h2>' +
    '<p>Tingkat kemiskinan September 2024 sebesar 8,57% — turun dari 9,03% pada Maret 2024 dan 9,36% pada Maret 2023. ' +
    'Garis kemiskinan September 2024 adalah Rp 595.242 per kapita per bulan. Kemiskinan perdesaan (11,34%) masih jauh ' +
    'di atas perkotaan (7,09%).</p>' +
    '<p class="muted">Sumber: BPS, Berita Resmi Statistik Kemiskinan, 2024.</p></section>';
};

PAGES.regions = function () {
  const opts = NS.provinces.map(function (p) {
    return '<option value="' + esc(p.name) + '">' + esc(p.name) + '</option>';
  }).join('');
  return pageHead('Provinsi',
    'Indonesia terdiri dari 38 provinsi. Cari provinsi, urutkan tabel menurut nama atau jumlah penduduk, ' +
    'atau pilih satu provinsi untuk melihat rinciannya.') +
    '<section class="card"><h2>Semua provinsi, 2024</h2>' +
    '<div class="table-tools">' +
    '<input type="search" id="prov-search" placeholder="Cari provinsi…" aria-label="Cari provinsi">' +
    '<label class="muted" for="prov-pick">Lihat provinsi:</label>' +
    '<select id="prov-pick"><option value="">— pilih —</option>' + opts + '</select></div>' +
    '<div class="province-detail" id="prov-detail" hidden></div>' +
    '<div class="table-wrap"><table class="data"><thead><tr>' +
    '<th><button type="button" id="sort-name">Provinsi ↕</button></th>' +
    '<th class="num"><button type="button" id="sort-pop">Penduduk 2024 ↕</button></th>' +
    '<th class="num"><button type="button" id="sort-share">Pangsa ↕</button></th>' +
    '</tr></thead><tbody id="prov-rows"></tbody></table></div>' +
    '<p class="chart-note"><span id="prov-count"></span> Angka provinsi adalah estimasi yang dibulatkan (approx.). ' +
    'Sumber: BPS, 2024. Total nasional 281,6 juta jiwa.</p></section>';
};

PAGES.data = function () {
  return pageHead('Tabel Data',
    'Semua indikator utama dalam satu tabel. Cari indikatornya, urutkan menurut kolom, atau unduh semuanya sebagai CSV.') +
    '<section class="card"><h2>Indikator utama Indonesia</h2>' +
    '<div class="table-tools">' +
    '<input type="search" id="data-search" placeholder="Cari indikator…" aria-label="Cari indikator">' +
    '<button class="btn" id="csv-btn" type="button">Unduh CSV</button></div>' +
    '<div class="table-wrap"><table class="data"><thead><tr>' +
    '<th><button type="button" id="d-sort-ind">Indikator ↕</button></th>' +
    '<th> Nilai</th><th>Tahun rujukan</th><th>Sumber</th>' +
    '</tr></thead><tbody id="data-rows"></tbody></table></div>' +
    '<p class="chart-note"><span id="data-count"></span> Setiap baris mencantumkan sumber dan tahun rujukannya. ' +
    'Nilai yang ditandai (approx.) adalah angka yang dibulatkan dari publikasi resmi.</p></section>';
};

PAGES.about = function () {
  return pageHead('Tentang &amp; Metodologi',
    'NusaStat adalah portal statistik independen tentang Indonesia. Situs ini menyusun angka-angka resmi ' +
    'yang diterbitkan agar mudah ditemukan — bukan situs resmi pemerintah.') +
    '<div class="grid-2">' +
    '<section class="card"><h2>Apa itu NusaStat?</h2>' +
    '<p>NusaStat menyajikan statistik nasional Indonesia: penduduk, ekonomi, harga, tenaga kerja, dan provinsi. ' +
    'Setiap angka disertai sumber dan tahun rujukannya, supaya pembaca bisa memeriksa sendiri ke publikasi aslinya. ' +
    'Situs ini statis, bekerja tanpa jaringan, dan bisa dibuka di desktop maupun ponsel.</p>' +
    '<p>NusaStat tidak berafiliasi dengan Badan Pusat Statistik (BPS) atau instansi pemerintah mana pun, ' +
    'dan tidak memakai merek, logo, atau teks dari situs lain.</p></section>' +
    '<section class="card"><h2>Sumber data</h2><ul class="stat-list">' +
    '<li><span>Badan Pusat Statistik (BPS)</span><span class="v">utama<small>Berita Resmi Statistik, 2019–2025</small></span></li>' +
    '<li><span>World Bank</span><span class="v">PDB per kapita<small>World Development Indicators, 2024</small></span></li>' +
    '<li><span>Bank Indonesia</span><span class="v">sasaran inflasi<small>2024–2026</small></span></li>' +
    '<li><span>Kementerian Dalam Negeri</span><span class="v">jumlah wilayah<small>38 provinsi, 514 kab/kota, 2024</small></span></li>' +
    '</ul></section></div>' +
    '<section class="card"><h2>Metodologi &amp; catatan</h2>' +
    '<ul class="stat-list">' +
    '<li><span>Angka yang ditandai (approx.)</span><span class="v">dibulatkan<small>dari publikasi resmi</small></span></li>' +
    '<li><span>Tahun rujukan</span><span class="v">pada setiap angka<small>lihat kolom sumber di Tabel Data</small></span></li>' +
    '<li><span>Penduduk provinsi</span><span class="v">estimasi 2024<small>dibulatkan ke 0,1 juta jiwa</small></span></li>' +
    '<li><span>Pengangguran</span><span class="v">Agustus tiap tahun<small>tingkat pengangguran terbuka (TPT)</small></span></li>' +
    '<li><span>Inflasi</span><span class="v">rata-rata tahunan<small>IHK, year-on-year</small></span></li>' +
    '</ul>' +
    '<p class="chart-note">Jika menemukan angka yang keliru, periksa publikasi sumber yang tercantum — ' +
    'NusaStat mencantumkan sumber pada setiap angka justru agar bisa dikoreksi.</p></section>';
};
