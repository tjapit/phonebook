import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Contact } from "expo-contacts";
import { Entypo, Ionicons } from "@expo/vector-icons";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  console.log(contact);
  return (
    <View className="flex-1 gap-4">
      <View className="p-6 justify-center items-center bg-black/40 rounded-3xl">
        {contact.image ? (
          <Image src={contact.image.uri} resizeMode="cover" width={240} />
        ) : (
          <Ionicons
            name="person-circle"
            size={240}
            color="white"
            className="min-w-max"
          />
        )}
        <View className="flex-row">
          {contact.jobTitle && (
            <Text className="text-lg text-white/60">{contact.jobTitle}</Text>
          )}
          {contact.jobTitle && contact.company && (
            <Text className="text-lg text-white/60"> - </Text>
          )}
          {contact.company && (
            <Text className="text-lg text-white/60">{contact.company}</Text>
          )}
        </View>
        <Text className="text-4xl text-white font-semibold">
          {contact.name}
        </Text>
      </View>

      <View className="p-6 bg-black/40 rounded-3xl">
        <FlatList
          data={contact.phoneNumbers}
          showsVerticalScrollIndicator={false}
          keyExtractor={(phoneNumber, index) => phoneNumber.label + index}
          renderItem={({ item: phoneNumber }) => (
            <View className="flex gap-1">
              <Text className="text-white/60">{phoneNumber.label}</Text>
              <Text className="text-xl text-white">{phoneNumber.number}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ContactCard;
