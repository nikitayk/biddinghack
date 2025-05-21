// types/auction.d.ts (or at the top of this file)

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string; // ISO date string
  bids?: Bid[];
}

export interface Bid {
  userId: string;
  amount: number;
  timestamp: string; // ISO date string
}

// --- API URL ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- Fetch all auctions ---
export async function fetchAuctions(): Promise<{ success: boolean; auctions?: Auction[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auctions`);
    return await res.json();
  } catch (error) {
    return { success: false, error: "Network error fetching auctions." };
  }
}

// --- Fetch auction details ---
export async function fetchAuctionDetails(auctionId: string): Promise<{ success: boolean; auction?: Auction; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auctions/${auctionId}`);
    return await res.json();
  } catch (error) {
    return { success: false, error: "Network error fetching auction details." };
  }
}

// --- Place a bid ---
export async function placeBid(
  auctionId: string,
  amount: number,
  token: string
): Promise<{ success: boolean; newBid?: Bid; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auctions/${auctionId}/bid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: "Network error placing bid." };
  }
}

// --- Get user's bids ---
export async function fetchUserBids(token: string): Promise<{ success: boolean; bids?: Bid[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/user/bids`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: "Network error fetching user bids." };
  }
}
