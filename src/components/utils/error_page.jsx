import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({
  errorMessage = "Something went wrong!",
  errorDetails,
}) => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1 fw-bold">Oops!</h1>
      <p className="fs-3">
        <span className="text-danger">Error:</span> {errorMessage}
      </p>
      {errorDetails && <p className="text-muted">{errorDetails}</p>}
      <p className="lead">
        We're sorry, but something went wrong. Please try again later.
      </p>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary btn-lg mx-2">
          Go Home
        </Link>
        <Link
          to="/contact-support"
          className="btn btn-outline-secondary btn-lg mx-2"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
