import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { router } from "expo-router";
import {
  addContactAsync,
  Contact,
  Fields,
  requestPermissionsAsync,
} from "expo-contacts";
import { AppGradient } from "@/components";

interface FormData {
  firstName: string;
  lastName: string;
}

const Modal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const contact: Contact = {
      [Fields.Name]: data.firstName + " " + data.lastName,
      [Fields.FirstName]: data.firstName,
      [Fields.LastName]: data.lastName,
      [Fields.ContactType]: "person",
    };

    try {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        await addContactAsync(contact);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AppGradient>
      <View className="py-4 items-center">
        <Text className="text-3xl text-white font-semibold">
          Create Contact
        </Text>
      </View>
      <View className="p-6 flex-1 justify-between bg-black/40 rounded-3xl">
        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="px-4 py-2 bg-white text-xl rounded-3xl"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="First Name"
                autoCapitalize="none"
              />
            )}
          />
          {errors.firstName && (
            <Text className="text-red-400">
              {String(errors.firstName.message)}
            </Text>
          )}

          <Controller
            control={control}
            name="lastName"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="px-4 py-2 bg-white text-xl rounded-3xl"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Last Name"
                autoCapitalize="none"
              />
            )}
          />
          {errors.lastName && (
            <Text className="text-red-400">
              {String(errors.lastName.message)}
            </Text>
          )}
        </View>

        <View style={{ gap: 16 }}>
          <Button
            title="Submit"
            onPress={handleSubmit(async (data) => {
              await onSubmit(data);
              router.back();
            })}
          />
          <Button title="Cancel" onPress={() => router.back()} color="red" />
        </View>
      </View>
    </AppGradient>
  );
};

export default Modal;
