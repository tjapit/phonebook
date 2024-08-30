import { View, Text, SectionList, Pressable } from "react-native";
import React from "react";
import { ContactsSection } from "@/constants/models";
import { router } from "expo-router";

interface ContactsListProps {
  data: ContactsSection[];
}

const ContactsList = ({ data }: ContactsListProps) => {
  return (
    <View className="flex-1">
      <SectionList
        sections={data}
        keyExtractor={(contact, index) => contact.name + index}
        renderItem={(contact) => (
          <Pressable
            onPress={() => router.push(`/contacts/${contact.item.id}`)}
            className="my-3 rounded-full overflow-hidden"
          >
            <View className="p-4 border rounded-full border-white/80">
              <Text className="text-2xl text-white">{contact.item.name}</Text>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-3xl text-white font-bold">{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactsList;
