import React from "react";
import ContactsListScreen from "..";
import { render } from "@testing-library/react-native";

describe("Contacts List", () => {
  it("should render the contacts list", () => {
    const { getByText } = render(<ContactsListScreen />);
    getByText("Contacts");
  });
});
