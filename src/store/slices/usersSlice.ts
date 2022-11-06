import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";
import initialUsers from '../data/users.json';

const initialState = {
  users: initialUsers,
};

interface IUsersState {
    users: IUser[];
}

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

export const selectUsers = (state: { users: IUsersState }) => state.users;

export default usersSlice.reducer;
