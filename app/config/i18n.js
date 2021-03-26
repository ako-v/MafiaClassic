export const fallback = 'en';
export const supportedLocales = {
  en: {
    translationFileLoader: () => require('../lang/en.json'),
  },
  fa: {
    translationFileLoader: () => require('../lang/fa.json'),
  },
};
export const defaultNamespace = 'common';
export const namespaces = ['common', 'title', 'deal', 'roles', 'languages'];
