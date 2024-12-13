import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_STORAGE_KEY = '@auth_token'

const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    } catch (error) {
        console.error('Error saving auth token: ', error)
    }
};