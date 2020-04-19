import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SubmitBtn({
  onPress,
  buttonName,
  buttonStyle,
  buttonTextStyle,
  disabled
}) {
  disabled = disabled ? disabled : false
  return (
    <TouchableOpacity style={[buttonStyle, disabled && { opacity: 0.5 }]} onPress={onPress} disabled={disabled}>
      <Text style={buttonTextStyle}>{buttonName}</Text>
    </TouchableOpacity>
  );
}
