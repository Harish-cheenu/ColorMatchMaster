import React from "react";
import ColorMatchMaster from "./components/ColorMatchMaster";

import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      {/* <SignedOut>
        <div className="home">
          <h1 className="title">Welcome to Color Match Master</h1>
          <p className="description">
            Test your memory skills by matching colors in the correct sequence. Click the button below to sign in and start playing!
          </p>
          <SignInButton className="sign-in-btn" />
        </div>
      </SignedOut> */}
      {/* <SignedIn> */}
        <div className="game-container">
          <ColorMatchMaster />
        
        </div>
      {/* </SignedIn> */}
    </div>
  );
}

export default App;
