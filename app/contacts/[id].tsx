import { Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import AppGradient from "@/components/AppGradient";
import { useAppSelector } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";

const ContactDetails = () => {
  const { data: contact } = useAppSelector((state) => state.selectedContact);

  return (
    <AppGradient>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="leftcircleo" size={50} color="white" />
      </Pressable>

      <View className="flex-1 justify-center items-center">
        {contact ? (
          <Text className="text-white text-lg">{contact.name}</Text>
        ) : (
          <Text className="text-4xl text-white font-bold">
            No detail found!
          </Text>
        )}
      </View>
    </AppGradient>
  );
};

export default ContactDetails;
