import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./FrontEnd/components/Home.jsx";
import GoogleLogin from "./FrontEnd/components/GoogleLogin.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Checks for 'token'
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;