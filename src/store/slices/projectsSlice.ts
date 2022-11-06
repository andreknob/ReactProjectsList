import { createSlice } from "@reduxjs/toolkit";

import { IProject } from "../../interfaces";
import initialProjects from "../data/projects.json";

const initialState = {
  projects: initialProjects,
  visibleProjects: initialProjects,
};

interface IProjectsState {
  projects: IProject[];
  visibleProjects: IProject[];
}

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    updateVisibleProjects: (state, action) => {
      state.visibleProjects = action.payload;
    },
  },
});

export const { updateVisibleProjects } = projectsSlice.actions;

export const selectProjects = (state: { projects: IProjectsState }) =>
  state.projects;

export default projectsSlice.reducer;
