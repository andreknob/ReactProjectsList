import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../interfaces";
import { getNextUniqueIncrementalId } from "../../utils/id";
import initialUsers from "../data/users.json";

const initialState = {
  users: initialUsers,
  isUserModalOpen: false,
};

interface IUsersState {
  users: IUser[];
  isUserModalOpen: boolean;
}

export const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.users.push({
        id: getNextUniqueIncrementalId(state.users),
        ...action.payload,
      });
    },
    openUserModal: (state) => {
      state.isUserModalOpen = true;
    },
    closeUserModal: (state) => {
      state.isUserModalOpen = false;
    },
  },
});

export const { createUser, openUserModal, closeUserModal } = usersSlice.actions;

export const selectUsers = (state: { users: IUsersState }) => state.users;

export default usersSlice.reducer;
