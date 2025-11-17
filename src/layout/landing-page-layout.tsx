import React from "react";
import { Outlet } from "react-router-dom";
import LandingPageHeader from "../components/landing-page/landing-page-header";
import { LandingPageAIProvider } from "../context/AIAssistant/landingPageAIContext";

const LandingPageLayout: React.FC = () => {
  return (
    <LandingPageAIProvider>
      <main className="min-h-screen flex flex-col">
        <LandingPageHeader />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </LandingPageAIProvider>
  );
};

export default LandingPageLayout;