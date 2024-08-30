import { Pressable } from "react-native";
import React from "react";
import { Contact } from "expo-contacts";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleFavorite } from "@/store/features/contacts/favoriteSlice";
import { AntDesign } from "@expo/vector-icons";
interface FavoriteButtonProps {
  className?: string;
  selectedContact: Contact;
  size?: number;
}
const FavoriteButton = ({
  className,
  selectedContact,
  size = 24,
}: FavoriteButtonProps) => {
  const { data: favorite } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  return (
    <Pressable
      className={`active:opacity-80 ${className}`}
      onPress={() => dispatch(toggleFavorite(selectedContact))}
    >
      {favorite?.id === selectedContact.id ? (
        <AntDesign name="star" size={size} color="gold" />
      ) : (
        <AntDesign name="staro" size={size} color="white" />
      )}
    </Pressable>
  );
};

export default FavoriteButton;
