/*---+---+---+--Start of About.jsx Block---+---+---+--*/

/**
 * About.jsx - About Page Layout Component
 * This page:
 * - Composes the main about page sections
 * - Includes team information, services, and tech stack
 * - Renders consistent footer across all pages
 */

import AboutPage from "../components/AboutPage";
import TechStack from "../components/TechStack";
import Services from "../components/Services";
import Footer from "../components/Footer";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * About - Page Layout Component
 * @returns {JSX.Element} - Complete about page with all sections
 */
const About = () => {
  return (
    <div> 
      <AboutPage />  {/* TeamCarousel is now INSIDE AboutPage */}
      <Services />
      <TechStack />
      <Footer />
    </div>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default About;
/*---+---+---+--End of About.jsx Block---+---+---+--*/