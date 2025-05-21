// components/BidForm.tsx

import React, { useState } from "react";

interface BidFormProps {
  auctionId: string;
  currentBid: number;
  jwtToken?: string; // Optionally pass JWT as a prop, or get from localStorage/context
  onBidSuccess?: (newBid: { amount: number; timestamp: string }) => void;
}

const BidForm: React.FC<BidFormProps> = ({
  auctionId,
  currentBid,
  jwtToken,
  onBidSuccess,
}) => {
  const [amount, setAmount] = useState<number>(currentBid + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token =
    jwtToken ||
    (typeof window !== "undefined"
      ? localStorage.getItem("jwt_token") || ""
      : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("You must be logged in to place a bid.");
      return;
    }
    if (amount <= currentBid) {
      setError("Bid must be higher than the current bid.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auctions/${auctionId}/bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success && data.newBid) {
        setSuccess("Bid placed successfully!");
        setError(null);
        if (onBidSuccess) onBidSuccess(data.newBid);
      } else {
        setError(data.error || "Failed to place bid.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">Place a Bid</h3>
      <div className="mb-3">
        <label htmlFor="bidAmount" className="block mb-1 font-medium">
          Bid Amount (USD)
        </label>
        <input
          type="number"
          name="bidAmount"
          id="bidAmount"
          min={currentBid + 1}
          value={amount}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Placing Bid..." : "Place Bid"}
      </button>
    </form>
  );
};

export default BidForm;
