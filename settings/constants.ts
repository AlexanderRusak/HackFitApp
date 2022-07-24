export const COLORS = {
  burgundi: { title: 'Burgundi', value: '#800020' },
  veriperi: { title: 'Veri Peri', value: '#6667AB' },
}

export const LANGUAGES = {
  english: { title: 'English', value: 'english' },
  russian: { title: 'Русский', value: 'russian' }
}

export enum ENERGY_UNITS {
  Calories = 'Calories',
  Joule = 'Joulie'
}



export const Languages =
  [
    { title: LANGUAGES.english.title, value: LANGUAGES.english.value },
    { title: LANGUAGES.russian.title, value: LANGUAGES.russian.value }
  ];

export const EnergyUnits =
  [
    { title: ENERGY_UNITS.Calories, value: ENERGY_UNITS.Calories.toLowerCase() },
    { title: ENERGY_UNITS.Joule, value: ENERGY_UNITS.Joule.toLowerCase() }
  ];

export const ColorSchema =
  [
    { title: COLORS.burgundi.title, value: COLORS.burgundi.value },
    { title: COLORS.veriperi.title, value: COLORS.veriperi.value }
  ];
