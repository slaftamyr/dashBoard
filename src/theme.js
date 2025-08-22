import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9E9A91",
      contrastText: "#1f1f1f",
    },
    secondary: {
      main: "#F1D5E5",
      contrastText: "#3a3a3a",
    },
    background: {
      default: "#F5F1E8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E2C29",
      secondary: "#6E6B67",
    },
    divider: "rgba(0,0,0,0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "box-shadow 200ms ease, transform 200ms ease",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
