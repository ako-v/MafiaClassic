import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import AppText from './AppText';

export default function HeaderMenuItem({text, onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AppText style={styles.text}>{text}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: 19,
  },
});
