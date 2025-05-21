/*---+---+---+--Start of Parallax.jsx Block---+---+---+--*/

/**
 * Parallax.jsx - The Parallax Effect Component
 * This component provides:
 * - Scrolling parallax effect with background image
 * - Centered call-to-action content
 * - Multi-language support
 * - Responsive design
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React from "react";                     // Core React functionality
import "./Parallax.css";                       // Component-specific styles
import studentBooks from "/src/assets/images/student-books.jpg";  // Background image
import { useTranslation } from "react-i18next";  // Internationalization
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const Parallax = () => {
    /*---+---+---+--Start of Translation Block---+---+---+--*/
    const { t } = useTranslation();  // Translation hook
    /*---+---+---+--End of Translation Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <section
            id="parallax"
            className="content-block parallax"
            style={{
                backgroundImage: `url(${studentBooks})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="container text-center">
                {/*---+---+---+--Start of Content Block---+---+---+--*/}
                <h1>
                    {t("parallax.heading")}  {/* Translated heading */}
                </h1>
                <a href="#" className="btn btn-o-white btn-lg">
                    {t("parallax.buttonText")}  {/* Translated button text */}
                </a>
                {/*---+---+---+--End of Content Block---+---+---+--*/}
            </div>
        </section>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default Parallax;  // Makes component available to parent components

/*---+---+---+--End of Parallax.jsx Block---+---+---+--*/