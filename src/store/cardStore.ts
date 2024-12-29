import { create } from 'zustand'

export interface CardImage {
  small: string;
  normal: string;
  large: string;
  png: string;
}

export interface CardPrices {
  usd: number;
  eur: number;
}

export interface CardData {
  id: string;
  artist: string;
  name: string;
  mana_cost: string;
  mtgo_id: number;
  multiverse_ids: number[];
  prices: CardPrices;
  image_uris: CardImage;
}

export interface Card {
  id: string;
  artist: string;
  name: string;
  manaCost: string;
  mtgoId: number;
  multiverseIds: number[];
  prices: CardPrices;
  imageUris: CardImage;
}

export interface CardState {
  cards: Card[];
  hasMore: boolean;
  totalCards: number;
  setCards: (cards: Card[]) => void;
}

const useCardStore = create<CardState>((set) => ({
  cards: [],
  hasMore: false,
  totalCards: 0,
  setCards: (cards: Card[]) => set({ cards }),
}));

export default useCardStore;