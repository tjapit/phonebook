import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Contact,
  removeContactAsync,
  requestPermissionsAsync,
} from "expo-contacts";

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

export const deleteContact = createAsyncThunk(
  "selectedContact/delete",
  async (contactID: string) => {
    if (!contactID) return;
    const { status } = await requestPermissionsAsync();
    try {
      if (status === "granted") {
        await removeContactAsync(contactID);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

export const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<Contact>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.loading = false;
        state.data = undefined;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectContact } = selectedContactSlice.actions;

export default selectedContactSlice.reducer;
