import { render } from "@testing-library/react-native";
import ContactsListScreen from "@/app/contacts/index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ContactsState } from "@/store/features/contacts/contactsSlice";
import { FavoriteState } from "@/store/features/contacts/favoriteSlice";
import { thunk } from "redux-thunk";

describe("<ContactsListScreen />", () => {
  it("should render the contacts list", () => {
    const initialState = {
      contacts: {
        data: [],
        loading: false,
        error: undefined,
      } as ContactsState,
      favorite: { data: undefined } as FavoriteState,
    };
    const mockStore = configureStore([thunk as any]);
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <ContactsListScreen />
      </Provider>,
    );

    getByText("Contacts");
  });
});
