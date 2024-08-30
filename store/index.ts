import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/features/counter/counterSlice";
import contactsReducer from "@/store/features/contacts/contactsSlice";
import selectedContactReducer from "./features/contacts/selectedContactSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contacts: contactsReducer,
    selectedContact: selectedContactReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
