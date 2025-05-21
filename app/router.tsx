

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuctionsPage from "./pages/AuctionsPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components//NavBar";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/auctions/:id" element={<AuctionDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
