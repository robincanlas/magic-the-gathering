import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useCardStore, { Card, CardData, CardFaceData, CardInfo, ScryFallResponse } from '../store/cardStore';
import { useDebounceCallback } from 'usehooks-ts';

const useCardSearch = () => {

  const getCardDataForView = (card: CardData): CardInfo => {
    const partialData = getCardData(card);
    return {
      ...partialData,
      oracleText: card.oracle_text,
      rarity: card.rarity
    }
  }

  const getCardData = (card: CardData) => {
    return {
      id: card.id,
      artist: card.artist,
      name: card.name,
      manaCost: card.mana_cost,
      mtgoId: card.mtgo_id,
      multiverseIds: card.multiverse_ids,
      prices: {
        usd: card.prices.usd,
        eur: card.prices.eur
      },
      imageUris: card.image_uris ? {
        small: card.image_uris.small,
        normal: card.image_uris.normal,
        large: card.image_uris.large,
        png: card.image_uris.png
      } : { small: '', normal: '', large: '', png: '' },
      cardFaces: card.card_faces?.map((cardFace: CardFaceData) => {
        return {
          artist: cardFace.artist || '',
          name: cardFace.name || '',
          manaCost: cardFace.mana_cost,
          oracleText: cardFace.oracle_text,
          imageUris:  {
            small: cardFace.image_uris?.small || '',
            normal: cardFace.image_uris?.normal || '',
            large: cardFace.image_uris?.large || '',
            png: cardFace.image_uris?.png || ''
          }
        }
      }) ?? []
    }
  }

  const constructCardList = (cardData: CardData[]): Card[] => {
    const cards = cardData.map((card: CardData) => ({
      ...card,
      image_uris: card.image_uris ? card.image_uris : { small: '', normal: '', large: '', png: '' },
      card_faces: card.card_faces ? card.card_faces : []
    })).map((card: CardData) => (getCardData(card)));
    return cards;
  }

  const constructData = (data: ScryFallResponse, searchUri: string) => {
    const hasMore = data.has_more;
    const totalCards = data.total_cards;
    const nextPageUrl = data.next_page;
    const prevPageUrl = data.prev_page;
    const cards = constructCardList(data.data);
    useCardStore.setState({ hasMore, totalCards, nextPageUrl, prevPageUrl, cards, searchUri });
  }

  const lazyFetch = useDebounceCallback((searchTerm: string, cb?: () => void) => {
    const searchUri = `${API_BASE_URL}/cards/search?q=${searchTerm}`;
    axios.get(searchUri)
    .then((response) => {
      constructData(response.data, searchUri);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      if (cb) {
        cb();      
      }
    });
  }, 500);

  const lazyFetchCustomUri = useDebounceCallback((customUri: string, cb?: () => void) => {
    axios.get(customUri)
    .then((response) => {
      constructData(response.data, customUri);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      if (cb) {
        cb();      
      }
    });
  }, 500);

  return {
    lazyFetch,
    lazyFetchCustomUri,
    getCardData,
    getCardDataForView
  };
};

export default useCardSearch;