import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';

import AppPicker from '../components/AppPicker';
import Screen from '../components/Screen';

export default function SettingsScreen(props) {
  const {t, i18n} = useTranslation();
  const languageList = i18n.options.supportedLngs.filter(lng => lng !== 'cimode').map(lang => t('languages:' + lang));

  const changeLanguage = index => {
    i18n.changeLanguage(i18n.options.supportedLngs[index]);
    if (i18n.language === 'fa' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
    if (i18n.language !== 'fa' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      RNRestart.Restart();
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppPicker
        icon="translate"
        title={t('language')}
        list={languageList}
        selected={t(`languages:${i18n.language}`)}
        onSelect={changeLanguage}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {},
});
