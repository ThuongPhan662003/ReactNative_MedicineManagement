import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // Thêm ScrollView
} from "react-native";

interface Patient {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
}

import { fetchSearchResults } from '@/hooks/fetchSearchResults';
import SearchBar from '@/components/SearchBar'; // Đảm bảo SearchBar được import
import Nav from "@/components/Nav";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function PatientsScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPatient, setNewPatient] = useState<Patient>({
    id: 0,
    name: "",
    age: 0,
    diagnosis: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]); // Lưu trữ kết quả tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>(''); // Dùng để lưu trữ từ khóa tìm kiếm

  // Hàm xử lý tìm kiếm
  const handleSearch = async (keyword: string) => {
    setLoading(true); // Bật trạng thái loading khi gọi API
    try {
      const results = await fetchSearchResults(keyword);
      setData(results); // Cập nhật kết quả tìm kiếm
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };
  // Hàm xử lý thay đổi giá trị tìm kiếm
  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text); // Cập nhật giá trị tìm kiếm mỗi khi người dùng nhập vào ô tìm kiếm
    console.log("cập nahanj")
  };

  // Hàm xử lý khi xóa văn bản tìm kiếm
  const handleClear = () => {
    setData([]); // Xóa dữ liệu tìm kiếm khi người dùng xóa văn bản
    setSearchTerm(''); // Đặt lại searchTerm về rỗng
  };

  const fetchPatients = () => {
    setLoading(true);
    fetch("http://192.168.1.18:5000/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const addOrUpdatePatient = () => {
    if (
      !newPatient.name.trim() ||
      newPatient.age <= 0 ||
      !newPatient.diagnosis.trim()
    ) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.", [
        { text: "Hủy", style: "cancel" },
      ]);
      return;
    }

    const url = isEditing
      ? `http://192.168.1.18:5000/patients/${newPatient.id}`
      : "http://192.168.1.18:5000/patients";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        fetchPatients();
        setNewPatient({ id: 0, name: "", age: 0, diagnosis: "" });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving patient:", error);
      });
  };

  const startEditPatient = (patient: Patient) => {
    setNewPatient(patient);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setNewPatient({ id: 0, name: "", age: 0, diagnosis: "" });
    setIsEditing(false);
  };

  const deletePatient = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa bệnh nhân này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          fetch(`http://192.168.1.18:5000/patients/${id}`, { method: "DELETE" })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              fetchPatients();
            })
            .catch((error) => {
              console.error("Error deleting patient:", error);
            });
        },
      },
    ]);
  };

  const showDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPatient(null);
  };

  // Hàm tìm kiếm bệnh nhân
  const handleSearchPatients = (text: string) => {
    setSearchText(text);
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Nav
        title="HUMAN MANAGEMENT"
        externalLink="humanresources/doctors/doctors"
        name="back"
        color="#FFFFFF"
        status={true}
      />
      <SearchBar
        place="ID, Patient’s name"
        onSearch={handleSearchPatients} // Truyền hàm handleSearch vào SearchBar
        onClear={handleClear} // Truyền hàm handleClear vào SearchBar
        searchTerm={searchTerm} // Truyền giá trị searchTerm vào SearchBar
        onSearchTermChange={handleSearchTermChange} // Truyền hàm để cập nhật searchTerm
      />
      
      <ScrollView style={styles.container}>
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                {isEditing ? "Cập nhật bệnh nhân" : "Thêm bệnh nhân"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Tên bệnh nhân"
                value={newPatient.name}
                onChangeText={(text) =>
                  setNewPatient({ ...newPatient, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Tuổi"
                keyboardType="numeric"
                value={newPatient.age.toString()}
                onChangeText={(text) =>
                  setNewPatient({ ...newPatient, age: parseInt(text) || 0 })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Chẩn đoán"
                value={newPatient.diagnosis}
                onChangeText={(text) =>
                  setNewPatient({ ...newPatient, diagnosis: text })
                }
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addOrUpdatePatient}
                >
                  <Text style={styles.addButtonText}>
                    {isEditing ? "Cập nhật" : "Thêm"}
                  </Text>
                </TouchableOpacity>
                {isEditing && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={cancelEdit}
                  >
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.patientCard}>
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.patientAge}>Tuổi: {item.age}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => showDetails(item)}
              >
                <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => startEditPatient(item)}
              >
                <Text style={styles.updateButtonText}>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePatient(item.id)}
              >
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {selectedPatient && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Thông tin chi tiết</Text>
                <Text style={styles.modalText}>
                  Tên: {selectedPatient.name}
                </Text>
                <Text style={styles.modalText}>
                  Tuổi: {selectedPatient.age}
                </Text>
                <Text style={styles.modalText}>
                  Chẩn đoán: {selectedPatient.diagnosis}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  listContainer: {
    paddingBottom: 16, // Thêm khoảng cách ở dưới cùng của danh sách
    paddingTop: 8, // Thêm khoảng cách ở trên cùng của danh sách
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  patientCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  patientAge: {
    color: "#666",
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  detailsButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  updateButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
