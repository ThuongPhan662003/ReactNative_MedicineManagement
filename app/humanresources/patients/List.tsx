import React, { useState } from "react";
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

import { getAllPatients } from "@/services/patientService"; // Import hàm lấy danh sách bệnh nhân
import useAppwrite from "@/lib/useAppwrite"; // Hook custom
import SearchBar from "@/components/SearchBar"; // Đảm bảo SearchBar được import
import Nav from "@/components/Nav";
import { ExternalLink } from "@/components/ExternalLink";
import IconComponent from "@/components/IconComponent";

import { Patient } from "@/constants/types"; // Import interface Patient

export default function List() {
  const { data: patients, loading, refetch } = useAppwrite<Patient[]>(getAllPatients); // Sử dụng kiểu dữ liệu với useAppwrite
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients || []);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchPatients = (text: string) => {
    setSearchTerm(text);
    const filtered = patients?.filter((patient) =>
      patient.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPatients(filtered || []);
  };

  const handleClear = () => {
    setFilteredPatients(patients || []);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  // if (!patients || patients.length === 0) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>No patients found.</Text>
  //       <Text onPress={refetch} style={styles.retryText}>
  //         Retry
  //       </Text>
  //     </View>
  //   );
  // }

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
        status={true}
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
                {item.name}
              </Text>
              <Text style={[styles.column, styles.detailText]}>
                <ExternalLink href={`/patients/${item.id}`}>
                  <TouchableOpacity>
                    <IconComponent name="detail" size={22} color="#000000" />
                  </TouchableOpacity>
                </ExternalLink>
              </Text>
            </View>
          )}
        />
      </ScrollView>
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
  retryText: {
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingTop: 10,
  },
});
