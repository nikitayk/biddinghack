"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserRegistrationForm from "../../components/UserRegistrationForm";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  // Handler to be called after successful registration
  const handleRegistrationSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a23] font-mono">
      <div className="w-full max-w-md p-8 bg-[#181830] border-2 border-[#00fff7] rounded-xl shadow-xl cyberpunk-panel">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#ff00ff] tracking-widest cyberpunk-glow">
          SIGN UP
        </h1>
        <UserRegistrationForm onSuccess={handleRegistrationSuccess} />
        {success && (
          <div className="mt-6 text-[#00ff99] text-center cyberpunk-glow">
            Registration successful! Redirecting to login...
          </div>
        )}
        <div className="mt-6 text-center text-sm text-[#b3b3ff]">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#fffb00] hover:underline font-bold cyberpunk-glow"
          >
            Login here
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

export default RegisterPage;
