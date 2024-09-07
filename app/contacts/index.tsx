import { Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { useContactsSections } from "@/hooks/useContactsSections";
import ContactsList from "@/components/ContactsList";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const ContactsListScreen = () => {
  const { contactsSections, loading, error, query, handleChangeQuery } =
    useContactsSections();

  if (loading) {
    return (
      <AppGradient>
        <ActivityIndicator size="large" />
      </AppGradient>
    );
  }
  if (error) {
    return (
      <AppGradient>
        <Text className="text-xl text-red-400">Error: {error}</Text>
      </AppGradient>
    );
  }
  return (
    <AppGradient className="relative">
      <Text className="my-10 text-4xl text-white font-bold">Contacts</Text>
      <SearchBar query={query} onQueryChange={handleChangeQuery} />
      <ContactsList data={contactsSections} />
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
