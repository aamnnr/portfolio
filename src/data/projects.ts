import type { Lang } from './site';

type T = Record<Lang, string>;
type TL = Record<Lang, string[]>;

/* ------------------------------------------------------------------ *
 * KLASIFIKASI
 * Satu proyek boleh masuk lebih dari satu kategori — kebanyakan
 * pekerjaan IoT memang melintasi perangkat, layanan, dan aplikasi.
 * ------------------------------------------------------------------ */
export type Category = 'iot' | 'ml' | 'web' | 'mobile';

export const categories: { key: Category; code: string; label: T; blurb: T }[] = [
  {
    key: 'iot',
    code: 'IOT',
    label: { en: 'IoT & Embedded', id: 'IoT & Sistem Tertanam' },
    blurb: {
      en: 'Firmware on ESP32, sensors, and the MQTT link that carries their readings out.',
      id: 'Firmware di ESP32, sensor, dan jalur MQTT yang membawa pembacaannya keluar.',
    },
  },
  {
    key: 'ml',
    code: 'ML',
    label: { en: 'Machine Learning & AI', id: 'Pembelajaran Mesin & AI' },
    blurb: {
      en: 'Classification, recognition, and rule-based reasoning applied to real records.',
      id: 'Klasifikasi, pengenalan, dan penalaran berbasis aturan pada data nyata.',
    },
  },
  {
    key: 'web',
    code: 'WEB',
    label: { en: 'Web Development', id: 'Pengembangan Web' },
    blurb: {
      en: 'Dashboards, admin consoles and public sites — Laravel, Next.js, Express.',
      id: 'Dasbor, konsol admin, dan situs publik — Laravel, Next.js, Express.',
    },
  },
  {
    key: 'mobile',
    code: 'APP',
    label: { en: 'Mobile Apps', id: 'Aplikasi Mobile' },
    blurb: {
      en: 'Flutter and native Kotlin apps that put control and records in someone’s hand.',
      id: 'Aplikasi Flutter dan Kotlin native yang menaruh kendali dan catatan di tangan pengguna.',
    },
  },
];

export const categoryLabel = (key: Category, lang: Lang): string =>
  categories.find((c) => c.key === key)!.label[lang];

/* ------------------------------------------------------------------ *
 * PROYEK
 * `summary` & `spec` tampil di daftar; sisanya di halaman detail.
 * ------------------------------------------------------------------ */
export type Project = {
  slug: string;
  categories: Category[];
  year: string;
  title: T;
  /** Nama internal/kode proyek, ditampilkan sebagai sub-judul monospace. */
  codename?: string;
  summary: T;
  role: T;
  spec: { k: T; v: T }[];
  stack: string[];
  repo?: string;
  /** Situs produksi yang bisa dikunjungi publik. */
  live?: string;
  /** Kode sumber milik klien dan tidak dibuka — ditampilkan sebagai keterangan, bukan tautan. */
  privateSource?: boolean;
  /** Paragraf pembuka pada halaman detail. */
  overview: TL;
  /** Daftar kemampuan yang benar-benar ada di dalam sistem. */
  features: TL;
  /** Catatan teknis: angka, topik, protokol — bagian yang biasanya hilang. */
  notes?: { k: T; v: T }[];
  /**
   * Tangkapan layar, foto perangkat, atau diagram. `src` relatif terhadap `public/`
   * (mis. `projects/ferticore/dashboard.png`); gambar pertama juga dipakai sebagai og:image.
   * Bila gambar memuat teks, `src` boleh berupa `{ en, id }` agar tiap bahasa mendapat versinya sendiri.
   */
  media?: { src: string | T; alt: T; caption?: T; width: number; height: number }[];
};

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'kembar-futagroup-site',
    codename: 'Kembar Futagroup Corporate Site',
    categories: ['web'],
    year: '2026',
    title: { en: 'Kembar Futagroup Group Site', id: 'Situs Grup Kembar Futagroup' },
    summary: {
      en: 'A headless corporate site for an eight-unit group: Laravel and Filament hold every word, Nuxt renders it server-side, and the careers page runs on Odoo’s recruitment API.',
      id: 'Situs korporat headless untuk grup dengan delapan unit bisnis: Laravel dan Filament menyimpan seluruh isinya, Nuxt merendernya di server, dan halaman karir berjalan di atas API rekrutmen Odoo.',
    },
    role: {
      en: 'Sole developer — backend, admin panel, frontend, SEO layer and the Odoo integration.',
      id: 'Pengembang tunggal — backend, panel admin, frontend, lapisan SEO, dan integrasi Odoo.',
    },
    spec: [
      { k: { en: 'Shape', id: 'Bentuk' }, v: { en: 'Laravel 13 API-only + Filament 5 admin, Nuxt 3 SSR in front', id: 'Laravel 13 API-only + admin Filament 5, Nuxt 3 SSR di depan' } },
      { k: { en: 'Content', id: 'Konten' }, v: { en: 'Pages, articles, business units, leadership, gallery — all editable', id: 'Halaman, artikel, unit bisnis, kepemimpinan, galeri — semuanya bisa disunting' } },
      { k: { en: 'Careers', id: 'Karir' }, v: { en: 'Vacancies synced from Odoo; applications forwarded to Odoo', id: 'Lowongan disinkron dari Odoo; lamaran diteruskan ke Odoo' } },
    ],
    stack: ['Laravel', 'Filament', 'Nuxt 3', 'Vue', 'Tailwind CSS', 'MySQL', 'Spatie Media Library', 'Odoo API'],
    live: 'https://kembarfutagroup.co.id/karir',
    privateSource: true,
    overview: {
      en: [
        'Kembar Futagroup is eight business units under one roof — foundry, construction, stone, agribusiness and more — and a group site has to speak for all of them without becoming eight sites. The public pages are Nuxt, rendered on the server; every string, image and meta tag they show comes from Laravel over an API. Nothing is hard-coded in the frontend, so the marketing team can change the group profile without a deploy.',
        'The half nobody sees is the bigger half. Filament runs the whole content model: page blocks that can be reordered, articles, milestones, partners, leadership profiles and photo albums. Alongside it sit the operational tools — 301 redirects, a 404 log, a link checker that rebuilds its report from scratch on every run, and a Search Console sync that pulls daily metrics into the panel so the client sees traffic where they already work.',
        'Recruitment started inside the panel and later moved to Odoo, where HR already worked. Vacancies are now pulled from Odoo every ten minutes into a shadow table, and every application is forwarded to an Odoo applicant card; the site keeps only a technical trace with a hashed email. The page renders from the copy, so Odoo being down stops updates, not the careers page. Odoo gives a reopened position a new id, so vacancies are matched on a hash of title, department and company instead — the URL already shared in WhatsApp groups stays alive.',
        'Careers launched first, on the main domain, while the rest of the site waits for approval: nginx answers 503 everywhere except /karir. A subdomain would have been simpler on day one and would have moved every vacancy URL on launch day.',
      ],
      id: [
        'Kembar Futagroup adalah delapan unit bisnis di bawah satu atap — pengecoran, konstruksi, batu, agribisnis, dan lainnya — dan situs grup harus mewakili semuanya tanpa berubah menjadi delapan situs. Halaman publiknya adalah Nuxt yang dirender di server; setiap teks, gambar, dan meta tag yang tampil berasal dari Laravel lewat API. Tidak ada yang ditulis mati di frontend, sehingga tim pemasaran bisa mengubah profil grup tanpa deploy.',
        'Bagian yang tidak terlihat justru yang lebih besar. Filament menjalankan seluruh model kontennya: blok halaman yang bisa diurutkan ulang, artikel, tonggak sejarah, mitra, profil kepemimpinan, dan album foto. Di sampingnya ada perkakas operasional — pengalihan 301, log 404, pemeriksa tautan yang menyusun ulang laporannya dari nol setiap kali berjalan, dan sinkronisasi Search Console yang menarik metrik harian ke dalam panel supaya klien melihat trafiknya di tempat mereka sudah bekerja.',
        'Rekrutmen awalnya berjalan di panel, lalu dipindahkan ke Odoo, tempat HRD memang sudah bekerja. Lowongan kini ditarik dari Odoo setiap sepuluh menit ke tabel bayangan, dan setiap lamaran diteruskan menjadi kartu pelamar di Odoo; situs hanya menyimpan jejak teknis dengan email yang di-hash. Halamannya dirender dari salinan, sehingga Odoo yang mati hanya menghentikan pembaruan, bukan halaman karirnya. Odoo memberi id baru pada posisi yang dibuka ulang, jadi lowongan dicocokkan lewat hash judul, departemen, dan perusahaan — URL yang sudah tersebar di grup WhatsApp tetap hidup.',
        'Karir diluncurkan lebih dulu, di domain utama, sementara sisa situs menunggu persetujuan: nginx menjawab 503 di semua alamat kecuali /karir. Subdomain memang lebih mudah di hari pertama, tetapi akan memindahkan setiap URL lowongan pada hari peluncuran.',
      ],
    },
    features: {
      en: [
        'Page content assembled from reorderable blocks, edited entirely from the admin panel.',
        'Business units, leadership profiles, milestones, partners and company statistics as first-class content.',
        'Careers page fed by Odoo: vacancies synced every ten minutes, applications and CVs forwarded straight to Odoo.',
        'Stable vacancy URLs across Odoo reopenings, with slug and SEO meta owned by the site.',
        'Application form options read from Odoo, with each Odoo error mapped to a message the applicant can act on.',
        'Photo albums and a news section, both server-rendered for indexing.',
        'SEO metadata, redirects, a 404 log and a broken-link scanner, all managed in-panel.',
        'Google Search Console credentials, verification and daily metrics surfaced inside the admin dashboard.',
        'Over 360 backend tests covering the API, admin panel, content model, SEO rules and the Odoo contract.',
      ],
      id: [
        'Isi halaman disusun dari blok yang bisa diurutkan ulang, seluruhnya disunting dari panel admin.',
        'Unit bisnis, profil kepemimpinan, tonggak sejarah, mitra, dan statistik perusahaan sebagai konten kelas satu.',
        'Halaman karir yang bersumber dari Odoo: lowongan disinkron tiap sepuluh menit, lamaran dan CV diteruskan langsung ke Odoo.',
        'URL lowongan tetap meski posisinya dibuka ulang di Odoo, dengan slug dan meta SEO milik situs.',
        'Pilihan form lamaran dibaca dari Odoo, dan setiap galat Odoo diterjemahkan menjadi pesan yang bisa ditindaklanjuti pelamar.',
        'Album foto dan kanal berita, keduanya dirender di server agar terindeks.',
        'Metadata SEO, pengalihan, log 404, dan pemindai tautan rusak, semuanya dikelola dari panel.',
        'Kredensial, verifikasi, dan metrik harian Google Search Console tampil di dasbor admin.',
        'Lebih dari 360 test backend yang menutup API, panel admin, model konten, aturan SEO, dan kontrak dengan Odoo.',
      ],
    },
    notes: [
      { k: { en: 'Rendering', id: 'Rendering' }, v: { en: 'Nuxt SSR; Laravel serves JSON only, never HTML', id: 'Nuxt SSR; Laravel hanya menyajikan JSON, tidak pernah HTML' } },
      { k: { en: 'Personal data', id: 'Data pribadi' }, v: { en: 'None kept for new applications — only a hashed email and send status', id: 'Tidak disimpan untuk lamaran baru — hanya hash email dan status kirim' } },
      { k: { en: 'URL mapping', id: 'Pemetaan URL' }, v: { en: 'Pages resolved by public path in Laravel, so routing has one source', id: 'Halaman dicari berdasarkan path publik di Laravel, sehingga routing bersumber tunggal' } },
    ],
    media: [
      {
        src: { en: 'projects/kfg/en/01-cover.png', id: 'projects/kfg/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Kembar Futa Group title card with a desktop mockup of the home page hero and a phone showing open vacancies.', id: 'Kartu judul Kembar Futa Group dengan mockup desktop hero beranda dan ponsel berisi lowongan terbuka.' },
        caption: { en: 'Forest, saffron and cream with Plus Jakarta Sans. Mockups redrawn from the site with sample data; the site itself is in Indonesian.', id: 'Forest, saffron, dan cream dengan Plus Jakarta Sans. Mockup digambar ulang dari situs dengan data contoh.' },
      },
      {
        src: { en: 'projects/kfg/en/02-headless.png', id: 'projects/kfg/id/02-headless.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: the Filament panel saves to a Laravel API, which serves JSON to Nuxt, which renders HTML for visitors and search engines; operational tools and MySQL sit beside it.', id: 'Diagram: panel Filament menyimpan ke API Laravel, yang menyajikan JSON ke Nuxt, yang merender HTML untuk pengunjung dan mesin pencari; perkakas operasional dan MySQL berada di sampingnya.' },
        caption: { en: 'Every word comes from the panel; the frontend holds layout, not content.', id: 'Setiap kata datang dari panel; frontend hanya memegang tata letak, bukan isi.' },
      },
      {
        src: { en: 'projects/kfg/en/03-careers-odoo.png', id: 'projects/kfg/id/03-careers-odoo.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: Odoo vacancies sync every ten minutes into a shadow table, Nuxt renders /karir from it, and applications are forwarded back to Odoo.', id: 'Diagram: lowongan Odoo disinkron tiap sepuluh menit ke tabel bayangan, Nuxt merender /karir darinya, dan lamaran diteruskan kembali ke Odoo.' },
        caption: { en: 'Odoo owns hiring; the site keeps stable vacancy URLs through an identity key.', id: 'Odoo memegang rekrutmen; situs menjaga URL lowongan tetap lewat identity key.' },
      },
      {
        src: { en: 'projects/kfg/en/04-admin-dashboard.png', id: 'projects/kfg/id/04-admin-dashboard.png' }, width: 1200, height: 1200,
        alt: { en: 'Filament admin dashboard with form submissions, site status, action items, SEO health gauges and recent submissions.', id: 'Dasbor admin Filament dengan kiriman form, status situs, hal yang perlu ditindak, gauge kesehatan SEO, dan kiriman terbaru.' },
        caption: { en: 'One card, one question: colour appears only for status.', id: 'Satu kartu, satu pertanyaan: warna hanya muncul untuk status.' },
      },
      {
        src: { en: 'projects/kfg/en/05-mobile.png', id: 'projects/kfg/id/05-mobile.png' }, width: 1200, height: 1200,
        alt: { en: 'Three phone screens: the home hero with business units, the open vacancies list, and the application form.', id: 'Tiga layar ponsel: hero beranda dengan unit bisnis, daftar lowongan terbuka, dan form lamaran.' },
        caption: { en: 'Home, careers and the application form on a phone.', id: 'Beranda, karir, dan form lamaran di ponsel.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'jasa-cor-logam-site',
    codename: 'Jasa Cor Logam Company Profile',
    categories: ['web'],
    year: '2026',
    title: { en: 'Metal Casting Company Site', id: 'Situs Perusahaan Jasa Cor Logam' },
    summary: {
      en: 'A company profile for a metal foundry in Klaten, built so its SEO is enforced by the system rather than left to whoever edits next.',
      id: 'Situs profil perusahaan pengecoran logam di Klaten, dibangun agar SEO-nya ditegakkan sistem alih-alih diserahkan pada siapa pun yang menyunting berikutnya.',
    },
    role: {
      en: 'Sole developer — Laravel API, Filament panel, Nuxt frontend, SEO architecture.',
      id: 'Pengembang tunggal — API Laravel, panel Filament, frontend Nuxt, arsitektur SEO.',
    },
    spec: [
      { k: { en: 'Shape', id: 'Bentuk' }, v: { en: 'Laravel 13 API-only + Filament 5, Nuxt 4 SSR with @nuxtjs/seo', id: 'Laravel 13 API-only + Filament 5, Nuxt 4 SSR dengan @nuxtjs/seo' } },
      { k: { en: 'Rule', id: 'Aturan' }, v: { en: 'No copy, URL or meta tag written in the frontend — all of it from the database', id: 'Tidak ada teks, URL, atau meta tag yang ditulis di frontend — semuanya dari basis data' } },
      { k: { en: 'Tests', id: 'Test' }, v: { en: '93 backend tests, run on MySQL rather than SQLite', id: '93 test backend, dijalankan di MySQL bukan SQLite' } },
    ],
    stack: ['Laravel', 'Filament', 'Nuxt 4', 'Vue', 'Tailwind CSS', 'MySQL', 'Vitest'],
    live: 'https://jasacorlogam.co.id',
    privateSource: true,
    overview: {
      en: [
        'A foundry in Klaten needed a site that ranks for the work it does. That makes SEO the specification rather than a finishing touch, and the interesting decision was to stop treating it as discipline. Meta title, description, canonical, robots, Open Graph and JSON-LD all come from the database and are rendered on the server; when a field is left empty its value is derived from the content, so it is never simply missing.',
        'Several rules are enforced at the point of saving instead of being documented and hoped for. An image without alt text is rejected on save, whatever path it came in through — decorative images have to be declared as such. Image dimensions are measured server-side and sent with the markup so the layout does not shift. Changing a slug creates a 301 automatically, and redirect chains and loops are refused rather than stored.',
        'The sharpest edge is that indexability is fixed at build time, not at boot. A frontend built without the production environment variables produces an artifact that serves `Disallow: /` forever, so every build prints a warning telling you which one you just made. Backend tests run against MySQL because the type differences between it and SQLite had already hidden one schema bug.',
      ],
      id: [
        'Sebuah pengecoran logam di Klaten butuh situs yang muncul untuk pekerjaan yang mereka kerjakan. Artinya SEO menjadi spesifikasi, bukan sentuhan akhir, dan keputusan yang menarik adalah berhenti memperlakukannya sebagai soal kedisiplinan. Meta title, description, canonical, robots, Open Graph, dan JSON-LD seluruhnya berasal dari basis data dan dirender di server; kalau sebuah field dikosongkan, nilainya diturunkan dari konten, sehingga tidak pernah benar-benar hilang.',
        'Beberapa aturan ditegakkan saat penyimpanan, bukan sekadar didokumentasikan lalu diharapkan dipatuhi. Gambar tanpa alt text ditolak saat disimpan, lewat jalur masuk apa pun — gambar dekoratif harus dinyatakan eksplisit. Lebar dan tinggi gambar diukur di server dan ikut dikirim supaya tata letak tidak bergeser. Mengubah slug otomatis membuat pengalihan 301, dan rantai maupun lingkaran pengalihan ditolak, bukan disimpan.',
        'Sisi paling tajamnya: status boleh-tidaknya diindeks ditentukan saat build, bukan saat server menyala. Frontend yang dibangun tanpa variabel environment produksi menghasilkan artefak yang selamanya menyajikan `Disallow: /`, jadi setiap build mencetak peringatan tentang artefak mana yang baru saja dibuat. Test backend berjalan di MySQL karena perbedaan tipe kolomnya dengan SQLite pernah menyembunyikan satu bug skema.',
      ],
    },
    features: {
      en: [
        'Every page assembled from reorderable blocks: hero, feature list, card grid, text+media, process steps, FAQ, post list, contact info.',
        'Articles with a table of contents generated from their own subheadings.',
        'Consultation form submissions collected in the panel, each with a WhatsApp reply button.',
        'Alt text required on save; images without it are rejected, decorative ones must be declared.',
        'Slug changes generate 301 redirects; chains and loops are refused.',
        'A 404 log that suggests a redirect destination for each missed URL.',
        'Sitemap built from the database and never containing a noindexed URL.',
        'A panel switch that pulls the whole site out of search results, and non-production environments closed automatically.',
      ],
      id: [
        'Setiap halaman disusun dari blok yang bisa diurutkan ulang: hero, daftar keunggulan, grid kartu, teks+gambar, tahapan proses, FAQ, daftar artikel, info kontak.',
        'Artikel dengan daftar isi yang dibuat otomatis dari subjudulnya sendiri.',
        'Kiriman form konsultasi terkumpul di panel, masing-masing dengan tombol balas lewat WhatsApp.',
        'Alt text wajib saat menyimpan; gambar tanpa alt ditolak, gambar dekoratif harus dinyatakan.',
        'Perubahan slug menghasilkan pengalihan 301; rantai dan lingkaran pengalihan ditolak.',
        'Log 404 yang menyarankan tujuan pengalihan untuk setiap URL yang tidak ditemukan.',
        'Sitemap dibangun dari basis data dan tidak pernah memuat URL yang di-noindex.',
        'Sakelar di panel untuk menarik seluruh situs dari mesin pencari, dan environment non-produksi tertutup otomatis.',
      ],
    },
    notes: [
      { k: { en: 'Indexability', id: 'Indeksabilitas' }, v: { en: 'Decided at build time; a wrong build warns at the end of the process', id: 'Ditentukan saat build; build yang keliru memberi peringatan di akhir proses' } },
      { k: { en: 'API addresses', id: 'Alamat API' }, v: { en: 'Browser and Nuxt-server base URLs kept separate on purpose', id: 'URL basis untuk browser dan untuk server Nuxt sengaja dipisah' } },
      { k: { en: 'Dependencies', id: 'Dependency' }, v: { en: 'All free and open source — MIT and SIL OFL, no paid packages', id: 'Seluruhnya gratis dan open source — MIT dan SIL OFL, tanpa paket berbayar' } },
    ],
    media: [
      {
        src: { en: 'projects/jasa-cor-logam/en/01-cover.png', id: 'projects/jasa-cor-logam/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Jasa Cor Logam title card with a desktop mockup of the navy-and-orange home page hero and a phone showing the casting process steps.', id: 'Kartu judul Jasa Cor Logam dengan mockup desktop hero beranda bernuansa navy dan oranye, serta ponsel berisi tahapan pengecoran.' },
        caption: { en: 'Navy and orange with Be Vietnam Pro. Mockups redrawn from the site with sample data; the site itself is in Indonesian.', id: 'Navy dan oranye dengan Be Vietnam Pro. Mockup digambar ulang dari situs dengan data contoh.' },
      },
      {
        src: { en: 'projects/jasa-cor-logam/en/02-seo-fallback.png', id: 'projects/jasa-cor-logam/id/02-seo-fallback.png' }, width: 1200, height: 1200,
        alt: { en: 'Fallback chain for meta title, description, OG image and canonical, above a Google result preview and the server-rendered head tags.', id: 'Rantai fallback untuk meta title, deskripsi, gambar OG, dan canonical, di atas pratinjau hasil Google dan tag head yang dirender server.' },
        caption: { en: 'Every meta field falls back to the next source, so the frontend never receives null.', id: 'Setiap field meta jatuh ke sumber berikutnya, sehingga frontend tidak pernah menerima null.' },
      },
      {
        src: { en: 'projects/jasa-cor-logam/en/03-save-rules.png', id: 'projects/jasa-cor-logam/id/03-save-rules.png' }, width: 1200, height: 1200,
        alt: { en: 'Six rules enforced on save: required alt text, measured image dimensions, automatic 301 on slug change, refused redirect loops, 410 for deleted articles, and a 404 log with suggested redirects.', id: 'Enam aturan yang ditegakkan saat menyimpan: alt text wajib, dimensi gambar terukur, 301 otomatis saat slug berubah, lingkaran pengalihan ditolak, 410 untuk artikel terhapus, dan log 404 dengan saran pengalihan.' },
        caption: { en: 'Rules checked on save rather than written in a style guide.', id: 'Aturan diperiksa saat menyimpan, bukan ditulis di panduan.' },
      },
      {
        src: { en: 'projects/jasa-cor-logam/en/04-admin-editor.png', id: 'projects/jasa-cor-logam/id/04-admin-editor.png' }, width: 1200, height: 1200,
        alt: { en: 'Filament article editor with a focus keyword, snippet preview, and a content analysis panel listing passed and failed checks.', id: 'Editor artikel Filament dengan focus keyword, pratinjau snippet, dan panel analisis konten berisi pemeriksaan yang lolos dan gagal.' },
        caption: { en: 'A self-written content analyser in the panel instead of a paid SEO plugin.', id: 'Penganalisis konten buatan sendiri di panel, bukan plugin SEO berbayar.' },
      },
      {
        src: { en: 'projects/jasa-cor-logam/en/05-build-indexing.png', id: 'projects/jasa-cor-logam/id/05-build-indexing.png' }, width: 1200, height: 1200,
        alt: { en: 'A staging build printing a not-indexable warning next to a production build, their robots.txt files, and a sitemap table with reasons for excluded URLs.', id: 'Build staging yang mencetak peringatan tidak terindeks di samping build produksi, robots.txt keduanya, dan tabel sitemap beserta alasan URL yang tidak masuk.' },
        caption: { en: 'Indexability is fixed at build time, so the wrong build announces itself.', id: 'Indeksabilitas ditentukan saat build, jadi build yang keliru memberi tahu dirinya sendiri.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'generus',
    codename: 'Generus',
    categories: ['web'],
    year: '2026',
    title: { en: 'Generus — Youth Attendance & Curriculum Tracking', id: 'Generus — Pemantauan Presensi & Kurikulum Generus' },
    summary: {
      en: 'A PWA for a three-level youth programme — district, village, group — covering attendance, monthly curriculum targets and reading progress, with access scoped in the database itself.',
      id: 'PWA untuk pembinaan generus tiga tingkat — daerah, desa, kelompok — mencakup presensi, target kurikulum bulanan, dan progres kitab, dengan hak akses yang ditegakkan langsung di database.',
    },
    role: { en: 'Sole developer — product spec, data model, app and deployment.', id: 'Pengembang tunggal — spesifikasi produk, model data, aplikasi, dan deployment.' },
    spec: [
      { k: { en: 'Scale', id: 'Skala' }, v: { en: '1 district, 10 villages, 60 groups, ~5,000 members', id: '1 daerah, 10 desa, 60 kelompok, ± 5.000 generus' } },
      { k: { en: 'Attendance', id: 'Presensi' }, v: { en: 'Checklist for small sessions, multi-officer QR scanning for large ones', id: 'Checklist untuk pengajian kecil, scan QR banyak petugas untuk yang besar' } },
      { k: { en: 'Access', id: 'Akses' }, v: { en: 'Postgres RLS over an ltree unit hierarchy, six roles', id: 'RLS Postgres di atas hierarki unit ltree, enam peran' } },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Drizzle ORM', 'Dexie', 'Tailwind CSS', 'Vitest'],
    repo: 'https://github.com/aamnnr/generus',
    live: 'https://generus-two.vercel.app',
    overview: {
      en: [
        'Attendance, monthly curriculum targets and Qur’an reading progress used to live in notebooks, spreadsheets and group chats, so nobody above group level could see what was happening below them. Generus puts all three in one installable web app, used by admins on phones and by the curriculum team on laptops.',
        'The hard requirement was the 300-person village gathering. Members carry a printed QR card; three or four officers scan at the door with their own phones, each scan confirmed locally in under a second and queued in IndexedDB. Duplicates are dropped, lateness is derived from the agenda’s cut-off, and the queue syncs idempotently when the signal returns.',
        'Who sees what is enforced in Postgres, not just in the UI. Every unit carries an ltree path, so “this unit and everything under it” is one indexed condition, and row-level security applies it to every table. The curriculum team gets aggregate achievement figures through security-definer functions without ever reading an individual member’s row.',
      ],
      id: [
        'Presensi, target kurikulum bulanan, dan progres bacaan Al-Qur’an dulu tersebar di buku, spreadsheet, dan grup chat, sehingga pengurus di atas tingkat kelompok tidak bisa melihat kondisi di bawahnya. Generus menyatukan ketiganya dalam satu aplikasi web yang bisa dipasang, dipakai admin di HP dan tim kurikulum di laptop.',
        'Kebutuhan terberatnya adalah pengajian desa dengan 300 peserta. Generus membawa kartu QR cetak; tiga atau empat petugas memindai di pintu dengan HP masing-masing, setiap scan dikonfirmasi lokal dalam kurang dari satu detik dan diantrikan di IndexedDB. Duplikasi diabaikan, keterlambatan dihitung dari batas waktu agenda, dan antrean disinkronkan secara idempoten begitu sinyal kembali.',
        'Siapa melihat apa ditegakkan di Postgres, bukan hanya di UI. Setiap unit punya path ltree, sehingga “unit ini dan semua turunannya” cukup satu kondisi ber-indeks, dan row-level security menerapkannya di setiap tabel. Tim kurikulum mendapat angka capaian agregat lewat fungsi security-definer tanpa pernah membaca baris data generus satu per satu.',
      ],
    },
    features: {
      en: [
        'Region tree, accounts and six roles — from superadmin to read-only kyai — each bound to one unit and everything below it.',
        'Member records with Excel import, bulk level promotion, and status changes that keep history intact.',
        'Printable portrait ID cards carrying a random QR token rather than personal data.',
        'One-off and weekly agendas that cascade to the units beneath them.',
        'Offline-first QR scanning with several officers per agenda, plus name search as a fallback.',
        'Delegated completion window for group admins, then automatic locking via pg_cron.',
        'Curriculum library, period targets copied forward each month, and kitab progress tracked by verse or page.',
        'Cross-unit achievement recap, dashboard and monthly report.',
        'Curriculum modules switchable per deployment for a staged rollout.',
      ],
      id: [
        'Pohon wilayah, akun, dan enam peran — dari superadmin hingga kyai yang hanya melihat — masing-masing terikat pada satu unit dan seluruh turunannya.',
        'Data generus dengan import Excel, kenaikan jenjang massal, dan perubahan status yang tetap menyimpan riwayat.',
        'Kartu ID potret siap cetak berisi token QR acak, bukan data pribadi.',
        'Agenda sekali atau mingguan yang otomatis tampil di unit-unit di bawahnya.',
        'Scan QR offline-first dengan banyak petugas per agenda, plus pencarian nama sebagai cadangan.',
        'Jendela delegasi untuk admin kelompok, lalu penguncian otomatis lewat pg_cron.',
        'Pustaka materi, target periode yang disalin dari bulan sebelumnya, dan progres kitab per ayat atau halaman.',
        'Rekap capaian lintas unit, dasbor, dan laporan bulanan.',
        'Modul kurikulum yang bisa dinyalakan per server untuk penerapan bertahap.',
      ],
    },
    notes: [
      { k: { en: 'Platform choice', id: 'Pilihan platform' }, v: { en: 'PWA first — iPhone users and laptop dashboards on one codebase; a native Android app came later', id: 'PWA lebih dulu — pengguna iPhone dan dasbor laptop dalam satu codebase; aplikasi Android native menyusul' } },
      { k: { en: 'QR on iOS', id: 'QR di iOS' }, v: { en: 'BarcodeDetector with a zxing WASM fallback', id: 'BarcodeDetector dengan cadangan WASM zxing' } },
      { k: { en: 'Tests', id: 'Pengujian' }, v: { en: '137 tests; migrations and RLS run against PGlite, no Docker', id: '137 test; migrasi dan RLS diuji dengan PGlite, tanpa Docker' } },
    ],
    media: [
      {
        src: { en: 'projects/generus/en/01-cover.png', id: 'projects/generus/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Generus logo with the desktop home page in a browser and the same page on a phone, showing an ongoing gathering with 142 of 528 recorded.', id: 'Logo Generus dengan beranda versi desktop di browser dan versi ponsel, menampilkan pengajian yang sedang berlangsung dengan 142 dari 528 tercatat.' },
        caption: { en: 'One app for phones and laptops: sidebar on desktop, bottom tabs on mobile. Mockups redrawn with sample data; the app UI is in Indonesian.', id: 'Satu aplikasi untuk HP dan laptop: menu samping di desktop, tab bawah di HP. Mockup digambar ulang dengan data contoh.' },
      },
      {
        src: { en: 'projects/generus/en/02-offline-scan.png', id: 'projects/generus/id/02-offline-scan.png' }, width: 1200, height: 1200,
        alt: { en: 'Three phones scanning QR cards for the same gathering — recorded, already recorded, and late — above a four-step flow from reading the card to syncing with ON CONFLICT DO NOTHING.', id: 'Tiga ponsel memindai kartu QR untuk pengajian yang sama — tercatat, sudah tercatat, dan terlambat — di atas alur empat langkah dari membaca kartu hingga sinkron dengan ON CONFLICT DO NOTHING.' },
        caption: { en: 'Several officers, no signal needed: scans are matched on the device and the first record wins.', id: 'Banyak petugas, tanpa perlu sinyal: scan dicocokkan di perangkat dan catatan pertama yang menang.' },
      },
      {
        src: { en: 'projects/generus/en/03-access-rls.png', id: 'projects/generus/id/03-access-rls.png' }, width: 1200, height: 1200,
        alt: { en: 'A unit tree with ltree paths where a village and its four groups are highlighted, next to the generus_select RLS policy, an aggregate recap for the curriculum team, and six role cards.', id: 'Pohon unit dengan path ltree yang menyorot satu desa dan empat kelompoknya, di samping kebijakan RLS generus_select, rekap agregat untuk tim kurikulum, dan enam kartu peran.' },
        caption: { en: 'Who sees what is one indexed ltree condition, enforced by row-level security on every table.', id: 'Siapa melihat apa cukup satu kondisi ltree ber-indeks, ditegakkan row-level security di setiap tabel.' },
      },
      {
        src: { en: 'projects/generus/en/04-attendance.png', id: 'projects/generus/id/04-attendance.png' }, width: 1200, height: 1200,
        alt: { en: 'Desktop attendance page for a village gathering: status totals, a checklist with H/T/I/S/A buttons per person, and side panels for per-group progress, scan officers, the delegation window and automatic locking.', id: 'Halaman presensi desktop untuk pengajian desa: total per status, checklist dengan tombol H/T/I/S/A per orang, serta panel progres per kelompok, petugas scan, jendela delegasi, dan kunci otomatis.' },
        caption: { en: 'Checklist attendance, a delegated window for group admins, then automatic locking via pg_cron.', id: 'Presensi checklist, jendela delegasi untuk admin kelompok, lalu penguncian otomatis lewat pg_cron.' },
      },
      {
        src: { en: 'projects/generus/en/05-curriculum.png', id: 'projects/generus/id/05-curriculum.png' }, width: 1200, height: 1200,
        alt: { en: 'The October 2026 curriculum period with Qur’an and kitab targets and a memorisation item in Arabic, next to per-member reading progress by verse and a materials checklist.', id: 'Periode kurikulum Oktober 2026 dengan target Al-Qur’an dan kitab serta hafalan berteks Arab, di samping progres bacaan per generus per ayat dan checklist materi.' },
        caption: { en: 'Monthly targets per level, with reading progress tracked to the verse or page.', id: 'Target bulanan per jenjang, dengan progres bacaan dipantau per ayat atau halaman.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'generus-mobile',
    codename: 'generus-mobile',
    categories: ['mobile'],
    year: '2026',
    title: { en: 'Generus Android — Native Companion App', id: 'Generus Android — Aplikasi Pendamping Native' },
    summary: {
      en: 'A native Kotlin version of the Generus PWA on the same Supabase project — offline attendance that still gets sent after the app is closed, an on-device QR scanner, and ID cards drawn on the phone.',
      id: 'Versi Kotlin native dari PWA Generus di project Supabase yang sama — presensi offline yang tetap terkirim setelah aplikasi ditutup, pemindai QR di perangkat, dan kartu ID yang digambar di HP.',
    },
    role: { en: 'Sole developer — Android app and the database API it uses.', id: 'Pengembang tunggal — aplikasi Android dan API database yang dipakainya.' },
    spec: [
      { k: { en: 'Backend', id: 'Backend' }, v: { en: 'None new — same Supabase project, RLS and triggers as the PWA', id: 'Tidak ada yang baru — project Supabase, RLS, dan trigger yang sama dengan PWA' } },
      { k: { en: 'Offline', id: 'Offline' }, v: { en: 'Room queue, sent by WorkManager even after the app is closed', id: 'Antrean Room, dikirim WorkManager walau aplikasi sudah ditutup' } },
      { k: { en: 'Scanner', id: 'Pemindai' }, v: { en: 'CameraX + ML Kit on the device, with sound and vibration', id: 'CameraX + ML Kit di perangkat, dengan bunyi dan getar' } },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'WorkManager', 'Supabase', 'PostgreSQL', 'CameraX', 'ML Kit'],
    repo: 'https://github.com/aamnnr/generus-mobile',
    overview: {
      en: [
        'Generus started as a PWA so iPhone users and laptop dashboards could share one codebase. Its weak spot was background work: on iOS a PWA can only send queued attendance while it is open. An officer who closes the app in a hall with no signal leaves records stranded until the next time they open it.',
        'The Android app covers the same ground as the PWA, on the same Supabase project. There is no new backend. Simple writes go straight to tables through PostgREST, and the joined queries that live in the PWA’s TypeScript became 41 SQL functions that run as the caller, so the same row-level security still decides what each account can see.',
        'Attendance taps and scans land in a Room queue first, keyed by agenda and member so the latest tap wins. The queue is sent when a status is tapped, when the network returns, every 20 seconds while the app is open, and by WorkManager once the app is closed. The scanner reads cards with ML Kit on the device and matches a SHA-256 hash of the QR content against a local roster, so it works with no signal.',
      ],
      id: [
        'Generus dimulai sebagai PWA agar pengguna iPhone dan dasbor laptop memakai satu codebase. Kelemahannya ada di pekerjaan latar: di iOS, PWA hanya bisa mengirim antrean presensi selama dibuka. Petugas yang menutup aplikasi di aula tanpa sinyal membuat catatan tertahan sampai aplikasi dibuka lagi.',
        'Aplikasi Android mencakup fitur yang sama dengan PWA, di project Supabase yang sama. Tidak ada backend baru. Tulis sederhana langsung ke tabel lewat PostgREST, dan query gabungan yang di PWA ada di TypeScript dijadikan 41 fungsi SQL yang berjalan sebagai pemanggil, sehingga row-level security yang sama tetap menentukan apa yang dilihat tiap akun.',
        'Ketukan presensi dan hasil scan masuk antrean Room lebih dulu, berkunci agenda dan generus sehingga ketukan terakhir yang berlaku. Antrean dikirim saat status diketuk, saat jaringan kembali, setiap 20 detik selama aplikasi terbuka, dan oleh WorkManager setelah aplikasi ditutup. Pemindai membaca kartu dengan ML Kit di perangkat dan mencocokkan hash SHA-256 isi QR ke roster lokal, jadi tetap jalan tanpa sinyal.',
      ],
    },
    features: {
      en: [
        'Home with the ongoing or next gathering, quick actions, monthly attendance and a three-absences-in-a-row warning.',
        'Agendas — one-off or weekly — with cancel, lock, and scan officers.',
        'Offline checklist with H/T/I/S/A, mark-all-present, and delegated completion for group admins.',
        'QR scanner with CameraX and ML Kit, sound and vibration per result, and name search as a fallback.',
        'Member records with filters, status changes, transfers, card reissue and bulk level promotion.',
        'ID cards drawn on the device and exported as an A4 PDF, nine per sheet, ready to print or share.',
        'Excel import validated on the phone, and monthly reports exported to Excel.',
        'Curriculum periods, targets and a materials library with Arabic text; achievement checklists and bulk kitab progress.',
        'Region and account admin through an Edge Function that holds the service role, plus forced password change on first login.',
      ],
      id: [
        'Beranda dengan pengajian yang sedang berlangsung atau berikutnya, aksi cepat, kehadiran bulanan, dan peringatan alpa tiga kali berturut-turut.',
        'Agenda — sekali atau mingguan — dengan batal, kunci, dan petugas scan.',
        'Checklist offline H/T/I/S/A, hadirkan semua, dan delegasi untuk admin kelompok.',
        'Pemindai QR dengan CameraX dan ML Kit, bunyi dan getar per hasil, dan cari nama sebagai cadangan.',
        'Data generus dengan filter, perubahan status, mutasi, terbitkan ulang kartu, dan kenaikan jenjang massal.',
        'Kartu ID yang digambar di perangkat lalu diekspor ke PDF A4, sembilan kartu per lembar, siap dicetak atau dibagikan.',
        'Import Excel yang divalidasi di HP, dan ekspor laporan bulanan ke Excel.',
        'Periode kurikulum, target, dan pustaka materi berteks Arab; checklist capaian dan progres kitab massal.',
        'Admin wilayah dan akun lewat Edge Function yang memegang service role, serta wajib ganti password saat login pertama.',
      ],
    },
    notes: [
      { k: { en: 'Builds', id: 'Build' }, v: { en: 'Two flavors — test and official server — installable side by side', id: 'Dua flavor — server uji dan resmi — bisa terpasang berdampingan' } },
      { k: { en: 'Target', id: 'Target' }, v: { en: 'minSdk 26, targetSdk 36, JDK 17', id: 'minSdk 26, targetSdk 36, JDK 17' } },
      { k: { en: 'Secrets', id: 'Kunci rahasia' }, v: { en: 'Only the URL and publishable key ship in the APK', id: 'APK hanya membawa URL dan publishable key' } },
    ],
    media: [
      {
        src: { en: 'projects/generus-mobile/en/01-cover.png', id: 'projects/generus-mobile/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Generus Android title with three Android phones: the home screen, an attendance checklist, and the QR scanner.', id: 'Judul Generus Android dengan tiga ponsel Android: beranda, checklist presensi, dan pemindai QR.' },
        caption: { en: 'Home, checklist and scanner in the native app. Mockups redrawn with sample data; the app UI is in Indonesian.', id: 'Beranda, checklist, dan pemindai di aplikasi native. Mockup digambar ulang dengan data contoh.' },
      },
      {
        src: { en: 'projects/generus-mobile/en/02-architecture.png', id: 'projects/generus-mobile/id/02-architecture.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: the Android app and the PWA both connect to one Supabase project — Auth, PostgREST, 41 mobile_* RPC functions, unchanged RLS, and an admin Edge Function — with test and official build flavors below.', id: 'Diagram: aplikasi Android dan PWA sama-sama terhubung ke satu project Supabase — Auth, PostgREST, 41 fungsi RPC mobile_*, RLS yang tidak berubah, dan Edge Function admin — dengan flavor uji dan resmi di bawahnya.' },
        caption: { en: 'A second client with no new backend: the same rules guard both apps.', id: 'Klien kedua tanpa backend baru: aturan yang sama menjaga kedua aplikasi.' },
      },
      {
        src: { en: 'projects/generus-mobile/en/03-offline-queue.png', id: 'projects/generus-mobile/id/03-offline-queue.png' }, width: 1200, height: 1200,
        alt: { en: 'An Android attendance checklist with two items waiting to send, next to the four triggers that flush the Room queue and a comparison with the PWA on iOS.', id: 'Checklist presensi Android dengan dua item menunggu kirim, di samping empat pemicu pengiriman antrean Room dan perbandingan dengan PWA di iOS.' },
        caption: { en: 'Taps are saved on the phone first; WorkManager sends them even after the app is closed.', id: 'Ketukan disimpan di HP lebih dulu; WorkManager mengirimnya walau aplikasi sudah ditutup.' },
      },
      {
        src: { en: 'projects/generus-mobile/en/04-scanner.png', id: 'projects/generus-mobile/id/04-scanner.png' }, width: 1200, height: 1200,
        alt: { en: 'Three Android scanner screens — recorded in green, already recorded in amber, rejected in red — above the flow from CameraX and ML Kit to a hashed roster lookup.', id: 'Tiga layar pemindai Android — tercatat hijau, sudah tercatat kuning, ditolak merah — di atas alur dari CameraX dan ML Kit hingga pencocokan roster ber-hash.' },
        caption: { en: 'Three clear answers, each with its own sound and vibration.', id: 'Tiga jawaban jelas, masing-masing dengan bunyi dan getarnya sendiri.' },
      },
      {
        src: { en: 'projects/generus-mobile/en/05-id-cards.png', id: 'projects/generus-mobile/id/05-id-cards.png' }, width: 1200, height: 1200,
        alt: { en: 'A portrait Generus ID card with a QR code, next to an A4 PDF page of nine cards and cards for Excel import and report export.', id: 'Kartu ID Generus potret dengan kode QR, di samping halaman PDF A4 berisi sembilan kartu serta kartu import Excel dan ekspor laporan.' },
        caption: { en: 'ID cards drawn on the phone and exported nine to an A4 page; long names are shortened to an initial.', id: 'Kartu ID digambar di HP dan diekspor sembilan per halaman A4; nama panjang disingkat jadi huruf awal.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'duitku-finance',
    codename: 'ngatur-duit',
    categories: ['mobile'],
    year: '2026',
    title: { en: 'Duitku — Offline-First Money Tracker', id: 'Duitku — Pencatat Keuangan Offline-First' },
    summary: {
      en: 'A native Android finance app where logging takes three taps or one chat message — bank notifications, receipt photos and a Telegram bot all turn into drafts to approve.',
      id: 'Aplikasi keuangan Android native di mana mencatat cukup tiga ketukan atau satu pesan chat — notifikasi bank, foto struk, dan bot Telegram semuanya menjadi draf untuk disetujui.',
    },
    role: { en: 'Sole developer — Android app, Supabase backend and edge functions.', id: 'Pengembang tunggal — aplikasi Android, backend Supabase, dan edge function.' },
    spec: [
      { k: { en: 'Storage', id: 'Penyimpanan' }, v: { en: 'Room on the phone is the source of truth; cloud is optional', id: 'Room di HP adalah sumber utama; cloud bersifat opsional' } },
      { k: { en: 'Capture', id: 'Pencatatan' }, v: { en: 'Notification auto-import, receipt scan, voice, AI chat, Telegram', id: 'Auto-import notifikasi, scan struk, suara, chat AI, Telegram' } },
      { k: { en: 'Running cost', id: 'Biaya operasional' }, v: { en: 'Zero — Supabase, Gemini and Telegram free tiers', id: 'Nol — paket gratis Supabase, Gemini, dan Telegram' } },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Supabase', 'Edge Functions', 'Gemini API', 'Telegram Bot API', 'Glance'],
    repo: 'https://github.com/aamnnr/ngatur-duit',
    overview: {
      en: [
        'People stop tracking money when every entry takes a form. Duitku keeps the form to three taps — amount, category, save — and offers shortcuts around it: bank and e-wallet notifications are parsed into drafts, a photo of a receipt is read by Gemini, and a message like “bakso 25rb gopay” sent to a Telegram bot lands in the same inbox for approval.',
        'Everything works with no network. Room holds the data; wallet balances are computed from transactions rather than stored, so a transfer or adjustment can never leave them out of step. Deletes are soft and every row carries an updated_at, which is what lets a push-then-pull sync to the user’s own Supabase project stay simple.',
        'Secrets never ship in the APK. The Gemini key and bot token live only as Supabase secrets behind edge functions, the app holds just the public key, and row-level security keeps each user’s rows to themselves.',
      ],
      id: [
        'Orang berhenti mencatat keuangan saat setiap entri butuh form. Duitku menjaga form tetap tiga ketukan — nominal, kategori, simpan — dan menyediakan jalan pintas di sekitarnya: notifikasi bank dan e-wallet diurai menjadi draf, foto struk dibaca Gemini, dan pesan seperti “bakso 25rb gopay” ke bot Telegram masuk ke inbox yang sama untuk disetujui.',
        'Semuanya jalan tanpa jaringan. Room menyimpan data; saldo dompet dihitung dari transaksi, bukan disimpan, sehingga transfer atau penyesuaian tidak pernah membuatnya selisih. Penghapusan bersifat soft delete dan setiap baris membawa updated_at, yang membuat sinkron push-lalu-pull ke project Supabase milik pengguna sendiri tetap sederhana.',
        'Kunci rahasia tidak pernah masuk APK. Kunci Gemini dan token bot hanya disimpan sebagai secret Supabase di balik edge function, aplikasi hanya membawa kunci publik, dan row-level security menjaga baris tiap pengguna tetap miliknya sendiri.',
      ],
    },
    features: {
      en: [
        'Transactions, transfers as paired entries, balance adjustments, and unlimited wallets.',
        'Separate personal and business profiles, each with its own wallets and default categories.',
        'Auto-import from notifications of major Indonesian banks and e-wallets — BCA, BRI, Mandiri, GoPay, DANA, OVO and more.',
        'Receipt scanning and a chat assistant through Gemini, returning structured JSON as reviewable drafts.',
        'Telegram bot paired with a six-digit code, accepting text and receipt photos.',
        'Monthly limits, category budgets, savings goals, recurring bills and a “reality” calculator.',
        'Insight screen, projections, and CSV/PDF export.',
        'Email OTP login, Supabase sync, PIN and fingerprint lock, JSON backup and restore.',
        'Home-screen widget, daily reminders and budget alerts.',
      ],
      id: [
        'Transaksi, transfer sebagai entri berpasangan, penyesuaian saldo, dan dompet tanpa batas.',
        'Profil pribadi dan usaha yang terpisah, masing-masing dengan dompet dan kategori bawaan.',
        'Auto-import dari notifikasi bank dan e-wallet utama Indonesia — BCA, BRI, Mandiri, GoPay, DANA, OVO, dan lainnya.',
        'Scan struk dan asisten chat lewat Gemini, mengembalikan JSON terstruktur sebagai draf yang bisa ditinjau.',
        'Bot Telegram yang dipasangkan dengan kode enam digit, menerima teks dan foto struk.',
        'Batas bulanan, anggaran per kategori, target tabungan, tagihan rutin, dan kalkulator realita.',
        'Layar Insight, proyeksi, dan ekspor CSV/PDF.',
        'Login email OTP, sinkron Supabase, kunci PIN dan sidik jari, backup dan restore JSON.',
        'Widget layar utama, pengingat harian, dan peringatan anggaran.',
      ],
    },
    notes: [
      { k: { en: 'Amounts', id: 'Nominal' }, v: { en: 'Stored as Long whole rupiah — no floating point', id: 'Disimpan sebagai Long rupiah penuh — tanpa floating point' } },
      { k: { en: 'Target', id: 'Target' }, v: { en: 'minSdk 26, targetSdk 36, Kotlin 2.1', id: 'minSdk 26, targetSdk 36, Kotlin 2.1' } },
      { k: { en: 'AI model', id: 'Model AI' }, v: { en: 'Read from a secret, swappable without an app update', id: 'Dibaca dari secret, bisa diganti tanpa update aplikasi' } },
    ],
    media: [
      {
        src: { en: 'projects/duitku/en/01-cover.png', id: 'projects/duitku/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Duitku app icon and three phone mockups: Home in light mode, Wallets in dark mode, and Insight.', id: 'Ikon aplikasi Duitku dan tiga mockup ponsel: Beranda mode terang, Dompet mode gelap, dan Insight.' },
        caption: { en: 'Neutral “liquid glass” design with the Koko mascot. Mockups redrawn from the app with sample data; the app UI itself is in Indonesian.', id: 'Desain netral “liquid glass” dengan maskot Koko. Mockup digambar ulang dari aplikasi dengan data contoh.' },
      },
      {
        src: { en: 'projects/duitku/en/02-capture-flow.png', id: 'projects/duitku/id/02-capture-flow.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: bank notifications, receipt photos, AI chat, Telegram and voice become drafts, then Room on the phone, optionally synced to Supabase.', id: 'Diagram: notifikasi bank, foto struk, chat AI, Telegram, dan suara menjadi draf, lalu Room di HP, opsional disinkron ke Supabase.' },
        caption: { en: 'Five capture paths, each reviewed as a draft before it is saved.', id: 'Lima jalan masuk, masing-masing ditinjau sebagai draf sebelum disimpan.' },
      },
      {
        src: { en: 'projects/duitku/en/03-light-dark.png', id: 'projects/duitku/id/03-light-dark.png' }, width: 1200, height: 1200,
        alt: { en: 'The Home screen side by side in light and dark mode.', id: 'Layar Beranda berdampingan dalam mode terang dan gelap.' },
        caption: { en: 'Home in light and dark mode: balance, wallet card, monthly limit and Koko.', id: 'Beranda mode terang dan gelap: saldo, kartu dompet, batas bulanan, dan Koko.' },
      },
      {
        src: { en: 'projects/duitku/en/04-insight-plan.png', id: 'projects/duitku/id/04-insight-plan.png' }, width: 1200, height: 1200,
        alt: { en: 'Insight screen with a spending trend and category breakdown, next to the Plan screen with category budgets.', id: 'Layar Insight dengan tren pengeluaran dan rincian kategori, di samping layar Rencana dengan anggaran per kategori.' },
        caption: { en: 'Insight and Plan: swipeable sub-tabs, budgets that warn before the limit.', id: 'Insight dan Rencana: submenu yang bisa diusap, anggaran yang memberi peringatan sebelum batas.' },
      },
      {
        src: { en: 'projects/duitku/en/05-koko-widget.png', id: 'projects/duitku/id/05-koko-widget.png' }, width: 1200, height: 1200,
        alt: { en: 'Five Koko mascot expressions above two home-screen widgets and the launcher icon.', id: 'Lima ekspresi maskot Koko di atas dua widget layar utama dan ikon launcher.' },
        caption: { en: 'Koko’s moods follow the budget; spending and balance widgets for the home screen.', id: 'Ekspresi Koko mengikuti anggaran; widget pengeluaran dan saldo untuk layar utama.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'ferticore-presisi',
    codename: 'FertiCore / Alburdat Presisi',
    categories: ['iot', 'mobile'],
    year: '2026',
    title: { en: 'Precision Fertiliser System', id: 'Sistem Pupuk Presisi' },
    summary: {
      en: 'A complete precision-fertilising rig: ESP32 firmware driving a dosing motor, an MQTT link, and a Flutter dashboard that runs on phone, desktop and web.',
      id: 'Sistem pemupukan presisi yang utuh: firmware ESP32 yang menggerakkan motor dosis, jalur MQTT, dan dasbor Flutter yang berjalan di ponsel, desktop, dan web.',
    },
    role: {
      en: 'Firmware, MQTT contract, and Flutter dashboard.',
      id: 'Firmware, kontrak MQTT, dan dasbor Flutter.',
    },
    spec: [
      { k: { en: 'Device', id: 'Perangkat' }, v: { en: 'ESP32 with DC dosing motor and OLED display', id: 'ESP32 dengan motor dosis DC dan layar OLED' } },
      { k: { en: 'Transport', id: 'Transport' }, v: { en: 'MQTT + JSON over TCP/WebSocket, no server in between', id: 'MQTT + JSON lewat TCP/WebSocket, tanpa server di tengah' } },
      { k: { en: 'Client', id: 'Klien' }, v: { en: 'Flutter dashboard for Android, iOS, web and desktop', id: 'Dasbor Flutter untuk Android, iOS, web, dan desktop' } },
    ],
    stack: ['ESP32', 'C++', 'MQTT', 'Flutter', 'Provider', 'EEPROM'],
    repo: 'https://github.com/aamnnr/ferticore-app',
    overview: {
      en: [
        'Fertiliser is expensive and easy to waste. The rig meters it out by commodity instead of by habit: the operator picks what is being grown, the app works out a dose per plant, and the device dispenses exactly that at every point.',
        'The architecture is still deliberately server-less. The Flutter app and the ESP32 talk to each other through an MQTT broker as two peers — no back end to keep alive, no database bill, and operating statistics stay in the device’s own EEPROM. What changed in version 2 is that the door is no longer open. The first version used a public broker with fixed topics shared by every unit, so anyone who knew the topic could change the dose. Now the broker is configurable, TLS is on by default, credentials sit in the phone’s Keystore or Keychain, and each device lives under its own topic.',
        'The second change is that a command is not finished when the broker accepts it. Every command carries a random id and a timestamp; the app shows a summary first, publishes, then waits for a status message that echoes the id back. If none arrives within eight seconds the operator is told the command was sent but not confirmed — instead of assuming it worked. The old JSON keys were kept, so the firmware only has to move topics and start acknowledging.',
      ],
      id: [
        'Pupuk itu mahal dan mudah terbuang. Perangkat ini menakarnya berdasarkan komoditas, bukan kebiasaan: operator memilih tanaman yang digarap, aplikasi menghitung dosis per tanaman, lalu alat menabur tepat sebanyak itu di setiap titik.',
        'Arsitekturnya tetap sengaja tanpa server. Aplikasi Flutter dan ESP32 saling berbicara lewat broker MQTT sebagai dua peer — tidak ada back end yang harus dijaga, tidak ada tagihan basis data, dan statistik operasional tetap tersimpan di EEPROM perangkat. Yang berubah di versi 2: pintunya tidak lagi terbuka. Versi pertama memakai broker publik dengan topik tetap yang sama untuk semua unit, sehingga siapa pun yang tahu topiknya bisa mengubah dosis. Kini broker bisa diatur, TLS aktif bawaan, kredensial disimpan di Keystore atau Keychain ponsel, dan setiap alat punya topiknya sendiri.',
        'Perubahan kedua: perintah belum selesai hanya karena broker menerimanya. Setiap perintah membawa id acak dan timestamp; aplikasi menampilkan ringkasan dulu, mengirim, lalu menunggu pesan status yang memantulkan id tersebut. Jika tidak datang dalam delapan detik, operator diberi tahu bahwa perintah terkirim tetapi belum dikonfirmasi — bukan dianggap berhasil. Kunci JSON lama dipertahankan, jadi firmware cukup pindah topik dan mulai mengirim konfirmasi.',
      ],
    },
    features: {
      en: [
        'Rule-based dose recommendation for 13 crops by days after planting, for NPK or Urea, with the plant count estimated from field area and spacing.',
        'Doses outside what the dispenser can deliver (5–50 g per point) are blocked with an explanation instead of being sent.',
        'Every command is reviewed in a summary sheet and confirmed by the device, with a clear “sent, not confirmed yet” state.',
        'Configurable broker with TLS and credentials; the password is kept in Keystore/Keychain and never shown again.',
        'Live device status — online, offline, disconnected or not set up — with automatic reconnect that backs off but never gives up.',
        'Usage statistics from the device with a live chart, plus manual dosing for when the operator overrules the recommendation.',
        'Onboarding, a searchable in-app guide and FAQ, and a help button on every screen that opens its own section.',
        'One Flutter codebase serving Android, iOS, web and desktop.',
      ],
      id: [
        'Rekomendasi dosis berbasis aturan untuk 13 komoditas menurut HST, untuk NPK atau Urea, dengan jumlah tanaman diperkirakan dari luas lahan dan jarak tanam.',
        'Dosis di luar kemampuan alat (5–50 g per titik) diblokir dengan penjelasan, bukan dikirim.',
        'Setiap perintah ditinjau lewat lembar ringkasan dan dikonfirmasi alat, dengan status “terkirim, belum dikonfirmasi” yang jelas.',
        'Broker bisa diatur dengan TLS dan kredensial; password disimpan di Keystore/Keychain dan tidak pernah ditampilkan ulang.',
        'Status alat langsung — online, offline, terputus, atau belum diatur — dengan reconnect otomatis yang makin jarang tetapi tidak pernah menyerah.',
        'Statistik pemakaian dari alat dengan grafik langsung, serta dosis manual saat operator ingin menolak rekomendasi.',
        'Onboarding, panduan dan FAQ dalam aplikasi yang bisa dicari, serta tombol bantuan di setiap layar yang membuka bagiannya sendiri.',
        'Satu basis kode Flutter melayani Android, iOS, web, dan desktop.',
      ],
    },
    notes: [
      { k: { en: 'Broker', id: 'Broker' }, v: { en: 'Configurable; TLS on 8883 (WSS 8084 on web), username/password', id: 'Bisa diatur; TLS di 8883 (WSS 8084 di web), username/password' } },
      { k: { en: 'Topics', id: 'Topik' }, v: { en: 'ferticore/<device-id>/status and /command, one device per topic', id: 'ferticore/<id-alat>/status dan /command, satu alat per topik' } },
      { k: { en: 'Commands', id: 'Perintah' }, v: { en: 'Random id + timestamp, acknowledged by the device within 8 s', id: 'Id acak + timestamp, dikonfirmasi alat dalam 8 dtk' } },
      { k: { en: 'State', id: 'Status' }, v: { en: 'Provider for app state; EEPROM for device statistics', id: 'Provider untuk status aplikasi; EEPROM untuk statistik perangkat' } },
      { k: { en: 'Back end', id: 'Back end' }, v: { en: 'None — app and device are MQTT peers', id: 'Tidak ada — aplikasi dan perangkat adalah peer MQTT' } },
    ],
    media: [
      {
        src: { en: 'projects/ferticore/en/01-cover.png', id: 'projects/ferticore/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'FertiCore title with the v2 dashboard on a phone and in a desktop browser: a 15.0 g active dose, device status tiles and a secured broker.', id: 'Judul FertiCore dengan dasbor v2 di ponsel dan browser desktop: dosis aktif 15,0 g, ubin status alat, dan broker yang diamankan.' },
        caption: { en: 'One Flutter codebase on phone, web and desktop. Mockups redrawn from the app with sample values; the app UI is in Indonesian.', id: 'Satu basis kode Flutter di ponsel, web, dan desktop. Mockup digambar ulang dari aplikasi dengan nilai contoh.' },
      },
      {
        src: { en: 'projects/ferticore/en/02-recommendation.png', id: 'projects/ferticore/id/02-recommendation.png' }, width: 1200, height: 1200,
        alt: { en: 'The recommendation screen for dragon fruit, NPK, 900 m² and 120 days after planting, next to four steps ending in a device range check, the MQTT command, and a blocked 1,325 g avocado dose.', id: 'Layar rekomendasi untuk buah naga, NPK, 900 m², dan 120 HST, di samping empat langkah yang diakhiri cek rentang alat, perintah MQTT, dan dosis alpukat 1.325 g yang diblokir.' },
        caption: { en: 'From crop and age to grams per plant — and a dose the device cannot dispense is blocked, not sent.', id: 'Dari tanaman dan umur ke gram per tanaman — dan dosis yang tidak sanggup ditabur alat diblokir, bukan dikirim.' },
      },
      {
        src: { en: 'projects/ferticore/en/03-knowledge-base.png', id: 'projects/ferticore/id/03-knowledge-base.png' }, width: 1200, height: 1200,
        alt: { en: 'Table of 13 crops with planting spacing and dose bands by days after planting; bands within the device’s 5–50 g range are highlighted green.', id: 'Tabel 13 komoditas dengan jarak tanam dan rentang dosis menurut HST; rentang yang masuk kemampuan alat 5–50 g ditandai hijau.' },
        caption: { en: 'The full knowledge base: one row per crop, one band per growth stage, with no gaps between stages.', id: 'Knowledge base lengkap: satu baris per komoditas, satu rentang per tahap tumbuh, tanpa celah antar-tahap.' },
      },
      {
        src: { en: 'projects/ferticore/en/04-mqtt.png', id: 'projects/ferticore/id/04-mqtt.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: Flutter app, TLS-secured MQTT broker and ESP32 as peers, with per-device topics, the status payload with ack, the three commands with id and timestamp, four connection states, and the command lifecycle.', id: 'Diagram: aplikasi Flutter, broker MQTT ber-TLS, dan ESP32 sebagai peer, dengan topik per alat, payload status ber-ack, tiga perintah ber-id dan timestamp, empat status koneksi, dan alur perintah.' },
        caption: { en: 'Still no server in the middle — now with TLS, broker credentials, per-device topics and commands the device confirms.', id: 'Tetap tanpa server di tengah — kini dengan TLS, login broker, topik per alat, dan perintah yang dikonfirmasi alat.' },
      },
      {
        src: { en: 'projects/ferticore/en/05-screens.png', id: 'projects/ferticore/id/05-screens.png' }, width: 1200, height: 1200,
        alt: { en: 'Three phone screens: manual dosing with a confirmation sheet, statistics with a live chart, and the searchable in-app guide.', id: 'Tiga layar ponsel: dosis manual dengan lembar konfirmasi, statistik dengan grafik langsung, dan panduan dalam aplikasi yang bisa dicari.' },
        caption: { en: 'Review a dose before it is sent, watch usage build up, and find help on every screen.', id: 'Tinjau dosis sebelum dikirim, pantau pemakaian, dan temukan bantuan di setiap layar.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'pestzone-spray',
    codename: 'Pestzone Spray',
    categories: ['mobile', 'iot'],
    year: '2026',
    title: { en: 'Pestzone — Pest Trap & Watering Control', id: 'Pestzone — Kendali Perangkap Hama & Penyiraman' },
    summary: {
      en: 'A Flutter app for UV pest traps and automatic watering, built so a command issued with no signal still lands once the connection returns.',
      id: 'Aplikasi Flutter untuk perangkap hama UV dan penyiraman otomatis, dibuat agar perintah yang dikirim tanpa sinyal tetap sampai begitu koneksi pulih.',
    },
    role: { en: 'Sole developer.', id: 'Pengembang tunggal.' },
    spec: [
      { k: { en: 'Control', id: 'Kendali' }, v: { en: 'UV pest lights and water pump toggled remotely', id: 'Lampu hama UV dan pompa air dinyalakan dari jarak jauh' } },
      { k: { en: 'Telemetry', id: 'Telemetri' }, v: { en: 'Battery, network and operational health per device', id: 'Baterai, jaringan, dan kesehatan operasional tiap perangkat' } },
      { k: { en: 'Resilience', id: 'Ketahanan' }, v: { en: 'Commands queued offline and flushed on reconnect', id: 'Perintah diantrikan saat luring dan dikirim saat tersambung' } },
    ],
    stack: ['Flutter', 'Dart', 'MQTT', 'Provider', 'fl_chart', 'SharedPreferences'],
    repo: 'https://github.com/aamnnr/pestzone-spray-app',
    overview: {
      en: [
        'Greenhouses and open plots are exactly the places where mobile signal is worst, which is inconvenient for an app whose entire job is sending commands. Rather than failing the tap, the app queues it: the instruction is saved on the phone — on disk, so it survives the app being closed — and flushed in order the moment the broker is reachable again. The operator presses the button once, not five times.',
        'Devices are never registered by hand. The app listens on a wildcard telemetry topic, so any unit that reports in appears with its battery, day/night state and switch positions. When a unit needs a new network, the app sends it a reset; it restarts as its own setup access point, and the Wi-Fi is chosen from a browser at 192.168.4.1.',
      ],
      id: [
        'Rumah kaca dan lahan terbuka justru tempat dengan sinyal seluler terburuk, dan itu merepotkan bagi aplikasi yang seluruh tugasnya mengirim perintah. Alih-alih menggagalkan ketukan, aplikasi mengantrikannya: instruksi disimpan lokal dan dikirim begitu broker kembali terjangkau. Operator menekan tombol sekali, bukan lima kali.',
        'Perangkat tidak pernah didaftarkan manual. Aplikasi mendengarkan topik telemetri wildcard, sehingga unit apa pun yang melapor langsung muncul beserta baterai, status siang/malam, dan posisi sakelarnya. Saat unit perlu jaringan baru, aplikasi mengirim perintah reset; unit restart sebagai access point setup, lalu Wi-Fi dipilih lewat browser di 192.168.4.1.',
      ],
    },
    features: {
      en: [
        'Real-time battery level, network status and device health.',
        'Manual toggles for UV attraction lights and the water pump.',
        'One-off watering by duration, plus daily schedules for the UV light and the pump.',
        'Battery trend chart (fl_chart) and an activity log per device, kept on the phone.',
        'Wi-Fi reset that sends a unit back to its setup access point.',
        'Offline command queue that flushes on reconnect.',
        'Light and dark themes.',
      ],
      id: [
        'Level baterai, status jaringan, dan kesehatan perangkat secara waktu nyata.',
        'Sakelar manual untuk lampu penarik hama UV dan pompa air.',
        'Penyiraman khusus berdasarkan durasi, serta jadwal harian untuk lampu UV dan pompa.',
        'Grafik tren baterai (fl_chart) dan log aktivitas per perangkat, tersimpan di HP.',
        'Reset Wi-Fi yang mengembalikan unit ke access point setup.',
        'Antrean perintah luring yang dikirim ulang saat tersambung.',
        'Tema terang dan gelap.',
      ],
    },
    notes: [
      { k: { en: 'Telemetry topic', id: 'Topik telemetri' }, v: { en: 'tanisolution/+/telemetry', id: 'tanisolution/+/telemetry' } },
      { k: { en: 'Command topic', id: 'Topik perintah' }, v: { en: 'tanisolution/{device_id}/command', id: 'tanisolution/{device_id}/command' } },
      { k: { en: 'Payload', id: 'Muatan' }, v: { en: 'JSON — e.g. {"bat":85,"is_night":true,"uv":1,"pump":0}', id: 'JSON — mis. {"bat":85,"is_night":true,"uv":1,"pump":0}' } },
    ],
    media: [
      {
        src: { en: 'projects/pestzone-spray/en/01-cover.png', id: 'projects/pestzone-spray/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Pestzone Spray title with three phones: the home screen in light and dark mode, and the control screen.', id: 'Judul Pestzone Spray dengan tiga ponsel: beranda mode terang dan gelap, serta layar kontrol.' },
        caption: { en: 'Device list with battery and switches, in light and dark themes. Mockups redrawn with sample devices; the app UI is in Indonesian.', id: 'Daftar perangkat dengan baterai dan sakelar, dalam tema terang dan gelap. Mockup digambar ulang dengan perangkat contoh.' },
      },
      {
        src: { en: 'projects/pestzone-spray/en/02-offline-queue.png', id: 'projects/pestzone-spray/id/02-offline-queue.png' }, width: 1200, height: 1200,
        alt: { en: 'The home screen with the broker disconnected and a “will be processed when the device is active” message, next to the four steps of the offline command queue.', id: 'Beranda dengan broker terputus dan pesan “akan diproses saat alat aktif”, di samping empat langkah antrean perintah luring.' },
        caption: { en: 'A tap with no signal is saved to disk and sent in order on reconnect.', id: 'Ketukan tanpa sinyal disimpan ke disk dan dikirim berurutan saat tersambung lagi.' },
      },
      {
        src: { en: 'projects/pestzone-spray/en/03-control.png', id: 'projects/pestzone-spray/id/03-control.png' }, width: 1200, height: 1200,
        alt: { en: 'The control and scheduling screen next to the five JSON commands it sends: UV and pump switches, one-off watering, a UV schedule and a watering schedule.', id: 'Layar kontrol dan penjadwalan di samping lima perintah JSON yang dikirimnya: sakelar UV dan pompa, penyiraman khusus, jadwal UV, dan jadwal penyiraman.' },
        caption: { en: 'Every control is one small JSON command on the device’s own topic.', id: 'Setiap kontrol adalah satu perintah JSON kecil di topik milik perangkat.' },
      },
      {
        src: { en: 'projects/pestzone-spray/en/04-log.png', id: 'projects/pestzone-spray/id/04-log.png' }, width: 1200, height: 1200,
        alt: { en: 'The log screen with a battery trend chart and activity history, next to notes on wildcard telemetry, local storage, battery colours and online status.', id: 'Layar log dengan grafik tren baterai dan riwayat aktivitas, di samping catatan tentang telemetri wildcard, penyimpanan lokal, warna baterai, dan status online.' },
        caption: { en: 'Telemetry and events in one log, stored on the phone.', id: 'Telemetri dan event dalam satu log, tersimpan di HP.' },
      },
      {
        src: { en: 'projects/pestzone-spray/en/05-wifi-reset.png', id: 'projects/pestzone-spray/id/05-wifi-reset.png' }, width: 1200, height: 1200,
        alt: { en: 'The Wi-Fi reset screen with its confirmation dialog, next to four steps from automatic discovery to reconfiguring the device at 192.168.4.1.', id: 'Layar reset Wi-Fi dengan dialog konfirmasinya, di samping empat langkah dari penemuan otomatis hingga konfigurasi ulang perangkat di 192.168.4.1.' },
        caption: { en: 'Devices appear on their own; a Wi-Fi reset sends them back to setup mode.', id: 'Perangkat muncul sendiri; reset Wi-Fi mengembalikannya ke mode setup.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'flood-early-warning',
    codename: 'Sistem Peringatan Dini Banjir',
    categories: ['iot'],
    year: '2025',
    title: { en: 'Flood Early Warning System', id: 'Sistem Peringatan Dini Banjir' },
    summary: {
      en: 'An ultrasonic sensor over the river, a buzzer on the post and a phone app that turns centimetres into Safe, Alert, Standby or Danger.',
      id: 'Sensor ultrasonik di atas sungai, buzzer di tiang, dan aplikasi ponsel yang mengubah sentimeter menjadi Aman, Waspada, Siaga, atau Bahaya.',
    },
    role: { en: 'Device, firmware and the monitoring app.', id: 'Perangkat, firmware, dan aplikasi pemantau.' },
    spec: [
      { k: { en: 'Input', id: 'Masukan' }, v: { en: 'Ultrasonic distance from the sensor down to the water, about once a second', id: 'Jarak ultrasonik dari sensor ke permukaan air, kira-kira tiap detik' } },
      { k: { en: 'Link', id: 'Jalur' }, v: { en: 'ESP32 writes the reading straight to Firebase Realtime Database', id: 'ESP32 menulis bacaan langsung ke Firebase Realtime Database' } },
      { k: { en: 'Output', id: 'Keluaran' }, v: { en: 'Buzzer on site and a colour-coded status in the mobile app', id: 'Buzzer di lokasi dan status berwarna di aplikasi mobile' } },
    ],
    stack: ['ESP32', 'Arduino C++', 'HC-SR04', 'Buzzer', 'Firebase RTDB', 'MIT App Inventor'],
    repo: 'https://github.com/aamnnr/Sistem-Peringatan-Dini-Banjir',
    overview: {
      en: [
        'Riverside neighbourhoods usually learn about a flood from the water itself. The idea here was to hang a cheap sensor over the river and give people a few minutes of warning: the ESP32 sends an ultrasonic pulse down, times the echo, and converts it into the distance between the sensor and the surface. The smaller that distance, the higher the water.',
        'There is no server of our own in the middle. The board writes each reading to a single node in Firebase Realtime Database, overwriting the last one, so the database always holds the current state of the river. The mobile app, built with MIT App Inventor, listens for that node to change and compares the new value against the thresholds.',
        'A number in centimetres means little at two in the morning, so the app reduces it to one word and one colour — Safe, Alert, Standby, Danger — next to the live distance and a water gauge. A buzzer on the post covers the people who are not looking at a phone, sounding more urgently as the level climbs.',
      ],
      id: [
        'Warga di bantaran sungai biasanya tahu ada banjir dari airnya sendiri. Gagasannya adalah menggantung sensor murah di atas sungai dan memberi warga beberapa menit peringatan: ESP32 mengirim pulsa ultrasonik ke bawah, mengukur waktu pantulannya, lalu mengubahnya menjadi jarak antara sensor dan permukaan air. Makin kecil jaraknya, makin tinggi airnya.',
        'Tidak ada server sendiri di tengahnya. Board menulis setiap bacaan ke satu node di Firebase Realtime Database, menimpa bacaan sebelumnya, sehingga database selalu memegang kondisi sungai saat ini. Aplikasi mobile yang dibuat dengan MIT App Inventor mendengarkan perubahan node itu dan membandingkan nilai barunya dengan ambang batas.',
        'Angka sentimeter tidak banyak berarti pukul dua pagi, jadi aplikasi meringkasnya menjadi satu kata dan satu warna — Aman, Waspada, Siaga, Bahaya — di samping jarak live dan gambar ketinggian air. Buzzer di tiang menjangkau warga yang tidak sedang memegang ponsel, berbunyi makin mendesak seiring naiknya air.',
      ],
    },
    features: {
      en: [
        'Ultrasonic distance measurement from above the water, so nothing sits in the river.',
        'Readings written to Firebase Realtime Database about once a second.',
        'Mobile app that reacts to each change and shows the live distance and a water gauge.',
        'Four colour-coded statuses: Safe, Alert, Standby and Danger.',
        'Buzzer on site for people without a phone at hand.',
      ],
      id: [
        'Pengukuran jarak ultrasonik dari atas air, sehingga tidak ada yang dipasang di dalam sungai.',
        'Bacaan ditulis ke Firebase Realtime Database kira-kira tiap detik.',
        'Aplikasi mobile yang bereaksi pada setiap perubahan dan menampilkan jarak live serta indikator ketinggian air.',
        'Empat status berwarna: Aman, Waspada, Siaga, dan Bahaya.',
        'Buzzer di lokasi untuk warga yang tidak sedang memegang ponsel.',
      ],
    },
    notes: [
      { k: { en: 'Firebase path', id: 'Path Firebase' }, v: { en: '/kondisi — {"jarak": 87}', id: '/kondisi — {"jarak": 87}' } },
      { k: { en: 'Formula', id: 'Rumus' }, v: { en: 'distance = echo time × 0.0343 / 2 (cm)', id: 'jarak = durasi pantulan × 0,0343 / 2 (cm)' } },
      { k: { en: 'Status', id: 'Status' }, v: { en: 'The original app is no longer available; images are illustrations', id: 'Aplikasi aslinya sudah tidak tersedia; gambar berupa ilustrasi' } },
    ],
    media: [
      {
        src: { en: 'projects/flood-early-warning/en/01-cover.png', id: 'projects/flood-early-warning/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Flood Early Warning System title next to an illustrated river with an ultrasonic sensor on a post, and a phone showing 87 cm and the status WASPADA.', id: 'Judul Sistem Peringatan Dini Banjir di samping ilustrasi sungai dengan sensor ultrasonik di tiang, dan ponsel yang menampilkan 87 cm dan status WASPADA.' },
        caption: { en: 'Illustration: the original app is no longer available, and the thresholds are example values. The app UI is in Indonesian.', id: 'Ilustrasi: aplikasi aslinya sudah tidak tersedia, dan ambang batasnya adalah nilai contoh.' },
      },
      {
        src: { en: 'projects/flood-early-warning/en/02-data-flow.png', id: 'projects/flood-early-warning/id/02-data-flow.png' }, width: 1200, height: 1200,
        alt: { en: 'Three steps — ESP32 measures, Firebase stores /kondisi, the app compares thresholds — above a river cross-section with the sensor measuring distance down to the water.', id: 'Tiga langkah — ESP32 mengukur, Firebase menyimpan /kondisi, aplikasi membandingkan ambang — di atas penampang sungai dengan sensor yang mengukur jarak ke permukaan air.' },
        caption: { en: 'The device only measures; Firebase holds the latest value and the app decides the status.', id: 'Perangkat hanya mengukur; Firebase memegang nilai terbaru dan aplikasi menentukan statusnya.' },
      },
      {
        src: { en: 'projects/flood-early-warning/en/03-status.png', id: 'projects/flood-early-warning/id/03-status.png' }, width: 1200, height: 1200,
        alt: { en: 'Four phones showing 142, 87, 44 and 21 cm as Aman, Waspada, Siaga and Bahaya, each with what it means and how the buzzer behaves.', id: 'Empat ponsel yang menampilkan 142, 87, 44, dan 21 cm sebagai Aman, Waspada, Siaga, dan Bahaya, masing-masing dengan artinya dan perilaku buzzer.' },
        caption: { en: 'One word and one colour per level, with example thresholds.', id: 'Satu kata dan satu warna per tingkatan, dengan ambang contoh.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'face-attendance-knn',
    codename: 'Sistem Presensi Pengenalan Wajah',
    categories: ['ml', 'iot', 'web'],
    year: '2025',
    title: { en: 'Face Recognition Attendance (KNN)', id: 'Presensi Pengenalan Wajah (KNN)' },
    summary: {
      en: 'Attendance taken from a face, with blink and smile checks so a photograph cannot sign in on someone’s behalf.',
      id: 'Presensi diambil dari wajah, dengan pemeriksaan kedipan dan senyum agar sebuah foto tidak bisa menitipkan absen.',
    },
    role: { en: 'Recognition model, camera program, Flask admin and PHP API.', id: 'Model pengenalan, program kamera, admin Flask, dan API PHP.' },
    spec: [
      { k: { en: 'Model', id: 'Model' }, v: { en: 'KNN (k = 3) on 128 × 128 face pixels, with a cosine-distance gate for strangers', id: 'KNN (k = 3) atas piksel wajah 128 × 128, dengan gerbang jarak cosine untuk orang asing' } },
      { k: { en: 'Liveness', id: 'Keaslian' }, v: { en: 'Blink (eye aspect ratio from dlib landmarks) and smile, both required', id: 'Kedipan (eye aspect ratio dari landmark dlib) dan senyum, keduanya wajib' } },
      { k: { en: 'Rules', id: 'Aturan' }, v: { en: 'On time or late with duration; early check-out recorded as such', id: 'Tepat waktu atau terlambat beserta durasinya; pulang lebih awal dicatat apa adanya' } },
    ],
    stack: ['Python', 'OpenCV', 'scikit-learn', 'dlib', 'Flask', 'PHP', 'MySQL'],
    repo: 'https://github.com/aamnnr/k-nearest-neighbor-face-recognition',
    overview: {
      en: [
        'Every attendance system is really an anti-cheating system wearing a friendly interface. Recognition alone does not get you there — a printed photo held up to a webcam recognises perfectly well. So the system asks the face to do something a photograph cannot: blink, and smile. Only then does it accept the match.',
        'The rest is bookkeeping done honestly. Check-in up to the start time counts as on time; after that it is recorded as late, with exactly how late; once closing time has passed, a check-in is refused. A check-out before closing is accepted but recorded as early, with the duration, rather than quietly passing as a normal day. The result is read aloud so the person knows what was stored.',
        'A Flask web interface sits on top so an administrator can enrol people, capture or re-capture their face data, edit or remove them, and export a daily recap to Excel. Both the camera program and the admin reach MySQL through a small PHP API that requires an API key, and the face samples themselves never leave the machine.',
      ],
      id: [
        'Setiap sistem presensi sebenarnya adalah sistem antikecurangan yang mengenakan antarmuka ramah. Pengenalan saja tidak cukup — foto cetak yang diangkat ke depan webcam dikenali dengan sempurna. Maka sistem meminta wajah itu melakukan sesuatu yang tak bisa dilakukan foto: berkedip dan tersenyum. Baru setelah itu kecocokan diterima.',
        'Selebihnya adalah pembukuan yang dikerjakan jujur. Absen sampai jam masuk dihitung tepat waktu; setelahnya dicatat terlambat, lengkap dengan berapa lamanya; begitu jam pulang lewat, absen masuk ditolak. Absen pulang sebelum jam pulang tetap diterima, tetapi dicatat sebagai pulang lebih awal beserta durasinya, bukan diam-diam dianggap hari biasa. Hasilnya dibacakan agar orang tahu apa yang tersimpan.',
        'Antarmuka web Flask berada di atasnya agar administrator dapat mendaftarkan orang, mengambil atau mengambil ulang data wajah, mengubah atau menghapus pengguna, dan mengekspor rekap harian ke Excel. Program kamera dan admin sama-sama mengakses MySQL lewat API PHP kecil yang mewajibkan API key, dan sampel wajah tidak pernah meninggalkan komputer.',
      ],
    },
    features: {
      en: [
        'Face detection with a Haar cascade and recognition with KNN; unknown faces are turned away by a cosine-distance threshold.',
        'Blink and smile detection as a liveness check.',
        'Check-in and check-out decided by one pure, unit-tested rules function.',
        'Spoken feedback in Indonesian for every result.',
        'Enrolment capturing personal data and 100 face samples, with re-capture later.',
        'Editing and deletion of users, including their records and face data.',
        'Daily attendance recap by date, exported to Excel.',
      ],
      id: [
        'Deteksi wajah dengan Haar cascade dan pengenalan dengan KNN; wajah asing ditolak lewat ambang jarak cosine.',
        'Deteksi kedipan mata dan senyum sebagai pemeriksaan keaslian.',
        'Absen masuk dan pulang diputuskan oleh satu fungsi aturan murni yang diuji.',
        'Umpan balik suara berbahasa Indonesia untuk setiap hasil.',
        'Pendaftaran yang merekam data diri dan 100 sampel wajah, dengan ambil ulang kemudian.',
        'Penyuntingan dan penghapusan pengguna beserta catatan dan data wajahnya.',
        'Rekap presensi harian per tanggal, bisa diekspor ke Excel.',
      ],
    },
    notes: [
      { k: { en: 'Times', id: 'Jam' }, v: { en: 'JAM_MASUK and JAM_PULANG set in .env (default 08:00 and 16:00)', id: 'JAM_MASUK dan JAM_PULANG diatur di .env (bawaan 08:00 dan 16:00)' } },
      { k: { en: 'Refused', id: 'Ditolak' }, v: { en: 'Check-in after closing time, and any scan once both are recorded', id: 'Absen masuk setelah jam pulang, dan scan apa pun bila masuk dan pulang sudah tercatat' } },
      { k: { en: 'Privacy', id: 'Privasi' }, v: { en: 'Face samples kept locally as .npz; the repository holds no biometric data', id: 'Sampel wajah disimpan lokal sebagai .npz; repository tidak berisi data biometrik' } },
    ],
    media: [
      {
        src: { en: 'projects/face-attendance-knn/en/01-cover.png', id: 'projects/face-attendance-knn/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'The “Absen Anti Nitip” camera window recognising a face with both smile and blink checks passed, next to the daily attendance recap in the Flask app.', id: 'Jendela kamera “Absen Anti Nitip” yang mengenali wajah dengan pemeriksaan senyum dan kedip lolos, di samping rekap presensi harian di aplikasi Flask.' },
        caption: { en: 'The camera station and the admin recap. Redrawn with an illustrated face and sample data; the app UI is in Indonesian.', id: 'Stasiun kamera dan rekap admin. Digambar ulang dengan wajah ilustrasi dan data contoh.' },
      },
      {
        src: { en: 'projects/face-attendance-knn/en/02-recognition.png', id: 'projects/face-attendance-knn/id/02-recognition.png' }, width: 1200, height: 1200,
        alt: { en: 'Four steps — detect, crop to 128 × 128, flatten to 49,152 values, classify with KNN — above the cosine-distance gate for unknown faces and the enrolment details.', id: 'Empat langkah — deteksi, potong ke 128 × 128, ratakan jadi 49.152 nilai, klasifikasi dengan KNN — di atas gerbang jarak cosine untuk wajah asing dan detail pendaftaran.' },
        caption: { en: 'KNN always picks someone, so a separate distance check decides whether the face is known at all.', id: 'KNN selalu memilih seseorang, jadi pemeriksaan jarak terpisah menentukan apakah wajah itu dikenal.' },
      },
      {
        src: { en: 'projects/face-attendance-knn/en/03-liveness.png', id: 'projects/face-attendance-knn/id/03-liveness.png' }, width: 1200, height: 1200,
        alt: { en: 'Eye landmarks and the eye-aspect-ratio formula, a chart of the ratio dipping below 0.2 during a blink, and three cases: a printed photo, a person yet to blink, and a person who blinked and smiled.', id: 'Landmark mata dan rumus eye aspect ratio, grafik rasio yang turun di bawah 0,2 saat berkedip, dan tiga kasus: foto cetak, orang yang belum berkedip, dan orang yang sudah berkedip dan tersenyum.' },
        caption: { en: 'A photo can’t blink: nothing is recorded until a blink and a smile are both seen.', id: 'Foto tidak bisa berkedip: tidak ada yang dicatat sampai kedipan dan senyum sama-sama terlihat.' },
      },
      {
        src: { en: 'projects/face-attendance-knn/en/04-attendance-rules.png', id: 'projects/face-attendance-knn/id/04-attendance-rules.png' }, width: 1200, height: 1200,
        alt: { en: 'Timelines for check-in and check-out around 08:00 and 16:00, example scans with their statuses, and the spoken messages.', id: 'Garis waktu absen masuk dan pulang di sekitar 08:00 dan 16:00, contoh scan beserta statusnya, dan pesan yang dibacakan.' },
        caption: { en: 'One pure function turns the clock and today’s record into a status and a spoken message.', id: 'Satu fungsi murni mengubah jam dan catatan hari ini menjadi status dan pesan suara.' },
      },
      {
        src: { en: 'projects/face-attendance-knn/en/05-architecture.png', id: 'projects/face-attendance-knn/id/05-architecture.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: the camera program and the Flask admin call a PHP API with an API key, which writes to MySQL; below, the user management page.', id: 'Diagram: program kamera dan admin Flask memanggil API PHP dengan API key, yang menulis ke MySQL; di bawahnya, halaman kelola pengguna.' },
        caption: { en: 'Two clients, one small PHP API, one MySQL database — and face data that stays on the machine.', id: 'Dua klien, satu API PHP kecil, satu database MySQL — dan data wajah yang tetap di komputer.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'rfid-esp32cam-attendance',
    codename: 'Presensi RFID + ESP32-CAM',
    categories: ['iot', 'web'],
    year: '2025',
    title: { en: 'RFID + ESP32-CAM Attendance', id: 'Presensi RFID + ESP32-CAM' },
    summary: {
      en: 'A card proves who you claim to be; the camera records who actually tapped it. Two weak signals combined into one credible record.',
      id: 'Kartu membuktikan siapa yang Anda klaim; kamera merekam siapa yang benar-benar menempelkannya. Dua sinyal lemah digabung menjadi satu catatan yang meyakinkan.',
    },
    role: { en: 'Sole developer — wiring, both firmwares and the PHP admin panel.', id: 'Pengembang tunggal — rangkaian, kedua firmware, dan panel admin PHP.' },
    spec: [
      { k: { en: 'Identity', id: 'Identitas' }, v: { en: 'MFRC522 reader and 16×2 LCD on an ESP8266 terminal', id: 'Reader MFRC522 dan LCD 16×2 pada terminal ESP8266' } },
      { k: { en: 'Evidence', id: 'Bukti' }, v: { en: 'ESP32-CAM photographs every accepted tap', id: 'ESP32-CAM memotret setiap tap yang diterima' } },
      { k: { en: 'Rules', id: 'Aturan' }, v: { en: 'One PHP function checks the timetable for the device and the browser kiosk', id: 'Satu fungsi PHP memeriksa jadwal untuk perangkat dan kiosk browser' } },
    ],
    stack: ['ESP8266', 'ESP32-CAM', 'MFRC522', 'Arduino C++', 'PHP', 'MySQL', 'Bootstrap 4'],
    repo: 'https://github.com/aamnnr/rfid-esp32-attendance',
    overview: {
      en: [
        'An RFID card is a strong claim about which card was present and a very weak claim about who was holding it. Face recognition is the reverse — good at identifying a person, expensive and brittle as a gate. Pairing them sidesteps both: the card does the identifying, and a camera simply records who was standing there, leaving a photo on every entry that anyone can check later. The photo is deliberately not run through a recognition model; knowing it is taken is enough to make lending a card unattractive, and it keeps the terminal cheap.',
        'The terminal is two boards. An ESP8266 owns the MFRC522 reader, the LCD and the buzzer; it sends the card’s UID to the server with a device key and prints whatever two lines come back. Only when the server answers 200 does it pull one pin low for half a second — a wire to the ESP32-CAM, which takes a picture and uploads it. The server stores the attendance with a “waiting for photo” flag and pairs the upload with the newest record still waiting, as long as it is less than two minutes old.',
        'The rules live in one PHP function shared by the device endpoint and a browser kiosk that uses a USB reader and a webcam instead. Check-in opens an hour before class, counts as late after the start time, and check-out opens at the end of the day; a weekday whose start equals its end is a holiday. Every outcome — unknown card, outside hours, too early, already done — has a short answer that fits a 16×2 LCD and an HTTP status the firmware can act on.',
        'The admin panel manages students, classes, weekly timetables and records, and shows the enrolled photo beside the check-in and check-out shots. New cards are enrolled by tapping them: the server remembers unknown UIDs, and the student form has a button that fills in the last one. Monthly reports per class export to Excel or print.',
      ],
      id: [
        'Kartu RFID adalah klaim kuat tentang kartu mana yang hadir, dan klaim sangat lemah tentang siapa yang memegangnya. Pengenalan wajah kebalikannya — bagus untuk mengenali orang, mahal dan rapuh sebagai gerbang. Memasangkan keduanya menghindari kelemahan masing-masing: kartu yang mengidentifikasi, dan kamera cukup merekam siapa yang berdiri di sana, meninggalkan foto pada setiap entri yang bisa diperiksa kapan saja. Foto itu sengaja tidak dilewatkan ke model pengenalan; tahu bahwa dirinya difoto sudah cukup membuat orang enggan meminjamkan kartu, dan terminal tetap murah.',
        'Terminalnya terdiri dari dua board. ESP8266 memegang reader MFRC522, LCD, dan buzzer; ia mengirim UID kartu ke server bersama device key dan menampilkan dua baris balasan apa pun yang kembali. Hanya ketika server menjawab 200, ia menarik satu pin ke LOW selama setengah detik — kabel ke ESP32-CAM, yang lalu memotret dan mengunggah fotonya. Server menyimpan presensi dengan penanda “menunggu foto” dan memasangkan unggahan ke rekap terbaru yang masih menunggu, selama umurnya belum dua menit.',
        'Aturannya ada di satu fungsi PHP yang dipakai bersama oleh endpoint perangkat dan kiosk browser yang memakai reader USB dan webcam. Presensi masuk dibuka satu jam sebelum jam masuk, dihitung terlambat setelah jam masuk, dan presensi pulang dibuka pada jam pulang; hari dengan jam masuk sama dengan jam pulang berarti libur. Setiap hasil — kartu tak dikenal, di luar jam, belum waktunya, sudah absen — punya jawaban singkat yang muat di LCD 16×2 dan status HTTP yang bisa ditindaklanjuti firmware.',
        'Panel admin mengelola siswa, kelas, jadwal mingguan, dan rekap, serta menampilkan foto pendaftaran di samping foto masuk dan pulang. Kartu baru didaftarkan dengan menempelkannya: server mengingat UID yang belum dikenal, dan form siswa punya tombol yang mengisi kartu terakhir. Laporan bulanan per kelas bisa diekspor ke Excel atau dicetak.',
      ],
    },
    features: {
      en: [
        'RFID tap on an ESP8266 + MFRC522 terminal with a 16×2 LCD and a buzzer.',
        'ESP32-CAM photo for every accepted tap, paired to the record on the server.',
        'Timetable validation: early window, late after the start time, check-out from the end time, holidays.',
        'Browser kiosk with a USB reader and webcam as a no-hardware fallback, using the same rules.',
        'Student, class, weekly timetable and record management, with manual status correction.',
        'Record detail with the enrolled photo beside the check-in and check-out photos.',
        'Card enrolment by tapping: unknown UIDs are remembered and filled in with one click.',
        'Monthly report per class, exported to Excel or printed.',
        'Device endpoints guarded by a shared X-Device-Key; admin forms protected with CSRF tokens.',
      ],
      id: [
        'Tap RFID pada terminal ESP8266 + MFRC522 dengan LCD 16×2 dan buzzer.',
        'Foto ESP32-CAM untuk setiap tap yang diterima, dipasangkan ke rekap di server.',
        'Validasi jadwal: jendela awal, terlambat setelah jam masuk, pulang mulai jam pulang, dan hari libur.',
        'Kiosk browser dengan reader USB dan webcam sebagai alternatif tanpa perangkat keras, dengan aturan yang sama.',
        'Manajemen siswa, kelas, jadwal mingguan, dan rekap, termasuk koreksi status manual.',
        'Detail rekap dengan foto pendaftaran di samping foto masuk dan pulang.',
        'Pendaftaran kartu cukup dengan menempel: UID baru diingat dan diisi dengan satu klik.',
        'Laporan bulanan per kelas, bisa diekspor ke Excel atau dicetak.',
        'Endpoint perangkat dijaga X-Device-Key bersama; form admin dilindungi token CSRF.',
      ],
    },
    notes: [
      { k: { en: 'Device API', id: 'API perangkat' }, v: { en: 'GET api/esp.php?Data=<UID> → "line 1|line 2"; 200 recorded, 404 unknown card, 409 refused', id: 'GET api/esp.php?Data=<UID> → "baris 1|baris 2"; 200 tercatat, 404 kartu tak dikenal, 409 ditolak' } },
      { k: { en: 'Photo', id: 'Foto' }, v: { en: 'POST api/upload.php (imageFile); paired within 120 seconds', id: 'POST api/upload.php (imageFile); dipasangkan dalam 120 detik' } },
      { k: { en: 'Trigger', id: 'Pemicu' }, v: { en: 'ESP8266 D3 → ESP32-CAM GPIO13, LOW for 500 ms, shared ground', id: 'ESP8266 D3 → ESP32-CAM GPIO13, LOW selama 500 ms, ground bersama' } },
    ],
    media: [
      {
        src: { en: 'projects/rfid-esp32cam-attendance/en/01-cover.png', id: 'projects/rfid-esp32cam-attendance/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'An RFID terminal with an ESP32-CAM on top showing “Selamat Datang, Budi Santoso”, a student card, the check-in photo and the admin dashboard.', id: 'Terminal RFID dengan ESP32-CAM di atasnya menampilkan “Selamat Datang, Budi Santoso”, kartu pelajar, foto masuk, dan dasbor admin.' },
        caption: { en: 'Illustration: the terminal and the PHP panel redrawn with illustrated faces and sample data; the UI is in Indonesian.', id: 'Ilustrasi: terminal dan panel PHP digambar ulang dengan wajah ilustrasi dan data contoh.' },
      },
      {
        src: { en: 'projects/rfid-esp32cam-attendance/en/02-one-tap.png', id: 'projects/rfid-esp32cam-attendance/id/02-one-tap.png' }, width: 1200, height: 1200,
        alt: { en: 'Five steps from card tap to stored photo: the GET request, the server’s LCD reply, the waiting flag, the D3 to GPIO13 trigger, and the photo upload.', id: 'Lima langkah dari tap kartu hingga foto tersimpan: request GET, balasan LCD dari server, penanda menunggu, pemicu D3 ke GPIO13, dan unggahan foto.' },
        caption: { en: 'One wire tells the camera when to shoot; the server pairs the photo with the waiting record.', id: 'Satu kabel memberi tahu kamera kapan memotret; server memasangkan foto dengan rekap yang menunggu.' },
      },
      {
        src: { en: 'projects/rfid-esp32cam-attendance/en/03-rules.png', id: 'projects/rfid-esp32cam-attendance/id/03-rules.png' }, width: 1200, height: 1200,
        alt: { en: 'A timeline from 06:00 to 15:00 with Hadir Masuk, Hadir Terlambat and Hadir Pulang, above seven LCD messages and their HTTP status codes.', id: 'Garis waktu dari 06:00 hingga 15:00 dengan Hadir Masuk, Hadir Terlambat, dan Hadir Pulang, di atas tujuh pesan LCD beserta kode status HTTP-nya.' },
        caption: { en: 'Every outcome fits on two 16-character lines.', id: 'Setiap hasil muat dalam dua baris 16 karakter.' },
      },
      {
        src: { en: 'projects/rfid-esp32cam-attendance/en/04-hardware.png', id: 'projects/rfid-esp32cam-attendance/id/04-hardware.png' }, width: 1200, height: 1200,
        alt: { en: 'Wiring diagram: MFRC522, LCD and buzzer on the ESP8266, which triggers the ESP32-CAM through one pin, with the pin table and camera settings.', id: 'Diagram rangkaian: MFRC522, LCD, dan buzzer pada ESP8266, yang memicu ESP32-CAM lewat satu pin, beserta tabel pin dan pengaturan kamera.' },
        caption: { en: 'The ESP8266 does the talking; the ESP32-CAM only takes pictures.', id: 'ESP8266 yang berkomunikasi; ESP32-CAM hanya memotret.' },
      },
      {
        src: { en: 'projects/rfid-esp32cam-attendance/en/05-admin.png', id: 'projects/rfid-esp32cam-attendance/id/05-admin.png' }, width: 1200, height: 1200,
        alt: { en: 'The record detail page with the enrolled, check-in and check-out photos side by side, plus card enrolment by tapping and the monthly report.', id: 'Halaman detail rekap dengan foto pendaftaran, foto masuk, dan foto pulang berdampingan, serta pendaftaran kartu dengan menempel dan laporan bulanan.' },
        caption: { en: 'A borrowed card shows up as a different face. Redrawn from the panel with illustrated faces.', id: 'Kartu yang dipinjamkan terlihat dari wajah yang berbeda. Digambar ulang dari panel dengan wajah ilustrasi.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'geo-attendance',
    codename: 'Sistem Presensi Sekolah',
    categories: ['web'],
    year: '2025',
    title: { en: 'School Attendance with Geolocation', id: 'Presensi Sekolah Berbasis Geolokasi' },
    summary: {
      en: 'Attendance bound to a place. Students check in from their own phone inside a configured radius; staff run the whole school from one dashboard.',
      id: 'Presensi yang terikat pada lokasi. Siswa mengisi dari ponsel sendiri di dalam radius yang ditetapkan; sekolah mengelola semuanya dari satu dasbor.',
    },
    role: { en: 'Sole developer — Laravel back end, both interfaces and the mobile API.', id: 'Pengembang tunggal — back end Laravel, kedua antarmuka, dan API mobile.' },
    spec: [
      { k: { en: 'Constraint', id: 'Batasan' }, v: { en: 'Haversine distance checked on the server against a school point and radius set on a map', id: 'Jarak Haversine diperiksa di server terhadap titik dan radius sekolah yang diatur di peta' } },
      { k: { en: 'Rules', id: 'Aturan' }, v: { en: 'On time, late or closed from the timetable; absent marked automatically at 23:59', id: 'Hadir, terlambat, atau ditutup berdasarkan jadwal; Alpa ditandai otomatis pukul 23:59' } },
      { k: { en: 'Reach', id: 'Jangkauan' }, v: { en: 'Web portal and a Sanctum REST API calling the same services', id: 'Portal web dan REST API Sanctum yang memanggil service yang sama' } },
    ],
    stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Sanctum', 'Leaflet', 'Tailwind CSS', 'Alpine.js', 'Laravel Excel', 'DomPDF'],
    repo: 'https://github.com/aamnnr/geo-attendance',
    overview: {
      en: [
        'Letting students mark their own attendance from their own phone removes the queue at the gate and opens an obvious hole. Geolocation closes it cheaply: the check-in page shows a live Leaflet map with the school, the allowed circle and the student’s position and accuracy, and the server only accepts the submission if the Haversine distance from the school point is inside the radius. The browser’s verdict is a convenience; the server recomputes it from the coordinates it receives and explains the refusal in metres.',
        'The coordinates, the radius, the late tolerance and the check-in cut-off are settings, picked on a map in the admin panel, because no two schools share a footprint or a bell schedule. The status comes from the class timetable: on time until the first lesson plus the tolerance, late after that, closed after the cut-off. Checking out before the last lesson ends is accepted but noted on the record, and a scheduled command marks anyone still missing at 23:59 as absent — except on holidays or days covered by approved leave.',
        'Attendance is never just presence. Students request leave with a photo or PDF attached and can cancel while it waits; an admin approves it, which writes an Izin or Sakit record for every day in the range inside one transaction, or rejects it with a note. The admin dashboard shows today’s numbers, a seven-day trend, pending leave and recent activity, and recaps export to Excel or PDF with the same filters as the screen.',
        'The rules live in services, not controllers. The web pages and the REST API — Sanctum tokens with an admin or student ability — share the same Form Requests and call the same PresensiService and IzinService, so a future mobile app cannot disagree with the website. Login uses separate Laravel guards with rate limiting, and feature tests cover the radius, lateness, check-out, holidays, leave and every page rendering.',
      ],
      id: [
        'Membiarkan siswa mengisi presensinya sendiri dari ponsel sendiri menghapus antrean di gerbang sekaligus membuka lubang yang jelas. Geolokasi menutupnya dengan murah: halaman presensi menampilkan peta Leaflet live berisi sekolah, lingkaran yang diizinkan, serta posisi dan akurasi siswa, dan server hanya menerima kiriman bila jarak Haversine dari titik sekolah berada di dalam radius. Penilaian browser hanya untuk kenyamanan; server menghitung ulang dari koordinat yang diterimanya dan menjelaskan penolakan dalam meter.',
        'Koordinat, radius, toleransi terlambat, dan batas presensi masuk adalah pengaturan yang dipilih lewat peta di panel admin, karena tidak ada dua sekolah dengan bentang dan jam pelajaran yang sama. Status diambil dari jadwal kelas: hadir sampai jam pelajaran pertama ditambah toleransi, terlambat setelahnya, dan ditutup setelah batas. Pulang sebelum pelajaran terakhir selesai tetap diterima tetapi diberi keterangan, dan perintah terjadwal menandai siswa yang belum tercatat pada 23:59 sebagai Alpa — kecuali di hari libur atau hari yang tercakup izin yang disetujui.',
        'Presensi tak pernah sekadar kehadiran. Siswa mengajukan izin dengan lampiran foto atau PDF dan bisa membatalkannya selama menunggu; admin menyetujuinya, yang membuat rekap Izin atau Sakit untuk setiap hari dalam rentangnya di dalam satu transaksi, atau menolaknya dengan catatan. Dasbor admin menampilkan angka hari ini, tren tujuh hari, izin yang menunggu, dan aktivitas terbaru, dan rekap dapat diekspor ke Excel atau PDF dengan filter yang sama seperti di layar.',
        'Aturannya tinggal di service, bukan di controller. Halaman web dan REST API — token Sanctum dengan ability admin atau siswa — memakai Form Request yang sama dan memanggil PresensiService serta IzinService yang sama, sehingga aplikasi mobile nantinya tidak mungkin berbeda hasil dengan situsnya. Login memakai guard Laravel terpisah dengan pembatasan percobaan, dan feature test mencakup radius, keterlambatan, presensi pulang, hari libur, izin, serta render seluruh halaman.',
      ],
    },
    features: {
      en: [
        'Check-in and check-out from the student’s phone, with a live map, distance and GPS accuracy.',
        'Server-side radius check (Haversine) against a school point and radius chosen on a map.',
        'Automatic Hadir or Terlambat from the first lesson plus a configurable tolerance, and a check-in cut-off.',
        'Absent marked automatically every day at 23:59; disabled on holidays.',
        'Leave requests with an attachment, cancellable while pending; approval writes Izin/Sakit records per day.',
        'Admin dashboard with today’s figures, a seven-day trend, pending leave and recent activity.',
        'Student, class, timetable (with clash checks), holiday and record management, including manual correction.',
        'Recap export to Excel and PDF using the on-screen filters.',
        'Student portal with monthly history, timetable and profile.',
        'REST API with Sanctum token abilities for admin and student clients, plus an activity log.',
      ],
      id: [
        'Presensi masuk dan pulang dari ponsel siswa, dengan peta live, jarak, dan akurasi GPS.',
        'Pemeriksaan radius di server (Haversine) terhadap titik dan radius sekolah yang dipilih di peta.',
        'Status Hadir atau Terlambat otomatis dari jam pelajaran pertama ditambah toleransi, serta batas presensi masuk.',
        'Alpa ditandai otomatis setiap hari pukul 23:59; nonaktif di hari libur.',
        'Pengajuan izin dengan lampiran, bisa dibatalkan selama menunggu; persetujuan membuat rekap Izin/Sakit per hari.',
        'Dasbor admin dengan angka hari ini, tren tujuh hari, izin menunggu, dan aktivitas terbaru.',
        'Manajemen siswa, kelas, jadwal (dengan cek bentrok), hari libur, dan rekap, termasuk koreksi manual.',
        'Ekspor rekap ke Excel dan PDF sesuai filter di layar.',
        'Portal siswa dengan riwayat bulanan, jadwal, dan profil.',
        'REST API dengan token ability Sanctum untuk klien admin dan siswa, serta log aktivitas.',
      ],
    },
    notes: [
      { k: { en: 'Defaults', id: 'Bawaan' }, v: { en: 'Radius 100 m, 15-minute tolerance, check-in closes at 12:00', id: 'Radius 100 m, toleransi 15 menit, presensi masuk ditutup 12:00' } },
      { k: { en: 'Check-in API', id: 'API presensi' }, v: { en: 'POST /api/siswa/presensi { latitude, longitude } — check-in or check-out decided by the server', id: 'POST /api/siswa/presensi { latitude, longitude } — masuk atau pulang diputuskan server' } },
      { k: { en: 'Schedule', id: 'Terjadwal' }, v: { en: 'php artisan rekap:alpa, daily at 23:59', id: 'php artisan rekap:alpa, setiap hari pukul 23:59' } },
    ],
    media: [
      {
        src: { en: 'projects/geo-attendance/en/01-cover.png', id: 'projects/geo-attendance/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'GeoPresensi title with the admin dashboard — today’s figures, a seven-day trend and pending leave — and the student home screen on a phone with a check-in button.', id: 'Judul GeoPresensi dengan dasbor admin — angka hari ini, tren tujuh hari, dan izin menunggu — serta beranda siswa di ponsel dengan tombol Presensi Masuk.' },
        caption: { en: 'The admin dashboard and the student portal. Real screenshots with sample data; the UI is in Indonesian.', id: 'Dasbor admin dan portal siswa. Tangkapan layar asli dengan data contoh.' },
      },
      {
        src: { en: 'projects/geo-attendance/en/02-geofence.png', id: 'projects/geo-attendance/id/02-geofence.png' }, width: 1200, height: 1200,
        alt: { en: 'Two phones on the check-in page: one 37 m from the school inside the circle, one 423 m away outside it, next to the three steps from browser to server-side check.', id: 'Dua ponsel di halaman presensi: satu berjarak 37 m di dalam lingkaran, satu 423 m di luar, di samping tiga langkah dari browser hingga pemeriksaan di server.' },
        caption: { en: 'The map is for the student; the server recomputes the distance and decides.', id: 'Peta untuk siswa; server menghitung ulang jaraknya dan memutuskan.' },
      },
      {
        src: { en: 'projects/geo-attendance/en/03-rules.png', id: 'projects/geo-attendance/id/03-rules.png' }, width: 1200, height: 1200,
        alt: { en: 'A timeline: Hadir until 07:15, Terlambat until 12:00, closed after, absent marked at 23:59; holiday, leave and early check-out cases; and the admin recap with status filters.', id: 'Garis waktu: Hadir sampai 07:15, Terlambat sampai 12:00, ditutup setelahnya, Alpa ditandai pukul 23:59; kasus hari libur, izin, dan pulang lebih awal; serta rekap admin dengan filter status.' },
        caption: { en: 'One set of rules decides every status, for the web and the API alike.', id: 'Satu set aturan menentukan setiap status, untuk web maupun API.' },
      },
      {
        src: { en: 'projects/geo-attendance/en/04-leave.png', id: 'projects/geo-attendance/id/04-leave.png' }, width: 1200, height: 1200,
        alt: { en: 'The student’s leave page with a pending request, the three steps request–review–recorded, and the admin list of pending requests with approve and reject buttons.', id: 'Halaman izin siswa dengan pengajuan menunggu, tiga langkah ajukan–tinjau–tercatat, dan daftar pengajuan admin dengan tombol setujui dan tolak.' },
        caption: { en: 'Approved leave becomes Izin or Sakit records, so nobody is marked absent by mistake.', id: 'Izin yang disetujui menjadi rekap Izin atau Sakit, sehingga tidak ada yang salah ditandai Alpa.' },
      },
      {
        src: { en: 'projects/geo-attendance/en/05-settings-api.png', id: 'projects/geo-attendance/id/05-settings-api.png' }, width: 1200, height: 1200,
        alt: { en: 'The settings page with the school point and radius on a map, the radius slider and time rules, above a diagram of the web and Sanctum API sharing one service layer.', id: 'Halaman pengaturan dengan titik dan radius sekolah di peta, slider radius, dan aturan waktu, di atas diagram web dan API Sanctum yang memakai satu lapisan service.' },
        caption: { en: 'Location, radius and timing are settings; the web and the API share one service layer.', id: 'Lokasi, radius, dan waktu adalah pengaturan; web dan API memakai satu lapisan service.' },
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'tani-solution-web',
    codename: 'PT Global Tani Solution',
    categories: ['web'],
    year: '2025',
    title: { en: 'Company Profile — PT Global Tani Solution', id: 'Company Profile — PT Global Tani Solution' },
    summary: {
      en: 'A public site the company can update itself: news, collaborations and media handled from an admin panel rather than a developer’s inbox.',
      id: 'Situs publik yang bisa diperbarui sendiri oleh perusahaan: berita, kolaborasi, dan media diurus dari panel admin, bukan lewat pesan ke pengembang.',
    },
    role: { en: 'Sole developer.', id: 'Pengembang tunggal.' },
    spec: [
      { k: { en: 'Content', id: 'Konten' }, v: { en: 'Admin panel for news and collaboration entries', id: 'Panel admin untuk entri berita dan kolaborasi' } },
      { k: { en: 'Media', id: 'Media' }, v: { en: 'Cloudinary integration for image hosting and delivery', id: 'Integrasi Cloudinary untuk penyimpanan dan pengiriman gambar' } },
      { k: { en: 'Layout', id: 'Tata letak' }, v: { en: 'Responsive across phone, tablet and desktop', id: 'Responsif di ponsel, tablet, dan desktop' } },
    ],
    stack: ['Next.js', 'JavaScript', 'Tailwind CSS', 'Cloudinary'],
    repo: 'https://github.com/aamiin-workspace/profile-tanisolution',
    live: 'https://www.tanisolution.id',
    overview: {
      en: [
        'Most company sites die the same way: the launch looks good, then nobody can change a sentence without asking a developer, and within a year the news page still says 2023. The brief here was to prevent exactly that, so the content model came first and the layout followed it.',
        'Images go through Cloudinary rather than the repository, which keeps the deployment small and means a staff member uploading a 6 MB photo from a phone does not slow the site down for everyone else.',
      ],
      id: [
        'Kebanyakan situs perusahaan mati dengan cara yang sama: peluncurannya bagus, lalu tak seorang pun bisa mengubah satu kalimat tanpa bertanya ke pengembang, dan setahun kemudian halaman beritanya masih bertuliskan 2023. Permintaannya justru mencegah itu, maka model kontennya didahulukan dan tata letaknya menyusul.',
        'Gambar disalurkan lewat Cloudinary, bukan repositori, sehingga penerapannya tetap ramping dan seorang staf yang mengunggah foto 6 MB dari ponsel tidak memperlambat situs bagi semua orang.',
      ],
    },
    features: {
      en: [
        'Company profile, service and product sections.',
        'News management from an admin panel.',
        'Collaboration and partner entries.',
        'Cloudinary-backed image upload and delivery.',
        'Responsive layout across devices.',
      ],
      id: [
        'Bagian profil perusahaan, layanan, dan produk.',
        'Manajemen berita dari panel admin.',
        'Entri kolaborasi dan mitra.',
        'Unggah dan pengiriman gambar melalui Cloudinary.',
        'Tata letak responsif di berbagai perangkat.',
      ],
    },
    media: [
      {
        src: { en: 'projects/tani-solution/en/01-cover.png', id: 'projects/tani-solution/id/01-cover.png' }, width: 1600, height: 900,
        alt: { en: 'Tani Solution title card with a desktop mockup of the home page and its news slider, and a phone in dark mode.', id: 'Kartu judul Tani Solution dengan mockup desktop beranda beserta slider beritanya, dan ponsel dalam mode gelap.' },
        caption: { en: 'Green #388E3C with Inter, in light and dark mode. Mockups redrawn from the site; the site itself is in Indonesian.', id: 'Hijau #388E3C dengan Inter, dalam mode terang dan gelap. Mockup digambar ulang dari situs.' },
      },
      {
        src: { en: 'projects/tani-solution/en/02-content-flow.png', id: 'projects/tani-solution/id/02-content-flow.png' }, width: 1200, height: 1200,
        alt: { en: 'Diagram: the admin panel posts to Next.js API routes guarded by JWT middleware, images go to Cloudinary, rows to MySQL, and public pages revalidate every 60 seconds.', id: 'Diagram: panel admin mengirim ke API route Next.js yang dijaga middleware JWT, gambar ke Cloudinary, baris ke MySQL, dan halaman publik diperbarui tiap 60 detik.' },
        caption: { en: 'One admin form reaches the home page, the news index and the sitemap.', id: 'Satu form admin sampai ke beranda, daftar berita, dan sitemap.' },
      },
      {
        src: { en: 'projects/tani-solution/en/03-admin.png', id: 'projects/tani-solution/id/03-admin.png' }, width: 1200, height: 1200,
        alt: { en: 'Admin dashboard with content counts, and the Add News form with a photo ready to upload.', id: 'Dasbor admin dengan jumlah konten, dan form Tambah Berita dengan foto yang siap diunggah.' },
        caption: { en: 'The admin panel: counts at a glance and a news form that uploads the photo on save.', id: 'Panel admin: jumlah konten sekilas pandang dan form berita yang mengunggah foto saat disimpan.' },
      },
      {
        src: { en: 'projects/tani-solution/en/04-divisions.png', id: 'projects/tani-solution/id/04-divisions.png' }, width: 1200, height: 1200,
        alt: { en: 'Six page headers: Teknosolusi, Edusolusi, Studio KreaSolusi, Mini Lab Teknologi, Pusat Kolaborasi, and Prestasi & Riset, each with its own accent colour.', id: 'Enam header halaman: Teknosolusi, Edusolusi, Studio KreaSolusi, Mini Lab Teknologi, Pusat Kolaborasi, dan Prestasi & Riset, masing-masing dengan warna aksennya.' },
        caption: { en: 'Each division keeps its own accent colour inside one layout.', id: 'Setiap divisi punya warna aksennya sendiri di dalam satu tata letak.' },
      },
      {
        src: { en: 'projects/tani-solution/en/05-theme-maintenance.png', id: 'projects/tani-solution/id/05-theme-maintenance.png' }, width: 1200, height: 1200,
        alt: { en: 'The home page on two phones in light and dark mode, next to the maintenance-mode flow with its one-hour bypass cookie.', id: 'Beranda di dua ponsel dalam mode terang dan gelap, di samping alur mode maintenance dengan cookie bypass satu jam.' },
        caption: { en: 'A remembered dark-mode toggle, and a maintenance switch the team can still see past.', id: 'Sakelar mode gelap yang diingat, dan mode maintenance yang tetap bisa dilewati tim.' },
      },
    ],
  },
];

/** Nomor urut dokumen: P-01, P-02, … mengikuti urutan tampil. */
export const projectIndex = (slug: string): string =>
  `P-${String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, '0')}`;

/** Nama domain tanpa `www.`, untuk label tautan situs daring. */
export const hostOf = (url: string): string => new URL(url).host.replace(/^www\./, '');

/** Alamat gambar untuk bahasa tertentu (mendukung `src` tunggal maupun per bahasa). */
export const mediaSrc = (src: string | T, lang: Lang): string => (typeof src === 'string' ? src : src[lang]);

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
