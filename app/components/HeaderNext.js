import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import AppText from './AppText';
import {I18nManager} from 'react-native';

export default function HeaderNext({onPress}) {
  const {t} = useTranslation();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AppText style={styles.text}>{t('next')}</AppText>
      <Icon name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={35} color={colors.black} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 2,
  },
  text: {
    fontSize: 19,
    fontFamily: 'RobotoSlab-SemiBold',
    color: colors.black,
  },
});
