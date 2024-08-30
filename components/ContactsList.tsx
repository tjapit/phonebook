import { View, Text, SectionList, Pressable } from "react-native";
import React from "react";
import { ContactsSection } from "@/constants/models";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks";
import { selectContact } from "@/store/features/contacts/selectedContactSlice";
import Separator from "./Separator";

interface ContactsListProps {
  data: ContactsSection[];
}

const ContactsList = ({ data }: ContactsListProps) => {
  const dispatch = useAppDispatch();

  return (
    <View className="flex-1 px-4 bg-black/40 rounded-3xl">
      <SectionList
        sections={data}
        keyExtractor={(contact, index) => contact.name + index}
        renderItem={({ item: contact }) => (
          <Pressable
            onPress={() => {
              dispatch(selectContact(contact));
              router.push(`/contacts/${contact.id}`);
            }}
            className="overflow-hidden active:opacity-80"
          >
            <View>
              <Text className="text-xl text-white">{contact.name}</Text>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mt-6 text-3xl text-white font-bold">{title}</Text>
        )}
        ItemSeparatorComponent={() => <Separator />}
        SectionSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactsList;
