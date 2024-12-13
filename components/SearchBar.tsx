import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import IconComponent from '@/components/IconComponent'; // Import IconComponent

interface SearchBarProps {
  place?: string;  // Thêm prop place để truyền giá trị placeholder
  onSearch: (keyword: string) => void; // Hàm sẽ được gọi khi tìm kiếm
  onClear?: () => void; // Hàm sẽ được gọi khi xóa văn bản tìm kiếm
  searchTerm: string; // Thêm prop searchTerm từ parent để kiểm tra và hiển thị icon X
  onSearchTermChange: (text: string) => void; // Hàm cập nhật searchTerm
}

const SearchBar: React.FC<SearchBarProps> = ({
  place = 'Search...',  // Mặc định là 'Search...' nếu không truyền giá trị
  onSearch,
  onClear,
  searchTerm,
  onSearchTermChange
}) => {
  // Thêm state để theo dõi trạng thái nhấn nút X
  const [isClearPressed, setIsClearPressed] = useState(false);

  // Hàm xử lý thay đổi văn bản tìm kiếm
  const handleSearchChange = (text: string) => {
    onSearchTermChange(text); // Cập nhật searchTerm từ parent
  };

  // Hàm xử lý nhấn nút tìm kiếm (khi nhấn Enter)
  const handleSearchPress = () => {
    if (searchTerm) {
      onSearch(searchTerm); // Gửi keyword cho API
    }
  };

  // Hàm xử lý xóa văn bản tìm kiếm khi nhấn dấu "X"
  const handleClearPress = () => {
    setIsClearPressed(true);  // Đánh dấu là nút X đã được nhấn
    onSearchTermChange(''); // Reset lại searchTerm
    if (onClear) {
      onClear(); // Gọi hàm onClear nếu có
    }

    // Đặt lại trạng thái nhấn sau một khoảng thời gian ngắn (hoặc bạn có thể sử dụng setTimeout)
    setTimeout(() => setIsClearPressed(false), 300); // Đặt lại trạng thái nhấn sau 300ms
  };

  return (
    <View style={styles.searchBarContainer}>
      {/* Icon tìm kiếm */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <IconComponent name="search" size={24} color="#B1B1B1" />
      </TouchableOpacity>

      {/* TextInput với icon bên trong */}
      <TextInput
        style={styles.searchInput}
        placeholder={place}  // Sử dụng giá trị place làm placeholder
        value={searchTerm}  // Truyền giá trị searchTerm vào ô tìm kiếm
        onChangeText={handleSearchChange}  // Cập nhật searchTerm khi người dùng nhập
        onSubmitEditing={handleSearchPress}  // Gọi hàm tìm kiếm khi nhấn Enter
      />

      {/* Nút xóa, chỉ hiển thị khi có văn bản tìm kiếm */}
      {searchTerm ? (
        <TouchableOpacity
          style={[
            styles.clearButton,
            isClearPressed ? styles.clearButtonPressed : null, // Thêm style khi nút được nhấn
          ]}
          onPress={handleClearPress}
        >
          <IconComponent name="close" size={24} color="gray" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    position: 'relative', // Đảm bảo các icon có thể nằm trong ô search
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFEFE',
    borderRadius: 20,
    paddingLeft: 40, // Dành không gian cho icon search bên trái
    paddingRight: 40, // Dành không gian cho icon close bên phải
    fontSize: 16,
    color:'#B1B1B1'
  },
  searchButton: {
    position: 'absolute',
    left: 10, // Đặt icon search ở bên trái ô tìm kiếm
    zIndex: 1, // Đảm bảo icon tìm kiếm nằm trên cùng
  },
  clearButton: {
    position: 'absolute',
    right: 10, // Đặt icon close ở bên phải ô tìm kiếm
    zIndex: 1, // Đảm bảo icon đóng nằm trên cùng
    opacity: 0.7, // Đặt độ mờ mặc định
  },
  clearButtonPressed: {
    opacity: 1, // Khi nhấn vào nút X, độ mờ sẽ trở thành 1
    transform: [{ scale: 1.2 }], // Làm cho nút "X" phóng to một chút khi nhấn
  },
});

export default SearchBar;
