import React from 'react';
import * as Sentry from '@sentry/react';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">
        We're sorry for the inconvenience. The error has been reported to our team.
      </p>
      <details className="mb-4">
        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
          Error details
        </summary>
        <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetError}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  </div>
);

export const ErrorBoundary = Sentry.withErrorBoundary(
  ({ children }: { children: React.ReactNode }) => <>{children}</>,
  {
    fallback: ({ error, resetError }) => (
      <ErrorFallback error={error} resetError={resetError} />
    ),
    showDialog: false,
  }
);
