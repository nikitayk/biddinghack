// app/login/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/ui/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  // Handler to be called after a successful login
  const handleLoginSuccess = (
    token: string,
    user: { id: string; username: string; email: string }
  ) => {
    // Store token and user info (you can use Context or localStorage)
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess(true);
    // Redirect to auctions or dashboard after a short delay
    setTimeout(() => {
      router.push("/auctions");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        {success && (
          <div className="mt-4 text-green-600 text-center">
            Login successful! Redirecting...
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
