/*---+---+---+--Start of Home.jsx Block---+---+---+--*/

/**
 * Home.jsx - Main Landing Page Component
 * This page:
 * - Serves as the application's main entry point
 * - Composes key visual components (header, features, parallax effect)
 * - Maintains consistent footer across all pages
 */

import Header from "../components/Header";
import WhyUse from "../components/WhyUse";
import Parallax from "../components/Parallax";
import Footer from "../components/Footer";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Home - Landing Page Layout
 * @returns {JSX.Element} - Complete home page with all sections
 */
const Home = () => {
  return (
    <div>
      {/* Main Header with Navigation */}
      <Header />
      
      {/* Feature Showcase Section */}
      <WhyUse />
      
      {/* Visual Parallax Effect */}
      <Parallax />
      
      {/* Global Footer */}
      <Footer />
    </div>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Home;
/*---+---+---+--End of Home.jsx Block---+---+---+--*/