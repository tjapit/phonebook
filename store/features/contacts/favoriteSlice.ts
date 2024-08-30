import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contact } from "expo-contacts";

export interface FavoriteState {
  data: Contact | undefined;
}

const initialState: FavoriteState = {
  data: undefined,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Contact>) => {
      if (!state.data) {
        state.data = action.payload;
        return;
      }
      if (state.data.id !== action.payload.id) {
        state.data = action.payload;
        return;
      }
      state.data = undefined;
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
