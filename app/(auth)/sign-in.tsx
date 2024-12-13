import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";
import loginLogin from '../../constants/images';
import FormField from '@/components/FormField';
import CustomButton from '@/components/button/CustomButton';
import lib from '@/lib'

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://192.168.1.6:8000/api/accounts/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await lib.auth.saveAuthToken(data.token); // Lưu token
        const token = await lib.auth.getAuthToken(); // Lấy token vừa lưu
        console.log('Token user:', token);
        // Xử lý đăng nhập thành công
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        router.replace("/human-manage")
        console.log('User Info:', data);
        console.log('Token User: ', token);
        // router.push('/patients/List' )
        // Chuyển hướng hoặc lưu token
      } else {
        // Xử lý lỗi đăng nhập
        Alert.alert('Thất bại', data.message || 'Đăng nhập không thành công.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.centerContent}>
          <Image source={loginLogin.logoLogin} style={styles.logo} />
  
          <Text style={styles.welcomeText}>Get Started</Text>
          <Text style={styles.subText}>Welcome back to the system</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder="Enter your username"
            style={styles.formField}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="Enter your password"
            style={styles.formField}
          />

          <View style={styles.forgotPasswordContainer}>
            <Link href="/sign-up">
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Link>
          </View>

          <CustomButton
            title="Đăng nhập"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={styles.button} 
            textStyles={styles.buttonText} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005EB5',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'PMedium',
  },
  subText: {
    fontSize: 20,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'PSemiBold',
  },
  formField: {
    width: '100%',
    marginVertical: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 14,
  },
  
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'PSemiBold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginRight: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'PSemiBold',
  },
});
