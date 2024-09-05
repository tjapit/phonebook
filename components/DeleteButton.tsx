import { Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Contact } from "expo-contacts";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteContact } from "@/store/features/contacts/contactsSlice";
import { toggleFavorite } from "@/store/features/contacts/favoriteSlice";

interface DeleteButtonProps {
  className?: string;
  selectedContact: Contact;
  size?: number;
}

const DeleteButton = ({
  className,
  selectedContact,
  size = 24,
}: DeleteButtonProps) => {
  const dispatch = useAppDispatch();
  const { data: favorite } = useAppSelector((state) => state.favorite);

  return (
    <Pressable
      className={`active:opacity-80 ${className}`}
      onPress={() => {
        dispatch(deleteContact(String(selectedContact.id)));
        if (selectedContact.id === favorite?.id) {
          dispatch(toggleFavorite(selectedContact));
        }
      }}
    >
      <AntDesign name="delete" size={size} color="red" />
    </Pressable>
  );
};

export default DeleteButton;
