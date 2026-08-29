import type { Lang } from './site';

type T = Record<Lang, string>;
type TL = Record<Lang, string[]>;

/* ------------------------------------------------------------------ *
 * LAYANAN
 * Ditulis sebagai lembar pesanan kerja, bukan paket berlangganan:
 * lingkup, hasil serah-terima, estimasi waktu, dan bukti pekerjaan
 * sejenis yang sudah pernah selesai. Harga menyusul percakapan.
 * ------------------------------------------------------------------ */
export type Service = {
  code: string;
  title: T;
  summary: T;
  /** Yang dikerjakan di dalam lingkup. */
  scope: TL;
  /** Yang benar-benar diserahkan pada akhir pekerjaan. */
  deliverables: TL;
  timeline: T;
  /** Batas jujur — kapan sebaiknya mencari orang lain. */
  notFor: T;
  /** Slug proyek yang membuktikan layanan ini pernah dikerjakan. */
  proof: string[];
};

export const services: Service[] = [
  {
    code: 'S-01',
    title: { en: 'End-to-end IoT systems', id: 'Sistem IoT ujung-ke-ujung' },
    summary: {
      en: 'A device that reads something real, a link that carries the reading out, and a screen where someone can act on it — built as one system rather than three subcontracts.',
      id: 'Perangkat yang membaca sesuatu yang nyata, jalur yang membawa bacaannya keluar, dan layar tempat seseorang bisa menindaklanjutinya — dibangun sebagai satu sistem, bukan tiga pekerjaan terpisah.',
    },
    scope: {
      en: [
        'Sensor selection and wiring for the quantity you actually need measured.',
        'ESP32 / Arduino firmware, including Wi-Fi provisioning and recovery from power loss.',
        'MQTT topic and payload design, agreed in writing before either side is built.',
        'A dashboard — web or mobile — showing live state, history, and manual control.',
        'Threshold and alerting logic, so the system speaks up instead of waiting to be checked.',
      ],
      id: [
        'Pemilihan sensor dan perkabelan untuk besaran yang memang perlu Anda ukur.',
        'Firmware ESP32 / Arduino, termasuk penyiapan Wi-Fi dan pemulihan setelah listrik padam.',
        'Perancangan topik dan muatan MQTT, disepakati tertulis sebelum kedua sisi dibangun.',
        'Dasbor — web atau mobile — berisi status langsung, riwayat, dan kendali manual.',
        'Logika ambang dan peringatan, agar sistem bersuara alih-alih menunggu diperiksa.',
      ],
    },
    deliverables: {
      en: [
        'Working hardware unit, assembled and tested.',
        'Firmware source with build and flashing instructions.',
        'Dashboard application and its source.',
        'A wiring diagram and an MQTT contract document.',
        'A short operator guide in Indonesian.',
      ],
      id: [
        'Unit perangkat keras yang berfungsi, sudah dirakit dan diuji.',
        'Sumber firmware beserta petunjuk build dan flashing.',
        'Aplikasi dasbor dan kode sumbernya.',
        'Diagram perkabelan dan dokumen kontrak MQTT.',
        'Panduan operator ringkas dalam Bahasa Indonesia.',
      ],
    },
    timeline: { en: 'Typically 3–8 weeks', id: 'Umumnya 3–8 minggu' },
    notFor: {
      en: 'Not the right fit for mass production runs or certified safety-critical equipment — I build working units and prototypes, not manufacturing lines.',
      id: 'Kurang cocok untuk produksi massal atau peralatan keselamatan bersertifikasi — saya membangun unit kerja dan purwarupa, bukan lini manufaktur.',
    },
    proof: ['ferticore-presisi', 'flood-early-warning', 'rfid-esp32cam-attendance'],
  },

  {
    code: 'S-02',
    title: { en: 'Web applications & company sites', id: 'Aplikasi web & situs perusahaan' },
    summary: {
      en: 'Information systems, admin dashboards and company profiles — built so your own staff can change the content afterwards without calling a developer.',
      id: 'Sistem informasi, dasbor admin, dan company profile — dibangun agar staf Anda sendiri bisa mengubah kontennya tanpa menelepon pengembang.',
    },
    scope: {
      en: [
        'Data model and user roles worked out before any screen is drawn.',
        'Back end in Laravel, Next.js or Express, whichever fits the hosting you already pay for.',
        'Admin panel for the content and records that will actually change over time.',
        'Authentication with password hashing, session handling and rate limiting.',
        'Responsive layouts, tested on the phones your users actually hold.',
        'Reports and exports to Excel or PDF where the work demands paperwork.',
      ],
      id: [
        'Model data dan peran pengguna diselesaikan sebelum satu layar pun digambar.',
        'Back end dengan Laravel, Next.js, atau Express, mana yang cocok dengan hosting yang sudah Anda bayar.',
        'Panel admin untuk konten dan catatan yang memang akan berubah seiring waktu.',
        'Autentikasi dengan hashing kata sandi, penanganan sesi, dan pembatasan laju.',
        'Tata letak responsif, diuji pada ponsel yang benar-benar dipegang pengguna Anda.',
        'Laporan dan ekspor ke Excel atau PDF bila pekerjaannya menuntut berkas.',
      ],
    },
    deliverables: {
      en: [
        'Deployed application on your hosting or mine, your choice.',
        'Full source code in a repository you own.',
        'Database schema and seed data.',
        'Admin handover session plus a written guide.',
      ],
      id: [
        'Aplikasi yang sudah diterapkan di hosting Anda atau saya, terserah Anda.',
        'Seluruh kode sumber dalam repositori milik Anda.',
        'Skema basis data dan data awal.',
        'Sesi serah-terima admin plus panduan tertulis.',
      ],
    },
    timeline: { en: 'Typically 2–6 weeks', id: 'Umumnya 2–6 minggu' },
    notFor: {
      en: 'Not the right fit if you need a large team moving in parallel — I work alone, which suits one clear owner and one clear scope.',
      id: 'Kurang cocok bila Anda butuh tim besar yang bergerak paralel — saya bekerja sendiri, dan itu cocok untuk satu pemilik dan satu lingkup yang jelas.',
    },
    proof: ['geo-attendance', 'ferticore-admin', 'tani-solution-web'],
  },

  {
    code: 'S-03',
    title: { en: 'Flutter mobile applications', id: 'Aplikasi mobile Flutter' },
    summary: {
      en: 'One codebase for Android and iOS — and, when the app has to talk to hardware, one written by someone who has also written the firmware on the other side.',
      id: 'Satu basis kode untuk Android dan iOS — dan, bila aplikasinya harus berbicara dengan perangkat keras, ditulis oleh orang yang juga pernah menulis firmware di seberangnya.',
    },
    scope: {
      en: [
        'Companion apps for ESP32 devices over MQTT or BLE.',
        'Live telemetry, historical charts and activity logs.',
        'Remote control with an offline command queue for weak-signal sites.',
        'Device provisioning over Bluetooth, for units that have no Wi-Fi credentials yet.',
        'Local notifications for low battery, offline devices and threshold crossings.',
      ],
      id: [
        'Aplikasi pendamping untuk perangkat ESP32 lewat MQTT atau BLE.',
        'Telemetri langsung, grafik historis, dan log aktivitas.',
        'Kendali jarak jauh dengan antrean perintah luring untuk lokasi bersinyal lemah.',
        'Penyiapan perangkat lewat Bluetooth, untuk unit yang belum punya kredensial Wi-Fi.',
        'Notifikasi lokal untuk baterai lemah, perangkat luring, dan ambang terlampaui.',
      ],
    },
    deliverables: {
      en: [
        'Signed Android build, plus an iOS build if you hold a developer account.',
        'Full Flutter source code.',
        'The MQTT or BLE contract the app expects, written down.',
        'Play Store submission assistance if you want it published.',
      ],
      id: [
        'Build Android tertanda tangan, plus build iOS bila Anda punya akun developer.',
        'Seluruh kode sumber Flutter.',
        'Kontrak MQTT atau BLE yang diharapkan aplikasi, tertulis.',
        'Pendampingan pengiriman ke Play Store bila ingin dipublikasikan.',
      ],
    },
    timeline: { en: '3–6 weeks', id: '3–6 minggu' },
    notFor: {
      en: 'Not the right fit for games or anything needing heavy native platform code.',
      id: 'Kurang cocok untuk gim atau apa pun yang menuntut banyak kode native platform.',
    },
    proof: ['pestzone-spray', 'pestmist-control', 'ferticore-presisi'],
  },

  {
    code: 'S-04',
    title: { en: 'UI/UX design & engineering final projects', id: 'Desain UI/UX & tugas akhir teknik' },
    summary: {
      en: 'Interface design in Figma, and technical guidance for students building an IoT or machine-learning final project — help understanding and finishing it, not a ghost-written submission.',
      id: 'Desain antarmuka di Figma, dan pendampingan teknis untuk mahasiswa yang menggarap tugas akhir IoT atau pembelajaran mesin — bantuan memahami dan menuntaskan, bukan pengerjaan yang disamarkan.',
    },
    scope: {
      en: [
        'Wireframes and a high-fidelity Figma prototype before a line of code is written.',
        'A small component set and colour system your future developer can implement.',
        'For students: narrowing the topic into something buildable in the time available.',
        'Walking through the hardware, the algorithm, or the failing part until you can explain it yourself.',
        'Review of your own code and writing, with the reasons behind each correction.',
      ],
      id: [
        'Wireframe dan purwarupa Figma resolusi tinggi sebelum satu baris kode ditulis.',
        'Set komponen ringkas dan sistem warna yang bisa diterapkan pengembang Anda nanti.',
        'Untuk mahasiswa: mempersempit topik menjadi sesuatu yang bisa dibangun dalam waktu yang tersedia.',
        'Menelusuri perangkat keras, algoritma, atau bagian yang gagal sampai Anda bisa menjelaskannya sendiri.',
        'Ulasan atas kode dan tulisan Anda, lengkap dengan alasan di balik setiap koreksi.',
      ],
    },
    deliverables: {
      en: [
        'Figma file with prototype links, handed over to your account.',
        'Exported assets and a short style guide.',
        'For guidance work: session notes and a reading list, so the learning survives the deadline.',
      ],
      id: [
        'Berkas Figma beserta tautan purwarupa, diserahkan ke akun Anda.',
        'Aset terekspor dan panduan gaya ringkas.',
        'Untuk pendampingan: catatan sesi dan daftar bacaan, agar pemahamannya bertahan setelah tenggat.',
      ],
    },
    timeline: { en: 'Design 1–3 weeks · guidance per session', id: 'Desain 1–3 minggu · pendampingan per sesi' },
    notFor: {
      en: 'I will not write a thesis or sit an assessment in someone else’s name. If that is what is needed, we are not a match.',
      id: 'Saya tidak menuliskan skripsi atau mengikuti penilaian atas nama orang lain. Bila itu yang dibutuhkan, kita tidak cocok.',
    },
    proof: ['face-attendance-knn', 'laptop-expert-system'],
  },
];

/* ------------------------------------------------------------------ *
 * CARA KERJA
 * Empat langkah yang sama untuk semua layanan di atas.
 * ------------------------------------------------------------------ */
export const workflow: { step: T; detail: T }[] = [
  {
    step: { en: 'Brief', id: 'Penjelasan awal' },
    detail: {
      en: 'You describe the problem. A message is enough to start — no form, no meeting yet.',
      id: 'Anda menjelaskan persoalannya. Satu pesan sudah cukup untuk memulai — belum perlu formulir atau rapat.',
    },
  },
  {
    step: { en: 'Scope & quote', id: 'Lingkup & penawaran' },
    detail: {
      en: 'I write down what will be built, what will not, and what it costs. You approve it before anything starts.',
      id: 'Saya menuliskan apa yang akan dibangun, apa yang tidak, dan berapa biayanya. Anda menyetujuinya sebelum apa pun dimulai.',
    },
  },
  {
    step: { en: 'Build', id: 'Pengerjaan' },
    detail: {
      en: 'Weekly progress you can see and try, not a silent month ending in a surprise.',
      id: 'Kemajuan mingguan yang bisa Anda lihat dan coba, bukan sebulan senyap yang berakhir dengan kejutan.',
    },
  },
  {
    step: { en: 'Handover', id: 'Serah terima' },
    detail: {
      en: 'Source code, documentation and a walkthrough. The system stays yours to run without me.',
      id: 'Kode sumber, dokumentasi, dan penelusuran bersama. Sistemnya tetap milik Anda dan bisa jalan tanpa saya.',
    },
  },
];

export const servicesNote: Record<Lang, string> = {
  en: 'Pricing follows the scope rather than a package. Send a description of the problem and you get a written scope and a number back — no obligation, no sales call.',
  id: 'Harga mengikuti lingkup kerja, bukan paket. Kirimkan deskripsi persoalannya dan Anda akan menerima lingkup tertulis beserta angkanya — tanpa kewajiban, tanpa telepon penjualan.',
};
