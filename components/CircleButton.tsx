// components/CircleButton.tsx
import { router, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import IconComponent from '@/components/IconComponent'; // Import IconComponent
import { useNavigation, RouteProp } from '@react-navigation/native';

interface CircleButtonProps {
  iconName: string; // Tên icon từ IconComponent
  title: string;
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  color?: string; // Thêm thuộc tính color để nhận màu icon
  path: string; // Đường dẫn cho navigation
}

const CircleButton: React.FC<CircleButtonProps> = ({
  iconName,
  title,
  size = 100,
  backgroundColor = '#007bff',
  borderColor = '#005EB5',
  color = 'black', // Màu mặc định là đen nếu không truyền màu
  path,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={[styles.container, { width: size, height: size }]} onPress={() => router.push(path)}>
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
