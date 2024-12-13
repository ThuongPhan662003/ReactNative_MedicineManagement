// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native"; // for route and navigation
// import { getPatientById, updatePatientByField } from "@/services/patientService"; // Assuming you have a service for fetching/updating patient data
// import { Patient } from "@/constants/types"; // Patient interface
// import useAppwrite from "@/lib/useAppwrite";

// const UpdatePatient = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { id } = route.params as { id: string }; // Assuming `id` is passed as route parameter
//   const {
//     data: patients,
//     loading,
//     refetch,
//   } = useAppwrite<Patient[]>(updatePatientByField(tham só));
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [address, setAddress] = useState<string>("");


  
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6200EE" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Update Patient</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//       />

//       <Button title="Update" onPress={handleUpdatePatient} />

//       <Button
//         title="Cancel"
//         onPress={() => navigation.goBack()} // Cancel and go back to previous screen
//         color="gray"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f8f8",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFF3F3",
//     padding: 20,
//   },
//   errorText: {
//     color: "#E53935",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
// });

// export default UpdatePatient;
