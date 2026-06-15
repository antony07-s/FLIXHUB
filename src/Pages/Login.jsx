import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, googleLogin } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

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
    console.log(error);
  }
};

  const handleLogin = async (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    alert("Invalid Email or Password");
    return;
  }

  await saveUserToSheet(foundUser.email);

  login({ email: foundUser.email });

  navigate("/home");
};
  
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      // ✅ use unsplash instead of Netflix CDN
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-10 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white text-sm font-bold hover:bg-white/30 transition"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Logo */}
      <div className="absolute top-6 left-8 z-10">
        <h1 className="text-red-600 text-4xl font-bold">FLIXHUB</h1>
      </div>

      {/* Form */}
      <div
        className="relative z-10 p-10 rounded-lg w-full max-w-md mx-4"
        style={{ background: "var(--bg-form)" }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Sign In
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 mb-4 rounded text-base outline-none"
            style={{
              background: "var(--input-bg)",
              color: "var(--input-text)",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full p-4 mb-6 rounded text-base outline-none"
            style={{
              background: "var(--input-bg)",
              color: "var(--input-text)",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleLogin}
            className="w-full bg-red-600 p-4 rounded text-white font-bold text-lg hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-500" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-500" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black p-4 rounded font-bold hover:bg-gray-100 transition"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p
          className="text-center mt-6 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-red-500 cursor-pointer font-bold hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

