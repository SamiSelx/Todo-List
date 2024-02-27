import "./App.css";
import { useState } from "react";
import TodoList from "./componant/TodoList";
import { TodosContexts } from "./contexts/TodosContexts";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        // main: "#F02752",
        dark: "#002884",
        contrastText: "#fff",
      },
      label: {
        main: "#454555",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TodosContexts.Provider value={[]}>
        <TodoList />
      </TodosContexts.Provider>
    </ThemeProvider>
  );
}

export default App;
