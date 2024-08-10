import React, { useEffect, useState } from "react";
import ColorMatchMaster from "./components/ColorMatchMaster";

import "./App.css";

const App = ({ isSignedIn = import.meta.env.VITE_USER_LOGGEDIN }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isSignedIn) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            window.location.href = "https://platformgames.netlify.app";
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSignedIn]);


  return (
    <div className="app-container">
        {isSignedIn ? (
        <div className="game-container">
          <ColorMatchMaster />
        </div>
      ) : (
        <div className="login-message">
          <h2>Please sign in to play the game.</h2>
          <p>Redirecting to the main page in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
}

export default App;
