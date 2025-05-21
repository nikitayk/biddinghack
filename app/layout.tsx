import type { Metadata } from "next";
import "../styles/globals.css"; // Make sure the path matches your project structure
import { AuthProvider } from "../hooks/useAuth";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "BIDWIT - AI RTB Bidding Optimizer",
  description: "AI-powered Real-Time Bidding platform for digital ad campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}




