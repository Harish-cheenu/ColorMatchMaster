import React, { useEffect, useState } from "react";
import ColorMatchMaster from "./components/ColorMatchMaster";
import { CiDark } from "react-icons/ci";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.body.className = theme + "-mode";
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
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
          {/* <div className="rightMenuBar">
            <div onClick={handleThemeToggle} className="btn">
              <CiDark />
            </div>
          </div> */}
        </div>
      {/* </SignedIn> */}
    </div>
  );
}

export default App;
