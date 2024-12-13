import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const Doctors = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh Sách Bác Sĩ</Text>
      {/* Thêm nội dung liên quan đến bác sĩ tại đây */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Doctors;
