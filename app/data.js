// NusaStat data: published figures, each with its source and reference year.
// Values are rounded published figures. "approx" marks estimates rounded by us.
const NS = {};

NS.kpi = [
  { label: 'Penduduk', value: '281,6 jt', sub: 'pertengahan 2024', src: 'BPS, 2024', href: '#/population' },
  { label: 'PDB nominal', value: 'Rp 22.139 T', sub: '2024 · +5,03% riil', src: 'BPS, 2024', href: '#/economy' },
  { label: 'PDB per kapita', value: 'US$ 4.926', sub: '2024', src: 'World Bank, 2024', href: '#/economy' },
  { label: 'Inflasi (IHK)', value: '1,57%', sub: 'rata-rata tahunan 2024', src: 'BPS, 2024', href: '#/prices' },
  { label: 'Pengangguran terbuka', value: '4,91%', sub: 'Agustus 2024', src: 'BPS, 2024', href: '#/labour' },
  { label: 'Kemiskinan', value: '8,57%', sub: 'September 2024', src: 'BPS, 2024', href: '#/labour' },
  { label: 'IPM', value: '75,02', sub: '2024', src: 'BPS, 2024', href: '#/about' },
  { label: 'Harapan hidup', value: '73,5 thn', sub: '2024 (approx.)', src: 'BPS, 2024', href: '#/population' },
];

NS.gdpGrowth = [
  { year: 2019, v: 5.02 }, { year: 2020, v: -2.07 }, { year: 2021, v: 3.70 },
  { year: 2022, v: 5.31 }, { year: 2023, v: 5.05 }, { year: 2024, v: 5.03 },
];

NS.cpiInflation = [
  { year: 2019, v: 2.72 }, { year: 2020, v: 1.68 }, { year: 2021, v: 1.87 },
  { year: 2022, v: 5.51 }, { year: 2023, v: 2.61 }, { year: 2024, v: 1.57 },
];

NS.unemployment = [
  { year: 2019, v: 5.28 }, { year: 2020, v: 7.07 }, { year: 2021, v: 6.49 },
  { year: 2022, v: 5.86 }, { year: 2023, v: 5.32 }, { year: 2024, v: 4.91 },
];

NS.populationSeries = [
  { year: 2010, v: 237.6, note: 'Sensus' }, { year: 2020, v: 270.2, note: 'Sensus' },
  { year: 2021, v: 272.2, note: 'Estimasi' }, { year: 2022, v: 275.8, note: 'Estimasi' },
  { year: 2023, v: 278.7, note: 'Estimasi' }, { year: 2024, v: 281.6, note: 'Estimasi' },
];

// Share of GDP by sector, 2024, percent (approx., rounded; sums to 100).
NS.sectors = [
  { name: 'Industri pengolahan', v: 18.7 },
  { name: 'Perdagangan', v: 12.9 },
  { name: 'Pertanian, kehutanan & perikanan', v: 12.5 },
  { name: 'Konstruksi', v: 9.8 },
  { name: 'Pertambangan & penggalian', v: 9.0 },
  { name: 'Informasi & komunikasi', v: 6.4 },
  { name: 'Transportasi & pergudangan', v: 6.3 },
  { name: 'Administrasi pemerintahan', v: 6.3 },
  { name: 'Jasa keuangan & asuransi', v: 4.2 },
  { name: 'Real estat', v: 2.4 },
  { name: 'Jasa lainnya', v: 11.5 },
];

NS.trade = [
  { label: 'Ekspor', value: 'US$ 264,7 M', sub: '2024', src: 'BPS, 2024' },
  { label: 'Impor', value: 'US$ 233,7 M', sub: '2024', src: 'BPS, 2024' },
  { label: 'Surplus perdagangan', value: 'US$ 31,0 M', sub: '2024', src: 'BPS, 2024' },
  { label: 'Ekspor nonmigas', value: 'US$ 249,4 M', sub: '2024 (approx.)', src: 'BPS, 2024' },
];

// Age structure 2024, percent of population, approx. (BPS-based, rounded).
NS.agePyramid = [
  { group: '0–4', m: 3.9, f: 3.7 }, { group: '5–9', m: 4.1, f: 3.9 },
  { group: '10–14', m: 4.2, f: 4.0 }, { group: '15–19', m: 4.1, f: 3.9 },
  { group: '20–24', m: 4.0, f: 3.8 }, { group: '25–29', m: 3.9, f: 3.7 },
  { group: '30–34', m: 3.8, f: 3.6 }, { group: '35–39', m: 3.7, f: 3.5 },
  { group: '40–44', m: 3.5, f: 3.4 }, { group: '45–49', m: 3.3, f: 3.2 },
  { group: '50–54', m: 2.9, f: 2.8 }, { group: '55–59', m: 2.4, f: 2.4 },
  { group: '60–64', m: 1.9, f: 1.9 }, { group: '65–69', m: 1.4, f: 1.5 },
  { group: '70–74', m: 0.9, f: 1.0 }, { group: '75+', m: 0.8, f: 1.1 },
];

NS.ageGroups = [
  { label: '0–14 tahun (anak)', v: 24.5 },
  { label: '15–64 tahun (produktif)', v: 68.9 },
  { label: '65+ tahun (lansia)', v: 6.6 },
];

NS.labour = [
  { label: 'Angkatan kerja', value: '152,1 jt orang', sub: 'Agustus 2024', src: 'BPS, 2024' },
  { label: 'Bekerja', value: '144,6 jt orang', sub: 'Agustus 2024', src: 'BPS, 2024' },
  { label: 'Pengangguran', value: '7,5 jt orang', sub: 'Agustus 2024', src: 'BPS, 2024' },
  { label: 'Upah rata-rata per bulan', value: 'Rp 3,29 jt', sub: 'Agustus 2024', src: 'BPS, 2024' },
  { label: 'Pekerja informal', value: '59,2%', sub: 'Agustus 2024 (approx.)', src: 'BPS, 2024' },
  { label: 'TPT perkotaan', value: '5,79%', sub: 'Agustus 2024', src: 'BPS, 2024' },
];

// Provinces, 2024 population in millions (approx., BPS-based estimates, rounded).
// Share is of the national 281.6 million.
NS.provinces = [
  { name: 'Jawa Barat', pop: 49.9 }, { name: 'Jawa Timur', pop: 41.8 },
  { name: 'Jawa Tengah', pop: 37.9 }, { name: 'Sumatera Utara', pop: 16.1 },
  { name: 'Banten', pop: 12.4 }, { name: 'DKI Jakarta', pop: 10.6 },
  { name: 'Sulawesi Selatan', pop: 9.5 }, { name: 'Lampung', pop: 9.4 },
  { name: 'Sumatera Selatan', pop: 8.9 }, { name: 'Riau', pop: 7.0 },
  { name: 'Sumatera Barat', pop: 6.0 }, { name: 'Kalimantan Barat', pop: 5.9 },
  { name: 'Nusa Tenggara Barat', pop: 5.7 }, { name: 'Nusa Tenggara Timur', pop: 5.7 },
  { name: 'Aceh', pop: 5.6 }, { name: 'Kalimantan Selatan', pop: 4.4 },
  { name: 'Bali', pop: 4.4 }, { name: 'Kalimantan Timur', pop: 4.0 },
  { name: 'DI Yogyakarta', pop: 3.8 }, { name: 'Jambi', pop: 3.7 },
  { name: 'Sulawesi Tengah', pop: 3.1 }, { name: 'Sulawesi Tenggara', pop: 2.8 },
  { name: 'Kalimantan Tengah', pop: 2.8 }, { name: 'Sulawesi Utara', pop: 2.7 },
  { name: 'Riau Islands', pop: 2.2 }, { name: 'Bengkulu', pop: 2.1 },
  { name: 'Maluku', pop: 2.0 }, { name: 'Sulawesi Barat', pop: 1.6 },
  { name: 'Papua Pegunungan', pop: 1.5 }, { name: 'Bangka Belitung', pop: 1.5 },
  { name: 'Maluku Utara', pop: 1.4 }, { name: 'Papua Tengah', pop: 1.4 },
  { name: 'Gorontalo', pop: 1.2 }, { name: 'Papua', pop: 1.1 },
  { name: 'Kalimantan Utara', pop: 0.7 }, { name: 'Papua Barat', pop: 0.6 },
  { name: 'Papua Barat Daya', pop: 0.6 }, { name: 'Papua Selatan', pop: 0.5 },
];

NS.releases = [
  { date: 'Nov 2025', title: 'Pertumbuhan Ekonomi Triwulan III-2025', detail: 'PDB tumbuh 5,04% (y-on-y).', href: '#/economy' },
  { date: 'Jan 2025', title: 'Inflasi 2024', detail: 'Inflasi tahunan 2024 tercatat 1,57%, terendah dalam beberapa tahun terakhir.', href: '#/prices' },
  { date: 'Agu 2025', title: 'Keadaan Ketenagakerjaan Februari 2025', detail: 'Tingkat pengangguran terbuka 4,76%.', href: '#/labour' },
  { date: 'Jul 2025', title: 'Kemiskinan Maret 2025', detail: 'Penduduk miskin 8,47% dari total penduduk.', href: '#/labour' },
  { date: 'Feb 2025', title: 'Pertumbuhan Ekonomi 2024', detail: 'PDB 2024 tumbuh 5,03%; PDB per kapita US$ 4.926.', href: '#/economy' },
  { date: 'Des 2024', title: 'Hasil Sensus Penduduk 2020 — lanjutan', detail: 'Penduduk 270,2 juta jiwa (Sensus 2020).', href: '#/population' },
];

NS.indicatorRows = [
  { ind: 'Jumlah penduduk', val: '281,6 juta jiwa', year: '2024', src: 'BPS' },
  { ind: 'Laju pertumbuhan penduduk', val: '0,82% per tahun', year: '2024', src: 'BPS' },
  { ind: 'Kepadatan penduduk', val: '147 jiwa/km²', year: '2024 (approx.)', src: 'BPS' },
  { ind: 'PDB nominal', val: 'Rp 22.139 triliun', year: '2024', src: 'BPS' },
  { ind: 'Pertumbuhan PDB riil', val: '5,03%', year: '2024', src: 'BPS' },
  { ind: 'PDB per kapita', val: 'US$ 4.926', year: '2024', src: 'World Bank' },
  { ind: 'Inflasi IHK (rata-rata tahunan)', val: '1,57%', year: '2024', src: 'BPS' },
  { ind: 'Tingkat pengangguran terbuka', val: '4,91%', year: 'Agu 2024', src: 'BPS' },
  { ind: 'Tingkat kemiskinan', val: '8,57%', year: 'Sep 2024', src: 'BPS' },
  { ind: 'Indeks Pembangunan Manusia', val: '75,02', year: '2024', src: 'BPS' },
  { ind: 'Angka harapan hidup', val: '73,5 tahun', year: '2024 (approx.)', src: 'BPS' },
  { ind: 'Upah rata-rata per bulan', val: 'Rp 3,29 juta', year: 'Agu 2024', src: 'BPS' },
  { ind: 'Ekspor', val: 'US$ 264,7 miliar', year: '2024', src: 'BPS' },
  { ind: 'Impor', val: 'US$ 233,7 miliar', year: '2024', src: 'BPS' },
  { ind: 'Surplus neraca perdagangan', val: 'US$ 31,0 miliar', year: '2024', src: 'BPS' },
  { ind: 'Luas wilayah', val: '1,9 juta km²', year: '—', src: 'BPS' },
  { ind: 'Jumlah provinsi', val: '38', year: '2024', src: 'Kemendagri' },
  { ind: 'Jumlah kabupaten/kota', val: '514', year: '2024', src: 'Kemendagri' },
];

NS.fmtPop = function (m) { return m.toFixed(1).replace('.', ',') + ' jt'; };
NS.share = function (m) { return (m / 281.6 * 100).toFixed(1).replace('.', ',') + '%'; };
NS.num = function (v) { return String(v).replace('.', ','); };
