import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Contact } from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";
import { getBirthday } from "@/utils";
import { FavoriteButton, Separator } from "@/components";
import ContactDetailContainer from "./ContactDetailContainer";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <View className="flex-1 gap-4">
      <View className="relative p-6 justify-center items-center bg-black/40 rounded-3xl">
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

        <View>
          <Text className="text-4xl text-white font-semibold">
            {contact.name}
          </Text>
        </View>

        <View className="absolute -bottom-2 -right-2">
          <FavoriteButton selectedContact={contact} size={48} />
        </View>
      </View>

      <View>
        {contact.phoneNumbers && (
          <ContactDetailContainer>
            <FlatList
              data={contact.phoneNumbers}
              showsVerticalScrollIndicator={false}
              keyExtractor={(phoneNumber, index) =>
                "phone" + phoneNumber.label + index
              }
              renderItem={({ item, index }) => (
                <View className="flex gap-1">
                  {index && <Separator />}
                  <Text className="text-white/60">{item.label}</Text>
                  <Text className="text-xl text-white">{item.number}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </ContactDetailContainer>
        )}

        {contact.emails && (
          <ContactDetailContainer>
            <FlatList
              data={contact.emails}
              showsVerticalScrollIndicator={false}
              keyExtractor={(email, index) => "email" + email.label + index}
              renderItem={({ item, index }) => (
                <View className="flex gap-1">
                  {index && <Separator />}
                  <Text className="text-white/60">{item.label}</Text>
                  <Text className="text-xl text-white">{item.email}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </ContactDetailContainer>
        )}

        {contact.addresses && (
          <ContactDetailContainer>
            <FlatList
              data={contact.addresses}
              showsVerticalScrollIndicator={false}
              keyExtractor={(address, index) =>
                "address" + address.label + index
              }
              renderItem={({ item, index }) => (
                <View className="flex gap-1">
                  {index && <Separator />}
                  <Text className="text-white/60">{item.label}</Text>
                  <Text className="text-xl text-white">{item.street}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </ContactDetailContainer>
        )}

        {getBirthday(contact) && (
          <ContactDetailContainer>
            <Text className="text-white/60">birthday</Text>
            <Text className="text-xl text-white">{getBirthday(contact)}</Text>
          </ContactDetailContainer>
        )}
      </View>
    </View>
  );
};

export default ContactCard;
