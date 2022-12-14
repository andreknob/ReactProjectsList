import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, TextField, Typography } from "@mui/material";

import ProjectsTable from "../../components/ProjectsTable";
import withModals from "../../hocs/withModals";
import {
  openProjectModal,
  selectProjects,
  updateSearchTerm,
  updateVisibleProjects,
} from "../../store/slices/projectsSlice";
import { openUserModal } from "../../store/slices/usersSlice";
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
      <Typography sx={{ marginTop: 4 }} variant="h4" gutterBottom>
        Projects List
      </Typography>
      <Box sx={{ display: "flex", marginTop: 4, marginBottom: 4 }}>
        <TextField
          sx={{ flex: 1 }}
          label="Project name or description"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button
          sx={{ marginLeft: 4 }}
          onClick={() => dispatch(openProjectModal(null))}
        >
          Add project
        </Button>
        <Button
          sx={{ marginLeft: 4 }}
          onClick={() => dispatch(openUserModal())}
        >
          Add user
        </Button>
      </Box>
      <ProjectsTable />
    </Box>
  );
};

export default withModals(ProjectsList);
