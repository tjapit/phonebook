import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Contact,
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";

export interface ContactsState {
  data: Contact[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ContactsState = {
  data: [],
  loading: false,
  error: undefined,
};

export const fetchContacts = createAsyncThunk(
  "contactsList/fetchContacts",
  async () => {
    const { status } = await requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await getContactsAsync({
        fields: [
          Fields.Emails,
          Fields.PhoneNumbers,
          Fields.Addresses,
          Fields.Image,
          Fields.Company,
          Fields.JobTitle,
          Fields.Birthday,
        ],
      });
      return data;
    }
  },
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
