import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../Services/MovieService";
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
//   const { favorites, setFavorites } = useContext(FavoritesContext);
const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie?.id);
  const [showMore, setShowMore] = useState(false);
  const [showTrailer, setshowTrailer] = useState(false);
  console.log("FAVORITES:", favorites);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);

        console.log("MOVIE DETAILS:", data);

        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <h1 className="text-white p-10">Loading...</h1>;
  }

  // format runtime → "2h 30m"
  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // format budget → "$200,000,000"
  const formatMoney = (amount) => {
    if (!amount) return "N/A";
    return "$" + amount.toLocaleString();
  };
  // ✅ find the trailer from videos
  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  // get top 6 cast members
  const cast = movie.credits?.cast?.slice(0, 6) || [];
  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 p-10 pt-40">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 px-4 py-2 rounded-full text-sm mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">{movie.title}</h1>

          <p className="mt-2 md:mt-4 text-yellow-400">⭐ {movie.vote_average}</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                if (trailer) {
                  setshowTrailer(true); // ✅ open trailer modal
                } else {
                  alert("Trailer not available!");
                }
              }}
              className="bg-white text-black px-4 md:px-6 py-2 rounded font-bold"
            >
              ▶ Play
            </button>
            <button
              onClick={() => {
                if (isFavorite) {
                  // remove
                //   setFavorites(favorites.filter((fav) => fav.id !== movie.id));
                removeFavorite(movie);
                } else {
                  // add
                //   setFavorites([...favorites, movie]);
                addFavorite(movie);
                }
              }}
             className={
  isFavorite
    ? "bg-green-600 px-4 md:px-6 py-2 rounded text-sm md:text-base"
    : "bg-red-600 px-4 md:px-6 py-2 rounded text-sm md:text-base"
}
            >
              {isFavorite ? " Added to Favorites" : "❤️ Add to Favorites"}
            </button>

            <button
             className="bg-gray-600 px-4 md:px-6 py-2 rounded font-bold text-sm md:text-base"
              onClick={() => setShowMore(true)}
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10">
  <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>

        <p className="max-w-4xl text-gray-300 leading-8">{movie.overview}</p>
      </div>

      {/* More Info Modal */}
      {showMore && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-10 max-w-2xl w-full mx-4 overflow-y-auto max-h-[80vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <button
                onClick={() => setShowMore(false)} // ✅ closes modal
                className="text-gray-400 text-2xl hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              {/* Runtime & Release */}
              <div className="flex gap-6 text-gray-300">
                <p>🕐 {formatRuntime(movie.runtime)}</p>
                <p>📅 {movie.release_date}</p>
                <p>⭐ {movie.vote_average}</p>
              </div>

              {/* Genres */}
              <div className="flex gap-2 flex-wrap">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-gray-300 leading-7">{movie.overview}</p>

              {/* Budget & Revenue */}
              <div className="flex gap-6 text-gray-300">
                <p>💰 Budget: {formatMoney(movie.budget)}</p>
                <p>🎯 Revenue: {formatMoney(movie.revenue)}</p>
              </div>

              {/* Cast */}
              <div>
                <h3 className="text-xl font-bold mb-3">Top Cast</h3>
                <div className="grid grid-cols-3 gap-4">
                  {cast.map((member) => (
                    <div key={member.id} className="text-center">
                      <img
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                            : "https://via.placeholder.com/200x200?text=No+Image"
                        }
                        alt={member.name}
                        className="rounded-lg w-full"
                      />
                      <p className="mt-2 font-bold text-sm">{member.name}</p>
                      <p className="text-gray-400 text-xs">
                        {member.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setshowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500"
            >
              ✕ Close
            </button>

            {/* YouTube Video */}
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
              title="Movie Trailer"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
