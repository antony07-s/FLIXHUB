import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FavoritesContext } from "../Context/FavoritesContext";
import { Link, useNavigate } from "react-router-dom";
import { getMovies } from "../Services/MovieService";
import { getMoviesByCategory, getTVShows } from "../Services/MovieService";

const Navbar = () => {
  const { favorites } = useContext(FavoritesContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // ✅ mobile menu

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Movies → popular movies
  const handleMoviesClick = async () => {
    const movies = await getMoviesByCategory("popular");
    navigate("/movies", { state: { title: "All Movies", movies } });
  };

  // TV Shows → actual tv shows
  const handleTVClick = async () => {
    const shows = await getTVShows();
    navigate("/movies", { state: { title: "TV Shows", movies: shows } });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/home")}
          className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer"
        >
          FlixHub
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/home">Home</Link>
          </li>
          <li
            className="hover:text-gray-300 cursor-pointer"
            onClick={handleTVClick}
          >
            TV Shows
          </li>
          <li
            className="hover:text-gray-300 cursor-pointer"
            onClick={handleMoviesClick}
          >
            Movies
          </li>
        </ul>

        {/* Right Side */}
        <div className="relative flex items-center gap-4">
          {/* Profile Avatar */}
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-full cursor-pointer overflow-hidden"
          >
            {user?.photo ? (
              // Google user → show profile photo
              <img
                src={user.photo}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              // Manual login → show first letter
              <div className="w-full h-full bg-red-600 flex items-center justify-center font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-12 bg-black border border-gray-700 rounded w-48 py-2 z-50">
              <p className="px-4 py-2 text-gray-400 text-sm border-b border-gray-700">
                {user?.email}
              </p>
              <button
                onClick={() => {
                  navigate("/favorites");
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm"
              >
                My List ({favorites.length})
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden text-2xl"
          >
            {showMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-16 left-0 right-0 bg-black z-40 flex flex-col px-6 py-4 gap-4 md:hidden">
          <Link
            to="/home"
            onClick={() => setShowMenu(false)}
            className="text-white hover:text-gray-300 py-2 border-b border-gray-800"
          >
            Home
          </Link>
          <p
            onClick={handleTVClick}
            className="text-white hover:text-gray-300 py-2 border-b border-gray-800 cursor-pointer"
          >
            TV Shows
          </p>
          <p
            onClick={handleMoviesClick}
            className="text-white hover:text-gray-300 py-2 border-b border-gray-800 cursor-pointer"
          >
            Movies
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
