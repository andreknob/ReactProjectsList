import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, TextField, Typography } from "@mui/material";

import ProjectModal from "../../components/ProjectModal";
import ProjectsTable from "../../components/ProjectsTable";
import {
  openProjectModal,
  selectProjects,
  updateSearchTerm,
  updateVisibleProjects,
} from "../../store/slices/projectsSlice";
import { findMatchingProjects } from "../../utils/stringMatching";

const ProjectsList = () => {
  const { projects, searchTerm } = useSelector(selectProjects);
  const dispatch = useDispatch();

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    dispatch(updateSearchTerm(value));

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value === "") {
      return dispatch(updateVisibleProjects(projects));
    }

    searchTimeoutRef.current = setTimeout(() => {
      const nextProjects = findMatchingProjects(projects, value);
      dispatch(updateVisibleProjects(nextProjects));
    }, 200);
  };

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h4" gutterBottom>
          Projects List
        </Typography>
        <TextField
          label="Project name or description"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button onClick={() => dispatch(openProjectModal(null))}>
          Add project
        </Button>
        <Button>Add user</Button>
      </Box>
      <ProjectsTable />
      <ProjectModal />
    </Box>
  );
};

export default ProjectsList;
