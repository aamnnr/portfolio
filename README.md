# Portofolio — Nur Amin

Situs portofolio statis bertema **engineering datasheet**: kertas teknis, penomoran
bab, dan tiap proyek dibaca sebagai spesifikasi singkat (masukan → proses → keluaran).
Dibangun dengan Astro + Tailwind CSS v4, dua bahasa (EN/ID) pada rute terpisah.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # keluaran statis di dist/
npm run preview  # cek hasil build
```

> Jika npm menahan skrip instalasi esbuild, jalankan `npm approve-scripts esbuild` sekali.

## Struktur

| Berkas | Isi |
| --- | --- |
| `src/data/content.ts` | Teks EN + ID untuk profil, kemampuan, pengalaman, kredensial, kontak, dan label antarmuka. |
| `src/data/projects.ts` | **Katalog proyek dan klasifikasinya**, termasuk seluruh isi halaman detail. |
| `src/data/services.ts` | **Layanan yang ditawarkan**, alur kerja, dan catatan soal harga. |
| `src/data/site.ts` | Nama, kontak, tautan sosial, nomor revisi dokumen. |
| `src/styles/global.css` | Token warna, tipografi, tema terang/gelap, pola kertas grid. |
| `src/layouts/Base.astro` | Kerangka `<head>`: meta, canonical, `hreflang`, OpenGraph, dan data terstruktur `Person`. |
| `src/components/` | Satu komponen per bagian; semuanya menerima prop `lang`. |
| `src/components/Page.astro` | Urutan bagian di beranda. Menyusun ulang halaman cukup dari sini. |
| `src/i18n/utils.ts` | Pembentuk alamat yang menghormati `base`, dan pemetaan rute proyek antarbahasa. |
| `src/scripts/reveal.ts` | Animasi masuk, penanda bagian aktif, tombol tema, penyaring kategori, menu mobile. |
| `public/` | Favicon dan `robots.txt`, disalin apa adanya ke `dist/`. |
| `src/pages/index.astro` | Beranda Inggris (`/`). |
| `src/pages/id/index.astro` | Beranda Indonesia (`/id/`). |
| `src/pages/projects/[slug].astro` | Halaman detail Inggris (`/projects/<slug>/`). |
| `src/pages/id/proyek/[slug].astro` | Halaman detail Indonesia (`/id/proyek/<slug>/`). |

## Menambah atau menyunting proyek

Semuanya terjadi di `src/data/projects.ts`. Satu entri menghasilkan sekaligus:
baris pada daftar di beranda, dua halaman detail (EN dan ID), entri sitemap, dan
data terstruktur `CreativeWork`.

```ts
{
  slug: 'nama-di-url',          // menentukan alamat kedua halaman detail
  codename: 'Nama internal',    // opsional, tampil sebagai label monospace
  categories: ['iot', 'web'],   // boleh lebih dari satu
  year: '2026',
  title:   { en: '…', id: '…' },
  summary: { en: '…', id: '…' }, // satu kalimat, tampil di daftar
  role:    { en: '…', id: '…' },
  spec:    [ { k: {en,id}, v: {en,id} } ],  // tepat tiga baris agar rapi
  stack:   ['ESP32', 'MQTT'],
  repo:    'https://github.com/…',          // opsional
  overview: { en: ['paragraf…'], id: ['paragraf…'] },
  features: { en: ['butir…'],    id: ['butir…'] },
  notes:    [ { k: {en,id}, v: {en,id} } ], // opsional: angka, topik MQTT, dsb.
}
```

Nomor dokumen (`P-01`, `P-02`, …) dihitung otomatis dari urutan larik — cukup
pindahkan entri untuk mengubah urutannya, tanpa menomori ulang apa pun.

> **Satu hal yang tidak ikut otomatis.** Angka "Sistem selesai" di blok ringkasan
> hero diturunkan dari `projects.length`, jadi ia selalu benar dengan sendirinya.
> Tetapi jumlah yang **dieja** di paragraf pembuka (`hero.sub` pada
> `src/data/content.ts`) ditulis tangan dalam dua bahasa — "Fourteen systems…" /
> "Empat belas sistem…". Setelah menambah proyek, perbarui dua kalimat itu.

### Kategori

Empat kategori terdaftar di bagian atas `projects.ts`: `iot`, `ml`, `web`, dan
`mobile`. Tombol saring di beranda hanya menampilkan kategori yang benar-benar
terpakai, dan jumlah di setiap tombol dihitung sendiri. Menambah kategori baru
cukup dengan menambahkan satu entri pada larik `categories`.

## Menyunting layanan

`src/data/services.ts` berisi empat layanan (`S-01` … `S-04`). Tiap entri punya
`scope` (yang dikerjakan), `deliverables` (yang diserahkan), `timeline`, `notFor`
(batas jujur — kapan sebaiknya klien mencari orang lain), dan `proof`: daftar slug
proyek yang membuktikan layanan itu pernah dikerjakan. Slug pada `proof` harus
cocok dengan slug di `projects.ts`; kalau tidak cocok, tautannya sekadar tidak
muncul dan tidak merusak build.

Harga sengaja tidak ditampilkan — lihat `servicesNote` di berkas yang sama untuk
kalimat yang menjelaskannya. Bila nanti ingin memasang angka, tambahkan field
`price` pada tipe `Service` dan satu baris di kepala kartu pada
`src/components/Services.astro`.

Langkah kerja (`workflow`) berlaku untuk semua layanan dan tampil sebagai strip
empat kolom di bawah daftar.

## Menyunting pendidikan & sertifikasi

Keduanya ada di `src/data/content.ts`:

```ts
export const education = { degree, institution, period, note };

export const certifications: { title: T; issuer: string }[] = [
  { title: { en: 'Junior Web Developer', id: 'Asisten Pengembang Web' }, issuer: 'BNSP' },
  …
];
```

`title` bertipe `T` (dwibahasa) karena nama skema sertifikasi bisa berbeda antara
kedua bahasa. Untuk sertifikat yang namanya sama di mana pun — nama produk seperti
*Data Engineering* — isi kedua sisi dengan teks yang sama; itu disengaja, supaya
tipenya tetap satu dan tidak ada percabangan di komponen. `issuer` tetap `string`
biasa: nama lembaga tidak diterjemahkan.

## Bilingual & SEO

Dua bahasa disajikan sebagai dua halaman HTML terpisah, bukan tombol yang menukar
teks lewat JavaScript. Konsekuensinya: kedua versi bisa diindeks penuh, masing-masing
punya `canonical` sendiri, dan saling menunjuk lewat `hreflang` (`en`, `id`,
`x-default`). Selain itu setiap halaman membawa meta OpenGraph, data terstruktur
`schema.org/Person`, `sitemap-index.xml`, dan `robots.txt`.

Tidak ada JavaScript yang dibutuhkan untuk membaca isi situs — skrip hanya menangani
tema, menu mobile, dan animasi masuk. Fon IBM Plex di-host sendiri, bukan dari CDN.

## Ganti domain

Domain diatur di `astro.config.mjs`:

```js
export const SITE = 'https://aamnnr.github.io';
export const BASE = '/portfolio';
```

Untuk domain sendiri (mis. `nuramin.web.id`), set `SITE` ke domain tersebut dan
`BASE` ke `'/'`. Perbarui juga baris `Sitemap:` pada `public/robots.txt`.

## Deploy

`.github/workflows/deploy.yml` sudah siap untuk GitHub Pages: dorong ke branch
`main`, lalu di **Settings → Pages** pilih *Source: GitHub Actions*. Karena `BASE`
bernilai `/portfolio`, repositorinya harus bernama `portfolio`.

Untuk Vercel, Netlify, atau Cloudflare Pages: perintah build `npm run build`,
direktori keluaran `dist`.
