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
} from "react-native";
import SearchBar from "@/components/SearchBar";
import Nav from "@/components/Nav";
import { Link, router } from "expo-router";
import { searchPatients } from "@/services/patientService";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function List() {
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await searchPatients({ search: "" });
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

  const handleSearchPatients = async (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredPatients(patients);
    } else {
      setLoading(true);
      try {
        const result = await searchPatients({ search: text });
        setFilteredPatients(result);
      } catch (err) {
        setError("Error searching patients");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchPatients();
    } catch (err) {
      setError("Error refreshing patients");
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddPatient = () => {
    router.push("/patients/add");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Nav
        title="PATIENT"
        externalLink="patients/details"
        name="chevron.right"
        color="#FFFFFF"
        status={false}
      />

      <SearchBar
        place="ID, Patient’s name"
        onSearch={handleSearchPatients}
        onClear={() => {
          setSearchTerm("");
          setFilteredPatients(patients);
        }}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={[styles.headercolumn, styles.cellText]}>ID</Text>
              <Text style={[styles.headercolumn, styles.fullNameText]}>
                Full name
              </Text>
              <Text style={[styles.headercolumn, styles.detailText]}>
                Detail
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <Text style={[styles.column, styles.cellText]}>{item.id}</Text>
              <Text style={[styles.column, styles.fullNameText]}>
                {item.full_name}
              </Text>
              <Link
                href={{
                  pathname: "/patients/[id]",
                  params: { id: `${item.id}` },
                }}
                style={[styles.column, styles.detailText]}
              >
                <IconSymbol size={28} name="house.fill" color={"#000000"} />
              </Link>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#F0F0F0",
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
    color: "#000000",
  },
  headerContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: "#6200EE",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 5,
  },
  headercolumn: {
    fontSize: 16,
    fontWeight: "bold",
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
    textAlign: "center",
  },
  button: {
    backgroundColor: "#005EB5",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
