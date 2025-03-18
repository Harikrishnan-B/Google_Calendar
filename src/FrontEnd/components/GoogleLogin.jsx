import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token Response:", tokenResponse);

      try {
        notification.info({
          message: "Signing in",
          description: "Logging in with Google account...",
          placement: "topLeft",
          duration: 2,
        });

        const res = await axios.post("http://localhost:3000/api/auth/google", {
          credential: tokenResponse.access_token,
        });

        const data = res.data;

        if (data.success) {
          console.log("Google User Data:", data.user);
          // Store the access token or a custom token in localStorage
          localStorage.setItem("token", tokenResponse.access_token); // Use access_token as token
          localStorage.setItem("user", JSON.stringify(data.user)); // Keep user data
          navigate("/home", { replace: true }); // Navigate to /home
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Google Login Failed:", error);
        notification.error({
          message: "Login Failed",
          description: error.response?.data?.message || error.message || "An unknown error occurred",
          placement: "topLeft",
        });
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      notification.error({
        message: "Login Error",
        description: "Failed to initiate Google login",
        placement: "topLeft",
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Calendar App
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access your calendar
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-2 text-gray-700 text-lg font-medium 
            hover:bg-gray-50 hover:border-gray-400 hover:shadow-xl hover:scale-[1.02] 
            active:bg-gray-100 active:scale-[1.01]
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-300 ease-in-out"
          >
            <FcGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;