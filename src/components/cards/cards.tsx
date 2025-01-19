import React from 'react';
import SearchBar from '../searchbar/searchbar';
import CardList from './card-list';
import CustomPagination from '../custom-pagination/custom-pagination';
import useCardStore from '../../store/cardStore';

const SearchTerm = () => {
  const searchTerm = useCardStore((state) => state.searchTerm);

  if (!searchTerm) {
    return null;
  }

  return (
    <div>
      <h2>Search Term: {searchTerm}</h2>
    </div>
  );
}

const Cards = () => {

  return (
    <div>
      <SearchBar />
      <h1>Cards</h1>
      <SearchTerm />
      <CustomPagination />
      <CardList />
      <CustomPagination />
    </div>
  )
};

export default Cards;