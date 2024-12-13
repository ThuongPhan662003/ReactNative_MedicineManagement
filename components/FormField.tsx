import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import icons from "../constants/icons"; // Nếu icons chứa nhiều biểu tượng, dùng destructuring { eye, eyeHide }

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle>;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // space-y-2
  },
  title: {
    fontSize: 16, // text-base
    color: "#B0B0B0", // text-gray-100
    fontFamily: "Poppins-Medium", // font-pmedium
  },
  inputContainer: {
    width: '100%',
    height: 64, 
    paddingHorizontal: 16, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 16, 
    borderWidth: 2, 
    borderColor: '#E0E0E0', 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  input: {
    flex: 1,
    color: "#000000",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FormField;
