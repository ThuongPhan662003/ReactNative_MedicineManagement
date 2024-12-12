import { Image, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoLogin from '@/constants/images';
import CustomButton from '@/components/button/CustomButton';

const index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.centerContent}>
        <Image 
          source={ logoLogin.logoLogin } 
          style={ styles.image }
        />
        <Text style={styles.text}>Hello, Splash Screen!</Text>
        <CustomButton
          title='Đăng nhập'
          handlePress={() => router.push('/sign-in' )} // Đảm bảo truyền vào đúng đối tượng có kiểu RelativePathString
          isLoading={false} 
        />
      </View>
    </SafeAreaView>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  centerContent: {
    flex: 1, // Đảm bảo View này chiếm toàn bộ chiều cao
    justifyContent: 'center', // Căn giữa theo trục dọc
    alignItems: 'center', // Căn giữa theo trục ngang
  },
  text: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
