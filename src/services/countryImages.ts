import type { Country, CountryImage } from '../types';
import { photosForCountry } from './teacherPhotoLibrary';

export function imagesForCountry(country: Country): CountryImage[] {
  const images = [country.media?.hero, ...(country.media?.gallery ?? []), ...photosForCountry(country.id)]
    .filter(Boolean) as CountryImage[];
  const seen = new Set<string>();
  return images.filter((image) => {
    const key = `${image.category}:${image.commonsFile ?? image.src}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function imageForCategory(country: Country, category: CountryImage['category']): CountryImage | undefined {
  return imagesForCountry(country).find((image) => image.category === category) ?? imagesForCountry(country)[0];
}
