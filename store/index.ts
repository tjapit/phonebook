import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/features/counter/counterSlice";
import contactsReducer from "@/store/features/contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contactsList: contactsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
