import React, {useState, useContext} from 'react';
import {View, StyleSheet, FlatList, Modal, Pressable, ToastAndroid, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import AppText from './AppText';
import AppTextInput from './AppTextInput';

import CharactersListItem from './CharactersListItem';
import ListSeparator from './ListSeparator';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import getRoleArray from '../utils/getRoleArray';

export default function CharacterList({party}) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [modalVisible, setModalVisible] = useState(false); //modal state
  const [name, setName] = useState(); //name of the new character in case of adding one
  const roles = getRoleArray(appState.roles, party); //probably should be inside use effect

  //handle addition of new characters
  function handleAdd() {
    const newRole = {
      [name]: {
        name: name,
        icon: roles[0].icon,
        alignment: roles[0].alignment,
        selected: false,
        removable: true,
      },
    };
    appDispatch({type: 'add', role: newRole});
    setModalVisible(!modalVisible);
  }

  //handle removing of a character
  function handleDelete(role) {
    if (role.removable) appDispatch({type: 'remove', role: role});
    else ToastAndroid.showWithGravity('This character is not removable', ToastAndroid.LONG, ToastAndroid.TOP);
  }

  const onSelectionChange = item => {
    appDispatch({type: 'changeSelectionState', role: item});
  };

  const onquantityChange = (item, newQuantity) => {
    appDispatch({type: 'changeQuantity', role: item, quantity: newQuantity});
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={roles}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({item}) => (
          <CharactersListItem
            item={item}
            onDelete={handleDelete}
            onChange={item.selected != undefined ? onSelectionChange : onquantityChange}
          />
        )}
        ListFooterComponent={() => (
          <>
            <Pressable style={styles.pressable} onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={35} color={colors.dark} />
            </Pressable>
          </>
        )}
      />

      {/*Add new role using modal*/}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback style={styles.backDrop} onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <AppText style={styles.modalText}>Enter character name:</AppText>
                <AppTextInput autoFocus style={styles.textInput} placeholder="Name" onChangeText={setName} />
                <View style={styles.buttonsContainer}>
                  <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(!modalVisible)}>
                    <AppText style={styles.textStyle}>Cancel</AppText>
                  </Pressable>
                  <Pressable style={[styles.button, styles.buttonClose]} onPress={handleAdd}>
                    <AppText style={styles.textStyle}>Add</AppText>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.white,
    padding: 2,
    backgroundColor: colors.light,
    paddingHorizontal: 8,
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
  backDrop: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '68%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: colors.dark,
    alignSelf: 'flex-start',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: colors.secondary,
  },
  buttonClose: {
    backgroundColor: colors.secondary,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 7,
  },
});
