import React from "react";
import AuctionList from "./AuctionList";

export const metadata = {
  title: "Live Auctions",
  description: "Browse and bid on current auctions.",
};

export default function AuctionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a23] text-[#00fff7] font-mono">
      <div className="py-10">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-10 
            text-[#ff00ff] tracking-widest cyberpunk-glow"
        >
          LIVE AUCTIONS
        </h1>
        <div className="max-w-3xl mx-auto bg-[#181830] rounded-xl shadow-lg p-6 border border-[#00fff7] cyberpunk-panel">
          <AuctionList />
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
}
