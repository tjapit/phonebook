import { Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import AppGradient from "@/components/AppGradient";
import { useAppSelector } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";
import ContactCard from "@/components/ContactCard";

const ContactDetails = () => {
  const { data: contact } = useAppSelector((state) => state.selectedContact);

  return (
    <AppGradient>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="leftcircleo" size={50} color="white" />
      </Pressable>

      <View className="flex-1 py-4">
        {contact ? (
          <ContactCard contact={contact} />
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
