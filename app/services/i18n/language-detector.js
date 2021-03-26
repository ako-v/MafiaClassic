import * as RNLocalize from 'react-native-localize';
import cache from '../../utils/cache';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language
    // files.
    const cachedLanguage = await cache.get('language');
    if (cachedLanguage) callback(cachedLanguage);
    else callback(RNLocalize.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: lang => {
    cache.store('language', lang);
  },
};

export default languageDetector;
