import { render } from "@testing-library/react-native";

import App from "@/app/index";

describe("<App />", () => {
  it("should render correctly on home", () => {
    const { getByText } = render(<App />);

    getByText("Phonebook");
    getByText("Get your contacts right here!");
    getByText("Open Phonebook");
  });
});
