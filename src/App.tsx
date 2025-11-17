import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Loading } from "./components/Loading";

// components
const LandingPageLayout = lazy(() => import("./layout/landing-page-layout"));

// main pages
const Home = lazy(() => import("./pages/landing-page/home")) ;
const VendorAndServices = lazy(() => import("./pages/landing-page/vendorservices/vendor-services"));


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route element={<LandingPageLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/vendor-services" element={<VendorAndServices />} />
            </Route>
          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;