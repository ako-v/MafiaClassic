import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import colors from '../config/colors';

export default function Screen({children, style, barStyle = 'dark-content'}) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle={barStyle} backgroundColor={colors.light} translucent />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
