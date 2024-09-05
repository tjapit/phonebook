import { Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Contact } from "expo-contacts";

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
  return (
    <Pressable
      className={`active:opacity-80 ${className}`}
      onPress={() => console.log(`delete ${selectedContact.name}`)}
    >
      <AntDesign name="delete" size={size} color="red" />
    </Pressable>
  );
};

export default DeleteButton;
