import { View, Text, SectionList, ActivityIndicator } from "react-native";
import React from "react";
import { useContactsSections } from "@/hooks/useContactsSections";
import { SearchBar, Separator } from "@/components";
import {
  ContactsRow,
  ContactsSectionHeader,
  FavoriteBar,
} from "@/components/contact-list";

const ContactsList = () => {
  const { contactsSections, loading, error, query, handleChangeQuery } =
    useContactsSections();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text className="text-xl text-red-400">Error: {error}</Text>;
  }
  return (
    <View className="flex-1 justify-between gap-2">
      <SearchBar query={query} onQueryChange={handleChangeQuery} />
      <FavoriteBar />
      <SectionList
        sections={contactsSections}
        keyExtractor={(contact, index) => contact.name + index}
        renderItem={({ item: contact }) => <ContactsRow contact={contact} />}
        renderSectionHeader={({ section: { title } }) => (
          <ContactsSectionHeader title={title} />
        )}
        ItemSeparatorComponent={() => <Separator />}
        SectionSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactsList;
