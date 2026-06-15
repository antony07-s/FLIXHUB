import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./Context/FavoritesContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FavoritesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FavoritesProvider>
  </AuthProvider>,
);
