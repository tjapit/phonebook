import { View } from "react-native";
import React from "react";

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className }: SeparatorProps) => {
  return <View className={`my-2 border border-b-white/20 ${className}`} />;
};

export default Separator;
