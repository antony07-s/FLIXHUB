import { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import { useNavigate } from "react-router-dom";

function Favourites() {
//   const { favorites, setFavorites } = useContext(FavoritesContext);
const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen p-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 px-4 py-2 rounded mb-6 hover:bg-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold mb-8">My List</h1>
        <p>No favorite movies yet.</p>
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen p-10">
        <button
            onClick={() => navigate(-1)}
            className="bg-teal-700 px-4 py-2 rounded mb-6"
          >
            ← Back
          </button>
      <h1 className="text-4xl font-bold mb-8">My list</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <button
              onClick={() => {
                // setFavorites(favorites.filter((fav) => fav.id !== movie.id));
                removeFavorite(movie);
              }}
              className="bg-red-600 px-3 py-1 rounded mt-2 hover:bg-red-700"
            >
              Remove
            </button>

            <h3 className="mt-2 font-bold">{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;


