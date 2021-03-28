import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

import AppText from './AppText';

function ListItem({image, icon, title, style, subTitle, onPress, renderRightActions}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.medium} onPress={onPress}>
        <View style={[styles.container, style]}>
          {icon && <Icon name={icon} size={30} color={colors.primary} />}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.textContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    color: colors.dark,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
export default ListItem;
