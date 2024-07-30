// src/components/AuthWrapper.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthWrapper = ({ children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, error } =
    useAuth0();

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="logIn">
        <button onClick={() => loginWithRedirect()}> Login </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
      {children}
    </div>
  );
};

export default AuthWrapper;
