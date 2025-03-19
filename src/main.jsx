import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "jotai"; // Import Jotai Provider
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="718511225848-5lsob1tcj2bb7bf9rl8vt2svqn9on17r.apps.googleusercontent.com">
    <Provider> {/* Wrap App with Jotai Provider */}
      <App />
    </Provider>
  </GoogleOAuthProvider>
);