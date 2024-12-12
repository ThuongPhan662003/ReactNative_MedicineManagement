import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  isLoading?: boolean; // Thêm kiểu boolean cho trường isLoading
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.container, containerStyles]}
    >
      {isLoading ? (
        <Text style={[styles.text, textStyles]}>Đang tải...</Text>
      ) : (
        <Text style={[styles.text, textStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005EB5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
