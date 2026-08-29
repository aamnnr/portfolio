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
      en: 'Flutter clients that put device control in an operator’s hand.',
      id: 'Klien Flutter yang menaruh kendali perangkat di tangan operator.',
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
  /** Paragraf pembuka pada halaman detail. */
  overview: TL;
  /** Daftar kemampuan yang benar-benar ada di dalam sistem. */
  features: TL;
  /** Catatan teknis: angka, topik, protokol — bagian yang biasanya hilang. */
  notes?: { k: T; v: T }[];
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
      en: 'A headless corporate site for a seven-unit group: Laravel and Filament hold every word, Nuxt renders it server-side, and the recruitment pipeline runs inside the same panel.',
      id: 'Situs korporat headless untuk grup dengan tujuh unit bisnis: Laravel dan Filament menyimpan seluruh isinya, Nuxt merendernya di server, dan alur rekrutmen berjalan di panel yang sama.',
    },
    role: {
      en: 'Sole developer — backend, admin panel, frontend, and SEO layer.',
      id: 'Pengembang tunggal — backend, panel admin, frontend, dan lapisan SEO.',
    },
    spec: [
      { k: { en: 'Shape', id: 'Bentuk' }, v: { en: 'Laravel 13 API-only + Filament 5 admin, Nuxt 3 SSR in front', id: 'Laravel 13 API-only + admin Filament 5, Nuxt 3 SSR di depan' } },
      { k: { en: 'Content', id: 'Konten' }, v: { en: 'Pages, articles, business units, leadership, gallery, vacancies — all editable', id: 'Halaman, artikel, unit bisnis, kepemimpinan, galeri, lowongan — semuanya bisa disunting' } },
      { k: { en: 'Recruitment', id: 'Rekrutmen' }, v: { en: 'Applications tracked through six selection stages, CVs on a private disk', id: 'Lamaran dilacak lewat enam tahap seleksi, CV di disk privat' } },
    ],
    stack: ['Laravel', 'Filament', 'Nuxt 3', 'Vue', 'Tailwind CSS', 'MySQL', 'Spatie Media Library'],
    overview: {
      en: [
        'Kembar Futagroup is seven business units under one roof — manufacturing, construction, technology — and a group site has to speak for all of them without becoming seven sites. The public pages are Nuxt, rendered on the server; every string, image and meta tag they show comes from Laravel over an API. Nothing is hard-coded in the frontend, so the marketing team can change the group profile without a deploy.',
        'The half nobody sees is the bigger half. Filament runs the whole content model: page blocks that can be reordered, articles, milestones, partners, leadership profiles, photo albums, and the job vacancies each unit posts. Alongside it sit the operational tools — 301 redirects, a 404 log, a link checker that rebuilds its report from scratch on every run, and a Search Console sync that pulls daily metrics into the panel so the client sees traffic where they already work.',
        'Recruitment turned out to be the part that needed the most care. Applications arrive through the vacancy form and land straight in the first selection stage; the stage change is timestamped separately from `updated_at`, because HR adding a note should not make an application that has been stuck for two weeks look freshly handled. CVs contain personal data, so they are stored on a private disk and never reachable by guessing a URL.',
      ],
      id: [
        'Kembar Futagroup adalah tujuh unit bisnis di bawah satu atap — manufaktur, konstruksi, teknologi — dan situs grup harus mewakili semuanya tanpa berubah menjadi tujuh situs. Halaman publiknya adalah Nuxt yang dirender di server; setiap teks, gambar, dan meta tag yang tampil berasal dari Laravel lewat API. Tidak ada yang ditulis mati di frontend, sehingga tim pemasaran bisa mengubah profil grup tanpa deploy.',
        'Bagian yang tidak terlihat justru yang lebih besar. Filament menjalankan seluruh model kontennya: blok halaman yang bisa diurutkan ulang, artikel, tonggak sejarah, mitra, profil kepemimpinan, album foto, dan lowongan yang dibuka tiap unit. Di sampingnya ada perkakas operasional — pengalihan 301, log 404, pemeriksa tautan yang menyusun ulang laporannya dari nol setiap kali berjalan, dan sinkronisasi Search Console yang menarik metrik harian ke dalam panel supaya klien melihat trafiknya di tempat mereka sudah bekerja.',
        'Rekrutmen ternyata bagian yang paling butuh kehati-hatian. Lamaran masuk lewat form lowongan dan langsung mendarat di tahap seleksi pertama; perpindahan tahap dicatat waktunya terpisah dari `updated_at`, karena HRD yang sekadar menambah catatan tidak boleh membuat lamaran yang dua minggu mangkrak tampak baru saja ditangani. Berkas CV berisi data pribadi, jadi disimpan di disk privat dan tidak bisa diambil dengan menebak URL.',
      ],
    },
    features: {
      en: [
        'Page content assembled from reorderable blocks, edited entirely from the admin panel.',
        'Business units, leadership profiles, milestones, partners and company statistics as first-class content.',
        'Job vacancies per business unit, with an application form that feeds a six-stage selection pipeline.',
        'Applicant CVs kept on a private disk, downloadable only through an authenticated panel route.',
        'Photo albums and a news section, both server-rendered for indexing.',
        'SEO metadata, redirects, a 404 log and a broken-link scanner, all managed in-panel.',
        'Google Search Console credentials, verification and daily metrics surfaced inside the admin dashboard.',
        'Forty backend tests covering the API, admin panel, content model and SEO rules.',
      ],
      id: [
        'Isi halaman disusun dari blok yang bisa diurutkan ulang, seluruhnya disunting dari panel admin.',
        'Unit bisnis, profil kepemimpinan, tonggak sejarah, mitra, dan statistik perusahaan sebagai konten kelas satu.',
        'Lowongan kerja per unit bisnis, dengan form lamaran yang mengalir ke alur seleksi enam tahap.',
        'CV pelamar disimpan di disk privat, hanya bisa diunduh lewat rute panel yang terautentikasi.',
        'Album foto dan kanal berita, keduanya dirender di server agar terindeks.',
        'Metadata SEO, pengalihan, log 404, dan pemindai tautan rusak, semuanya dikelola dari panel.',
        'Kredensial, verifikasi, dan metrik harian Google Search Console tampil di dasbor admin.',
        'Empat puluh test backend yang menutup API, panel admin, model konten, dan aturan SEO.',
      ],
    },
    notes: [
      { k: { en: 'Rendering', id: 'Rendering' }, v: { en: 'Nuxt SSR; Laravel serves JSON only, never HTML', id: 'Nuxt SSR; Laravel hanya menyajikan JSON, tidak pernah HTML' } },
      { k: { en: 'Media', id: 'Media' }, v: { en: 'Spatie Media Library for images; a separate private disk for CVs', id: 'Spatie Media Library untuk gambar; disk privat terpisah untuk CV' } },
      { k: { en: 'URL mapping', id: 'Pemetaan URL' }, v: { en: 'Pages resolved by public path in Laravel, so routing has one source', id: 'Halaman dicari berdasarkan path publik di Laravel, sehingga routing bersumber tunggal' } },
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
        'Fertiliser is expensive and easy to waste. The rig meters it out by commodity instead of by habit: the operator picks what is being grown, the device works out a dose, and the motor runs for exactly as long as that dose requires.',
        'The architecture is deliberately server-less. The Flutter app and the ESP32 talk to each other through a public MQTT broker as two peers — there is no back end to keep alive, no database bill, and no single machine whose failure takes the field offline. Operating statistics live in the device’s own EEPROM, so a phone that has been away for a week still finds its history intact.',
        'The trade is that the message contract has to be exact. Both halves agree on a JSON shape and a topic layout, and every command the app sends has to be one the firmware already understands. Writing both sides is what made that tolerable.',
      ],
      id: [
        'Pupuk itu mahal dan mudah terbuang. Perangkat ini menakarnya berdasarkan komoditas, bukan kebiasaan: operator memilih tanaman yang digarap, perangkat menghitung dosis, lalu motor berputar tepat selama dosis itu membutuhkannya.',
        'Arsitekturnya sengaja tanpa server. Aplikasi Flutter dan ESP32 saling berbicara lewat broker MQTT publik sebagai dua peer — tidak ada back end yang harus dijaga tetap hidup, tidak ada tagihan basis data, dan tidak ada satu mesin yang kematiannya membuat lahan terputus. Statistik operasional disimpan di EEPROM perangkat, sehingga ponsel yang seminggu tidak dibuka tetap menemukan riwayatnya utuh.',
        'Konsekuensinya, kontrak pesan harus tepat. Kedua sisi menyepakati bentuk JSON dan susunan topik, dan setiap perintah yang dikirim aplikasi harus perintah yang memang sudah dimengerti firmware. Menulis kedua sisinya sendiri yang membuat itu bisa dijalani.',
      ],
    },
    features: {
      en: [
        'Dose recommendation per commodity, applied as a timed motor run.',
        'Live device status: motor state, current dose, and accumulated statistics.',
        'Manual override, so the operator can always overrule the recommendation.',
        'On-device OLED readout for when the phone is not to hand.',
        'Statistics persisted in EEPROM and survive power loss.',
        'One Flutter codebase serving Android, iOS, web and desktop.',
      ],
      id: [
        'Rekomendasi dosis per komoditas, diterapkan sebagai putaran motor berdurasi.',
        'Status perangkat langsung: keadaan motor, dosis berjalan, dan statistik terkumpul.',
        'Kendali manual, sehingga operator selalu bisa menolak rekomendasi.',
        'Tampilan OLED di perangkat untuk saat ponsel tidak di tangan.',
        'Statistik tersimpan di EEPROM dan bertahan saat listrik padam.',
        'Satu basis kode Flutter melayani Android, iOS, web, dan desktop.',
      ],
    },
    notes: [
      { k: { en: 'Broker', id: 'Broker' }, v: { en: 'Public MQTT broker on port 1883 (EMQX / Mosquitto)', id: 'Broker MQTT publik pada port 1883 (EMQX / Mosquitto)' } },
      { k: { en: 'State', id: 'Status' }, v: { en: 'Provider for app state; EEPROM for device statistics', id: 'Provider untuk status aplikasi; EEPROM untuk statistik perangkat' } },
      { k: { en: 'Back end', id: 'Back end' }, v: { en: 'None — app and device are MQTT peers', id: 'Tidak ada — aplikasi dan perangkat adalah peer MQTT' } },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'ferticore-admin',
    codename: 'FertiCore Admin Central Console',
    categories: ['web', 'iot'],
    year: '2026',
    title: { en: 'FertiCore Admin Console', id: 'Konsol Admin FertiCore' },
    summary: {
      en: 'The operator’s view of the whole fleet: which farmers are registered, which devices are alive, and which ones need their access cut.',
      id: 'Pandangan operator atas seluruh armada: petani mana yang terdaftar, perangkat mana yang hidup, dan mana yang aksesnya perlu diputus.',
    },
    role: { en: 'Sole developer.', id: 'Pengembang tunggal.' },
    spec: [
      { k: { en: 'Scope', id: 'Cakupan' }, v: { en: 'Central console over the whole precision-agriculture fleet', id: 'Konsol terpusat atas seluruh armada pertanian presisi' } },
      { k: { en: 'Data', id: 'Data' }, v: { en: 'Supabase, accessed with a service role that bypasses RLS', id: 'Supabase, diakses dengan service role yang melewati RLS' } },
      { k: { en: 'Actions', id: 'Aksi' }, v: { en: 'Next.js Server Actions for revoking devices and accounts', id: 'Server Action Next.js untuk mencabut perangkat dan akun' } },
    ],
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Server Actions', 'Lucide'],
    repo: 'https://github.com/aamnnr/ferticore-admin',
    overview: {
      en: [
        'Once more than a handful of devices are in the field, the interesting question stops being “what is this sensor reading” and becomes “which of the forty units has stopped reporting, and who owns it”. This console answers the second question.',
        'It reads the same Supabase database the devices write to, but through a superadmin path that deliberately bypasses row-level security — the whole point of the console is to see across tenants rather than inside one. Destructive actions run as Next.js Server Actions, so revoking a device is one round trip and the page state refreshes from the source rather than from an optimistic guess.',
      ],
      id: [
        'Begitu perangkat di lapangan lebih dari segelintir, pertanyaan yang menarik berhenti menjadi "berapa bacaan sensor ini" dan berubah menjadi "unit mana dari empat puluh yang berhenti melapor, dan siapa pemiliknya". Konsol ini menjawab pertanyaan kedua.',
        'Konsol membaca basis data Supabase yang sama dengan yang ditulis perangkat, tetapi lewat jalur superadmin yang sengaja melewati row-level security — justru tujuannya melihat lintas tenant, bukan ke dalam satu tenant. Aksi destruktif berjalan sebagai Server Action Next.js, sehingga mencabut sebuah perangkat cukup satu perjalanan dan status halaman disegarkan dari sumbernya, bukan dari tebakan optimistis.',
      ],
    },
    features: {
      en: [
        'Real-time totals for registered farmers and active sensor units.',
        'Live indicator for MQTT broker and database health.',
        'Operational-days counter derived from the first registration date.',
        'Device inventory listing name, MAC address, owner and registration date.',
        'One-click device revocation via a Server Action.',
        'Farmer and partner directory with contact details, plot location and device count.',
      ],
      id: [
        'Total waktu nyata untuk petani terdaftar dan unit sensor aktif.',
        'Indikator langsung untuk kesehatan broker MQTT dan basis data.',
        'Penghitung hari operasional yang diturunkan dari tanggal registrasi pertama.',
        'Inventaris perangkat berisi nama, MAC address, pemilik, dan tanggal registrasi.',
        'Pencabutan akses perangkat satu klik lewat Server Action.',
        'Direktori petani dan mitra dengan kontak, lokasi kebun, dan jumlah alat.',
      ],
    },
    notes: [
      { k: { en: 'Auth model', id: 'Model auth' }, v: { en: 'Superadmin client, RLS bypassed by design', id: 'Klien superadmin, RLS dilewati secara sengaja' } },
      { k: { en: 'Language', id: 'Bahasa' }, v: { en: 'Plain JavaScript (ESNext), App Router', id: 'JavaScript murni (ESNext), App Router' } },
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
    stack: ['Flutter', 'Dart', 'MQTT', 'fl_chart', 'BLE provisioning'],
    repo: 'https://github.com/aamnnr/pestzone-spray-app',
    overview: {
      en: [
        'Greenhouses and open plots are exactly the places where mobile signal is worst, which is inconvenient for an app whose entire job is sending commands. Rather than failing the tap, the app queues it: the instruction is held locally and flushed the moment the broker is reachable again. The operator presses the button once, not five times.',
        'Setting a device up has the same problem in a different form — a device with no Wi-Fi credentials cannot be configured over Wi-Fi. The app provisions it over Bluetooth instead, pushing SSID and password to the ESP32 while it sits in setup mode.',
      ],
      id: [
        'Rumah kaca dan lahan terbuka justru tempat dengan sinyal seluler terburuk, dan itu merepotkan bagi aplikasi yang seluruh tugasnya mengirim perintah. Alih-alih menggagalkan ketukan, aplikasi mengantrikannya: instruksi disimpan lokal dan dikirim begitu broker kembali terjangkau. Operator menekan tombol sekali, bukan lima kali.',
        'Menyiapkan perangkat punya persoalan sama dalam bentuk lain — perangkat tanpa kredensial Wi-Fi tidak bisa dikonfigurasi lewat Wi-Fi. Karena itu aplikasi menyiapkannya lewat Bluetooth, mengirim SSID dan kata sandi ke ESP32 selagi perangkat berada di mode setup.',
      ],
    },
    features: {
      en: [
        'Real-time battery level, network status and device health.',
        'Manual toggles for UV attraction lights and the water pump.',
        'Historical charts and activity logs drawn with fl_chart.',
        'Wi-Fi provisioning and device reset through a setup wizard.',
        'Offline command queue that flushes on reconnect.',
        'Light and dark themes.',
      ],
      id: [
        'Level baterai, status jaringan, dan kesehatan perangkat secara waktu nyata.',
        'Sakelar manual untuk lampu penarik hama UV dan pompa air.',
        'Grafik historis dan log aktivitas digambar dengan fl_chart.',
        'Penyiapan Wi-Fi dan reset perangkat lewat wizard setup.',
        'Antrean perintah luring yang dikirim ulang saat tersambung.',
        'Tema terang dan gelap.',
      ],
    },
    notes: [
      { k: { en: 'Telemetry topic', id: 'Topik telemetri' }, v: { en: 'tanisolution/+/telemetry', id: 'tanisolution/+/telemetry' } },
      { k: { en: 'Command topic', id: 'Topik perintah' }, v: { en: 'tanisolution/{device_id}/command', id: 'tanisolution/{device_id}/command' } },
      { k: { en: 'Payload', id: 'Muatan' }, v: { en: 'JSON — e.g. {"bat":85,"is_night":true,"uv":1,"pump":0}', id: 'JSON — mis. {"bat":85,"is_night":true,"uv":1,"pump":0}' } },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'pestmist-control',
    codename: 'PestMist Control',
    categories: ['mobile', 'iot'],
    year: '2026',
    title: { en: 'PestMist Control', id: 'PestMist Control' },
    summary: {
      en: 'Multi-device control for ESP32 misting units — timed pump bursts, a daily UV schedule, and alerts when a unit goes quiet.',
      id: 'Kendali multi-perangkat untuk unit pengabut ESP32 — semprotan pompa berdurasi, jadwal UV harian, dan peringatan saat unit berhenti melapor.',
    },
    role: { en: 'Sole developer.', id: 'Pengembang tunggal.' },
    spec: [
      { k: { en: 'Dosing', id: 'Takaran' }, v: { en: 'Pump bursts of 5, 10 or 15 seconds', id: 'Semprotan pompa 5, 10, atau 15 detik' } },
      { k: { en: 'Schedule', id: 'Jadwal' }, v: { en: 'Daily UV lamp schedule held per device', id: 'Jadwal lampu UV harian per perangkat' } },
      { k: { en: 'Trust', id: 'Kepercayaan' }, v: { en: '“Last seen” indicator plus low-battery and offline alerts', id: 'Indikator "terakhir terlihat" plus peringatan baterai lemah dan luring' } },
    ],
    stack: ['Flutter', 'Dart', 'MQTT', 'BLE'],
    repo: 'https://github.com/aamnnr/pest-watering-control-app',
    overview: {
      en: [
        'A control app for equipment you cannot see has one obligation above the others: it must never imply a device is fine when it has actually stopped answering. PestMist makes staleness explicit — every device carries a last-seen timestamp, and going quiet raises a notification rather than leaving a stale reading on screen looking healthy.',
        'History is kept per device rather than pooled, so switching between units does not blend two machines’ telemetry into one misleading chart.',
      ],
      id: [
        'Aplikasi kendali untuk peralatan yang tak terlihat punya satu kewajiban di atas yang lain: ia tidak boleh membuat seolah perangkat baik-baik saja padahal sudah berhenti menjawab. PestMist membuat keusangan itu eksplisit — setiap perangkat membawa penanda waktu terakhir terlihat, dan berhentinya laporan memunculkan notifikasi alih-alih meninggalkan bacaan basi di layar yang tampak sehat.',
        'Riwayat disimpan per perangkat, bukan digabung, sehingga berpindah unit tidak mencampur telemetri dua mesin menjadi satu grafik yang menyesatkan.',
      ],
    },
    features: {
      en: [
        'UV lamp status read from device telemetry.',
        'Pump spray commands with fixed 5 / 10 / 15 second durations.',
        'Battery capacity monitoring with a low-battery notification.',
        'Daily UV scheduling.',
        '“Last seen” sync indicator and an offline-device alert.',
        'Activity log and historical battery chart, stored per device.',
        'Multiple saved devices with quick switching between them.',
        'Wi-Fi provisioning over BLE while the ESP32 is in setup mode.',
      ],
      id: [
        'Status lampu UV dibaca dari telemetri perangkat.',
        'Perintah semprot pompa dengan durasi tetap 5 / 10 / 15 detik.',
        'Pemantauan kapasitas baterai dengan notifikasi baterai lemah.',
        'Penjadwalan UV harian.',
        'Indikator sinkronisasi "terakhir terlihat" dan peringatan perangkat luring.',
        'Log aktivitas dan grafik historis baterai, disimpan per perangkat.',
        'Banyak perangkat tersimpan dengan pergantian cepat antar unit.',
        'Penyiapan Wi-Fi lewat BLE saat ESP32 berada di mode setup.',
      ],
    },
    notes: [
      { k: { en: 'Telemetry topic', id: 'Topik telemetri' }, v: { en: 'tanisolution/{deviceId}/telemetry', id: 'tanisolution/{deviceId}/telemetry' } },
      { k: { en: 'Command topic', id: 'Topik perintah' }, v: { en: 'tanisolution/{deviceId}/command', id: 'tanisolution/{deviceId}/command' } },
      { k: { en: 'BLE setup name', id: 'Nama setup BLE' }, v: { en: 'Alburdat_Setup_{deviceId}', id: 'Alburdat_Setup_{deviceId}' } },
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
      en: 'A river-level monitor that stops being a number on a screen and becomes a notification on a phone before the water arrives.',
      id: 'Pemantau ketinggian air yang berhenti menjadi sekadar angka di layar dan berubah menjadi notifikasi di ponsel sebelum airnya sampai.',
    },
    role: { en: 'Firmware and alerting logic.', id: 'Firmware dan logika peringatan.' },
    spec: [
      { k: { en: 'Input', id: 'Masukan' }, v: { en: 'Ultrasonic water-level reading at fixed intervals', id: 'Pembacaan ketinggian air ultrasonik pada interval tetap' } },
      { k: { en: 'Logic', id: 'Logika' }, v: { en: 'Threshold tiers on the microcontroller; only state changes are published', id: 'Ambang bertingkat di mikrokontroler; hanya perubahan status yang dikirim' } },
      { k: { en: 'Output', id: 'Keluaran' }, v: { en: 'Push notification to a mobile app when a tier is crossed', id: 'Notifikasi ke aplikasi mobile saat ambang terlampaui' } },
    ],
    stack: ['ESP32', 'C++', 'Ultrasonic sensor', 'MQTT'],
    repo: 'https://github.com/aamnnr/Sistem-Peringatan-Dini-Banjir',
    overview: {
      en: [
        'A warning is only worth building if people still trust it after the tenth time. That constraint shaped the whole design: the device does not stream every reading it takes. It classifies the level into tiers on the microcontroller itself and publishes only when the tier actually changes, so a river sitting steadily at a safe level is silent and a rising one is not.',
        'Doing the classification on the device rather than in the cloud also means the alert does not depend on a back end being up at the moment it matters most.',
      ],
      id: [
        'Peringatan hanya layak dibangun kalau orang masih memercayainya pada kali kesepuluh. Batasan itu membentuk seluruh rancangan: perangkat tidak mengirimkan setiap bacaan yang diambilnya. Ia mengklasifikasikan ketinggian ke dalam tingkatan di mikrokontroler itu sendiri dan hanya mengirim ketika tingkatannya benar-benar berubah, sehingga sungai yang tenang di level aman akan diam dan sungai yang naik tidak.',
        'Melakukan klasifikasi di perangkat, bukan di awan, juga berarti peringatan tidak bergantung pada hidupnya sebuah back end tepat pada saat itu paling dibutuhkan.',
      ],
    },
    features: {
      en: [
        'Periodic ultrasonic measurement of water level.',
        'Tiered thresholds evaluated on the device.',
        'Publishing on state change only, not on every reading.',
        'Mobile notification when a tier boundary is crossed.',
      ],
      id: [
        'Pengukuran ketinggian air ultrasonik secara berkala.',
        'Ambang bertingkat dievaluasi di perangkat.',
        'Pengiriman hanya saat status berubah, bukan tiap bacaan.',
        'Notifikasi mobile ketika batas tingkatan terlampaui.',
      ],
    },
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
    role: { en: 'Model, Flask service and web interface.', id: 'Model, layanan Flask, dan antarmuka web.' },
    spec: [
      { k: { en: 'Model', id: 'Model' }, v: { en: 'K-Nearest Neighbor over face encodings', id: 'K-Nearest Neighbor atas enkode wajah' } },
      { k: { en: 'Liveness', id: 'Keaslian' }, v: { en: 'Blink and smile detection to defeat photo spoofing', id: 'Deteksi kedipan dan senyum untuk menggagalkan pemalsuan lewat foto' } },
      { k: { en: 'Rules', id: 'Aturan' }, v: { en: 'Late after 15 minutes; check-out only at or after closing time', id: 'Terlambat setelah 15 menit; absen pulang hanya pada atau setelah jam pulang' } },
    ],
    stack: ['Python', 'Flask', 'KNN', 'OpenCV'],
    repo: 'https://github.com/aamnnr/Sistem-Presensi-Pengenalan-Wajah-KNN',
    overview: {
      en: [
        'Every attendance system is really an anti-cheating system wearing a friendly interface. Recognition alone does not get you there — a printed photo held up to a webcam recognises perfectly well. So the system asks the face to do something a photograph cannot: blink, and smile. Only then does it accept the match.',
        'The rest is bookkeeping done honestly. Check-in before the start of the day counts as on time; check-in within fifteen minutes counts as late; after that the system refuses the entry rather than quietly recording a fiction. Check-out is only accepted at or after closing time.',
        'A Flask web interface sits on top so an administrator can enrol people, capture their face data, correct records and pull a daily recap — because an automated system that no human can correct becomes unusable the first time it is wrong.',
      ],
      id: [
        'Setiap sistem presensi sebenarnya adalah sistem antikecurangan yang mengenakan antarmuka ramah. Pengenalan saja tidak cukup — foto cetak yang diangkat ke depan webcam dikenali dengan sempurna. Maka sistem meminta wajah itu melakukan sesuatu yang tak bisa dilakukan foto: berkedip dan tersenyum. Baru setelah itu kecocokan diterima.',
        'Selebihnya adalah pembukuan yang dikerjakan jujur. Absen sebelum jam masuk dihitung tepat waktu; absen dalam lima belas menit dihitung terlambat; setelah itu sistem menolak entri alih-alih diam-diam mencatat sesuatu yang tidak benar. Absen pulang hanya diterima pada atau setelah jam pulang.',
        'Antarmuka web Flask berada di atasnya agar administrator dapat mendaftarkan orang, mengambil data wajah, mengoreksi catatan, dan menarik rekap harian — karena sistem otomatis yang tak bisa dikoreksi manusia menjadi tak terpakai pada kali pertama ia salah.',
      ],
    },
    features: {
      en: [
        'Automatic face detection and recognition with a KNN model.',
        'Blink and smile detection as a liveness check.',
        'Separate check-in and check-out flows with time rules.',
        'Enrolment capturing personal data and face samples.',
        'Editing and deletion of users, including their records and face data.',
        'Daily attendance recap with filtering.',
      ],
      id: [
        'Deteksi dan pengenalan wajah otomatis dengan model KNN.',
        'Deteksi kedipan mata dan senyum sebagai pemeriksaan keaslian.',
        'Alur absen masuk dan pulang terpisah dengan aturan waktu.',
        'Pendaftaran yang merekam data diri dan sampel wajah.',
        'Penyuntingan dan penghapusan pengguna beserta catatan dan data wajahnya.',
        'Rekap presensi harian dengan penyaringan.',
      ],
    },
    notes: [
      { k: { en: 'Late threshold', id: 'Ambang terlambat' }, v: { en: '15 minutes after start time', id: '15 menit setelah jam masuk' } },
      { k: { en: 'Rejected', id: 'Ditolak' }, v: { en: 'Check-in more than 15 minutes late is refused, not recorded', id: 'Absen masuk lebih dari 15 menit ditolak, bukan dicatat' } },
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
    role: { en: 'Hardware, firmware and PHP admin panel.', id: 'Perangkat keras, firmware, dan panel admin PHP.' },
    spec: [
      { k: { en: 'Identity', id: 'Identitas' }, v: { en: 'MFRC522 RFID reader on an ESP8266 terminal', id: 'Pembaca RFID MFRC522 pada terminal ESP8266' } },
      { k: { en: 'Evidence', id: 'Bukti' }, v: { en: 'ESP32-CAM captures a face photo at the moment of the tap', id: 'ESP32-CAM memotret wajah tepat saat kartu ditempel' } },
      { k: { en: 'Record', id: 'Catatan' }, v: { en: 'Identity and photo stored together, served through a PHP panel', id: 'Identitas dan foto disimpan berpasangan, disajikan lewat panel PHP' } },
    ],
    stack: ['ESP32-CAM', 'ESP8266', 'MFRC522', 'PHP', 'MySQL', 'Bootstrap'],
    repo: 'https://github.com/aamnnr/sistem-presensi-rfid-dan-foto-wajah-esp32cam',
    overview: {
      en: [
        'An RFID card is a strong claim about which card was present and a very weak claim about which person was holding it. Face recognition is the reverse — good at identifying a person, expensive and brittle as a gate. Pairing them sidesteps both weaknesses: the card does the identifying, and the camera simply records what happened, leaving a photograph attached to every entry that anyone can check later.',
        'Deliberately, the photo is not run through a recognition model. It does not need to be. The mere fact that a picture is taken and stored is enough to make lending a card unattractive, and it keeps the terminal cheap enough to actually deploy.',
        'A PHP admin panel manages students, classes and schedules, and validates each tap against the timetable so an entry outside its window is caught.',
      ],
      id: [
        'Kartu RFID adalah klaim kuat tentang kartu mana yang hadir, dan klaim sangat lemah tentang siapa yang memegangnya. Pengenalan wajah kebalikannya — bagus untuk mengenali orang, mahal dan rapuh sebagai gerbang. Memasangkan keduanya menghindari kelemahan masing-masing: kartu yang mengidentifikasi, dan kamera cukup merekam apa yang terjadi, meninggalkan foto pada setiap entri yang bisa diperiksa siapa pun di kemudian hari.',
        'Secara sengaja, foto itu tidak dilewatkan ke model pengenalan. Memang tidak perlu. Fakta bahwa gambar diambil dan disimpan sudah cukup membuat meminjamkan kartu menjadi tidak menarik, sekaligus menjaga terminal tetap cukup murah untuk benar-benar dipasang.',
        'Panel admin PHP mengelola siswa, kelas, dan jadwal, serta memvalidasi tiap penempelan terhadap jadwal sehingga entri di luar jendela waktunya tertangkap.',
      ],
    },
    features: {
      en: [
        'RFID card scanning for student identification.',
        'Face photo captured by ESP32-CAM at the moment of attendance.',
        'Student, class and schedule management.',
        'Real-time admin dashboard.',
        'Daily and monthly attendance recaps.',
        'Schedule validation for entry and exit taps.',
      ],
      id: [
        'Pemindaian kartu RFID untuk identifikasi siswa.',
        'Foto wajah diambil ESP32-CAM tepat saat presensi.',
        'Manajemen siswa, kelas, dan jadwal.',
        'Dasbor admin waktu nyata.',
        'Rekap presensi harian dan bulanan.',
        'Validasi jadwal untuk penempelan masuk dan pulang.',
      ],
    },
    notes: [
      { k: { en: 'Hardware', id: 'Perangkat keras' }, v: { en: 'ESP32-CAM, MFRC522 reader, ESP8266, 16x2 LCD', id: 'ESP32-CAM, pembaca MFRC522, ESP8266, LCD 16x2' } },
      { k: { en: 'Server', id: 'Server' }, v: { en: 'PHP with MySQL, Bootstrap 4 front end', id: 'PHP dengan MySQL, front end Bootstrap 4' } },
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
      { k: { en: 'Constraint', id: 'Batasan' }, v: { en: 'GPS check against a configurable school location and radius', id: 'Pemeriksaan GPS terhadap lokasi dan radius sekolah yang dapat diatur' } },
      { k: { en: 'Roles', id: 'Peran' }, v: { en: 'Admin dashboard and student interface, separately scoped', id: 'Dasbor admin dan antarmuka siswa dengan cakupan terpisah' } },
      { k: { en: 'Reach', id: 'Jangkauan' }, v: { en: 'REST API with Sanctum so a mobile client shares one back end', id: 'REST API dengan Sanctum agar klien mobile memakai satu back end' } },
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Sanctum', 'Geolocation API'],
    repo: 'https://github.com/aamnnr/geo-attendance',
    overview: {
      en: [
        'Letting students mark their own attendance from their own phone removes the queue at the gate and introduces an obvious hole. Geolocation closes it cheaply: the check-in is only accepted inside a radius around the school, and both the coordinates and the radius are settings rather than constants, because no two schools have the same footprint.',
        'The rest of the system exists because attendance is never just presence. Students are sometimes legitimately absent, so there is a leave request flow with evidence upload and an approval step. Administrators need to answer for the numbers, so recaps export to Excel and PDF. And every consequential action is written to an activity log.',
      ],
      id: [
        'Membiarkan siswa mengisi presensinya sendiri dari ponsel sendiri menghapus antrean di gerbang sekaligus membuka lubang yang jelas. Geolokasi menutupnya dengan murah: presensi hanya diterima di dalam radius sekitar sekolah, dan baik koordinat maupun radiusnya adalah pengaturan, bukan konstanta, karena tidak ada dua sekolah dengan bentang yang sama.',
        'Sisa sistemnya ada karena presensi tak pernah sekadar kehadiran. Siswa kadang absen secara sah, maka ada alur pengajuan izin dengan unggah bukti dan langkah persetujuan. Administrator harus mempertanggungjawabkan angkanya, maka rekap dapat diekspor ke Excel dan PDF. Dan setiap tindakan penting dicatat dalam log aktivitas.',
      ],
    },
    features: {
      en: [
        'Student check-in and check-out validated against GPS location.',
        'Configurable school coordinates and attendance radius.',
        'Student, class and department management.',
        'Class timetable management.',
        'Daily and monthly attendance monitoring and recaps.',
        'Leave requests with evidence upload, approval and rejection.',
        'Report export to Excel and PDF.',
        'System activity log.',
        'REST API secured with Laravel Sanctum for the mobile client.',
      ],
      id: [
        'Absen masuk dan pulang siswa divalidasi terhadap lokasi GPS.',
        'Koordinat sekolah dan radius presensi yang dapat dikonfigurasi.',
        'Manajemen siswa, kelas, dan jurusan.',
        'Manajemen jadwal pelajaran per kelas.',
        'Pemantauan dan rekap presensi harian serta bulanan.',
        'Pengajuan izin dengan unggah bukti, persetujuan, dan penolakan.',
        'Ekspor laporan ke Excel dan PDF.',
        'Log aktivitas sistem.',
        'REST API diamankan Laravel Sanctum untuk klien mobile.',
      ],
    },
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
    repo: 'https://github.com/aamnnr/tanisolution_web',
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
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'futsal-booking',
    codename: 'FutsalBooking',
    categories: ['web'],
    year: '2025',
    title: { en: 'Futsal Court Booking', id: 'Sistem Booking Lapangan Futsal' },
    summary: {
      en: 'A full-stack booking system where the hard part is not the form — it is making sure two people cannot hold the same slot.',
      id: 'Sistem booking full-stack yang bagian sulitnya bukan formulir, melainkan memastikan dua orang tidak memegang slot yang sama.',
    },
    role: { en: 'Full stack — Express API and React client.', id: 'Full stack — API Express dan klien React.' },
    spec: [
      { k: { en: 'Auth', id: 'Autentikasi' }, v: { en: 'Registration and login issuing JWT tokens', id: 'Registrasi dan login yang menerbitkan token JWT' } },
      { k: { en: 'Booking', id: 'Pemesanan' }, v: { en: 'Slot availability checked before a reservation is written', id: 'Ketersediaan slot diperiksa sebelum reservasi ditulis' } },
      { k: { en: 'Stack', id: 'Tumpukan' }, v: { en: 'Express + MongoDB back end, React 19 + Vite front end', id: 'Back end Express + MongoDB, front end React 19 + Vite' } },
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'React 19', 'Vite', 'JWT', 'Tailwind CSS'],
    repo: 'https://github.com/aamnnr/court-booking',
    overview: {
      en: [
        'This was where I learned that a booking system is a concurrency problem dressed as a CRUD app. Showing a list of courts is trivial; guaranteeing that the slot a user sees as free is still free by the time their reservation is written is not.',
        'The build gave me the pieces of a conventional web stack in one place — token authentication with JWT, password hashing with bcrypt, protected routes on the client, and a REST API sitting over MongoDB — which is exactly why I keep it in the portfolio rather than the two attendance systems’ third variation.',
      ],
      id: [
        'Di sinilah saya belajar bahwa sistem pemesanan adalah persoalan konkurensi yang menyamar sebagai aplikasi CRUD. Menampilkan daftar lapangan itu sepele; menjamin bahwa slot yang dilihat pengguna sebagai kosong masih kosong saat reservasinya ditulis, tidak sepele.',
        'Proyek ini memberi saya potongan-potongan tumpukan web konvensional dalam satu tempat — autentikasi token dengan JWT, hashing kata sandi dengan bcrypt, rute terproteksi di sisi klien, dan REST API di atas MongoDB — dan justru karena itu ia saya simpan di portofolio, bukan variasi ketiga dari sistem presensi.',
      ],
    },
    features: {
      en: [
        'Registration, login and logout with JWT tokens.',
        'Court listings with full details.',
        'Real-time slot availability checking during booking.',
        'Booking history on the user profile.',
        'Protected routes for authenticated users.',
        'Toast notifications for immediate feedback.',
      ],
      id: [
        'Registrasi, login, dan logout dengan token JWT.',
        'Daftar lapangan beserta detail lengkap.',
        'Pemeriksaan ketersediaan slot secara waktu nyata saat memesan.',
        'Riwayat pemesanan di halaman profil pengguna.',
        'Rute terproteksi untuk pengguna terautentikasi.',
        'Notifikasi toast untuk umpan balik langsung.',
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'secure-auth-demo',
    codename: 'Javis Challenge',
    categories: ['web'],
    year: '2025',
    title: { en: 'Secure Authentication Demo', id: 'Demo Autentikasi Aman' },
    summary: {
      en: 'An authentication service treated as the subject rather than the boilerplate: hashing, rate limiting, cookie handling, and tests that prove it.',
      id: 'Layanan autentikasi yang diperlakukan sebagai pokok bahasan, bukan pelengkap: hashing, pembatasan laju, penanganan cookie, dan pengujian yang membuktikannya.',
    },
    role: { en: 'Full stack, including the test suite.', id: 'Full stack, termasuk rangkaian pengujian.' },
    spec: [
      { k: { en: 'Hardening', id: 'Pengetatan' }, v: { en: 'bcrypt hashing, rate limiting, CORS and cookie parsing', id: 'Hashing bcrypt, pembatasan laju, CORS, dan parsing cookie' } },
      { k: { en: 'Session', id: 'Sesi' }, v: { en: 'JWT held in cookies, auth state via React Context', id: 'JWT disimpan dalam cookie, status auth lewat React Context' } },
      { k: { en: 'Proof', id: 'Bukti' }, v: { en: 'Unit tests with Vitest and React Testing Library', id: 'Uji unit dengan Vitest dan React Testing Library' } },
    ],
    stack: ['React 19', 'Vite', 'Express', 'MySQL', 'JWT', 'bcrypt', 'Vitest'],
    repo: 'https://github.com/aamnnr/login-auth-app',
    overview: {
      en: [
        'Almost every project I had built began with a login screen I wrote quickly and never examined. This one exists to examine it. The scope is small on purpose — register, log in, hold a session — so that the attention could go to the parts usually skipped: hashing passwords properly, limiting how fast an endpoint can be hammered, deciding where the token lives, and writing tests that fail when any of that regresses.',
        'It is also the first codebase where I wrote tests before considering the work finished, which changed how I think about “done”.',
      ],
      id: [
        'Hampir setiap proyek yang saya bangun dimulai dari layar login yang saya tulis cepat dan tidak pernah saya periksa. Proyek ini ada untuk memeriksanya. Cakupannya sengaja kecil — daftar, masuk, memelihara sesi — supaya perhatiannya bisa jatuh ke bagian yang biasanya dilewati: melakukan hashing kata sandi dengan benar, membatasi seberapa cepat sebuah endpoint bisa dihantam, memutuskan di mana token disimpan, dan menulis pengujian yang gagal ketika hal-hal itu mundur.',
        'Ini juga basis kode pertama tempat saya menulis pengujian sebelum menganggap pekerjaannya selesai, dan itu mengubah cara saya memahami kata "selesai".',
      ],
    },
    features: {
      en: [
        'Registration and login backed by MySQL.',
        'Password hashing with bcrypt.',
        'JWT sessions with cookie parsing.',
        'Rate limiting on authentication endpoints.',
        'Auth and theme state through React Context, including dark mode.',
        'Unit tests with Vitest and React Testing Library.',
      ],
      id: [
        'Registrasi dan login yang ditopang MySQL.',
        'Hashing kata sandi dengan bcrypt.',
        'Sesi JWT dengan parsing cookie.',
        'Pembatasan laju pada endpoint autentikasi.',
        'Status auth dan tema lewat React Context, termasuk mode gelap.',
        'Uji unit dengan Vitest dan React Testing Library.',
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'laptop-expert-system',
    codename: 'Forward Chaining',
    categories: ['ml'],
    year: '2026',
    title: { en: 'Laptop Recommendation Expert System', id: 'Sistem Pakar Rekomendasi Laptop' },
    summary: {
      en: 'A forward-chaining rule engine that reaches a recommendation by firing rules, and can show which ones it fired.',
      id: 'Mesin aturan forward chaining yang mencapai rekomendasi dengan menjalankan aturan, dan bisa menunjukkan aturan mana saja yang dijalankan.',
    },
    role: { en: 'Study project.', id: 'Proyek pembelajaran.' },
    spec: [
      { k: { en: 'Method', id: 'Metode' }, v: { en: 'Forward chaining over a fact base and a rule base', id: 'Forward chaining atas basis fakta dan basis aturan' } },
      { k: { en: 'Domain', id: 'Domain' }, v: { en: 'Matching laptop specifications to a stated need', id: 'Mencocokkan spesifikasi laptop dengan kebutuhan yang dinyatakan' } },
      { k: { en: 'Language', id: 'Bahasa' }, v: { en: 'Java', id: 'Java' } },
    ],
    stack: ['Java'],
    repo: 'https://github.com/aamnnr/belajar-ForwardChaining-SistemPakarLaptop',
    overview: {
      en: [
        'I built this while learning expert systems, and it turned out to be directly useful later: the dosage advice in the FertiCore rig is the same idea, rules over facts, applied to fertiliser instead of laptops.',
        'The appeal of forward chaining in an agricultural setting is that its reasoning can be read back. A statistical model that suggests a dose is hard to argue with; a chain of rules that fired can be shown to an agronomist and corrected.',
      ],
      id: [
        'Saya membangun ini sambil mempelajari sistem pakar, dan ternyata langsung berguna kemudian: saran dosis pada perangkat FertiCore memakai gagasan yang sama, aturan di atas fakta, hanya diterapkan pada pupuk alih-alih laptop.',
        'Daya tarik forward chaining dalam konteks pertanian adalah penalarannya bisa dibaca ulang. Model statistik yang menyarankan sebuah dosis sulit dibantah; rangkaian aturan yang dijalankan bisa ditunjukkan kepada seorang agronom dan dikoreksi.',
      ],
    },
    features: {
      en: [
        'Fact base and rule base kept separate from the engine.',
        'Forward-chaining inference until no further rule fires.',
        'Recommendation produced with the rule path that led to it.',
      ],
      id: [
        'Basis fakta dan basis aturan dipisahkan dari mesin inferensinya.',
        'Inferensi forward chaining sampai tidak ada aturan yang bisa dijalankan.',
        'Rekomendasi dihasilkan beserta jalur aturan yang menghasilkannya.',
      ],
    },
  },
];

/** Nomor urut dokumen: P-01, P-02, … mengikuti urutan tampil. */
export const projectIndex = (slug: string): string =>
  `P-${String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, '0')}`;

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
