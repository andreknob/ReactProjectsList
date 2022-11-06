import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
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
  );
};

export default ProjectsList;
