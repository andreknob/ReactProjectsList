import { useState } from "react";
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

import withSnackbar from "../../hocs/withSnackbar";
import { IWithSnackbarProps } from "../../hocs/withSnackbar/withSnackbar";
import {
  closeUserModal,
  createUser,
  selectUsers,
} from "../../store/slices/usersSlice";

const UserModal = ({ onSnackbarMessageChange }: IWithSnackbarProps) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { isUserModalOpen, users } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  };

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUserEmail(value);
  };

  const clearFields = () => {
    setUserName("");
    setUserEmail("");
  };

  const handleClose = () => {
    dispatch(closeUserModal());
    clearFields();
  };

  const handleSave = () => {
    const user = {
      name: userName,
      email: userEmail,
    };

    if (!userName || !userEmail) {
      return onSnackbarMessageChange("All field are required");
    }

    const hasEmailConflict = users.some((item) => item.email === userEmail);

    if (hasEmailConflict) {
      return onSnackbarMessageChange("This email is already in use");
    }

    dispatch(createUser(user));

    handleClose();
  };

  return (
    <div>
      <Dialog open={isUserModalOpen} onClose={handleClose}>
        <DialogTitle>Create a new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new user, please fill the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            fullWidth
            variant="standard"
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="User email"
            fullWidth
            variant="standard"
            value={userEmail}
            onChange={handleUserEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withSnackbar(UserModal);
