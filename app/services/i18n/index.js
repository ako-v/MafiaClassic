import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import languageDetector from './language-detector';
import * as config from '../../config/i18n';
import translationLoader from './translation-loader';

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(translationLoader)
  .init({
    debug: false,
    fallbackLng: config.fallback,
    ns: config.namespaces,
    defaultNS: config.defaultNamespace,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
