import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import SearchBar from "@/components/SearchBar"; // Đảm bảo SearchBar được import
import Nav from "@/components/Nav";
import { Link, router } from "expo-router";
import IconComponent from "@/components/IconComponent";
import { getPatients } from "@/services/patientService"; // Import hàm lấy danh sách bệnh nhân qua axios

export default function List() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch dữ liệu bệnh nhân từ API qua hàm getPatients
  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPatients(); // Gọi hàm getPatients
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearchPatients = (text: string) => {
    setSearchTerm(text);
    const filtered = patients.filter((patient) =>
      patient.full_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleClear = () => {
    setFilteredPatients(patients);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Nav
        title="PATIENT MANAGEMENT"
        externalLink="patients/details"
        name="back"
        color="#FFFFFF"
        status={false}
      />

      <SearchBar
        place="ID, Patient’s name"
        onSearch={handleSearchPatients}
        onClear={handleClear}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      <ScrollView style={styles.container}>
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View>
              <View style={styles.rowContainer}>
                <Text style={[styles.headercolumn, styles.cellText]}>ID</Text>
                <Text style={[styles.headercolumn, styles.fullNameText]}>
                  Full name
                </Text>
                <Text style={[styles.headercolumn, styles.detailText]}>
                  Detail
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <Text style={[styles.column, styles.cellText]}>{item.id}</Text>
              <Text style={[styles.column, styles.fullNameText]}>
                {item.full_name}
              </Text>
              <Text style={[styles.column, styles.detailText]}>
                <Link
                  href={{
                    pathname: "/patients/[id]",
                    params: { id: `${item.id}` },
                  }}
                >
                  <Text style={styles.detailText}>View Details</Text>
                </Link>
              </Text>
            </View>
          )}
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.column, styles.detailText]}
        onPress={() => router.push(`/patients/add`)}
      >
        <IconComponent name="detail" size={22} color="#000000" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F0F0F0",
  },
  listContainer: {
    paddingBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  column: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    justifyContent: "center",
  },
  headercolumn: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "400",
    color: "#AFAFAF",
  },
  cellText: {
    flex: 1,
  },
  fullNameText: {
    flex: 2,
  },
  detailText: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF3F3",
    padding: 20,
  },
  errorText: {
    color: "#E53935",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
