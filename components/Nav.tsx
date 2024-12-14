import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';  // Import ExternalLink từ thư viện expo-router
import IconComponent from '@/components/IconComponent'; // Import IconComponent
import { IconSymbol } from './ui/IconSymbol';

interface NavProps {
  title: string; // Tiêu đề cho thanh điều hướng
  children?: React.ReactNode; // Các thành phần con (ví dụ: nút, icon)
  name?: keyof typeof icons; // Tên icon từ IconComponent (phải khớp với keys trong `icons`)
  externalLink?: string; // Liên kết ngoài cần điều hướng đến
  status?: boolean; // Trạng thái hiển thị icon, true là hiển thị, false là ẩn
  color?: string; // Màu sắc của icon
}

const Nav: React.FC<NavProps> = ({ title, children, name, externalLink, status = true, color = '#FFFFFF' }) => {
  return (
    <View style={styles.navContainer}>
      {/* Hiển thị icon nếu có và trạng thái status là true */}
      {name && status && externalLink && (
        <ExternalLink href={externalLink}>  {/* Sử dụng ExternalLink để mở liên kết ngoài */}
          <TouchableOpacity style={styles.iconContainer}>
            {/* <IconComponent name={name} size={30} color={color} /> */}
            <IconSymbol size={35} name={name} color={"#FFFFFF"} />

          </TouchableOpacity>
        </ExternalLink>
        
      )}

      {/* Tiêu đề thanh điều hướng */}
      <Text style={styles.title}>{title}</Text>

      {/* Các thành phần con */}
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    backgroundColor: '#005EB5',
    height: 100,
    width:'100%'
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Làm cho title chiếm hết không gian còn lại
    marginTop:20,
    textAlign: 'center', // Căn giữa nội dung
  },
  iconContainer: {
    paddingTop:30,
    // paddingLeft: 2, // Căn trái cho icon
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Nav;
