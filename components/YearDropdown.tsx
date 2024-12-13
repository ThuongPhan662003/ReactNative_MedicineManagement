import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const YearDropdown = ({ onYearChange }: { onYearChange: (year: string) => void }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Tạo danh sách năm từ năm hiện tại đến một năm trong tương lai
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, i) => {
    return { label: (currentYear + i).toString(), value: (currentYear + i).toString() };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Year</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedYear(value);
          onYearChange(value || "");
        }}
        items={years}
        placeholder={{
          label: "Select a year...",
          value: null,
          color: "#9EA0A4",
        }}
        style={{
          inputAndroid: styles.input,
          inputIOS: styles.input,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#fff",
  },
});

export default YearDropdown;
