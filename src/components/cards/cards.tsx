import CardList from './card-list';
import CustomPagination from '../custom-pagination/custom-pagination';
import { useSearchParams } from 'react-router';

const SearchTerm = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  if (!searchTerm) {
    return null;
  }

  return (
    <div style={{ padding: '0 2em'}}>
      <h2>Search Term: {searchTerm}</h2>
    </div>
  );
}

const Cards = () => {

  return (
    <div>
      <h1>Cards</h1>
      <SearchTerm />
      <CustomPagination />
      <CardList />
      <CustomPagination />
    </div>
  )
};

export default Cards;