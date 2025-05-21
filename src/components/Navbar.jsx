/*---+---+---+--Start of Navbar.jsx Block---+---+---+--*/

/**
 * Navbar.jsx - The Main Navigation Bar Component
 * This component provides:
 * - Top navigation bar with logo
 * - Responsive hamburger menu toggle
 * - Mobile-friendly design
 * - Clean, minimal interface
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState } from "react";   // Core React functionality
import "./Navbar.css";                    // Component-specific styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const Navbar = () => {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [isOpen, setIsOpen] = useState(false);  // Tracks mobile menu state
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Menu Control Block---+---+---+--*/
    const toggleMenu = () => {
        setIsOpen(!isOpen);  // Toggles mobile menu visibility
    };
    /*---+---+---+--End of Menu Control Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/*---+---+---+--Start of Logo Block---+---+---+--*/}
                <a href="/" className="logo">SYLLABYE</a>
                {/*---+---+---+--End of Logo Block---+---+---+--*/}

                {/*---+---+---+--Start of Mobile Menu Block---+---+---+--*/}
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? "fa fa-times" : "fa fa-bars"}></i>
                </div>
                {/*---+---+---+--End of Mobile Menu Block---+---+---+--*/}
            </div>
        </nav>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default Navbar;  // Makes component available to App.jsx

/*---+---+---+--End of Navbar.jsx Block---+---+---+--*/