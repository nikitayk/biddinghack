"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  // Handler to be called after a successful login
  const handleLoginSuccess = (
    token: string,
    user: { id: string; username: string; email: string }
  ) => {
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess(true);
    setTimeout(() => {
      router.push("/auctions");
    }, 1000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a23] font-mono">
      <div className="w-full max-w-md p-8 bg-[#181830] border-2 border-[#00fff7] rounded-xl shadow-xl cyberpunk-panel">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#ff00ff] tracking-widest cyberpunk-glow">
          LOGIN
        </h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        {success && (
          <div className="mt-6 text-[#00ff99] text-center cyberpunk-glow">
            Login successful! Redirecting...
          </div>
        )}
        <div className="mt-6 text-center text-sm text-[#b3b3ff]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[#fffb00] hover:underline font-bold cyberpunk-glow"
          >
            Register here
          </a>
        </div>
      </div>
      <style jsx global>{`
        .cyberpunk-glow {
          text-shadow:
            0 0 8px #ff00ff,
            0 0 16px #00fff7,
            0 0 32px #ff00ff;
        }
        .cyberpunk-panel {
          box-shadow:
            0 0 20px #00fff7,
            0 0 40px #ff00ff inset;
        }
        body {
          font-family: 'Roboto Mono', 'VT323', monospace;
        }
      `}</style>
    </main>
  );
};

export default LoginPage;
