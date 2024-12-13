import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; // For type checking

// Define the props for the component
interface IconWithTextProps {
  icon: IconDefinition; // FontAwesome icon definition
  size?: number; // Size of the icon
  color?: string; // Color of the icon
  text: string; // Text to be displayed beside the icon
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, size = 24, color = "#000", text }) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={icon} size={size} color={color} />
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default IconWithText;
