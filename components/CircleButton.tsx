// components/CircleButton.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import IconComponent from '@/components/IconComponent'; // Import IconComponent

interface CircleButtonProps {
  iconName: string; // Tên icon từ IconComponent
  title: string;
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  color?: string; // Thêm thuộc tính color để nhận màu icon
  url: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  iconName,
  title,
  onPress,
  size = 100,
  backgroundColor = '#007bff',
  borderColor = '#005EB5',
  color = 'black', // Màu mặc định là đen nếu không truyền màu
  url,
}) => {
  const handlePress = () => {
    onPress();
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err)); // Catch lỗi nếu không mở được URL
  };

  return (
    <TouchableOpacity style={[styles.container, { width: size, height: size }]} onPress={handlePress}>
      <View
        style={[styles.outerCircle, { width: size, height: size, backgroundColor: backgroundColor, borderColor: borderColor }]}>
        <View style={[styles.innerCircle, { width: size * 0.6, height: size * 0.6 }]}>
          <IconComponent
            name={iconName} // Truyền tên icon
            size={size * 0.4} // Điều chỉnh kích thước icon
            color={color} // Truyền màu cho icon
          />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 4,
    overflow: 'hidden',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default CircleButton;
