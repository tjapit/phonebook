import { Text, ActivityIndicator, TextInput } from "react-native";
import React, { useState } from "react";
import AppGradient from "@/components/AppGradient";
import { useContactsSections } from "@/hooks/useContactsSections";
import ContactsList from "@/components/ContactsList";
import { ContactsSection } from "@/constants/models";

const ContactsListScreen = () => {
  const [query, setQuery] = useState("");
  const { contactsSections, loading, error } = useContactsSections();
  const [filteredData, setFilteredData] =
    useState<ContactsSection[]>(contactsSections);

  const handleChangeText = (text: string) => {
    setQuery(text);

    if (text === "") {
      setFilteredData(contactsSections);
    } else {
      setFilteredData(
        contactsSections.filter(
          (section) => section.title.toLowerCase() === text,
        ),
      );
    }
  };

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
      <TextInput
        className="mb-4 p-4 bg-white rounded-3xl text-xl"
        value={query}
        autoCapitalize="none"
        onChangeText={handleChangeText}
      />
      <ContactsList data={filteredData} />
    </AppGradient>
  );
};

export default ContactsListScreen;
