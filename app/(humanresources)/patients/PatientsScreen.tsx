import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PatientsScreen = ({ navigation }: any) => {
  const [patients, setPatients] = useState(
    Array(20).fill({ id: '224102', name: 'Nguyễn Thị Thanh Huyền' })
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientRow}>
            <Text style={styles.patientText}>{item.id}</Text>
            <Text style={styles.patientText}>{item.name}</Text>
            <Ionicons name="person" size={20} color="black" />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPatient')}
      >
        <Text style={styles.addButtonText}>Add Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  patientRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  patientText: { fontSize: 16 },
  addButton: { backgroundColor: '#007bff', padding: 16, borderRadius: 8, alignItems: 'center', marginVertical: 16 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
});

export default PatientsScreen;
