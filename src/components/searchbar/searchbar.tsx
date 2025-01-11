import { useState } from 'react';
import useCardStore from '../../store/cardStore';
import useCardSearch from '../../hooks/useCardSearch';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const { lazyFetch } = useCardSearch();

  const handleSearch = () => {
    setCardsLoading(true);
    lazyFetch(searchTerm, () => {
      setCardsLoading(false);
    });
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar