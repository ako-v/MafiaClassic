import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ListSeparator(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4,
  },
});
