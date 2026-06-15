import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./Pages/MovieDetails";
import Favorites from "./Pages/Favourites";
import NotFound from "./Components/NotFound";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoutes from "./Context/ProtectedRoutes";
import AllMovies from "./Pages/AllMovies"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoutes>
              <MovieDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoutes>
              <Favorites />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoutes>
              <AllMovies />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
