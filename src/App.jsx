import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import DrawerNav from "./components/DrawerNav"; // Import DrawerNav
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Navbar /> {/* Navbar is always visible */}
      <DrawerNav /> {/* DrawerNav is always visible */}

      <div className="main-content">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer /> {/* Footer is always visible */}
    </>
  );
};

export default App;
