import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'MafiaClassic_';

const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log('Storing Roles error:', error);
  }
};

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
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
