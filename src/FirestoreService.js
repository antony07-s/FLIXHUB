import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";

// ✅ Save user to Firestore when they login
export const saveUserToFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // new user → create document
      await setDoc(userRef, {
        email: user.email,
        name: user.name || "",
        photo: user.photo || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        loginCount: 1,
      });
    } else {
      // existing user → update last login
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        loginCount: (userSnap.data().loginCount || 0) + 1,
      });
    }
  } catch (error) {
    console.log("Firestore save user error:", error);
  }
};

// ✅ Save favorites to Firestore
export const addFavoriteToFirestore = async (userEmail, movie) => {
  try {
    const favRef = doc(db, "favorites", userEmail);
    const favSnap = await getDoc(favRef);

    if (!favSnap.exists()) {
      // create new favorites document
      await setDoc(favRef, {
        movies: [movie]
      });
    } else {
      // add movie to existing favorites
      await updateDoc(favRef, {
        movies: arrayUnion(movie)
      });
    }
  } catch (error) {
    console.log("Firestore add favorite error:", error);
  }
};

// ✅ Remove favorite from Firestore
export const removeFavoriteFromFirestore = async (userEmail, movie) => {
  try {
    const favRef = doc(db, "favorites", userEmail);
    await updateDoc(favRef, {
      movies: arrayRemove(movie)
    });
  } catch (error) {
    console.log("Firestore remove favorite error:", error);
  }
};

// ✅ Get favorites from Firestore
export const getFavoritesFromFirestore = async (userEmail) => {
  try {
    const favRef = doc(db, "favorites", userEmail);
    const favSnap = await getDoc(favRef);

    if (favSnap.exists()) {
      return favSnap.data().movies || [];
    }
    return [];
  } catch (error) {
    console.log("Firestore get favorites error:", error);
    return [];
  }
};