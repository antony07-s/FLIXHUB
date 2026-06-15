import { useState, useContext, useEffect} from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.email === email);
    if (exists) {
      alert("Email already exists!");
      return;
    }
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login({ email, name });
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e5f-4efd-9c6a-1956a2a16a61/web/IN-en-20250519-TRIFECTA-perspective_7f58b770-0e13-4286-8454-3c9b13c98aa5_large.jpg')`,
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
        <h1 className="text-red-600 text-4xl font-bold">NETFLIX</h1>
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
          Sign Up
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 mb-4 rounded text-base outline-none"
          style={{ background: "var(--input-bg)", color: "var(--input-text)" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded text-base outline-none"
          style={{ background: "var(--input-bg)", color: "var(--input-text)" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone (optional)"
          className="w-full p-4 mb-4 rounded text-base outline-none"
          style={{ background: "var(--input-bg)", color: "var(--input-text)" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full p-4 mb-6 rounded text-base outline-none"
          style={{ background: "var(--input-bg)", color: "var(--input-text)" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleSignup}
          className="w-full bg-red-600 p-4 rounded text-white font-bold text-lg hover:bg-red-700 transition"
        >
          Sign Up
        </button>

        <p
          className="text-center mt-6 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-red-500 cursor-pointer font-bold hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
