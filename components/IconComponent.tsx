import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faStethoscope, faPills, faHeart, faChevronLeft, faUsers, 
  faAddressBook, faMagnifyingGlass, faXmark, faIdCardClip, 
  faPenToSquare, faCakeCandles, faIdCard, faPhone, 
  faSuitcaseMedical, faLocationDot, faCalendarDays, faFloppyDisk 
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';

// Định nghĩa ánh xạ tên biểu tượng với các đối tượng FontAwesome
const icons = {
  stethoscope: faStethoscope,
  pills: faPills,
  heart: faHeart,
  back: faChevronLeft,
  user: faUsers,
  patient: faAddressBook,
  search: faMagnifyingGlass,
  close: faXmark,
  detail: faIdCardClip,
  edit: faPenToSquare,
  birthday: faCakeCandles,
  idCard: faIdCard,
  phone: faPhone,
  insurance: faSuitcaseMedical,
  location: faLocationDot,
  date: faCalendarDays,
  save: faFloppyDisk,
};

// Props cho IconComponent
interface IconComponentProps {
  name: keyof typeof icons; // Tên biểu tượng (phải khớp với các key trong `icons`)
  size?: number; // Kích thước biểu tượng (mặc định: 24)
  color?: string; // Màu sắc biểu tượng (mặc định: '#000')
  route?: string; // Đường dẫn cần điều hướng khi nhấn vào
}

const IconComponent: React.FC<IconComponentProps> = ({ name, size = 24, color = '#000', route }) => {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
      router.push(route); // Điều hướng đến route được chỉ định
    }
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
      <FontAwesomeIcon icon={icons[name]} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
  },
});

export default IconComponent;
