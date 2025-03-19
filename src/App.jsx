import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "./FrontEnd/atoms/authAtoms.js";
import Home from "./FrontEnd/components/Home.jsx";
import GoogleLogin from "./FrontEnd/components/GoogleLogin.jsx";
import RoomSelection from "./FrontEnd/components/RoomSelection.jsx";

// ProtectedRoute: Prevents access to /login if authenticated
const ProtectedRoute = ({ children }) => {
  const [token] = useAtom(tokenAtom);
  const isAuthenticated = !!token;
  console.log("ProtectedRoute - Token:", token, "isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <Navigate to="/rooms" replace /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} /> {/* No protection */}
        <Route path="/rooms" element={<RoomSelection />} /> {/* No protection */}
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <GoogleLogin />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/rooms" replace />} /> {/* Default to /rooms */}
        <Route path="*" element={<Navigate to="/rooms" replace />} /> {/* Catch-all to /rooms */}
      </Routes>
    </Router>
  );
};

export default App;