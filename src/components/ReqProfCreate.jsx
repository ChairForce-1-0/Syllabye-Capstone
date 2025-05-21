/*---+---+---+--Start of ReqProfCreate.jsx Block---+---+---+--*/

/**
 * ReqProfCreate.jsx - The Role-Based Access Control Component
 * This component provides:
 * - Teacher role verification for protected routes
 * - Loading state management
 * - Unauthorized access handling
 * - Multi-language support
 * - Seamless integration with Firebase Auth/Firestore
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import { useEffect, useState } from "react";           // React hooks
import { auth, db } from "../Firebase";               // Firebase services
import { doc, getDoc } from "firebase/firestore";     // Firestore operations
import { onAuthStateChanged } from "firebase/auth";   // Auth state observer
import { Alert, Spinner, Container, Button } from "react-bootstrap";  // UI components
import { useNavigate } from "react-router-dom";       // Navigation
import { useTranslation } from "react-i18next";       // Internationalization
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const ReqProfCreate = ({ children }) => {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const navigate = useNavigate();                   // Navigation hook
    const [userRole, setUserRole] = useState(null);   // Tracks user's role
    const [loading, setLoading] = useState(true);     // Loading state
    const { t } = useTranslation();                   // Translation hook
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Auth State Block---+---+---+--*/
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUserRole("unauthorized");
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().role === "teacher") {
                    setUserRole("teacher");  // Authorized teacher
                } else {
                    setUserRole("unauthorized");  // Unauthorized role
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setUserRole("unauthorized");  // Fallback to unauthorized
            } finally {
                setLoading(false);  // Always disable loading
            }
        });

        return () => unsubscribe();  // Cleanup subscription
    }, []);
    /*---+---+---+--End of Auth State Block---+---+---+--*/


    /*---+---+---+--Start of Loading State Block---+---+---+--*/
    if (loading) {
        return (
            <Container 
                className="d-flex justify-content-center align-items-center" 
                style={{ minHeight: "50vh" }}
                aria-live="polite"
                aria-busy="true"
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{t("reqProf.loading")}</span>
                </Spinner>
            </Container>
        );
    }
    /*---+---+---+--End of Loading State Block---+---+---+--*/


    /*---+---+---+--Start of Unauthorized Block---+---+---+--*/
    if (userRole !== "teacher") {
        return (
            <Container className="mt-4">
                <Alert variant="danger" dismissible>
                    <Alert.Heading>{t("reqProf.accessDenied")}</Alert.Heading>
                    <p>{t("reqProf.errorMessage")}</p>
                    <Button 
                        onClick={() => navigate("/Contact")} 
                        variant="dark"
                        aria-label={t("reqProf.contactAriaLabel")}
                    >
                        {t("reqProf.contactButton")}
                    </Button>
                </Alert>
            </Container>
        );
    }
    /*---+---+---+--End of Unauthorized Block---+---+---+--*/


    /*---+---+---+--Start of Authorized Block---+---+---+--*/
    return <>{children}</>;  // Render protected content
    /*---+---+---+--End of Authorized Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default ReqProfCreate;  // Makes component available to routing system

/*---+---+---+--End of ReqProfCreate.jsx Block---+---+---+--*/