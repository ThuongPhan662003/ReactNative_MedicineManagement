import { View, Text, TextInput, TouchableOpacity, Image, StyleProp, ViewStyle, TextStyle } from "react-native";
import { useState } from "react";
import icons from "../constants/icons";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void; // Hàm xử lý giá trị đầu vào, nhận vào một chuỗi
  otherStyles?: StyleProp<ViewStyle>; // Các style bổ sung cho container
  props?: any; // Các prop bổ sung có thể nhận vào từ ngoài
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input} // Thêm style mới cho màu chữ và nền
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword} // Hiển thị dạng * khi là password
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              style={styles.eyeIcon}
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginVertical: 8,
  } as StyleProp<ViewStyle>, // Áp dụng kiểu viewStyle cho container

  titleText: {
    fontSize: 16,
    color: '#B0B0B0',
    fontFamily: 'PMedium',
  } as StyleProp<TextStyle>, // Áp dụng kiểu textStyle cho title

  inputContainer: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2B2B2B',
    flexDirection: 'row',
    alignItems: 'center',
  } as StyleProp<ViewStyle>, // Áp dụng kiểu viewStyle cho input container

  input: {
    flex: 1,
    color: '#000', // Màu chữ đen
    backgroundColor: '#ffffff', // Nền trắng
    fontFamily: 'PSemibold',
    fontSize: 16,
  } as StyleProp<TextStyle>, // Áp dụng kiểu textStyle cho TextInput

  eyeIcon: {
    width: 24,
    height: 24,
  } as StyleProp<ViewStyle>, // Áp dụng kiểu viewStyle cho icon
};

export default FormField;
