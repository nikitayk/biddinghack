// components/AuctionList.tsx

import React, { useEffect, useState } from "react";
import Link from "next/link";

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string; // ISO string
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

  if (loading) {
    return <div className="text-center py-8">Loading auctions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  if (!auctions.length) {
    return <div className="text-center py-8">No auctions available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Live Auctions</h2>
      <ul className="space-y-4">
        {auctions.map((auction) => (
          <li
            key={auction.id}
            className="border rounded p-4 hover:shadow transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{auction.title}</h3>
                <p className="text-gray-600 mb-2">{auction.description}</p>
                <div className="text-sm text-gray-500">
                  Ends: {new Date(auction.endTime).toLocaleString()}
                </div>
              </div>
              <div className="mt-3 md:mt-0 md:text-right">
                <div className="text-lg font-semibold text-blue-700">
                  Current Bid: ${auction.currentBid}
                </div>
                <Link
                  href={`/auctions/${auction.id}`}
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View & Bid
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
