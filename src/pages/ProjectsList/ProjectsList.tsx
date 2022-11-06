import { useState, useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ProjectsTable from "../../components/ProjectsTable";
import { findMatchingProjects } from "../../utils/stringMatching";
import { useSelector } from "react-redux";
import { selectProjects } from "../../store/slices/projectsSlice";

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { projects } = useSelector(selectProjects);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log(findMatchingProjects(projects, value));
    }, 200);
  };

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h4" gutterBottom>
          Projects List
        </Typography>
        <TextField
          label="Project"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button>Add project</Button>
        <Button>Add user</Button>
      </Box>
      <ProjectsTable />
    </Box>
  );
};

export default ProjectsList;
