import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/**
 * Semua gambar proyek tinggal di `src/assets/projects/` supaya dioptimasi Astro
 * (AVIF/WebP, srcset responsif) alih-alih dikirim sebagai PNG mentah dari `public/`.
 * Kunci peta ini sama dengan `src` di data proyek, mis. `projects/duitku/en/01-cover.png`.
 */
const files = import.meta.glob<ImageMetadata>('../assets/projects/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

const images = new Map(Object.entries(files).map(([path, image]) => [path.replace('../assets/', ''), image]));

/** Ambil gambar proyek; gagal saat build bila path di data proyek salah ketik. */
export function projectImage(src: string): ImageMetadata {
  const image = images.get(src);
  if (!image) throw new Error(`Gambar proyek tidak ditemukan: src/assets/${src}`);
  return image;
}

/** Gambar pratinjau tautan (Open Graph) 1200px, JPEG — format yang didukung semua platform. */
export async function ogImage(src: string) {
  const image = await getImage({ src: projectImage(src), width: 1200, format: 'jpg', quality: 82 });
  return { src: image.src, width: Number(image.attributes.width), height: Number(image.attributes.height) };
}
