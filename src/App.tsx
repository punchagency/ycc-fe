import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/landing-page/home";

// Import layout components (optional)
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar (always visible) */}
        {/* <Navbar /> */}

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />

            {/* Future routes can go here */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>

        {/* Footer (always visible) */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;