import {
  View,
  Text,
  SectionList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks";
import { selectContact } from "@/store/features/contacts/selectedContactSlice";
import { useContactsSections } from "@/hooks/useContactsSections";
import {
  FavoriteButton,
  DeleteButton,
  SearchBar,
  Separator,
} from "@/components";
import FavoriteBar from "./FavoriteBar";

const ContactsList = () => {
  const dispatch = useAppDispatch();
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
        renderItem={({ item: contact }) => (
          <Pressable
            onPress={() => {
              dispatch(selectContact(contact));
              router.push(`/contacts/${contact.id}`);
            }}
            className="overflow-hidden active:opacity-80"
          >
            <View className="flex-row justify-between">
              <Text className="text-xl text-white">{contact.name}</Text>
              <View className="flex-row" style={{ gap: 6 }}>
                <DeleteButton selectedContact={contact} />
                <FavoriteButton selectedContact={contact} />
              </View>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold">{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <Separator />}
        SectionSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactsList;
