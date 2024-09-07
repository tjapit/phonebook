import { TextInput } from "react-native";
import React from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  return (
    <TextInput
      className="mb-4 p-4 bg-white rounded-3xl text-xl"
      value={query}
      autoCapitalize="none"
      onChangeText={onQueryChange}
    />
  );
};

export default SearchBar;
