import { Text, ActivityIndicator } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { useContactsSections } from "@/hooks/useContactsSections";
import ContactsList from "@/components/ContactsList";

const Contacts = () => {
  const { contactsSections, loading, error } = useContactsSections();

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
    <AppGradient>
      <Text className="my-10 text-4xl text-white font-bold">Contacts</Text>
      <ContactsList data={contactsSections} />
    </AppGradient>
  );
};

export default Contacts;
