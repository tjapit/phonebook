import { View, Text, SectionList } from "react-native";
import React from "react";
import { ContactsSection } from "@/constants/models";

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
          <View>
            <Text className="text-2xl text-white">{contact.item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-3xl text-white font-bold">{title}</Text>
        )}
      />
    </View>
  );
};

export default ContactsList;
