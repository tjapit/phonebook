import { View, Text, SectionList, Pressable } from "react-native";
import React from "react";
import { ContactsSection } from "@/constants/models";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectContact } from "@/store/features/contacts/selectedContactSlice";
import { toggleFavorite } from "@/store/features/contacts/favoriteSlice";
import Separator from "./Separator";
import { AntDesign } from "@expo/vector-icons";

interface ContactsListProps {
  data: ContactsSection[];
}

const ContactsList = ({ data }: ContactsListProps) => {
  const dispatch = useAppDispatch();
  const { data: favorite } = useAppSelector((state) => state.favorite);

  return (
    <View className="flex justify-between gap-2">
      <View className="px-4 bg-black/40 rounded-3xl">
        <Pressable
          className="my-4 active:opacity-80"
          onPress={() => {
            if (!favorite) {
              return;
            }
            dispatch(selectContact(favorite));
            router.push(`/contacts/${favorite.id}`);
          }}
        >
          <View className="flex-row items-center gap-x-2">
            {favorite ? (
              <>
                <AntDesign name="star" size={32} color="white" />
                <Text className="text-xl text-white">{favorite.name}</Text>
              </>
            ) : (
              <>
                <AntDesign name="staro" size={32} color="white" />
                <Text className="text-xl text-white/60">
                  No favorite contact
                </Text>
              </>
            )}
          </View>
        </Pressable>
      </View>
      <View className="px-4 bg-black/40 rounded-3xl">
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
              <View className="flex-row justify-between">
                <Text className="text-xl text-white">{contact.name}</Text>
                <Pressable
                  className="active:opacity-80"
                  onPress={() => dispatch(toggleFavorite(contact))}
                >
                  {favorite?.id === contact.id ? (
                    <AntDesign name="star" size={25} color="gold" />
                  ) : (
                    <AntDesign name="staro" size={25} color="white" />
                  )}
                </Pressable>
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
    </View>
  );
};

export default ContactsList;
