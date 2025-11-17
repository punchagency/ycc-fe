import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Loading } from "./components/Loading";
const LandingPageLayout = lazy(() => import("./layout/landing-page-layout"));

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
            <Route element={<LandingPageLayout />}>
              <Route path="/" element={<Home />} />

            </Route>
            {/* Landing Page */}

            
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