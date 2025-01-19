import { create } from 'zustand'

export interface ScryFallResponse {
  data: CardData[];
  has_more: boolean;
  next_page: string;
  prev_page: string;
  total_cards: number;
}

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
  cardsLoading: boolean;
  card: Card | null;
  hasMore: boolean;
  totalCards: number;
  nextPageUrl: string;
  prevPageUrl: string;
  maxCardsPerPage: number;
  searchTerm: string;
  searchUri: string;
  page: number;
  setCards: (cards: Card[]) => void;
  setCard: (card: Card) => void;
  setCardsLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setTotalCards: (totalCards: number) => void;
  setNextPageUrl: (url: string) => void;
  setPrevPageUrl: (url: string) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSearchUri: (searchUri: string) => void;
  setPage: (page: number) => void;
}

const useCardStore = create<CardState>((set) => ({
  cards: [],
  cardsLoading: false,
  card: null,
  hasMore: false,
  totalCards: 0,
  nextPageUrl: '',
  prevPageUrl: '',
  maxCardsPerPage: 175,
  searchTerm: '',
  searchUri: '',
  page: 1,
  setCards: (cards: Card[]) => set({ cards }),
  setCard: (card: Card) => set({ card }),
  setCardsLoading: (loading: boolean) => set({ cardsLoading: loading }),
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  setTotalCards: (totalCards: number) => set({ totalCards }),
  setNextPageUrl: (url: string) => set({ nextPageUrl: url }),
  setPrevPageUrl: (url: string) => set({ prevPageUrl: url }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSearchUri: (searchUri: string) => set({ searchUri }),
  setPage: (page: number) => set({ page }),
}));

export default useCardStore;