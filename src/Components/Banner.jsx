import { useNavigate } from "react-router-dom";

function Banner({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div
      className="h-[80vh] bg-cover bg-center relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 p-10 pt-40 text-white">
       <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
  {movie.title}
</h1>

<p className="max-w-xl text-sm md:text-lg line-clamp-3 md:line-clamp-none">
  {movie.overview}
</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200"
          >
            ▶ Play
          </button>

          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-gray-600 px-6 py-2 rounded font-bold hover:bg-gray-700"
          >
            ℹ️ More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;