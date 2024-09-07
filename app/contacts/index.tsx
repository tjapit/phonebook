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

  const handleChangeQuery = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setQuery(lowerCaseQuery);

    if (lowerCaseQuery === "") {
      setFilteredData(contactsSections);
    } else {
      setFilteredData(
        contactsSections
          .map(
            (section): ContactsSection => ({
              ...section,
              data: section.data.filter((contact) =>
                contact.name.toLowerCase().includes(lowerCaseQuery),
              ),
            }),
          )
          .filter((section) => section.data.length > 0),
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
        onChangeText={handleChangeQuery}
      />
      <ContactsList data={filteredData} />
    </AppGradient>
  );
};

export default ContactsListScreen;
