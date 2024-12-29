import React from 'react';
import useCardStore from '../../store/cardStore';
import SearchBar from '../searchbar/searchbar';
import { NavLink } from 'react-router';

const Cards = () => {
  const cards = useCardStore((state) => state.cards);

  return (
    <div>
      <SearchBar />
      <h1>cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <NavLink to={`/card/${card.id}`}>{card.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Cards;