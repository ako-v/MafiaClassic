import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

export default function Separator(props) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumLight,
    width: '100%',
    marginVertical: 0,
  },
});
