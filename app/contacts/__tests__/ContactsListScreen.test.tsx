import { render } from "@testing-library/react-native";
import ContactsListScreen from "@/app/contacts/index";

describe("Contacts List", () => {
  it("should render the contacts list", () => {
    const { getByText } = render(<ContactsListScreen />);
    getByText("Contacts");
  });
});
