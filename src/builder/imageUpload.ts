import type { ImageAsset } from '@/types/project';
import { newId } from './defaults';

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('read failed'));
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.readAsDataURL(file);
  });
}

function dimsFromDataUrl(dataUrl: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

export async function fileToAsset(file: File): Promise<ImageAsset> {
  const dataUrl = await readFileAsDataUrl(file);
  const dims = await dimsFromDataUrl(dataUrl);
  return {
    id: newId('img'),
    filename: file.name,
    mimeType: file.type || 'image/png',
    dataUrl,
    alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
    width: dims?.width,
    height: dims?.height,
  };
}
