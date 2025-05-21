
/*app/register/page.tsx*/

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
    // Redirect to login after a short delay
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <UserRegistrationForm onSuccess={handleRegistrationSuccess} />
        {success && (
          <div className="mt-4 text-green-600 text-center">
            Registration successful! Redirecting to login...
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
