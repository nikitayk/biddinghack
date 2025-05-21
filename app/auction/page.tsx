import React from "react";
import AuctionList from "./AuctionList";

export const metadata = {
  title: "Live Auctions",
  description: "Browse and bid on current auctions.",
};

export default function AuctionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Live Auctions
        </h1>
        <AuctionList />
      </div>
    </main>
  );
}
