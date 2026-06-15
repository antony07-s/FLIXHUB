import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

function MoviesRow({ title, movies, genreId }) {
  const navigate = useNavigate();
  return (
    <div className="px-8 mt-8">
      {/* Title + See All button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={() => navigate("/movies", { state: { title, movies, genreId } })}
          className="text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-white px-3 py-1 rounded-full transition"
        >
          See All →
        </button> 
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default MoviesRow;
