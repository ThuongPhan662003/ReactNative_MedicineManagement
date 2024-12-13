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

  export const saveUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userId', userId.toString()); // Chuyển ID thành chuỗi
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  };

  export const getUserId = async () => {
    try {
      return await AsyncStorage.getItem('userId');
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  };
  
export default { saveAuthToken, getAuthToken, removeAuthToken, saveUserId, getUserId };

