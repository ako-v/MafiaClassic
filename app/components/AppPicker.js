import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Pressable, Modal} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import AppText from './AppText';
import ListItem from './ListItem';
import ListSeparator from './ListSeparator';

export default function AppPicker({icon, list, onSelect, selected, title}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={toggleModal}>
        {icon && <Icon name={icon} size={35} color={colors.medium} style={styles.icon} />}
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.category}>{selected}</AppText>
        <Icon name="chevron-down" size={30} color={colors.medium} style={styles.icon} />
      </Pressable>

      <Modal visible={modalVisible} animationType="slide">
        <Pressable onPress={toggleModal} style={styles.closeButton}>
          <Icon name="close" size={35} color={colors.dark} />
        </Pressable>
        <FlatList
          data={list}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <AppText
              onPress={() => {
                onSelect(index);
                toggleModal();
              }}>
              {item}
            </AppText>
          )}
          ItemSeparatorComponent={ListSeparator}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: colors.mediumLight,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-SemiBold',
  },
  icon: {
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-SemiBold',
    flex: 1,
  },
});