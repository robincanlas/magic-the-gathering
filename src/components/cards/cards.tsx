import React from 'react';
import SearchBar from '../searchbar/searchbar';
import CardList from './card-list';

const Cards = () => {

  return (
    <div>
      <SearchBar />
      <h1>Cards</h1>
      <CardList />
    </div>
  )
};

export default Cards;