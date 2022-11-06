import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../interfaces";
import initialProjects from '../data/projects.json';

const initialState = {
  projects: initialProjects,
};

interface IProjectsState {
    projects: IProject[];
};

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

export const selectProjects = (state: { projects: IProjectsState }) => state.projects;

export default projectsSlice.reducer;
