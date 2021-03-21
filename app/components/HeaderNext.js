import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import AppText from './AppText';

export default function HeaderNext({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AppText style={styles.text}>Next</AppText>
      <Icon name="chevron-right" size={35} color={colors.dark} />
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
    fontFamily: 'RobotoSlab-Medium',
  },
});
