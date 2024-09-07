import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { AntDesign } from "@expo/vector-icons";
import { selectContact } from "@/store/features/contacts/selectedContactSlice";
import { router } from "expo-router";

interface FavoriteBarProps {
  styleName: string;
}

const FavoriteBar = ({ styleName }: FavoriteBarProps) => {
  const dispatch = useAppDispatch();
  const { data: favorite } = useAppSelector((state) => state.favorite);

  return (
    <View className={`${styleName} px-4 bg-black/40 rounded-3xl`}>
      {favorite ? (
        <Pressable
          className="my-4 active:opacity-80"
          onPress={() => {
            dispatch(selectContact(favorite));
            router.push(`/contacts/${favorite.id}`);
          }}
        >
          <View className="flex-row items-center gap-x-2">
            <AntDesign name="star" size={32} color="white" />
            <Text className="text-xl text-white">{favorite.name}</Text>
          </View>
        </Pressable>
      ) : (
        <View className="my-4 flex-row items-center gap-x-2">
          <AntDesign name="staro" size={32} color="grey" />
          <Text className="text-xl text-white/60">No favorite contact</Text>
        </View>
      )}
    </View>
  );
};

export default FavoriteBar;
