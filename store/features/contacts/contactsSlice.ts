import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Contact,
  Fields,
  getContactsAsync,
  removeContactAsync,
  requestPermissionsAsync,
} from "expo-contacts";

export interface ContactsState {
  data: Contact[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ContactsState = {
  data: [],
  loading: true,
  error: undefined,
};

export const fetchContacts = createAsyncThunk("contacts/fetch", async () => {
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
});

export const deleteContact = createAsyncThunk(
  "selectedContact/delete",
  async (contactID: string) => {
    if (!contactID) return;
    const { status } = await requestPermissionsAsync();
    try {
      if (status === "granted") {
        await removeContactAsync(contactID);
        return contactID;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        state.data = action.payload;
        state.data.sort((a, b) => a.name.localeCompare(b.name));
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // delete
    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        state.data = state.data.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
