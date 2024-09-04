import { View, Text, TextInput, Pressable, Button } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { router } from "expo-router";
import { addContactAsync, Contact, Fields } from "expo-contacts";

interface FormData {
  name: string;
}

const Modal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const req: Contact = {
    //   [Fields.Name]: data.name,
    //   [Fields.ContactType]: "person",
    // };
    // const res = addContactAsync(req);

    console.log(data);
  };

  return (
    <AppGradient>
      <View className="py-4 items-center">
        <Text className="text-3xl text-white font-semibold">
          Create Contact
        </Text>
      </View>
      <View className="px-6 py-4 flex-1 justify-between bg-black/40 rounded-3xl">
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="px-4 py-2 bg-white text-xl rounded-3xl"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Name"
              autoCapitalize="none"
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-400">{String(errors.name.message)}</Text>
        )}

        <View>
          <Button
            title="Submit"
            onPress={() => {
              handleSubmit(onSubmit);
              router.back();
            }}
          />
          <Button title="Cancel" onPress={() => router.back()} color="red" />
        </View>
      </View>
    </AppGradient>
  );
};

export default Modal;
