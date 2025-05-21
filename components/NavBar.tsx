// components/NavBar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  // For demonstration, use localStorage for JWT presence
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("jwt_token");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
      <div>
        <Link href="/" className="text-xl font-bold hover:underline">
          BiddingHack
        </Link>
      </div>
      <div className="space-x-4">
        <Link href="/auctions" className="hover:underline">
          Auctions
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
