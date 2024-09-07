import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { AppGradient } from "@/components";

const App = () => {
  return (
    <AppGradient>
      <SafeAreaView className="flex-1 my-10 justify-between">
        <View>
          <Text className="text-center text-white font-bold text-4xl">
            Phonebook
          </Text>
          <Text className="mt-3 text-center text-white text-2xl">
            Get your contacts right here!
          </Text>
        </View>

        <View>
          <Pressable
            onPress={() => router.push("/contacts")}
            className="p-4 min-h-max justify-center items-center bg-white rounded-full active:opacity-80"
            testID="openPhonebookBtn"
          >
            <Text className="text-xl font-semibold">Open Phonebook</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </AppGradient>
  );
};

export default App;
