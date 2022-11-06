import { ComponentType, forwardRef, useState } from "react";

import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface IWithSnackbarProps {
  onSnackbarMessageChange: (message: string) => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function withSnackbar<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<IWithSnackbarProps>
) {
  return (hocProps: T) => {
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarMessageChange = (message: string) => {
      setSnackbarMessage(message);
    };

    return (
      <>
        <Component
          {...hocProps}
          onSnackbarMessageChange={handleSnackbarMessageChange}
        />
        ;
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={4000}
          onClose={() => setSnackbarMessage("")}
        >
          <Alert
            onClose={() => setSnackbarMessage("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  };
}

export default withSnackbar;
