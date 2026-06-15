import React, { createContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,  // ✅ only popup needed
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { saveUserToFirestore } from "../FirestoreService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToSheet = async (email) => {
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbzz3HScEwlZSmA31YW9Zkia4U8n6slz7PD2mppMmxEGWrwI6x6yQHhFcqO50eAo99M/exec",
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    );
  } catch (error) {
    console.log("Sheet Error:", error);
  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setuser({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
        });
      } else {
        const savedUser = localStorage.getItem("loggedInUser");
        setuser(savedUser ? JSON.parse(savedUser) : null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ popup method
 const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const firebaseUser = result.user;

    await saveUserToSheet(firebaseUser.email);

    const userData = {
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photo: firebaseUser.photoURL,
    };
await saveUserToFirestore(userData);
    setuser(userData);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userData)
    );
  } catch (error) {
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
    alert(error.message);
  }
};

 const login = async (userData) => {
  await saveUserToFirestore(userData);
  localStorage.setItem("loggedInUser", JSON.stringify(userData));
  setuser(userData);
};
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("loggedInUser");
    setuser(null);
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <h2 className="text-white text-2xl">Loading...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};