import { createSlice } from "@reduxjs/toolkit";

import { IProject } from "../../interfaces";
import { getNextUniqueIncrementalId } from "../../utils/id";
import initialProjects from "../data/projects.json";

const initialState = {
  projects: initialProjects,
  visibleProjects: initialProjects,
  searchTerm: "",
  isProjectModalOpen: false,
  editingProjectId: null,
};

interface IProjectsState {
  projects: IProject[];
  visibleProjects: IProject[];
  searchTerm: string;
  isProjectModalOpen: boolean;
  editingProjectId: number | null;
}

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateVisibleProjects: (state, action) => {
      state.visibleProjects = action.payload;
    },
    createProject: (state, action) => {
      state.projects.push({
        id: getNextUniqueIncrementalId(state.projects),
        ...action.payload,
      });
      state.visibleProjects = state.projects;
      state.searchTerm = "";
    },
    editProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      state.projects[index] = action.payload;
      state.visibleProjects = state.projects;
      state.searchTerm = "";
    },
    openProjectModal: (state, action) => {
      state.isProjectModalOpen = true;
      state.editingProjectId = action.payload;
    },
    closeProjectModal: (state) => {
      state.isProjectModalOpen = false;
    },
  },
});

export const {
  updateSearchTerm,
  updateVisibleProjects,
  createProject,
  editProject,
  openProjectModal,
  closeProjectModal,
} = projectsSlice.actions;

export const selectProjects = (state: { projects: IProjectsState }) =>
  state.projects;

export default projectsSlice.reducer;
