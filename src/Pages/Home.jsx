import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import MoviesRow from "../Components/MoviesRow";
import { useState, useEffect } from "react";
import {
  getMovies,
  searchMovies,
  getMoviesByGenre,
} from "../Services/MovieService"; // ✅ getMoviesByGenre
import Footer from "../Components/Footer";
import ShimmerRow from "../Components/ShimmerRow";
import ShimmerBanner from "../Components/ShimmerBanner";

const Home = () => {
  // ✅ all states
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [crime, setCrime] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ✅ fetch all genres at same time
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [
          trendingData,
          actionData,
          comedyData,
          crimeData,
          horrorData,
          romanceData,
          scifiData,
          thrillerData,
        ] = await Promise.all([
          getMovies(),
          getMoviesByGenre(28), // action
          getMoviesByGenre(35), // comedy
          getMoviesByGenre(80), // crime
          getMoviesByGenre(27), // horror
          getMoviesByGenre(10749), // romance
          getMoviesByGenre(878), // scifi
          getMoviesByGenre(53), // thriller
        ]);

        setTrending(trendingData);
        setAction(actionData.movies); // ✅ .movies because
        setComedy(comedyData.movies); // getMoviesByGenre
        setCrime(crimeData.movies); // returns
        setHorror(horrorData.movies); // { movies, totalPages }
        setRomance(romanceData.movies);
        setScifi(scifiData.movies);
        setThriller(thrillerData.movies);
      } catch (error) {
        console.log("HOME ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  // ✅ search
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        return;
      }
      const data = await searchMovies(debouncedSearch);
      setSearchResults(data);
    };
    fetchSearchResults();
  }, [debouncedSearch]);

  // ✅ debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen pt-16">
        <Navbar />
        <ShimmerBanner />
        <ShimmerRow />
        <ShimmerRow />
        <ShimmerRow />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-16">
      <Navbar />
      <Banner movie={trending[0]} />

      {/* Search */}
      <div className="px-8 mt-6">
        <input
          type="text"
          placeholder="🔍 Search movies..."
          className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500 w-64"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>

      {/* Search Results or Categories */}
      {searchResults.length > 0 ? (
        <MoviesRow title="Search Results" movies={searchResults} />
      ) : (
        <>
          <MoviesRow title="Trending Now" movies={trending} genreId={null} />
          <MoviesRow title="Action" movies={action} genreId={28} />
          <MoviesRow title="Comedy" movies={comedy} genreId={35} />
          <MoviesRow title="Crime" movies={crime} genreId={80} />
          <MoviesRow title="Horror" movies={horror} genreId={27} />
          <MoviesRow title="Romance" movies={romance} genreId={10749} />
          <MoviesRow title="Sci-Fi" movies={scifi} genreId={878} />
          <MoviesRow title="Thriller" movies={thriller} genreId={53} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
