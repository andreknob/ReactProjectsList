import { createSlice } from "@reduxjs/toolkit";
import initialProjects from '../data/projects.json';

const initialState = {
  projects: initialProjects,
};

type TProjectsState = typeof initialState;

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    test: (state) => {
      return state;
    },
  },
});

export const {
test
} = projectsSlice.actions;

export const selectProjects = (state: { projects: TProjectsState }) => state.projects;

export default projectsSlice.reducer;
