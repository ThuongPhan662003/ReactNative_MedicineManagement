import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import loginLogin from '../../constants/images'
import FormField from '@/components/FormField'

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.centerContent}>
          <Image source={loginLogin.logoLogin}></Image>
        </View>
        <Text>Get started</Text>
        <Text>Welcome back to the system</Text>

        <FormField></FormField>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005EB5',
    flex: 1,
  },
  centerContent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
})