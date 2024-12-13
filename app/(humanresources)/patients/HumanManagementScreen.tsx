import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HumanManagementScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.managementButton} onPress={() => navigation.navigate('Patients')}>
      <Ionicons name="people" size={40} color="blue" />
      <Text>Patients</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  managementButton: { alignItems: 'center', marginVertical: 16 },
});

export default HumanManagementScreen;
