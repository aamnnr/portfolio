import type { Lang } from './site';

type T = Record<Lang, string>;
type TL = Record<Lang, string[]>;

/* ------------------------------------------------------------------ *
 * 00 — META / SEO
 * ------------------------------------------------------------------ */
export const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Nur Amin — Software Engineer: Web, Mobile & IoT',
    description:
      'Software engineer in Klaten, Central Java. I build systems end to end across web, mobile and connected devices — Laravel and Next.js applications, Flutter apps, ESP32 firmware, and the occasional machine-learning model. Portfolio, services and contact.',
  },
  id: {
    title: 'Nur Amin — Software Engineer: Web, Mobile & IoT',
    description:
      'Jasa pembuatan aplikasi web, aplikasi mobile, dan sistem IoT di Klaten, Jawa Tengah. Laravel, Next.js, Flutter, firmware ESP32, hingga model pembelajaran mesin — dikerjakan utuh dari data sampai antarmuka. Portofolio, layanan, dan kontak.',
  },
};

/* ------------------------------------------------------------------ *
 * 01 — HERO
 * ------------------------------------------------------------------ */
export const hero: {
  status: T; statement: T; sub: T; ctaWork: T; ctaContact: T; ctaServices: T; figure: T;
} = {
  status: { en: 'Open to work · taking projects', id: 'Terbuka untuk peluang · menerima proyek' },
  statement: {
    en: 'I build whole systems rather than single layers — web, mobile, and the devices that feed them.',
    id: 'Saya membangun sistem yang utuh, bukan satu lapisannya saja — web, mobile, dan perangkat yang memasok datanya.',
  },
  sub: {
    en: 'Fourteen systems shipped end to end — web applications, Flutter apps, IoT devices, and a couple of machine-learning models. Computer Engineering graduate, now a Web Developer at Kembar Futa Group, taking on client projects of my own. Firmware, protocol, database, interface: I have written every layer at least once.',
    id: 'Empat belas sistem selesai dari hulu ke hilir — aplikasi web, aplikasi Flutter, perangkat IoT, dan beberapa model pembelajaran mesin. Sarjana Teknik Komputer, kini Web Developer di Kembar Futa Group, sekaligus menerima proyek klien sendiri. Firmware, protokol, basis data, antarmuka: setiap lapisan pernah saya tulis sendiri.',
  },
  ctaWork: { en: 'Read the projects', id: 'Lihat proyeknya' },
  ctaServices: { en: 'Have something built', id: 'Bangunkan sesuatu untuk Anda' },
  ctaContact: { en: 'Get in touch', id: 'Hubungi saya' },
  figure: {
    en: 'Five layers — every project below is some arrangement of these',
    id: 'Lima lapisan — setiap proyek di bawah adalah susunan dari kelimanya',
  },
};

// Lima lapisan yang muncul berulang di semua proyek — perangkat, web, maupun model.
// Sengaja generik: ini pola kerja, bukan satu proyek tertentu.
export const layers: { node: T; note: T }[] = [
  { node: { en: 'Input', id: 'Masukan' }, note: { en: 'sensor, camera, RFID, a form', id: 'sensor, kamera, RFID, formulir' } },
  { node: { en: 'Logic', id: 'Logika' }, note: { en: 'ESP32 firmware, KNN model, business rules', id: 'firmware ESP32, model KNN, aturan bisnis' } },
  { node: { en: 'Transport', id: 'Transport' }, note: { en: 'MQTT, REST API', id: 'MQTT, REST API' } },
  { node: { en: 'Store', id: 'Penyimpanan' }, note: { en: 'MySQL, MongoDB, Supabase', id: 'MySQL, MongoDB, Supabase' } },
  { node: { en: 'Interface', id: 'Antarmuka' }, note: { en: 'web dashboard, Flutter app', id: 'dasbor web, aplikasi Flutter' } },
];

/* ------------------------------------------------------------------ *
 * 02 — ABOUT
 * ------------------------------------------------------------------ */
export const about: { body: TL; facts: { k: T; v: T }[] } = {
  body: {
    en: [
      'I graduated in Computer Engineering from Universitas Teknologi Yogyakarta with a 3.74 GPA, concentrating on the Internet of Things. Most of what I know came from finishing things: soldering a board at a workbench, then going home to debug the Flask service that refused to accept its payload.',
      'That is why I describe myself by the seam rather than by one stack. A reading, a record or a prediction is only useful once it survives the trip to a database and arrives somewhere a person can act on it — whether it started at a sensor, a form, or a model. I am comfortable being the one responsible for that entire trip.',
      'For a year and a half I did that in R&D at PT Global Tani Solution — firmware, soldering iron, Flutter dashboards, and the documentation for all of it. Since July 2026 I have been a Web Developer at Kembar Futa Group, taking the same habits into work that is entirely web. What I want to get right next is the part that has to keep running when nobody is watching: backend architecture and system design.',
    ],
    id: [
      'Saya lulus dari Teknik Komputer Universitas Teknologi Yogyakarta dengan IPK 3.74, konsentrasi Internet of Things. Sebagian besar yang saya kuasai datang dari menuntaskan sesuatu: menyolder papan rangkaian di meja kerja, lalu pulang untuk memperbaiki layanan Flask yang menolak menerima datanya.',
      'Karena itu saya memperkenalkan diri lewat titik temunya, bukan lewat satu tumpukan teknologi. Sebuah bacaan, catatan, atau prediksi baru berguna ketika ia selamat sampai basis data dan tiba di tempat yang bisa ditindaklanjuti manusia — entah bermula dari sensor, formulir, atau sebuah model. Saya nyaman menjadi orang yang bertanggung jawab atas seluruh perjalanan itu.',
      'Selama satu setengah tahun saya melakukannya di R&D PT Global Tani Solution — firmware, solder, dasbor Flutter, dan dokumentasi untuk semuanya. Sejak Juli 2026 saya menjadi Web Developer di Kembar Futa Group, membawa kebiasaan yang sama ke pekerjaan yang sepenuhnya web. Yang ingin saya kuasai berikutnya adalah bagian yang harus tetap hidup saat tidak ada yang mengawasi: arsitektur backend dan desain sistem.',
    ],
  },
  facts: [
    { k: { en: 'Degree', id: 'Pendidikan' }, v: { en: 'B.Eng. Computer Engineering, UTY', id: 'S1 Teknik Komputer, UTY' } },
    { k: { en: 'GPA', id: 'IPK' }, v: { en: '3.74 / 4.00', id: '3,74 / 4,00' } },
    { k: { en: 'Concentration', id: 'Konsentrasi' }, v: { en: 'Internet of Things', id: 'Internet of Things' } },
    { k: { en: 'Based in', id: 'Domisili' }, v: { en: 'Klaten, Central Java', id: 'Klaten, Jawa Tengah' } },
    { k: { en: 'Languages', id: 'Bahasa' }, v: { en: 'Indonesian (native), English (TOEFL 480)', id: 'Indonesia (ibu), Inggris (TOEFL 480)' } },
  ],
};

/* ------------------------------------------------------------------ *
 * 03 — CAPABILITIES
 * Level ditulis sebagai kata, bukan persentase — persentase kemampuan
 * tidak punya satuan yang jujur.
 * ------------------------------------------------------------------ */
export type Level = 'core' | 'working' | 'learning';

export const levelLabel: Record<Level, T> = {
  core: { en: 'Core', id: 'Inti' },
  working: { en: 'Working', id: 'Terpakai' },
  learning: { en: 'Learning', id: 'Dipelajari' },
};

export const levelNote: T = {
  en: 'Core — I have shipped with it and can debug it alone. Working — productive with documentation at hand. Learning — used in practice, not yet unsupervised.',
  id: 'Inti — pernah dipakai sampai rilis dan bisa saya perbaiki sendiri. Terpakai — produktif dengan dokumentasi di tangan. Dipelajari — sudah dipraktikkan, belum tanpa pendampingan.',
};

export const capabilities: { group: T; items: { name: string; level: Level }[] }[] = [
{
    group: { en: 'Services & Data', id: 'Layanan & Data' },
    items: [
      { name: 'PHP / Laravel', level: 'working' },
      { name: 'Python / Flask', level: 'working' },
      { name: 'MySQL', level: 'working' },
      { name: 'MongoDB', level: 'working' },
      { name: 'Git & Github', level: 'working' },
      { name: 'Node.js', level: 'working' },
      { name: 'Postman', level: 'working' },

    ],
  },
{
    group: { en: 'Interfaces', id: 'Antarmuka' },
    items: [
      { name: 'HTML / CSS', level: 'working' },
      { name: 'JavaScript', level: 'working' },
      { name: 'Tailwind CSS', level: 'working' },
      { name: 'Flutter', level: 'working' },
      { name: 'React / Next.js', level: 'working' },
      { name: 'Vue / Nuxt', level: 'working' },
      { name: 'Wordpress', level: 'working'},
    ],
  },
{
    group: { en: 'Devices & Signals', id: 'Perangkat & Sinyal' },
    items: [
      { name: 'ESP32 / Arduino', level: 'core' },
      { name: 'MQTT & IoT protocols', level: 'core' },
      { name: 'Sensors & wiring', level: 'core' },
      { name: 'C++', level: 'working' },
    ],
  },
{
    group: { en: 'Analysis & Design', id: 'Analisis & Desain' },
    items: [
      { name: 'UI/UX design', level: 'core' },
      { name: 'Machine learning', level: 'working' },
      { name: 'Data analysis', level: 'working' },
      { name: 'RapidMiner', level: 'working' },
      { name: 'Figma', level: 'working' },
      { name: 'CorelDRAW', level: 'working' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * 05 — EXPERIENCE
 * ------------------------------------------------------------------ */
export const experience: {
  role: T; org: string; period: T; current?: boolean; points: TL;
}[] = [
  {
    role: { en: 'Web Developer', id: 'Web Developer' },
    org: 'Kembar Futa Group',
    period: { en: 'Jul 2026 — present', id: 'Jul 2026 — sekarang' },
    current: true,
    points: {
      en: [
        'Build and maintain the company’s web applications.',
        'Carry features from requirement through to deployment.',
        'Apply the backend and interface work from the IoT projects to a purely web setting.',
      ],
      id: [
        'Membangun dan merawat aplikasi web perusahaan.',
        'Membawa fitur dari kebutuhan sampai penerapan.',
        'Menerapkan pengalaman backend dan antarmuka dari proyek IoT ke konteks web sepenuhnya.',
      ],
    },
  },
  {
    role: { en: 'Research & Development', id: 'Research & Development' },
    org: 'PT Global Tani Solution',
    period: { en: 'Nov 2024 — May 2026', id: 'Nov 2024 — Mei 2026' },
    points: {
      en: [
        'Wrote and tested the firmware behind the company’s IoT devices.',
        'Assembled and soldered hardware, then took it through to a working unit.',
        'Built the Flutter dashboards and the admin console the field devices report into.',
        'Kept the technical documentation current so the next person did not start from zero.',
        'Coordinated with the team across the hardware and software halves of a build.',
      ],
      id: [
        'Menulis dan menguji firmware untuk perangkat IoT perusahaan.',
        'Merakit dan menyolder perangkat keras sampai menjadi unit yang berfungsi.',
        'Membangun dasbor Flutter dan konsol admin tempat perangkat lapangan melapor.',
        'Menjaga dokumentasi teknis tetap mutakhir agar orang berikutnya tidak mulai dari nol.',
        'Berkoordinasi dengan tim pada sisi perangkat keras maupun perangkat lunak.',
      ],
    },
  },
  {
    role: { en: 'Media & Public Relations Staff', id: 'Staf Media dan Humas' },
    org: 'PPK ORMAWA DIKTI — UKM Olahraga UTY',
    period: { en: '2024', id: '2024' },
    points: {
      en: [
        'Ran the programme’s social media during the grant period.',
        'Documented events and produced the accompanying publication material.',
        'Handled official correspondence for the team.',
      ],
      id: [
        'Mengelola media sosial program selama masa pendanaan.',
        'Mendokumentasikan kegiatan dan menyiapkan materi publikasinya.',
        'Menangani surat-menyurat resmi tim.',
      ],
    },
  },
  {
    role: { en: 'Administration & Public Relations Staff', id: 'Staf Administrasi dan Humas' },
    org: 'UKM Olahraga, Universitas Teknologi Yogyakarta',
    period: { en: '2021 — 2024', id: '2021 — 2024' },
    points: {
      en: [
        'Planned and published social media content for the organisation.',
        'Maintained the document archive across three years of activity.',
        'Kept inventory records for shared equipment.',
      ],
      id: [
        'Merencanakan dan menerbitkan konten media sosial organisasi.',
        'Merawat arsip dokumen selama tiga tahun kepengurusan.',
        'Mengelola data inventaris peralatan bersama.',
      ],
    },
  },
];

/* ------------------------------------------------------------------ *
 * 06 — CREDENTIALS
 * ------------------------------------------------------------------ */
export const education = {
  degree: { en: 'Bachelor of Computer Engineering', id: 'S1 Teknik Komputer' } as T,
  institution: 'Universitas Teknologi Yogyakarta',
  period: { en: 'Graduated 2025 · GPA 3.74', id: 'Lulus 2025 · IPK 3,74' } as T,
  note: {
    en: 'Concentration in Internet of Things, with coursework carried into the flood-warning and attendance systems above.',
    id: 'Konsentrasi Internet of Things, dengan materi kuliah yang dibawa langsung ke sistem peringatan banjir dan presensi di atas.',
  } as T,
};

export const certifications: { title: T; issuer: string }[] = [
  { title: { en: 'Junior Web Developer', id: 'Asisten Pengembang Web' }, issuer: 'BNSP' },
  { title: { en: 'Data Engineering', id: 'Data Engineering' }, issuer: 'Altair RapidMiner' },
  { title: { en: 'Machine Learning', id: 'Machine Learning' }, issuer: 'Altair RapidMiner' },
];

/* ------------------------------------------------------------------ *
 * 07 — CONTACT
 * ------------------------------------------------------------------ */
export const contact: {
  lead: T; body: T; note: T;
  paths: { who: T; line: T }[];
  briefTitle: T; brief: TL;
} = {
  lead: { en: 'Let’s talk', id: 'Mari berbicara' },
  body: {
    en: 'Two kinds of message land here. One is a role — ideally one where the data, the system around it and the people reading it are treated as a single problem. The other is something you need built. Either way, a short description is enough to start — one address, no form to fill in.',
    id: 'Ada dua jenis pesan yang sampai ke sini. Yang pertama tawaran posisi — idealnya yang memperlakukan data, sistem di sekitarnya, dan orang yang membacanya sebagai satu persoalan. Yang kedua sesuatu yang perlu Anda bangun. Apa pun itu, deskripsi singkat sudah cukup untuk memulai — satu alamat, tanpa formulir.',
  },
  note: {
    en: 'Usually replies within a day.',
    id: 'Biasanya dibalas dalam sehari.',
  },
  paths: [
    {
      who: { en: 'Hiring', id: 'Merekrut' },
      line: {
        en: 'Send the role and what the team is stuck on. I will tell you honestly whether I am the right fit.',
        id: 'Kirimkan posisinya dan apa yang sedang menyulitkan tim. Saya akan jujur menilai apakah saya cocok.',
      },
    },
    {
      who: { en: 'Commissioning work', id: 'Memesan pekerjaan' },
      line: {
        en: 'Describe the problem in your own words. You get a written scope and a price back before anything begins.',
        id: 'Ceritakan persoalannya dengan kalimat Anda sendiri. Anda akan menerima lingkup tertulis dan harganya sebelum apa pun dimulai.',
      },
    },
  ],
  briefTitle: { en: 'Helpful to include', id: 'Baik untuk disertakan' },
  brief: {
    en: [
      'What the system should do, in one or two sentences.',
      'Who will use it, and on what device.',
      'Whether hardware is involved, and whether it already exists.',
      'When you need it, and roughly what you have set aside for it.',
    ],
    id: [
      'Apa yang harus dilakukan sistemnya, dalam satu dua kalimat.',
      'Siapa yang akan memakainya, dan lewat perangkat apa.',
      'Apakah ada perangkat kerasnya, dan apakah sudah tersedia.',
      'Kapan Anda membutuhkannya, dan kira-kira berapa yang sudah dialokasikan.',
    ],
  },
};

export const quote: T = {
  en: '“Do’akan usahamu, usahakan do’amu.” — Pray over your effort; put effort into your prayer.',
  id: '“Do’akan usahamu, usahakan do’amu.”',
};

/* ------------------------------------------------------------------ *
 * NAV
 * ------------------------------------------------------------------ */
export const nav: { id: string; num: string; label: T }[] = [
  { id: 'about', num: '01', label: { en: 'About', id: 'Profil' } },
  { id: 'services', num: '02', label: { en: 'Services', id: 'Layanan' } },
  { id: 'capabilities', num: '03', label: { en: 'Capabilities', id: 'Kemampuan' } },
  { id: 'projects', num: '04', label: { en: 'Projects', id: 'Proyek' } },
  { id: 'experience', num: '05', label: { en: 'Experience', id: 'Pengalaman' } },
  { id: 'credentials', num: '06', label: { en: 'Credentials', id: 'Kredensial' } },
  { id: 'contact', num: '07', label: { en: 'Contact', id: 'Kontak' } },
];

export const sectionTitles: Record<string, T> = {
  about: { en: 'About', id: 'Profil' },
  services: { en: 'Services', id: 'Layanan' },
  capabilities: { en: 'Capabilities', id: 'Kemampuan' },
  projects: { en: 'Selected work', id: 'Karya terpilih' },
  experience: { en: 'Experience', id: 'Pengalaman' },
  credentials: { en: 'Education & certification', id: 'Pendidikan & sertifikasi' },
  contact: { en: 'Contact', id: 'Kontak' },
};

export const ui: Record<string, T> = {
  skipToContent: { en: 'Skip to content', id: 'Lewati ke konten' },
  menu: { en: 'Menu', id: 'Menu' },
  close: { en: 'Close', id: 'Tutup' },
  theme: { en: 'Toggle theme', id: 'Ganti tema' },
  langSwitch: { en: 'Baca dalam Bahasa Indonesia', id: 'Read in English' },
  repo: { en: 'Source', id: 'Kode sumber' },
  stack: { en: 'Stack', id: 'Teknologi' },
  email: { en: 'Email', id: 'Surel' },
  phone: { en: 'Phone', id: 'Telepon' },
  whatsapp: { en: 'WhatsApp', id: 'WhatsApp' },
  elsewhere: { en: 'Elsewhere', id: 'Tautan lain' },
  rights: { en: 'All rights reserved.', id: 'Hak cipta dilindungi.' },
  builtWith: { en: 'Built with Astro. Typeset in IBM Plex.', id: 'Dibangun dengan Astro. Tipografi IBM Plex.' },
  revision: { en: 'Revision', id: 'Revisi' },
  updated: { en: 'Updated', id: 'Diperbarui' },
  backToTop: { en: 'Back to top', id: 'Kembali ke atas' },

  // Klasifikasi & daftar proyek
  filterAll: { en: 'All', id: 'Semua' },
  filterLabel: { en: 'Filter by field', id: 'Saring menurut bidang' },
  showing: { en: 'Showing', id: 'Menampilkan' },
  of: { en: 'of', id: 'dari' },
  entries: { en: 'entries', id: 'entri' },
  readEntry: { en: 'Open the full entry', id: 'Buka entri lengkap' },

  // Halaman detail
  backToIndex: { en: 'All projects', id: 'Semua proyek' },
  overview: { en: 'Overview', id: 'Tinjauan' },
  functionBlock: { en: 'Function', id: 'Fungsi' },
  featuresBlock: { en: 'What it does', id: 'Yang dikerjakan' },
  notesBlock: { en: 'Technical notes', id: 'Catatan teknis' },
  roleLabel: { en: 'My role', id: 'Peran saya' },
  yearLabel: { en: 'Year', id: 'Tahun' },
  fieldLabel: { en: 'Field', id: 'Bidang' },
  prevProject: { en: 'Previous', id: 'Sebelumnya' },
  nextProject: { en: 'Next', id: 'Berikutnya' },
  moreIn: { en: 'More in this field', id: 'Lainnya di bidang ini' },

  // Layanan
  scopeBlock: { en: 'Scope of work', id: 'Lingkup kerja' },
  deliverablesBlock: { en: 'You receive', id: 'Yang Anda terima' },
  proof: { en: 'Proven in', id: 'Terbukti pada' },
  howItWorks: { en: 'How working together goes', id: 'Bagaimana kerja samanya berjalan' },
  startBrief: { en: 'Describe your problem', id: 'Ceritakan persoalan Anda' },
  forClients: { en: 'For clients', id: 'Untuk klien' },
  forEmployers: { en: 'For employers', id: 'Untuk perusahaan' },
};
