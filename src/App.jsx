import { Auth0Provider } from "@auth0/auth0-react";
import AuthWrapper from "./components/AuthWrapper";
// import ColorMatchMaster from "./components/Game";

const App = () => (
  <Auth0Provider
    domain="dev-x0o48535n38dovl4.us.auth0.com"
    clientId="dCwtbxcmZx7sxB0XHCMkqIn5xWwTcMIt"
    redirectUri="https://3t6nw6-5173.csb.app/"
  >
    <AuthWrapper>
      {/* <ColorMatchMaster /> */}
      hi
    </AuthWrapper>
  </Auth0Provider>
);

export default App;
