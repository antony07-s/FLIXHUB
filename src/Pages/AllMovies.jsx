import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import MovieCard from "../Components/MovieCard";
import { getMoviesByGenre } from "../Services/MovieService";
import ShimmerCard from "../Components/ShimmerCard";

function AllMovies() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, genreId } = location.state || {};

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  if (!location.state) {
    navigate("/home");
    return null;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      if (genreId) {
        const data = await getMoviesByGenre(genreId, currentPage);
        setMovies(data.movies);
        setTotalPages(Math.min(data.totalPages, 500));
      } else {
        setMovies(location.state?.movies || []);
        setTotalPages(1);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [genreId, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative h-[28vh] md:h-[35vh]  via-gray-900 to-black flex items-end pb-6 px-6 md:px-10 mb-6 pt-16">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/30 transition flex items-center gap-2 w-fit"
          >
            ← Back
          </button>

          {/* Title and info */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide">
                {title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                🎬 {movies.length} movies
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="px-4 md:px-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
              <ShimmerCard key={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isGrid={true} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                currentPage === 1
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-red-600 cursor-pointer"
              }`}
            >
              ← Prev
            </button>

            {/* First page */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-4 py-2 rounded-full text-sm bg-gray-700 hover:bg-red-600 transition"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  currentPage === page
                    ? "bg-red-600 text-white scale-110"
                    : "bg-gray-700 hover:bg-red-600"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                  <span className="text-gray-500">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-4 py-2 rounded-full text-sm bg-gray-700 hover:bg-red-600 transition"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                currentPage === totalPages
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-red-600 cursor-pointer"
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center text-gray-500 text-sm mt-4 mb-8">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>
    </div>
  );
}

export default AllMovies;