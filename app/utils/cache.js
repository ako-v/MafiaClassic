import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'MafiaCharacters';

const store = async value => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Storing Roles error:', error);
  }
};

const get = async () => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  } catch (error) {
    console.log('Get Stored Roles Error: ', error);
  }
};

const clearAll = async () => {
  await AsyncStorage.clear();
};

export default {
  store,
  get,
  clearAll,
};
