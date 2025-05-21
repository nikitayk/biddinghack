// store/auctionSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Bid {
  userId: string;
  amount: number;
  timestamp: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: string;
  bids?: Bid[];
}

export interface AuctionState {
  auctions: Auction[];
  selectedAuction: Auction | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuctionState = {
  auctions: [],
  selectedAuction: null,
  loading: false,
  error: null,
};

const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    fetchAuctionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAuctionsSuccess(state, action: PayloadAction<Auction[]>) {
      state.auctions = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAuctionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectAuction(state, action: PayloadAction<Auction | null>) {
      state.selectedAuction = action.payload;
    },
    fetchAuctionDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAuctionDetailsSuccess(state, action: PayloadAction<Auction>) {
      state.selectedAuction = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAuctionDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    placeBidSuccess(state, action: PayloadAction<Bid>) {
      if (state.selectedAuction) {
        state.selectedAuction.currentBid = action.payload.amount;
        state.selectedAuction.bids = [
          ...(state.selectedAuction.bids || []),
          action.payload,
        ];
      }
      state.error = null;
    },
    placeBidFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearAuctionError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchAuctionsStart,
  fetchAuctionsSuccess,
  fetchAuctionsFailure,
  selectAuction,
  fetchAuctionDetailsStart,
  fetchAuctionDetailsSuccess,
  fetchAuctionDetailsFailure,
  placeBidSuccess,
  placeBidFailure,
  clearAuctionError,
} = auctionSlice.actions;

export default auctionSlice.reducer;
