/*---+---+---+--Start of Login.jsx Block---+---+---+--*/

/**
 * Login.jsx - Authentication Page Component
 * This component:
 * - Handles email/password authentication
 * - Supports Google OAuth redirect flow
 * - Provides password reset functionality
 * - Implements "Remember Me" feature
 */

import React, { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, provider, signInWithRedirect, getRedirectResult } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import "./../components/Auth.css";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Login - Authentication Page
 * @returns {JSX.Element} - Complete login form with all auth options
 */
const Login = () => {
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  /*---+---+---+--Start of Effects Block---+---+---+--*/
  /**
   * useEffect - Initialization and Redirect Handling
   * Handles:
   * - Loading remembered email
   * - Processing OAuth redirect results
   */
  useEffect(() => {
    // Load remembered email if exists
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Handle OAuth redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          navigate("/");
        }
      } catch (error) {
        if (error.code !== "auth/no-current-user") {
          console.error("Redirect error:", error);
          setError(error.message);
        }
      }
    };

    handleRedirectResult();
  }, [navigate]);
  /*---+---+---+--End of Effects Block---+---+---+--*/

  /*---+---+---+--Start of Handler Functions Block---+---+---+--*/
  /**
   * handleSubmit - Email/Password Authentication
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Persist email if "Remember Me" is checked
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

  /**
   * handlePasswordReset - Password Recovery
   * @param {Event} e - Click event
   */
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent!");
    } catch (err) {
      setError("Error resetting password");
    }
  };

  /**
   * handleGoogleSignIn - Google OAuth Initiation
   * @param {Event} e - Click event
   */
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
    }
  };
  /*---+---+---+--End of Handler Functions Block---+---+---+--*/

  /*---+---+---+--Start of Render Block---+---+---+--*/
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        
        {/* Status Messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember Me</label>
          </div>

          <button type="submit">Continue</button>
        </form>

        {/* Alternative Auth Options */}
        <p><Link to="#" onClick={handleGoogleSignIn}>Login with Google</Link></p>
        <p>
          Forgot password?{" "}
          <Link to="#" onClick={handlePasswordReset} className="reset-link">
            Reset it here
          </Link>
        </p>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">Sign up now</Link>
        </p>
      </div>
    </div>
  );
  /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Login;
/*---+---+---+--End of Login.jsx Block---+---+---+--*/