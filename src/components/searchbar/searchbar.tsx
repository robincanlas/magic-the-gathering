import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import useCardStore, { CardData } from '../../store/cardStore';
import { useDebounceCallback } from 'usehooks-ts';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const setCards = useCardStore((state) => state.setCards);
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);

  const lazyFetch = useDebounceCallback(() => {
    axios.get(`${API_BASE_URL}/cards/search?q=${searchTerm}`)
    .then((response) => {
        const data = response.data;
        const cards = data.data.map((card: CardData) => ({
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
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setCardsLoading(false);      
    });
  }, 500);

  const handleSearch = () => {
    setCardsLoading(true);
    lazyFetch();
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar