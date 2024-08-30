import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";
import AppGradient from "@/components/AppGradient";
import Colors from "@/constants/Colors";
import ContactsList from "@/components/ContactsList";
import { ContactsSection } from "@/constants/models";
import { Contact } from "expo-contacts";

const App = () => {
  const dispatch = useAppDispatch();
  const {
    data: contacts,
    loading,
    error,
  } = useAppSelector((state) => state.contactsList);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

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

  const getContactsSections = (contacts: Contact[]): ContactsSection[] => {
    const contactsSections = contacts.reduce<ContactsSection[]>(
      (sections, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        let section = sections.find((sec) => sec.title === firstLetter);

        if (!section) {
          section = { title: firstLetter, data: [] };
          sections.push(section);
        }

        section.data.push(contact);

        return sections;
      },
      [],
    );

    contactsSections.sort((a, b) => a.title.localeCompare(b.title));

    return contactsSections;
  };

  return (
    <View className="flex-1">
      <AppGradient colors={[Colors.primary, Colors.dark]}>
        <Text className="my-10 text-4xl text-white font-bold">Contacts</Text>
        <ContactsList data={getContactsSections(contacts)} />
      </AppGradient>

      <StatusBar style="light" />
    </View>
  );
};

export default App;
