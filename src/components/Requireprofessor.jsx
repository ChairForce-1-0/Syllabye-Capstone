/*---+---+---+--Start of RequireProfessor.jsx Block---+---+---+--*/

/**
 * RequireProfessor.jsx - The Professor Role Gatekeeper Component
 * This component provides:
 * - Role-based access control for professor-only routes
 * - Seamless Firebase authentication integration
 * - Automatic redirection for unauthorized users
 * - Loading state management
 * - Error handling for role verification
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import { useEffect, useState } from "react";           // React hooks
import { auth, db } from "../Firebase";               // Firebase services
import { doc, getDoc } from "firebase/firestore";     // Firestore operations
import { onAuthStateChanged } from "firebase/auth";   // Auth state observer
import { Navigate } from "react-router-dom";          // Navigation component
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const RequireProfessor = ({ children }) => {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [userRole, setUserRole] = useState(null);   // Tracks user's role state
    const [loading, setLoading] = useState(true);     // Manages loading state
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Auth Verification Block---+---+---+--*/
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUserRole(null);            // No authenticated user
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const role = userSnap.data().role;
                    setUserRole(role === "teacher" ? "teacher" : "unauthorized");
                } else {
                    setUserRole("unauthorized");  // User doc doesn't exist
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setUserRole("unauthorized");  // Fallback on error
            } finally {
                setLoading(false);  // Always disable loading
            }
        });

        return () => unsubscribe();  // Cleanup auth listener
    }, []);
    /*---+---+---+--End of Auth Verification Block---+---+---+--*/


    /*---+---+---+--Start of Loading State Block---+---+---+--*/
    if (loading) {
        return (
            <div className="loading-indicator" aria-live="polite" aria-busy="true">
                <p>Loading...</p>  {/* Basic loading indicator */}
            </div>
        );
    }
    /*---+---+---+--End of Loading State Block---+---+---+--*/


    /*---+---+---+--Start of Access Control Block---+---+---+--*/
    return userRole === "teacher" ? (
        children  // Render protected content
    ) : (
        <Navigate to="/browse" replace />  // Redirect unauthorized users
    );
    /*---+---+---+--End of Access Control Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default RequireProfessor;  // Makes component available to routing system

/*---+---+---+--End of RequireProfessor.jsx Block---+---+---+--*/