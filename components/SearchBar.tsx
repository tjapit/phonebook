import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { clsx } from "clsx";
import Colors from "@/constants/Colors";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  disabled: boolean;
}

const SearchBar = ({ query, onQueryChange, disabled }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      className={clsx(
        "mb-4 p-4 bg-white rounded-3xl text-xl",
        disabled && "bg-gray-400",
        isFocused && "bg-white/80",
      )}
      value={query}
      autoCapitalize="none"
      onChangeText={onQueryChange}
      style={isFocused ? styles.shadows : {}}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      editable={!disabled}
    />
  );
};

const styles = StyleSheet.create({
  shadows: {
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 25,
    shadowColor: Colors.dark,
  },
});

export default SearchBar;
