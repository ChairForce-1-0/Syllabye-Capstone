/*---+---+---+--Start of UserNameDisplay.jsx Block---+---+---+--*/

/**
 * UserNameDisplay.jsx - User Greeting Component
 * This component:
 * - Displays a personalized welcome message with the user's name
 * - Handles authentication state changes
 * - Retrieves user data from Firestore
 * - Shows loading state during data fetch
 * - Provides fallback for guests and error cases
 */

import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./UserNameDisplay.css";

/*---+---+---+--Start of Helper Functions Block---+---+---+--*/
/**
 * capitalize - String Formatting Utility
 * @param {string} str - Input string to capitalize
 * @returns {string} - Capitalized string or empty string if input is falsy
 */
const capitalize = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
};
/*---+---+---+--End of Helper Functions Block---+---+---+--*/


/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * UserNameDisplay - Personalized Greeting Component
 * @returns {JSX.Element} - Welcome message with user's name or fallback text
 */
const UserNameDisplay = () => {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);

  /*---+---+---+--Start of Auth Effect Block---+---+---+--*/
  /**
   * useEffect - Authentication and Data Fetching
   * Handles:
   * - Authentication state changes
   * - Firestore user data retrieval
   * - Loading state management
   * - Error handling
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user document from Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const firstName = userSnap.data().firstName || "Guest";
            setFirstName(capitalize(firstName));
          } else {
            setFirstName("Guest");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          setFirstName("Error fetching name");
        }
      } else {
        setFirstName("Guest");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  /*---+---+---+--End of Auth Effect Block---+---+---+--*/

  // Loading state
  if (loading) return <div className="centered-text">Loading user info...</div>;

  // Render welcome message
  return <div className="centered-text">Welcome, {firstName}!</div>;
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default UserNameDisplay;
/*---+---+---+--End of UserNameDisplay.jsx Block---+---+---+--*/