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
import IconComponent from "@/components/IconComponent";

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

  useEffect(() => {
    Alert.alert("Test", "This is a test alert.");
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await getPatientById(id);
        setPatient(data);
        setFormData({
          ...data,
          // date_of_birth: data.date_of_birth?.toString(),
          // registration_date: data.registration_date?.toString(),
        });
      } catch (error) {
        Alert.alert("Error", "Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleSave = async () => {
    try {
      setUpdateLoading(true);
      console.log("save")
      const formattedData = {
        ...formData,
        // date_of_birth: new Date(formData.date_of_birth || "").toISOString(),
        // registration_date: new Date(
        //   formData.registration_date || ""
        // ).toISOString(),
      };

      await updatePatientByField(id, formattedData);
      console.log("ưait")
      setTimeout(() => {
      Alert.alert("Success", "Patient details updated successfully.");
    }, 500);
      setIsEditing(false);  // Sau khi lưu, chuyển về chế độ không sửa
    } catch (error) {
      console.log("đang loi ne")
      Alert.alert("Error", "Failed to update patient details.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("delete start")
    await deletePatient(id);
    console.log("delete đó")  // Gọi API xóa bệnh nhân
    Alert.alert("Success", "Patient deleted successfully.");
    navigation.goBack();  // Quay lại màn hình trước đó sau khi xóa
  } catch (error) {
    // Nếu lỗi xảy ra, hiển thị thông tin chi tiết từ lỗi
    const errorMessage = error?.response?.data || "Failed to delete patient.";
    Alert.alert("Error", errorMessage);
    console.error("Error deleting patient with id", id, error);  // Log chi tiết lỗi
  }
  };

  // Chuyển đổi chế độ chỉnh sửa và lưu
  const handleEditToggle = () => {
    console.log("edit start");
    if (!loading) {  // Đảm bảo không có trạng thái loading mới cho phép chuyển đổi
      setIsEditing((prev) => !prev);
      console.log("isEditing toggled:", !isEditing); // Log trạng thái
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedView style={[styles.headertitle]}>
          <Text style={styles.header}>Patient Information</Text>
          <View style={styles.buttonsContainer}>
            {/* Nút chỉnh sửa hoặc lưu */}
            <TouchableOpacity onPress={isEditing ? handleSave : handleEditToggle}>
              <Text style={styles.editButton}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>

            {/* Nút xóa khi đang ở chế độ chỉnh sửa */}
            {isEditing && (
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </ThemedView>

        {/* Duyệt qua các trường để hiển thị thông tin */}
        {[ 
          { label: "Full Name", value: "full_name" },
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone_number" },
          { label: "Address", value: "address" },
          { label: "Employee ID", value: "employee" },
          { label: "Date of Birth", value: "date_of_birth" },
          { label: "Insurance", value: "insurance" },
          { label: "ID Card", value: "id_card" },
          { label: "Registration Date", value: "registration_date" },
        ].map((field) => (
          <View key={field.value} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            
            <TextInput
              style={styles.input}
              value={formData[field.value]?.toString() || ""}
              editable={isEditing}  // Chỉ cho phép chỉnh sửa khi isEditing là true
              onChangeText={(text) =>
                setFormData({ ...formData, [field.value]: text })
              }
            />
          </View>
        ))}

        {/* Gender */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={formData.gender ? "Male" : "Female"}
            editable={isEditing}  // Chỉ cho phép chỉnh sửa khi isEditing là true
            onChangeText={(value) =>
              setFormData({ ...formData, gender: value === "Male" })
            }
          />
        </View>

        {updateLoading && <ActivityIndicator size="large" color="#6200EE" />}
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
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
    display:"flex",
    flexDirection:"row"
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  editButton: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    alignItems: "center",
    alignContent:"center"
  },
  deleteButton: {
    fontSize: 16,
    color: "#E53935",
    textAlign: "center",
    // marginTop: 10,
    alignContent:"center"
  },
  errorText: {
    color: "#E53935",
    fontSize: 18,
    textAlign: "center",
  },
  headertitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    backgroundColor: "#F0F0F0",
    gap:20
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:20
    // marginTop: 10,
  },
});

export default PatientDetail;
