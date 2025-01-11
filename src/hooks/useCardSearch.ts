import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useCardStore, { CardData } from '../store/cardStore';
import { useDebounceCallback } from 'usehooks-ts';

const useCardSearch = () => {
  const setCards = useCardStore((state) => state.setCards);

  const constructCardList = (cardData: CardData[]) => {
    const cards = cardData.map((card: CardData) => ({
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
      imageUris: {
        small: card.image_uris.small,
        normal: card.image_uris.normal,
        large: card.image_uris.large,
        png: card.image_uris.png
      }
    }));
    setCards(cards);
  }

  const lazyFetch = useDebounceCallback((searchTerm: string, cb?: () => void) => {
    axios.get(`${API_BASE_URL}/cards/search?q=${searchTerm}`)
    .then((response) => {
      const data = response.data;
      constructCardList(data.data);
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
      const data = response.data;
      constructCardList(data.data);
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
    lazyFetchCustomUri
  };
};

export default useCardSearch;