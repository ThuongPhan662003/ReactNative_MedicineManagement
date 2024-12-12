import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddPatientScreen = () => {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    idCard: '',
    phoneNumber: '',
    address: '',
    healthInsurance: 'YES',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Full Name" onChangeText={(text) => handleInputChange('fullName', text)} />
      <TextInput style={styles.input} placeholder="Date of Birth (DD/MM/YYYY)" onChangeText={(text) => handleInputChange('dob', text)} />
      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[styles.genderButton, form.gender === 'Male' && styles.selectedButton]}
          onPress={() => handleInputChange('gender', 'Male')}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, form.gender === 'Female' && styles.selectedButton]}
          onPress={() => handleInputChange('gender', 'Female')}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="ID Card" onChangeText={(text) => handleInputChange('idCard', text)} />
      <TextInput style={styles.input} placeholder="Phone Number" onChangeText={(text) => handleInputChange('phoneNumber', text)} />
      <TextInput style={styles.input} placeholder="Address" onChangeText={(text) => handleInputChange('address', text)} />
      <View style={styles.healthRow}>
        <TouchableOpacity
          style={[styles.healthButton, form.healthInsurance === 'YES' && styles.selectedButton]}
          onPress={() => handleInputChange('healthInsurance', 'YES')}
        >
          <Text>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.healthButton, form.healthInsurance === 'NO' && styles.selectedButton]}
          onPress={() => handleInputChange('healthInsurance', 'NO')}
        >
          <Text>NO</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginVertical: 8, borderRadius: 8 },
  genderRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  genderButton: { padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  selectedButton: { backgroundColor: '#007bff', borderColor: '#007bff', color: 'white' },
  healthRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  healthButton: { padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  submitButton: { backgroundColor: '#007bff', padding: 16, borderRadius: 8, alignItems: 'center', marginVertical: 16 },
  submitButtonText: { color: 'white', fontWeight: 'bold' },
});

export default AddPatientScreen;
