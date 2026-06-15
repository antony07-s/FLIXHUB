import { useState, createContext, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  addFavoriteToFirestore,
  removeFavoriteFromFirestore,
  getFavoritesFromFirestore,
} from "../FirestoreService"

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  // ✅ load favorites from Firestore when user logs in
  useEffect(() => {
    const loadFavorites = async () => {
      if (user?.email) {
        const movies = await getFavoritesFromFirestore(user.email);
        setFavorites(movies);
      } else {
        setFavorites([]);
      }
    };
    loadFavorites();
  }, [user]);

  // ✅ add to favorites
  const addFavorite = async (movie) => {
    setFavorites([...favorites, movie]); // update UI immediately
    if (user?.email) {
      await addFavoriteToFirestore(user.email, movie);
    }
  };

  // ✅ remove from favorites
  const removeFavorite = async (movie) => {
    setFavorites(favorites.filter((f) => f.id !== movie.id));
    if (user?.email) {
      await removeFavoriteFromFirestore(user.email, movie);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};