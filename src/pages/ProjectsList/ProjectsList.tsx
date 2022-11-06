import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ProjectsTable from "../../components/ProjectsTable";

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
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
