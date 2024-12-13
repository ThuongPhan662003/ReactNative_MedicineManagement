import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  getPatientById,
  updatePatientByField,
  deletePatient,
} from "@/services/patientService";
import { Patient } from "@/constants/types";
import Nav from "@/components/Nav";
import { ThemedView } from "@/components/ThemedView";
import IconComponent from "@/components/IconComponent"; // Import IconComponent
import { ThemedText } from "@/components/ThemedText";

type PatientDetailRouteParams = {
  id: string;
};
const PatientDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as PatientDetailRouteParams;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({}); // To store validation errors by field

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await getPatientById(id);
        setPatient(data);
        setFormData({
          ...data,
        });
      } catch (error) {
        Alert.alert("Error", "Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  // Helper function to format date as DD/MM/YYYY
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    try {
      setUpdateLoading(true);
      const formattedData = {
        ...formData,
      };

      // Clear previous error messages
      setErrorMessages({});

      // Call API to update patient details
      await updatePatientByField(id, formattedData);
      Alert.alert("Success", "Patient details updated successfully.");
      setIsEditing(false); // After save, switch to non-editing mode
    } catch (error) {
      const errorResponse = error?.response?.data;
      if (errorResponse) {
        setErrorMessages(errorResponse); // Set error messages based on the response
      } else {
        Alert.alert("Error", "Failed to update patient details.");
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePatient(id);
      Alert.alert("Success", "Patient deleted successfully.");
      navigation.goBack(); // Go back after deleting
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to delete patient.";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleEditToggle = () => {
    if (!loading) {
      setIsEditing((prev) => !prev);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Patient data not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Nav
        title={`${patient.id} - ${patient.full_name}`}
        externalLink="/patients/List"
        name="back"
        color="#FFFFFF"
        status={true}
      />
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.headertitle}>
          <Text style={styles.header}>Patient Information</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={isEditing ? handleSave : handleEditToggle}>
              <Text style={styles.editButton}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </ThemedView>

        <ScrollView>
          {[{ label: "Email", value: "email", icon: "idCard" },
            { label: "Phone", value: "phone_number", icon: "phone" },
            { label: "Address", value: "address", icon: "location" },
            { label: "Employee ID", value: "employee", icon: "user" },
            { label: "Date of Birth", value: "date_of_birth", icon: "birthday" },
            { label: "Insurance", value: "insurance", icon: "insurance" },
            { label: "ID Card", value: "id_card", icon: "idCard" },
            { label: "Registration Date", value: "registration_date", icon: "date" },
          ].map((field) => (
            <View key={field.value} style={styles.inputContainer}>
              <IconComponent name={field.icon} size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                value={
                  field.value === "date_of_birth" || field.value === "registration_date"
                    ? formatDate(formData[field.value]?.toString() || "")
                    : formData[field.value]?.toString() || ""
                }
                editable={isEditing && (field.value === "phone_number" || field.value === "email")}
                onChangeText={(text) =>
                  setFormData({ ...formData, [field.value]: text })
                }
                placeholder={`Enter ${field.label}`}
              />
              {/* Show error messages for the specific field */}
              {errorMessages[field.value] && (
                <Text style={styles.errorText}>
                  {errorMessages[field.value].join(", ")}
                </Text>
              )}
            </View>
          ))}

          {/* Gender */}
          <View style={styles.inputContainer}>
            <IconComponent name="user" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              value={formData.gender ? "Male" : "Female"}
              editable={false}
            />
          </View>

          {updateLoading && <ActivityIndicator size="large" color="#6200EE" />}
        </ScrollView>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          <Text>Medical history</Text>
        </ThemedText>
      </ThemedView>
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
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  editButton: {
    fontSize: 16,
    color: "#007BFF",
  },
  deleteButton: {
    fontSize: 16,
    color: "#E53935",
  },
  errorText: {
    color: "#E53935",
    fontSize: 14,
    textAlign: "left",
    marginTop: 4,
  },
  headertitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
});


export default PatientDetail;
