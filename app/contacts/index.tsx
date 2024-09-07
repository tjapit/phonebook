import { Text, Pressable } from "react-native";
import React from "react";
import { AppGradient } from "@/components/";
import { ContactsList, FavoriteBar } from "@/components/contact-list";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const ContactsListScreen = () => {
  return (
    <AppGradient className="relative">
      <Text className="my-10 text-4xl text-white font-bold">Contacts</Text>
      <FavoriteBar styleName="mb-4" />
      <ContactsList />
      <Pressable
        className="absolute right-0 bottom-8 active:opacity-80"
        onPress={() => router.push("/modal")}
      >
        <AntDesign name="pluscircle" size={48} color="white" />
      </Pressable>
    </AppGradient>
  );
};

export default ContactsListScreen;
