import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const App = () => {
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
    </View>
  );
};

export default App;
