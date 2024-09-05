import { Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Contact } from "expo-contacts";
import { useAppDispatch } from "@/hooks";
import { deleteContact } from "@/store/features/contacts/selectedContactSlice";

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

  return (
    <Pressable
      className={`active:opacity-80 ${className}`}
      onPress={() => dispatch(deleteContact(String(selectedContact.id)))}
    >
      <AntDesign name="delete" size={size} color="red" />
    </Pressable>
  );
};

export default DeleteButton;
