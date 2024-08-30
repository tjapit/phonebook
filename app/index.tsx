import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppGradient from "@/components/AppGradient";
import Colors from "@/constants/Colors";
import ContactsList from "@/components/ContactsList";
import { useContactsSections } from "@/hooks/useContactsSections";

const App = () => {
  const { contactsSections, loading, error } = useContactsSections();

  if (loading) {
    return (
      <AppGradient colors={[Colors.grey, Colors.dark]}>
        <ActivityIndicator size="large" />
      </AppGradient>
    );
  }
  if (error) {
    return (
      <AppGradient colors={[Colors.grey, Colors.dark]}>
        <Text className="text-xl text-red-400">Error: {error}</Text>
      </AppGradient>
    );
  }

  return (
    <View className="flex-1">
      <AppGradient colors={[Colors.primary, Colors.dark]}>
        <Text className="my-10 text-4xl text-white font-bold">Contacts</Text>
        <ContactsList data={contactsSections} />
      </AppGradient>

      <StatusBar style="light" />
    </View>
  );
};

export default App;
