import React from "react";

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, className = "" }) => {
  return (
    <div
      className={`
        relative bg-gray-100 rounded-xl p-5 shadow-md w-full
        flex flex-col items-center justify-center select-none
        ${className}
      `}
    >
      {/* Overlay (kept for structure even if transparent) */}
      <div className="absolute inset-0 pointer-events-none bg-transparent"></div>

      {/* PDF Iframe Wrapper */}
      <div className="w-full h-[70vh] min-h-[400px] md:h-[75vh] overflow-hidden rounded-lg shadow-lg bg-white mb-4">
        <iframe
          src={pdfUrl}
          title={title || "PDF Viewer"}
          className="w-full h-full rounded-lg border-none"
        />
      </div>

      {/* Notice */}
      <p className="text-gray-600 text-sm text-center">
        Use your browser’s built-in PDF controls to navigate and zoom.
      </p>
    </div>
  );
};

export default PDFViewer;