// services/auctionService.ts

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string;
  bids?: Bid[];
}

export interface Bid {
  userId: string;
  amount: number;
  timestamp: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- Fetch all auctions ---
export async function fetchAuctions(): Promise<{ success: boolean; auctions?: Auction[]; error?: string }> {
  const res = await fetch(`${API_URL}/api/auctions`);
  return res.json();
}

// --- Fetch auction details ---
export async function fetchAuctionDetails(auctionId: string): Promise<{ success: boolean; auction?: Auction; error?: string }> {
  const res = await fetch(`${API_URL}/api/auctions/${auctionId}`);
  return res.json();
}

// --- Place a bid ---
export async function placeBid(
  auctionId: string,
  amount: number,
  token: string
): Promise<{ success: boolean; newBid?: Bid; error?: string }> {
  const res = await fetch(`${API_URL}/api/auctions/${auctionId}/bid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });
  return res.json();
}

// --- Get user's bids ---
export async function fetchUserBids(token: string): Promise<{ success: boolean; bids?: Bid[]; error?: string }> {
  const res = await fetch(`${API_URL}/api/user/bids`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
