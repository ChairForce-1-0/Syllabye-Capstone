/*---+---+---+--Start of App.jsx Block---+---+---+--*/

/**
 * App.jsx - The Main Application Router
 * This is the core component that handles:
 * - Global navigation (Navbar/DrawerNav)
 * - Page routing for all application sections
 * - Import of global styles and libraries
 */

import { Routes, Route } from "react-router-dom";  // Page navigation system
import Navbar from "./components/Navbar";         // Main navigation bar
import DrawerNav from "./components/DrawerNav";   // Side navigation drawer
import Home from "./pages/Home";                  // Homepage
import Browse from "./pages/Browse";              // Syllabus browser
import Contact from "./pages/Contact";            // Contact page
import About from "./pages/About";                // About page
import Login from "./pages/Login";                // Login page
import Signup from "./pages/Signup";              // Signup page
import Dashboard from "./pages/Dashboard";        // User dashboard
import Create from "./pages/Create";              // Syllabus creator
import EditUpload from "./pages/EditUpload";      // Syllabus editor
import TestTailwind from "./pages/TestTailwind";  // Style testing page
import "bootstrap/dist/css/bootstrap.min.css";    // Bootstrap CSS
import './App.css';                               // Custom CSS

/*---+---+---+--Start of App Component Block---+---+---+--*/
const App = () => {
  return (
    <>
      {/* Global Navigation Elements */}
      <Navbar />   {/* Always visible top navigation */}
      <DrawerNav /> {/* Always accessible side navigation */}

      {/*---+---+---+--Start of Page Routing Block---+---+---+--*/}
      <div className="main-content">
        <Routes>  {/* Handles all page navigation */}
          <Route path="/" element={<Home />} />               {/* Home route */}
          <Route path="/about" element={<About />} />         {/* About page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* User dashboard */}
          <Route path="/login" element={<Login />} />         {/* Login page */}
          <Route path="/signup" element={<Signup />} />       {/* Signup page */}
          <Route path="/browse" element={<Browse />} />       {/* Syllabus browser */}
          <Route path="/contact" element={<Contact />} />     {/* Contact page */}
          <Route path="/create" element={<Create />} />       {/* Syllabus creator */}
          <Route path="/EditUpload" element={<EditUpload />} />{/* Syllabus editor */}
          <Route path="/devTestTailwind" element={<TestTailwind />} /> {/* Style testing */}
        </Routes>
      </div>
      {/*---+---+---+--End of Page Routing Block---+---+---+--*/}
    </>
  );
};
/*---+---+---+--End of App Component Block---+---+---+--*/

export default App;  // Makes the App component available to other files

/*---+---+---+--End of App.jsx Block---+---+---+--*/