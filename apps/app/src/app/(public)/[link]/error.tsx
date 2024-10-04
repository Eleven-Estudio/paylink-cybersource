"use client";

const TITLES_BY_ERROR = {
  LINK_NOT_FOUND: "Something went wrong",
  LINK_EXPIRED: "Link expired",
};

const DESCRIPTION_BY_ERROR = {
  LINK_NOT_FOUND:
    "The page you were looking for could not be found. Please check the URL or contact the merchant.",
  LINK_EXPIRED:
    "The link you were looking for has expired. Please contact the merchant.",
};

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorBoundary = ({ error }: ErrorProps) => {
  const errorMessage = error.message as keyof typeof TITLES_BY_ERROR;
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white z-30">
      <div className="max-w-[45ch] text-center space-y-1 flex flex-col items-center px-2 py-1 fade-in">
        <span className="text-lg font-semibold">
          {TITLES_BY_ERROR[errorMessage]}
        </span>
        <span className="text-sm">{DESCRIPTION_BY_ERROR[errorMessage]}</span>
      </div>
    </div>
  );
};

export default ErrorBoundary;
