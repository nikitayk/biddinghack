"use client";

import React, { useEffect, useState } from "react";

// --- Auction Types ---
interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string;
}

// --- Main Page Component ---
export default function AuctionPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auctions`
        );
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.auctions)) {
          setAuctions(data.auctions);
        } else {
          setError(data.error || "Failed to fetch auctions.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a23] text-[#00fff7] font-mono">
      <div className="py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-[#ff00ff] tracking-widest cyberpunk-glow">
          LIVE AUCTIONS
        </h1>
        <div className="max-w-3xl mx-auto bg-[#181830] rounded-xl shadow-lg p-6 border border-[#00fff7] cyberpunk-panel">
          {loading ? (
            <div className="text-center py-8 text-[#00fff7] font-mono">
              Loading auctions...
            </div>
          ) : error ? (
            <div className="text-center text-[#ff00ff] py-8 font-mono cyberpunk-glow">
              {error}
            </div>
          ) : auctions.length === 0 ? (
            <div className="text-center py-8 text-[#fffb00] font-mono">
              No auctions available.
            </div>
          ) : (
            <ul className="space-y-6">
              {auctions.map((auction) => (
                <li
                  key={auction.id}
                  className="border-2 border-[#00fff7] rounded-xl p-6 bg-[#22223a] shadow-lg cyberpunk-panel hover:border-[#ff00ff] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[#ff00ff] cyberpunk-glow">
                        {auction.title}
                      </h3>
                      <p className="text-[#b3b3ff] mb-2">{auction.description}</p>
                      <div className="text-sm text-[#fffb00]">
                        Ends:{" "}
                        <span className="font-semibold">
                          {new Date(auction.endTime).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                      <div className="text-lg font-bold text-[#00fff7] cyberpunk-glow">
                        Current Bid: ${auction.currentBid}
                      </div>
                      <a
                        href={`/auction/${auction.id}`}
                        className="inline-block mt-3 px-6 py-2 bg-[#ff00ff] text-[#0a0a23] font-bold rounded-lg shadow-md hover:bg-[#00fff7] hover:text-[#181830] transition-all cyberpunk-btn"
                      >
                        View &amp; Bid
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
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
        .cyberpunk-btn {
          box-shadow:
            0 0 10px #ff00ff,
            0 0 20px #00fff7;
        }
        body {
          font-family: 'Roboto Mono', 'VT323', monospace;
        }
      `}</style>
    </main>
  );
}
