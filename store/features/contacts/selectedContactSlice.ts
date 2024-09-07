import { PayloadAction,  createSlice } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";

export interface SelectedContactState {
  data: Contact | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: SelectedContactState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<Contact>) => {
      state.data = action.payload;
    },
  },
});

export const { selectContact } = selectedContactSlice.actions;

export default selectedContactSlice.reducer;
