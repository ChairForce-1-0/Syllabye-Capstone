import React, { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, provider, signInWithRedirect, getRedirectResult } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import "./../components/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Handle redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;

          // Navigate to the home page after successful login
          navigate("/");
        }
      } catch (error) {
        if (error.code !== "auth/no-current-user") {
          console.error("Error handling redirect result: ", error);
          setError(error.message);
        }
      }
    };

    handleRedirectResult();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError("Error resetting password. Please check the email address.");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithRedirect(auth, provider); // Use redirect instead of popup
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit">Continue</button>
        </form>
        <p><Link to="#" onClick={handleGoogleSignIn}>Login with Google</Link></p>
        <p>Forgot your password?  <Link to="#" onClick={handlePasswordReset} className="reset-password-link">Reset it here</Link></p>
        <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
      </div>
    </div>
  );
};

export default Login;