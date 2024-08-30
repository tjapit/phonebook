import { View, Text } from "react-native";
import React, { ReactNode } from "react";

interface ContactDetailContainerProps {
  children: ReactNode;
  className?: string;
}

const ContactDetailContainer = ({
  children,
  className,
}: ContactDetailContainerProps) => {
  return (
    <View className={`mb-4 p-4 bg-black/40 rounded-3xl ${className}`}>
      {children}
    </View>
  );
};

export default ContactDetailContainer;
