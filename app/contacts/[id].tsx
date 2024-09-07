import { Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAppSelector } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";
import { ContactCard } from "@/components/contact-details/";
import { AppGradient } from "@/components";

const ContactDetailsScreen = () => {
  const { data: contact } = useAppSelector((state) => state.selectedContact);

  return (
    <AppGradient>
      <Pressable onPress={() => router.back()} className="active:opacity-80">
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

export default ContactDetailsScreen;
