import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Contact,
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";

export interface ContactsListState {
  data: Contact[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ContactsListState = {
  data: [],
  loading: false,
  error: undefined,
};

export const fetchContactsList = createAsyncThunk(
  "contactsList/fetchContactsList",
  async () => {
    const { status } = await requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await getContactsAsync({
        fields: [Fields.Emails, Fields.PhoneNumbers],
      });
      return data;
    }
  },
);

export const contactsListSlice = createSlice({
  name: "contactsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactsList.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContactsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsListSlice.reducer;
