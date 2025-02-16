import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { db, doc, setDoc } from "../Firebase";
import "./../components/Auth.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;
  const isPasswordValid = hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;

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

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role: isStudent ? "student" : "teacher",
      });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("It looks like you already have an account, try logging in!");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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

          <div className="role-selection">
            <button
              className={isStudent ? "active" : ""}
              onClick={() => setIsStudent(true)}
            >
              Student
            </button>
            <button
              className={!isStudent ? "active" : ""}
              onClick={() => setIsStudent(false)}
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

          <div className="password-rules">
            <p className={hasUppercase ? "valid" : "invalid"}>At least one uppercase letter</p>
            <p className={hasLowercase ? "valid" : "invalid"}>At least one lowercase letter</p>
            <p className={hasSpecialChar ? "valid" : "invalid"}>At least one special character</p>
            <p className={isLongEnough ? "valid" : "invalid"}>At least 8 characters</p>
          </div>

          <button type="submit" disabled={!isPasswordValid}>Continue</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
