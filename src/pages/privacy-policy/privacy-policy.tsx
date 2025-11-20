import React, { useEffect } from "react";
import PDFViewer from "../../components/PDFViewer";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-[80vw] max-w-[80vw] mx-auto p-5 font-sans md:w-[90vw] md:max-w-[90vw]">
      {/* Header */}
      <div className="text-center mb-8 py-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 md:text-3xl">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-lg md:text-base">
          Please review our privacy policy below
        </p>
      </div>

      {/* PDF Viewer */}
      <PDFViewer
        pdfUrl={`/Privacy-Policy.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&download=0`}
        title="Privacy Policy PDF"
        className="w-full rounded-xl shadow-md bg-white p-4"
      />

      {/* Footer */}
      <div className="text-center mt-10 py-6 border-t-2 border-gray-300">
        <p className="text-gray-600 text-base">
          For questions about this privacy policy, please contact us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
