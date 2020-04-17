import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SubmitBtn({
  onPress,
  buttonName,
  buttonStyle,
  buttonTextStyle,
}) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={buttonTextStyle}>{buttonName}</Text>
    </TouchableOpacity>
  );
}
