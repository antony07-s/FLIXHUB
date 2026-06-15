import { useNavigate } from "react-router-dom";

function MovieCard({ movie, setselectedmovie }) {
    const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
   className="
    min-w-[140px] md:min-w-[170px] lg:min-w-[190px]
    cursor-pointer
    rounded-lg
    overflow-hidden
    shadow-lg
    hover:-translate-y-2
    hover:shadow-2xl
    transition-all
    duration-300
  "
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className=" w-full
    rounded-lg
    transition-transform
    duration-300"
      />

      <div className="mt-2">
        <h3 className="font-semibold text-sm">
          {movie.title}
        </h3>

        <p className="text-yellow-400 text-sm">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;