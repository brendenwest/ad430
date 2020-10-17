"use strict"
import AsyncStorage from "@react-native-community/async-storage";

export const getEmail = async () => {
  console.log('GET EMAIL')
  try {
    return await AsyncStorage.getItem('@EMAIL');
  } catch(e) {
      console.log(e)
    // error reading value
  }
};

export const setEmail = async (email) => {
  console.log('SET EMAIL')
  try {
    await AsyncStorage.setItem('@EMAIL', email);
    return;
  } catch (e) {
  console.log(e)
    // saving error
  }
};
