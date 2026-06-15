import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async () => {
  console.log("getMovies started");

  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/week`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    console.log("TMDB SUCCESS:", response.data);

    return response.data.results;
  } catch (error) {
    console.log("TMDB ERROR:", error);
    console.log("TMDB ERROR DATA:", error.response?.data);

    return [];
  }
};
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?append_to_response=credits,videos`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("MOVIE DETAILS ERROR:", error);
    return null;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ✅ fetch movies by category
export const getMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${category}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ✅ fetch actual TV shows
export const getTVShows = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/tv/week`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
//                                              ↑
//                                    default page 1
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`,
      //                                                                              ↑
      //                                                                    send page number
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return {
      movies: response.data.results,      // movies array
      totalPages: response.data.total_pages // total pages available
    };
  } catch (error) {
    console.log(error);
    return { movies: [], totalPages: 0 };
  }
};