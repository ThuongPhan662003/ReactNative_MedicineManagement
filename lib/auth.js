import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_STORAGE_KEY = '@auth_token'

const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    } catch (error) {
        console.error('Error saving auth token: ', error)
    }
};

const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
        return token;
    } catch (error){
        console.error('Error retrieving auth token: ', error);
    }
};

const removeAuthToken = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  };
  
  export { saveAuthToken, getAuthToken, removeAuthToken };