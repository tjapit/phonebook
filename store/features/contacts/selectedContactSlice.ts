import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";

export interface SelectedContactState {
  data: Contact | undefined;
}

const initialState: SelectedContactState = {
  data: undefined,
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

export const {selectContact}  = selectedContactSlice.actions;

export default selectedContactSlice.reducer;
