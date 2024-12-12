import React from 'react';
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStethoscope, faPills, faHeart, faChevronLeft, faUsers,faAddressBook,faMagnifyingGlass,faXmark ,faIdCardClip} from '@fortawesome/free-solid-svg-icons';
// Định nghĩa ánh xạ tên biểu tượng với các đối tượng FontAwesome
const icons = {
  stethoscope: faStethoscope,
  pills: faPills,
  heart: faHeart,
  back: faChevronLeft,
  user: faUsers,
  patient:faAddressBook,
  search:faMagnifyingGlass,
  close:faXmark,
  detail:faIdCardClip,
};

// Props cho IconComponent
interface IconComponentProps {
  name: keyof typeof icons; // Tên biểu tượng (phải khớp với các key trong `icons`)
  size?: number; // Kích thước biểu tượng (mặc định: 24)
  color?: string; // Màu sắc biểu tượng (mặc định: '#000')
  onPress?: (event: GestureResponderEvent) => void; // Hàm xử lý sự kiện nhấn
}

const IconComponent: React.FC<IconComponentProps> = ({ name, size = 24, color = '#000', onPress }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
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
