import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getPatientById, updatePatientByField } from "@/services/patientService"; // Import hàm API
import useAppwrite from "@/lib/useAppwrite"; // Import useAppwrite
import { Patient } from "@/constants/types"; // Import định nghĩa Patient từ file khác
import { ThemedText } from "@/components/ThemedText";
import IconComponent from "@/components/IconComponent";

type PatientDetailRouteParams = {
  id: string; // ID của bệnh nhân từ route params
};

const PatientDetail = () => {
  const route = useRoute();
  const { id } = route.params as PatientDetailRouteParams;

  // Fetch patient details using useAppwrite
  const {
    data: patient,
    loading: fetchLoading,
    error: fetchError,
  } = useAppwrite(getPatientById, [id], true); // Truyền id trong mảng làm dependency

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(patient?.full_name || "");  // full_name
const [email, setEmail] = useState(patient?.email || "");
const [phone, setPhone] = useState(patient?.phone_number || ""); // phone_number
const [address, setAddress] = useState(patient?.address || "");
const [employee, setEmployee] = useState(String(patient?.employee || ""));
const [dateOfBirth, setDateOfBirth] = useState(patient?.date_of_birth?.toString() || "");
const [insurance, setInsurance] = useState(patient?.insurance || "");
const [id_card, setIdCard] = useState(patient?.id_card || "");
const [registration_date, setRegistration] = useState(patient?.registration_date?.toString() || "");

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<any>(null);

  // Update state when patient data is fetched
  useEffect(() => {
    if (patient) {
      setName(patient.full_name); 
    setEmail(patient.email);
    setPhone(patient.phone_number); 
    setAddress(patient.address);
    setEmployee(String(patient.employee)); 
    setDateOfBirth(patient.date_of_birth?.toString() || "");
    setInsurance(patient.insurance);
    setIdCard(patient.id_card);
    setRegistration(patient.registration_date?.toString() || "");
    }
  }, [patient]);

  // Handle Save button click
  const handleSave = async () => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const updatedData = {
        id: patient.id, // Lấy id từ patient
        full_name: name, // Dùng name cho full_name
        email: email,
        phone_number: phone, // phone_number đúng với Patient
        address: address,
        employee: parseInt(employee), // employee là kiểu number
        date_of_birth: new Date(dateOfBirth), // date_of_birth là kiểu Date
        insurance: insurance, // Nếu có insurance, thêm vào
        id_card: patient.id_card, // id_card đúng với Patient
        registration_date: patient.registration_date,
      };

      // Perform the update API call
      const result = await updatePatientByField(id, updatedData);

      if (result) {
        setIsEditing(false);
      }
    } catch (err) {
      setUpdateError(err);
      console.error("Update failed:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle Edit button click
  const handleEdit = () => setIsEditing(true);

  if (fetchLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: {fetchError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Nav
        title="PATIENT MANAGEMENT"
        externalLink="patients/details"
        name="back"
        color="#FFFFFF"
        status={true}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Patient Information</Text>
        <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
          <Text style={styles.editButton}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>

        {/* Full Name */}
        <ThemedText>
          <IconComponent name="birthday" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={name}
            editable={isEditing}
            onChangeText={setName}
          />
        </ThemedText>

        {/* Email */}
        <ThemedText>
          <IconComponent name="idCard" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={email}
            editable={isEditing}
            onChangeText={setEmail}
          />
        </ThemedText>

        {/* Phone */}
        <ThemedText>
          <IconComponent name="phone" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={phone}
            editable={isEditing}
            onChangeText={setPhone}
          />
        </ThemedText>

        {/* Address */}
        <ThemedText>
          <IconComponent name="location" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={address}
            editable={isEditing}
            onChangeText={setAddress}
          />
        </ThemedText>

        {/* Date of Birth */}
        <ThemedText>
          <IconComponent name="birthday" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            editable={isEditing}
            onChangeText={setDateOfBirth}
          />
        </ThemedText>

        {/* Employee */}
        <ThemedText>
          <IconComponent name="employee" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={employee}
            editable={isEditing}
            onChangeText={setEmployee}
          />
        </ThemedText>

        {/* Insurance */}
        <ThemedText>
          <IconComponent name="insurance" size={20} color="#767676" />
          <TextInput
            style={styles.input}
            value={insurance}
            editable={isEditing}
            onChangeText={setInsurance}
          />
        </ThemedText>

        {updateLoading && <ActivityIndicator size="large" color="#6200EE" />}
        {updateError && (
          <Text style={styles.errorText}>Error updating patient: {updateError.message}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  editButton: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#E53935",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PatientDetail;
