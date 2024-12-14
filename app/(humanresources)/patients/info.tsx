import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const infoPatient = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
        
      try {
        const response = await axios.get("http://192.168.1.6:8000/api/patient/");
        setPatient(response.data);
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!patient) {
    return <Text>Không tìm thấy thông tin bệnh nhân.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin bệnh nhân</Text>
      <Text style={styles.label}>Họ và tên: <Text style={styles.value}>{patient.name}</Text></Text>
      <Text style={styles.label}>Giới tính: <Text style={styles.value}>{patient.gender}</Text></Text>
      <Text style={styles.label}>Ngày sinh: <Text style={styles.value}>{patient.dob}</Text></Text>
      <Text style={styles.label}>Số điện thoại: <Text style={styles.value}>{patient.phone}</Text></Text>
      <Text style={styles.label}>Địa chỉ: <Text style={styles.value}>{patient.address}</Text></Text>
      <Text style={styles.label}>Tiền sử bệnh lý: <Text style={styles.value}>{patient.medicalHistory}</Text></Text>
    </View>
  );
};

export default infoPatient;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  value: {
    fontWeight: "normal",
  },
});
