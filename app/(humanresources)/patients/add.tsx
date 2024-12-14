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
import { useGlobalContext } from "@/context/GlobalContext";
const AddPatient = () => {
  const navigation = useNavigation();
  const { isLogged, employee_id, token, setIsLogged, setEmployeeId, setToken } =
    useGlobalContext();

  // Initialize the state with default values
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    employee: employee_id, // Default to logged-in employee's ID
    date_of_birth: new Date(), // Default to today's date
    insurance: "",
    id_card: "",
    registration_date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    gender: false, // Default value is false (Female)
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Format date to match the required format DD/MM/YYYY for display
  const formatDateForDisplay = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11, so add 1)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Return date in DD/MM/YYYY format
  };

  // Format date to match the required format YYYY-MM-DD for API submission
  const formatDateForApi = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11, so add 1)
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    return `${year}-${month}-${day}`; // Return date in YYYY-MM-DD format
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Convert the date_of_birth to YYYY-MM-DD before submitting
      const formattedDateOfBirth = formatDateForApi(formData.date_of_birth);

      // Update formData with the formatted date
      const updatedFormData = {
        ...formData,
        date_of_birth: formattedDateOfBirth,
      };

      await addPatient(updatedFormData); // Call the service to add a new patient

      Alert.alert("Success", "Patient added successfully.");
      navigation.goBack(); // Go back after successful submission
    } catch (error) {
      if (error.response) {
        // If error is an API response with validation errors
        const errorMessages = error.response.data;
        const message = Object.keys(errorMessages)
          .map((key) => `${key}: ${errorMessages[key].join(", ")}`)
          .join("\n");
        Alert.alert("Error", message); // Show detailed error message
      } else {
        // Handle other types of errors
        Alert.alert("Error", "Failed to add new patient.");
      }
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

  return (
    <View style={styles.container}>
      <Nav
        title="PATIENT"
        externalLink="/patients/List"
        name="chevron.right"
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
              onChangeText={(text) =>
                setFormData({ ...formData, [field.value]: text })
              }
            />
          </View>
        ))}

        {/* Date of Birth Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={formatDateForDisplay(formData.date_of_birth)} // Format the date to DD/MM/YYYY for display
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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Submit</Text>
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
    width: "60%",
    margin: "auto",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddPatient;
