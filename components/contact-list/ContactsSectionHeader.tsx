import { View, Text } from "react-native";
import React from "react";

interface ContactsSectionHeaderProps {
  title: string;
}

const ContactsSectionHeader = ({ title }: ContactsSectionHeaderProps) => {
  return (
    <View className="mt-6">
      <Text className="text-3xl text-white font-bold">{title}</Text>
    </View>
  );
};

export default ContactsSectionHeader;
