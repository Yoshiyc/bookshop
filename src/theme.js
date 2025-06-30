// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A2E45", // Space cadet
    },
    secondary: {
      main: "#FFE49C", // Vanilla
    },
    background: {
      default: "#CAB787", // Ecru
      paper: "#958971",   // Beaver
    },
    text: {
      primary: "#2A2E45", // Space cadet
      secondary: "#605C5B", // Davy's gray
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
