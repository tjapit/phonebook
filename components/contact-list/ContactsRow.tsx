import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppDispatch } from "@/hooks";
import { Contact } from "expo-contacts";
import { selectContact } from "@/store/features/contacts/selectedContactSlice";
import { router } from "expo-router";
import { DeleteButton, FavoriteButton } from "@/components";

interface ContactsRowProps {
  contact: Contact;
}

const ContactsRow = ({ contact }: ContactsRowProps) => {
  const dispatch = useAppDispatch();

  return (
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
  );
};

export default ContactsRow;
