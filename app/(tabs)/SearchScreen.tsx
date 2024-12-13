// import React, { useState } from 'react';
// import { StyleSheet, View, FlatList, Text } from 'react-native';
// import SearchBar from '@/components/SearchBar'; // Import SearchBar
// import { fetchSearchResults } from '@/hooks/fetchSearchResults'; // Giả sử đây là hàm fetch dữ liệu từ API
// import Nav from '@/components/Nav';

// const SearchScreen = () => {
//   const [data, setData] = useState<any[]>([]); // Lưu trữ kết quả tìm kiếm
//   const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading khi gọi API
//   const [searchTerm, setSearchTerm] = useState<string>(''); // Dùng để lưu trữ từ khóa tìm kiếm

//   // Hàm xử lý tìm kiếm
//   const handleSearch = async (keyword: string) => {
//     setLoading(true); // Bật trạng thái loading khi gọi API
//     try {
//       // Giả sử fetchSearchResults là hàm gọi API để lấy dữ liệu tìm kiếm
//       const results = await fetchSearchResults(keyword);
//       setData(results); // Cập nhật kết quả tìm kiếm
//     } catch (error) {
//       console.error('Error searching:', error);
//     } finally {
//       setLoading(false); // Tắt trạng thái loading
//     }
//   };

//   // Hàm xử lý khi xóa văn bản tìm kiếm
//   const handleClear = () => {
//     setData([]); // Xóa dữ liệu tìm kiếm khi người dùng xóa văn bản
//     setSearchTerm(''); // Đặt lại searchTerm về rỗng
//     console.log("xóa")
//   };

//   // Hàm xử lý thay đổi giá trị tìm kiếm
//   const handleSearchTermChange = (text: string) => {
//     setSearchTerm(text); // Cập nhật giá trị tìm kiếm mỗi khi người dùng nhập vào ô tìm kiếm
//     console.log("cập nahanj")
//   };

//   return (
//     <View style={styles.container}>
//       <Nav
//         title="HUMAN MANAGEMENT"
//         externalLink="humanresources/doctors/doctors"
//         name="back"
//         color="#FFFFFF"
//         status={true}
//       />
//       {/* SearchBar */}
//       <SearchBar
//         place="ID, Patient’s name"
//         onSearch={handleSearch}  // Truyền hàm handleSearch vào SearchBar
//         onClear={handleClear}    // Truyền hàm handleClear vào SearchBar
//         searchTerm={searchTerm}  // Truyền giá trị searchTerm vào SearchBar
//         onSearchTermChange={handleSearchTermChange} // Truyền hàm để cập nhật searchTerm
//       />

//       {/* Hiển thị kết quả tìm kiếm */}
//       {loading ? (
//         <Text>Loading...</Text> // Hiển thị loading khi đang tìm kiếm
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => <Text>{item.name}</Text>} // Hiển thị kết quả tìm kiếm
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default SearchScreen;
