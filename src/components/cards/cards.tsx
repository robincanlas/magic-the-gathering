import React from 'react';
import useCardStore from '../../store/cardStore';
import SearchBar from '../searchbar/searchbar';

const Cards = () => {
  const cards = useCardStore((state) => state.cards);

  return (
    <div>
      <SearchBar />
      <h1>cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            {card.name}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Cards;