
import AsyncStorage from '@react-native-async-storage/async-storage';
const isJSON = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  }
  catch (error) {
    return false;
  }
}
export const getDataFromStorage = async (key) => {
  const data = await AsyncStorage.getItem(key);
  const isJson = isJSON(data);
  console.log(data);

  if (data) {
    if (isJson)
      return JSON.parse(data);
    else
      return data;
  }
  return null;
};
