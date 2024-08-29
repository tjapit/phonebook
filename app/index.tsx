import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { decrement, increment } from "@/store/features/counter/counterSlice";
import { AntDesign } from "@expo/vector-icons";

const App = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        setContacts(data);
      }
    })();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      {contacts.map((contact) => (
        <Text key={contact.id}>{contact.name}</Text>
      ))}
      <Pressable onPress={() => dispatch(increment())}>
        <AntDesign name="pluscircle" size={24} color="black" />
      </Pressable>
      <Text className="text-3xl">{count}</Text>
      <Pressable onPress={() => dispatch(decrement())}>
        <AntDesign name="minuscircle" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default App;
