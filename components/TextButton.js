import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function TextButton({ children, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} >
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}
