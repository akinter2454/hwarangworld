/**
 * Fixed student-safe Wikimedia Commons allowlist.
 *
 * v0.9: 12 countries × 4 reviewed real photos = 48 files.
 * Student pages never expose live search. Only filenames listed here may be
 * rendered remotely. Teacher-added candidates are reviewed separately and do
 * not become student-visible just by entering a filename.
 */
export const CURATED_COMMONS_FILES = [
  // Korea
  'Scenery of Seoul.jpg',
  'Namdaemun market in Seoul I.jpg',
  'Korean.food-Bibimbap-01.jpg',
  'Gyeongbokgung, Seoul.jpg',

  // Vietnam
  'Hanoi, Vietnam, Hoan Kiem Lake.jpg',
  'Daily life in Vietnam Street vendor.jpg',
  'Pho in Saigon.jpg',
  'Lake in Hanoi.jpg',

  // China
  'Beijing skyline from northeast 4th ring road.jpg',
  'Wangfujing street, Beijing.JPG',
  'Jiaozi.jpg',
  'Temple-of-heaven.jpg',

  // Mongolia
  'Ulaanbaatar city Mongolia 20230926 102617.jpg',
  'Peace Avenue, Ulaanbaatar, Mongolia - 2023.jpg',
  'Mongolian buuz.jpg',
  'Mongolia-terelj.jpg',

  // Philippines
  'Rizal Park from above.jpg',
  'Binondo - Quintin Paredes (Manila; 11-24-2019).jpg',
  'Adobo Filipino style.jpg',
  'Rizal Monument at Rizal Park.jpg',

  // Thailand
  'Bangkok skyline, Bangkok, Thailand.jpg',
  'Bangkok Chatuchak Market 1.jpg',
  'Pad Thai in Thailand.jpg',
  'ThaiBangkokWatArun.jpg',

  // Uzbekistan
  'View from Hotel Uzbekistan in Tashkent 2.jpg',
  'The Street of Tashkent.jpg',
  'Plov.jpg',
  'Registan Samarkand.jpg',

  // India
  'Connaught Place New Delhi.jpg',
  'Street scene in Old Delhi (5621280682).jpg',
  'INDIAN thali.jpg',
  'India gate new delhi.jpg',

  // Japan
  'Shibuya Crossing in Tokyo.jpg',
  'Crowded Shibuya street.jpg',
  'Onigiri.JPG',
  'Sensoji temple tokyo.jpg',

  // Brazil
  'Street Scene - Santa Teresa District - Rio de Janeiro - Brazil.jpg',
  'Pedestrians and street stalls in Rio de Janeiro, Brazil.jpg',
  'Brazilian food Feijoada.jpg',
  'Sugarloaf, Rio, Brazil.jpg',

  // Egypt
  'The Nile at Cairo.jpg',
  'Life street in old Cairo.jpg',
  'Egyptian Koshari.jpg',
  'Cairo City.jpg',

  // France
  'Paris from the Eiffel Tower.JPG',
  'Paris street life. On the banks of the Seine. 4 June 2017.jpg',
  'Baguettes, Paris, France - panoramio.jpg',
  'Paris Place du Carrousel, le Louvre.jpg',
] as const;

const allowlist = new Set<string>(CURATED_COMMONS_FILES);

export const isCuratedCommonsFile = (fileName: string) => allowlist.has(fileName);
export const curatedCommonsCount = CURATED_COMMONS_FILES.length;
