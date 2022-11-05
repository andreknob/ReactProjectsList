import { configureStore } from "@reduxjs/toolkit";

import projectsReducer from "./slices/projectsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    users: usersReducer,
  },
});
