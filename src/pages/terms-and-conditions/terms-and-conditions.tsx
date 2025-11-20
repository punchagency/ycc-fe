import React, { useEffect } from "react";
import PDFViewer from "../../components/PDFViewer";

const TermsAndConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="
        w-[80vw] max-w-[80vw] mx-auto p-5 
        font-sans
        md:w-[90vw] md:max-w-[90vw]
        sm:w-full sm:max-w-full sm:px-4
      "
    >
      {/* Header */}
      <div
        className="
          text-center mb-8 py-5 
          border-b-2 border-gray-300
        "
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2 sm:text-3xl">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-lg sm:text-base">
          Please review our terms & conditions below
        </p>
      </div>

      {/* PDF Viewer */}
      <PDFViewer
        pdfUrl="/Terms-and-Conditions.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&download=0"
        title="Terms & Conditions PDF"
        className="
          bg-gray-100 rounded-xl p-5 mb-8 shadow-md 
          w-full min-h-[600px]
          flex flex-col items-center justify-center
          select-none
          sm:min-h-[400px]
          md:min-h-[500px]
        "
      />

      {/* Footer */}
      <div
        className="
          text-center mt-10 py-5 
          border-t-2 border-gray-300
        "
      >
        <p className="text-gray-600 text-base">
          For questions about these terms & conditions, please contact us.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;