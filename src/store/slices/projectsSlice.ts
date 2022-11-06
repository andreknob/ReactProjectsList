import { createSlice } from "@reduxjs/toolkit";

import { IProject } from "../../interfaces";
import { getNextUniqueIncrementalId } from "../../utils/id";
import initialProjects from "../data/projects.json";

const initialState = {
  projects: initialProjects,
  visibleProjects: initialProjects,
  isProjectModalOpen: false,
  editingProjectId: null,
};

interface IProjectsState {
  projects: IProject[];
  visibleProjects: IProject[];
  isProjectModalOpen: boolean;
  editingProjectId: number | null;
}

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    updateVisibleProjects: (state, action) => {
      state.visibleProjects = action.payload;
    },
    createProject: (state, action) => {
      state.projects.push({
        id: getNextUniqueIncrementalId(state.projects),
        ...action.payload,
      });
      state.visibleProjects = state.projects;
    },
    openProjectModal: (state, action) => {
      state.isProjectModalOpen = true;

      if (action.payload) {
        state.editingProjectId = action.payload;
      }
    },
    closeProjectModal: (state) => {
      state.isProjectModalOpen = false;
      state.editingProjectId = null;
    },
  },
});

export const {
  updateVisibleProjects,
  createProject,
  openProjectModal,
  closeProjectModal,
} = projectsSlice.actions;

export const selectProjects = (state: { projects: IProjectsState }) =>
  state.projects;

export default projectsSlice.reducer;
