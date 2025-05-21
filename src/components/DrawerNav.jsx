/*---+---+---+--Start of DrawerNav.jsx Block---+---+---+--*/

/**
 * DrawerNav.jsx - The Side Navigation Drawer Component
 * This component provides:
 * - Collapsible right-side navigation drawer
 * - User authentication state management
 * - Personalized greeting for logged-in users
 * - Social media and contact links
 * - Multi-language support through react-i18next
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from "react";         // Core React functionality
import { Link } from "react-router-dom";                   // Client-side routing
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";  // Firebase auth
import { getFirestore, doc, getDoc } from "firebase/firestore";  // Firebase database
import { useTranslation } from "react-i18next";            // Internationalization
import "./AboutPage.css";                                  // Shared styles
import "./DrawerNav.css";                                  // Component-specific styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const DrawerNav = () => {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [isOpen, setIsOpen] = useState(false);          // Drawer open/close state
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // User authentication status
    const [userName, setUserName] = useState("");         // Logged-in user's name
    const { t } = useTranslation();                       // Translation hook
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Firebase Initialization Block---+---+---+--*/
    const auth = getAuth();       // Firebase authentication instance
    const db = getFirestore();    // Firebase database instance
    /*---+---+---+--End of Firebase Initialization Block---+---+---+--*/


    /*---+---+---+--Start of Auth State Management Block---+---+---+--*/
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().firstName);  // Set user's first name
                }
            } else {
                setIsLoggedIn(false);
                setUserName("");
            }
        });

        return () => unsubscribe();  // Cleanup subscription
    }, [auth, db]);
    /*---+---+---+--End of Auth State Management Block---+---+---+--*/


    /*---+---+---+--Start of Drawer Control Block---+---+---+--*/
    const toggleDrawer = () => {
        setIsOpen(!isOpen);  // Toggle drawer visibility
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toggleDrawer();  // Close drawer after logout
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };
    /*---+---+---+--End of Drawer Control Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <>
            {/*---+---+---+--Start of Toggle Button Block---+---+---+--*/}
            <div className="toggleDrawerIcon">
                <button className="toggleDrawer" onClick={toggleDrawer}>
                    <i className="fa fa-bars fa-2x"></i>  {/* Hamburger icon */}
                </button>
            </div>
            {/*---+---+---+--End of Toggle Button Block---+---+---+--*/}


            {/*---+---+---+--Start of Drawer Content Block---+---+---+--*/}
            <div className={`drawer-right ${isOpen ? "open" : ""}`}>
                {/* Close Button */}
                <div className="cross text-right">
                    <button className="toggleDrawer" onClick={toggleDrawer}>
                        <i className="fa fa-times-circle fa-2x"></i>
                    </button>
                </div>

                {/* Navigation Header */}
                <h2>{t("drawer.navigate")}</h2>

                {/*---+---+---+--Start of Navigation Links Block---+---+---+--*/}
                <nav>
                    <ul className="nav nav-pills nav-stacked">
                        {/* User Greeting (if logged in) */}
                        {isLoggedIn && (
                            <li className="nav-item user-greeting">
                                <span>{t("drawer.hello")}, {userName}!</span>
                            </li>
                        )}

                        {/* Main Navigation Links */}
                        <li><Link to="/" onClick={toggleDrawer}><i className="fa fa-home"></i> <span>{t("drawer.home")}</span></Link></li>
                        <li><Link to="/dashboard" onClick={toggleDrawer}><i className="fa fa-gear"></i> <span>{t("drawer.dashboard")}</span></Link></li>
                        <li><Link to="/create" onClick={toggleDrawer}><i className="fa fa-gear"></i> <span>{t("drawer.create")}</span></Link></li>
                        <li><Link to="/browse" onClick={toggleDrawer}><i className="fa fa-heart"></i> <span>{t("drawer.browse")}</span></Link></li>
                        <li><Link to="/about" onClick={toggleDrawer}><i className="fa fa-bookmark"></i> <span>{t("drawer.about")}</span></Link></li>
                        <li><Link to="/contact" onClick={toggleDrawer}><i className="fa fa-phone-square"></i> <span>{t("drawer.contact")}</span></Link></li>

                        {/* Conditional Login/Logout Link */}
                        <li>
                            {isLoggedIn ? (
                                <Link to="#" onClick={handleLogout}>
                                    <i className="fa fa-tasks"></i> <span>{t("drawer.logout")}</span>
                                </Link>
                            ) : (
                                <Link to="/login" onClick={toggleDrawer}>
                                    <i className="fa fa-tasks"></i> <span>{t("drawer.login")}</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
                {/*---+---+---+--End of Navigation Links Block---+---+---+--*/}

                {/*---+---+---+--Start of Social Links Block---+---+---+--*/}
                <div className="social">
                    <h2>{t("drawer.social")}</h2>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/lewisuniversity/?hl=en" target="_blank" rel="noreferrer">
                                <i className="fab fa-instagram fa-3x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/ChairForce-1-0/Syllabye-Capstone" target="_blank" rel="noreferrer">
                                <i className="fab fa-github fa-3x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.lewisu.edu/" target="_blank" rel="noreferrer">
                                <i className="fa fa-globe fa-3x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:syllabyespt@gmail.com">
                                <i className="fa fa-envelope-square fa-3x"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                {/*---+---+---+--End of Social Links Block---+---+---+--*/}
            </div>
            {/*---+---+---+--End of Drawer Content Block---+---+---+--*/}
        </>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default DrawerNav;  // Makes component available to App.jsx

/*---+---+---+--End of DrawerNav.jsx Block---+---+---+--*/