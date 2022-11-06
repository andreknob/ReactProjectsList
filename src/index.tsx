import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import { store } from "./store";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  spacing: 4,
});

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
