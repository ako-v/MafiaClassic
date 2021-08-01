import React, {useState, useContext} from 'react';
import {StyleSheet, Pressable, Modal, View, TouchableWithoutFeedback, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import HeaderMenuItem from './HeaderMenuItem';
import Separator from './Separator';
import DispatchContext from '../DispatchContext';
import cache from '../utils/cache';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

export default function HeaderDots() {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const appDispatch = useContext(DispatchContext);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const menus = [
    {
      text: 'settings',
      onPress: () => {
        navigation.navigate('Settings');
        toggleModal();
      },
    },
    {
      text: 'reset',
      onPress: async () => {
        await cache.remove('roles');
        appDispatch({type: 'initialize'});
        toggleModal();
      },
    },
  ];

  return (
    <>
      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <Icon name="dots-vertical" size={30} color={colors.black} />
      </Pressable>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback style={styles.backDrop} onPress={toggleModal}>
          <View style={{flex: 1}}>
            <View style={styles.modalView}>
              <FlatList
                data={menus}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <HeaderMenuItem text={t(item.text)} onPress={item.onPress} />}
                ItemSeparatorComponent={Separator}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  buttonWithBorder: {
    borderBottomColor: colors.medium,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    marginRight: 12,
  },
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.light,
    position: 'absolute',
    right: 22,
    top: 15,
    paddingLeft: 12,
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
