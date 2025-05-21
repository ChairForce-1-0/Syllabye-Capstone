/*---+---+---+--Start of Footer.jsx Block---+---+---+--*/

/**
 * Footer.jsx - The Application Footer Component
 * This component provides:
 * - Consistent footer across all pages
 * - University homepage link
 * - Project repository link
 * - Responsive layout
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React from "react";                     // Core React functionality
import "./Footer.css";                         // Component-specific styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const Footer = () => {
    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <footer id="footer" className="site-footer">
            <div className="container">
                <div className="footer-row">
                    {/*---+---+---+--Start of Left Footer Block---+---+---+--*/}
                    <div className="footer-left">
                        Lewis University <a 
                            href="https://www.lewisu.edu/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Homepage
                        </a>
                    </div>
                    {/*---+---+---+--End of Left Footer Block---+---+---+--*/}

                    {/*---+---+---+--Start of Right Footer Block---+---+---+--*/}
                    <div className="footer-right">
                        Github <a 
                            href="https://github.com/IrvingFSanchez" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Repository
                        </a>
                    </div>
                    {/*---+---+---+--End of Right Footer Block---+---+---+--*/}
                </div>
            </div>
        </footer>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default Footer;  // Makes component available to App.jsx

/*---+---+---+--End of Footer.jsx Block---+---+---+--*/