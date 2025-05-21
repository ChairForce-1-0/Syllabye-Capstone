/*---+---+---+--Start of Signup.jsx Block---+---+---+--*/

/**
 * Signup.jsx - User Registration Page Component
 * This component:
 * - Handles new user registration
 * - Validates password complexity
 * - Supports role selection (student/teacher)
 * - Implements Google OAuth signup
 */

import React, { useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword, provider, signInWithRedirect, getRedirectResult, db, doc, setDoc } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import "./../components/Auth.css";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Signup - Registration Page
 * @returns {JSX.Element} - Complete signup form with validation
 */
const Signup = () => {
  // State management
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Password validation rules
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;
  const isPasswordValid = hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;

  /*---+---+---+--Start of Effects Block---+---+---+--*/
  /**
   * useEffect - OAuth Redirect Handling
   * Processes Google sign-in result and creates user record
   */
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;

          // Create Firestore user document
          await setDoc(doc(db, "users", user.uid), {
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ")[1] || "",
            email: user.email,
            role: isStudent ? "student" : "teacher",
          });

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
  }, [isStudent, navigate]);
  /*---+---+---+--End of Effects Block---+---+---+--*/

  /*---+---+---+--Start of Handler Functions Block---+---+---+--*/
  /**
   * handleSubmit - Email/Password Registration
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Password must meet all requirements.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role: isStudent ? "student" : "teacher",
      });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account exists - try logging in!");
      } else {
        setError(err.message);
      }
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
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {/* Role Selection */}
          <div className="role-selection">
            <button
              className={isStudent ? "active" : ""}
              onClick={() => setIsStudent(true)}
              type="button"
            >
              Student
            </button>
            <button
              className={!isStudent ? "active" : ""}
              onClick={() => setIsStudent(false)}
              type="button"
            >
              Teacher
            </button>
          </div>

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

          {/* Password Requirements */}
          <div className="password-rules">
            <p className={hasUppercase ? "valid" : "invalid"}>Uppercase letter</p>
            <p className={hasLowercase ? "valid" : "invalid"}>Lowercase letter</p>
            <p className={hasSpecialChar ? "valid" : "invalid"}>Special character</p>
            <p className={isLongEnough ? "valid" : "invalid"}>8+ characters</p>
          </div>

          <button type="submit" disabled={!isPasswordValid}>
            Continue
          </button>
        </form>

        {/* Alternative Signup Options */}
        <p>
          <Link to="#" onClick={handleGoogleSignIn}>
            Sign up with Google
          </Link>
        </p>
        <p>
          Have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
  /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Signup;
/*---+---+---+--End of Signup.jsx Block---+---+---+--*/