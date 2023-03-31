import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          console.log('value' + JSON.stringify(value))
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [key]);

  const saveData = async (newValue) => {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = async () => {
    try {
      setValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [value, saveData, clearData];
};

export default useAsyncStorage;