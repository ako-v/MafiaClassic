import * as RNLocalize from 'react-native-localize';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language
    // files.
    callback(RNLocalize.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageDetector;
