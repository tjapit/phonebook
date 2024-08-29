import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchContactsList } from "@/store/features/contactsList/contactsListSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const {
    data: contacts,
    loading,
    error,
  } = useAppSelector((state) => state.contactsList);

  useEffect(() => {
    dispatch(fetchContactsList());
  }, []);

  if (loading) {
    return (
      <View className="flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      {contacts.map((contact) => {
        console.log(contact);
        return (
          <Text className="text-4xl text-blue-600" key={contact.id}>
            {contact.name + contact.phoneNumbers![0].number}
          </Text>
        );
      })}
      <Text>TOWIEFJOEIWJFO</Text>
    </View>
  );
};

export default App;
