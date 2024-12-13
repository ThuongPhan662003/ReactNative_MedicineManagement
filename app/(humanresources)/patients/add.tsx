import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addPatient } from "@/services/patientService"; // Import the service for adding new patient
import IconComponent from "@/components/IconComponent"; // Import IconComponent
import Nav from "@/components/Nav";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

const AddPatient = () => {
  const navigation = useNavigation();

  // Assuming you have a way to get the logged-in user ID
  const loggedInEmployeeId = "12345"; // Replace this with actual logged-in user ID (e.g., from context or auth service)

  // Initialize the state with default values
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    employee: loggedInEmployeeId, // Default to logged-in employee's ID
    date_of_birth: new Date(), // Default to today's date
    insurance: "",
    id_card: "",
    registration_date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    gender: false, // Default value is false (Female)
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await addPatient(formData);  // Call the service to add a new patient
      Alert.alert("Success", "Patient added successfully.");
      navigation.goBack();  // Go back after successful submission
    } catch (error) {
      Alert.alert("Error", "Failed to add new patient.");
    } finally {
      setLoading(false);
    }
  };

  const toggleGender = () => {
    setFormData({ ...formData, gender: !formData.gender }); // Toggle gender between true (Male) and false (Female)
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || formData.date_of_birth;
    setShowDatePicker(false);
    setFormData({ ...formData, date_of_birth: currentDate });
  };

  // Function to format date to DD/MM/YYYY
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11, so add 1)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Return date in DD/MM/YYYY format
  };

  return (
    <View style={styles.container}>
      <Nav
        title="PATIENT"
        externalLink="/patients/List"
        name="back"
        color="#FFFFFF"
        status={true}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {[ 
          { label: "Full Name", value: "full_name", icon: "user" },
          { label: "ID Card", value: "id_card", icon: "idCard" },
          { label: "Email", value: "email", icon: "idCard" },
          { label: "Phone", value: "phone_number", icon: "phone" },
          { label: "Address", value: "address", icon: "location" },
          { label: "Insurance", value: "insurance", icon: "insurance" },
        ].map((field) => (
          <View key={field.value} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={formData[field.value]}
              onChangeText={(text) => setFormData({ ...formData, [field.value]: text })}
            />
          </View>
        ))}

        {/* Date of Birth Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={formatDate(formData.date_of_birth)} // Format the date to DD/MM/YYYY
              editable={false}
            />
          </TouchableOpacity>
        </View>

        {/* Gender Toggle */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <Text>{formData.gender ? "Male" : "Female"}</Text>
            <Switch
              value={formData.gender}
              onValueChange={toggleGender} // Toggle between male and female
            />
          </View>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.date_of_birth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  inputContainer: {
    marginLeft: 15,
    marginTop: 15,
    width: "90%",
    gap: 10,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddPatient;
