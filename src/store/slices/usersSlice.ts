import { createSlice } from "@reduxjs/toolkit";
import initialUsers from '../data/users.json';

const initialState = {
  users: initialUsers,
};

type TUsersState = typeof initialState;

export const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    test: (state) => {
      return state;
    },
  },
});

export const {
test
} = usersSlice.actions;

export const selectUsers = (state: { users: TUsersState }) => state.users;

export default usersSlice.reducer;
