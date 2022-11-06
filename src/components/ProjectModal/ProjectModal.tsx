import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import {
  closeProjectModal,
  createProject,
  selectProjects,
} from "../../store/slices/projectsSlice";
import { selectUsers } from "../../store/slices/usersSlice";

const ProjectModal = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [userId, setUserId] = useState("");

  const { isProjectModalOpen } = useSelector(selectProjects);
  const { users } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setProjectName(value);
  };

  const handleProjectDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setProjectDescription(value);
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setUserId(value);
  };

  const clearFields = () => {
    setProjectName("");
    setProjectDescription("");
    setUserId("");
  };

  const handleClose = () => {
    clearFields();
    dispatch(closeProjectModal());
  };

  const handleSave = () => {
    dispatch(
      createProject({
        name: projectName,
        description: projectDescription,
        ownerId: Number(userId),
      })
    );
    handleClose();
  };

  return (
    <div>
      <Dialog open={isProjectModalOpen} onClose={handleClose}>
        <DialogTitle>Create a new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new project, please fill the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={handleProjectNameChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Project description"
            fullWidth
            variant="standard"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          />
          <InputLabel id="select-user-label" sx={{ marginTop: 4 }}>
            User
          </InputLabel>
          <Select
            labelId="select-user-label"
            id="select-user"
            label="User"
            fullWidth
            value={userId}
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <MenuItem value={user.id}>
                {user.name} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
