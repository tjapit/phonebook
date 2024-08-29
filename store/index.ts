import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/features/counter/counterSlice";
import contactsListReducer from "@/store/features/contactsList/contactsListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contactsList: contactsListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
