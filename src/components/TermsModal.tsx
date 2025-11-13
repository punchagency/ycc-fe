import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload } from "react-icons/fa";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
  fileName?: string;
}

const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title = "Document",
  fileName = "document.pdf",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIframeLoad = () => setIsLoading(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex h-full w-full max-h-[95vh] max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-5">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-[#034D92]">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please review the complete document
                </p>
              </div>

              <div className="ml-4 flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 rounded-lg border border-[#034D92] px-3 py-2 text-sm font-medium text-[#034D92] transition-all hover:bg-[#034D92] hover:text-white"
                >
                  <FaDownload className="text-base" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all hover:bg-gray-200"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative flex flex-1 flex-col bg-gray-50">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-50/80">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#034D92]" />
                  <p className="text-sm font-medium text-gray-500">
                    Loading document...
                  </p>
                </div>
              )}

              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                className={`h-full w-full border-none bg-white transition-opacity duration-300 ${
                  isLoading ? "opacity-10" : "opacity-100"
                }`}
                onLoad={handleIframeLoad}
                title={title}
                allow="fullscreen"
              />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center">
              <p className="text-xs text-gray-500">
                By closing this modal, you acknowledge that you have reviewed the
                document.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;