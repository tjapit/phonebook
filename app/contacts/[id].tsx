import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import AppGradient from "@/components/AppGradient";

const ContactDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <AppGradient>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">{id}</Text>
      </View>
    </AppGradient>
  );
};

export default ContactDetails;
