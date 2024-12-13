// screens/HomeScreen.tsx
import React from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import Nav from "@/components/Nav";
import CircleButton from "@/components/CircleButton";
import { GiMedicinePills } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SearchBar from "@/components/SearchBar";
import { useNavigation } from "expo-router";
const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    // Thực hiện tìm kiếm với từ khóa searchTerm
  };
const HomeScreen = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Thanh điều hướng */}

      <Nav
        title="HUMAN MANAGEMENT"
        externalLink="humanresources/doctors/doctors"
        name="back"
        color="#FFFFFF"
        status={true}
      />
      
      {/* Màn hình chính chứa các CircleButton */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonGrid}>
          {/* Bác sĩ */}
          <CircleButton
            iconName="stethoscope" // Tên icon từ Ionicons
            title="Doctors"
            onPress={() => console.log("Button pressed!")}
            size={120}
            backgroundColor="#F0F0F0"
            borderColor="#005EB5"
            color="#005EB5" // Màu icon là xanh lá
            url="/humanresources/doctors/doctors"
          />

          

          {/* Dược sĩ */}
          <CircleButton
            iconName="pills" // Tên icon từ Ionicons
            title="Pharmacists"
            onPress={() => console.log("Button pressed!")}
            size={120}
            backgroundColor="#F0F0F0"
            borderColor="#005EB5"
            color="#005EB5" // Màu icon là tím
            url="https://www.example.com"
          />

          {/* Nhân viên */}
          <CircleButton
            iconName="user" // Tên icon từ Ionicons
            title="Staffs"
            onPress={() => console.log("Button pressed!")}
            size={120}
            backgroundColor="#F0F0F0"
            borderColor="#005EB5"
            color="#005EB5" // Màu icon là xanh dương
            url="https://www.example.com"
          />
          {/* Bệnh nhân */}
          <CircleButton
            iconName="patient" // Tên icon từ Ionicons
            title="Patients"
            onPress={() => console.log("Button pressed!")}
            size={120}
            backgroundColor="#F0F0F0"
            borderColor="#005EB5"
            color="#005EB5" // Màu icon là đỏ
            url="/humanresources/patients/list"
          />
        </View>
      </ScrollView>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('PatientList')} // Điều hướng đến màn hình Profile
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
