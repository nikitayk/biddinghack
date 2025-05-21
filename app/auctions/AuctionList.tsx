"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// TypeScript interfaces
export interface Bid {
  userId: string;
  amount: number;
  timestamp: string; // ISO date string
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string; // ISO date string
  bids?: Bid[];
}

interface AuctionsApiResponse {
  success: boolean;
  auctions: Auction[];
  error?: string;
}

const AuctionList: React.FC = () => {
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
        const data: AuctionsApiResponse = await response.json();
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

  if (loading) {
    return (
      <div className="text-center py-8 text-[#00fff7] font-mono">
        Loading auctions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-[#ff00ff] py-8 font-mono cyberpunk-glow">
        {error}
      </div>
    );
  }

  if (!auctions.length) {
    return (
      <div className="text-center py-8 text-[#fffb00] font-mono">
        No auctions available.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 font-mono">
      <h2 className="text-2xl font-extrabold mb-6 text-[#00fff7] cyberpunk-glow tracking-wide">
        Live Auctions
      </h2>
      <ul className="space-y-6">
        {auctions.map((auction) => (
          <li
            key={auction.id}
            className="border-2 border-[#00fff7] rounded-xl p-6 bg-[#181830] shadow-lg cyberpunk-panel hover:border-[#ff00ff] transition-all"
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
                <Link
                  href={`/auction/${auction.id}`}
                  className="inline-block mt-3 px-6 py-2 bg-[#ff00ff] text-[#0a0a23] font-bold rounded-lg shadow-md hover:bg-[#00fff7] hover:text-[#181830] transition-all cyberpunk-btn"
                >
                  View &amp; Bid
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <style jsx global>{`
        .cyberpunk-glow {
          text-shadow:
            0 0 6px #00fff7,
            0 0 12px #ff00ff,
            0 0 20px #00fff7;
        }
        .cyberpunk-panel {
          box-shadow:
            0 0 16px #00fff7,
            0 0 24px #ff00ff inset;
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
    </div>
  );
};

export default AuctionList;
