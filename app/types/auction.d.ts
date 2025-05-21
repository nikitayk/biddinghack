// types/auction.d.ts

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
