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
  card: Card | null;
  hasMore: boolean;
  totalCards: number;
  setCards: (cards: Card[]) => void;
  setCard: (card: Card) => void;
}

const useCardStore = create<CardState>((set) => ({
  cards: [],
  card: null,
  hasMore: false,
  totalCards: 0,
  setCards: (cards: Card[]) => set({ cards }),
  setCard: (card: Card) => set({ card }),
}));

export default useCardStore;