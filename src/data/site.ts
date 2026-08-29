export const site = {
  name: 'Nur Amin',
  handle: 'aamnnr',
  role: {
    en: 'Software Engineer — web, mobile & connected devices',
    id: 'Software Engineer — web, mobile & perangkat terhubung',
  },
  /** Label pendek untuk kepala halaman, di samping nama. */
  roleShort: {
    en: 'Software Engineer',
    id: 'Software Engineer',
  },
  location: { en: 'Klaten, Central Java, Indonesia', id: 'Klaten, Jawa Tengah, Indonesia' },
  email: 'noeramin354@gmail.com',
  phone: '+62 858-6910-6314',
  phoneHref: '+6285869106314',
  whatsapp: '6285869106314',
  socials: [
    { label: 'GitHub', handle: 'aamnnr', url: 'https://github.com/aamnnr' },
    { label: 'LinkedIn', handle: 'nur-amin354', url: 'https://linkedin.com/in/nur-amin354' },
    { label: 'Instagram', handle: '@aamnnr', url: 'https://instagram.com/aamnnr' },
  ],
  // Dokumen revisi — dipakai di header sebagai penanda versi dokumen.
  revision: '01',
  updated: '2026-08',
} as const;

export type Lang = 'en' | 'id';
