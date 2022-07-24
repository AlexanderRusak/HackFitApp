import AsyncStorage from '@react-native-async-storage/async-storage';
import { BodyParameters, SettingsParameters } from '../store/types/settingsParameters';
import { STORAGE_KEYS } from './constants';

export const setDataToStorage = async (key: STORAGE_KEYS, value: BodyParameters[] | SettingsParameters) => {
  const jsonValue = JSON.stringify(value)
  try {
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Set Error", e);
  }
}

export const getDataFromStorage = async (key: STORAGE_KEYS): Promise<BodyParameters[] | SettingsParameters | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Get Error", e);
    return null;
  }
}

export const removeDataFromStorage = async (key: STORAGE_KEYS) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("Delete Error", e);
    return null;
  }
}
