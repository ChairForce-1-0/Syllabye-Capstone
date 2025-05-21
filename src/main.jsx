/*---+---+---+--Start of Main.jsx Block---+---+---+--*/

/**
 * main.jsx - The Application Entry Point
 * This file:
 * - Sets up the React application root
 * - Configures browser routing
 * - Imports global styles and internationalization
 */

import './i18n';           // Multi-language support
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';  // Page routing
import "bootstrap/dist/css/bootstrap.min.css";     // Bootstrap styles
import "@fortawesome/fontawesome-free/css/all.min.css";  // FontAwesome icons
import "./index.css";      // Global custom styles

/*---+---+---+--Start of App Initialization Block---+---+---+--*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* Enables page navigation */}
    <App />        {/* The main application component */}
  </BrowserRouter>
);
/*---+---+---+--End of App Initialization Block---+---+---+--*/

/*---+---+---+--End of Main.jsx Block---+---+---+--*/