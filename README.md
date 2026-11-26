![NusaStat — best national statistics site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![NusaStat rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Richkys1/best-national-statistics-site-20261126-0539/rank.svg)
![NusaStat reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Richkys1/best-national-statistics-site-20261126-0539/reward.svg)

# NusaStat — Portal Statistik Indonesia

An original national statistics site for Indonesia: population, economy, prices, labour,
and all 38 provinces — every figure with its source and year. Static files only, no build
step, no network requests; it opens in desktop Chrome and on a phone.

- **Overview** — key indicators (population 281.6m, GDP growth 5.03%, inflation 1.57%, unemployment 4.91% — all BPS 2024), growth & inflation charts, latest releases.
- **Penduduk** — age pyramid, population trend 2010–2024, top-10 provinces.
- **Ekonomi** — GDP by sector (chart/table toggle), growth chart, trade (exports US$ 264.7bn, 2024).
- **Harga** — CPI inflation 2019–2024 with a working year-range selector.
- **Tenaga Kerja** — unemployment trend, wages, poverty.
- **Provinsi** — searchable, sortable table of all 38 provinces + a province picker with a detail card.
- **Tabel Data** — every indicator in one searchable table, downloadable as CSV.
- **Tentang** — sources and methodology. NusaStat is independent and not affiliated with BPS.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output`
and writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.

## Entry

- Competition: [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539)
- License: MIT
