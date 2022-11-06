import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import {
  closeProjectModal,
  selectProjects,
} from "../../store/slices/projectsSlice";

const ProjectModal = () => {
  const { isProjectModalOpen } = useSelector(selectProjects);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeProjectModal());
  };

  return (
    <div>
      <Dialog open={isProjectModalOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectModal;
