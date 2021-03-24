export const fallback = 'en';
export const supportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: () => require('../lang/en.json'),
  },
  fa: {
    name: 'Farsi',
    translationFileLoader: () => require('../lang/fa.json'),
  },
};
export const defaultNamespace = 'common';
export const namespaces = ['common', 'title'];
