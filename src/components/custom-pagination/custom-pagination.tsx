import React from 'react';
import { Pagination } from '@mui/material';
import useCardStore from '../../store/cardStore';
import useCardSearch from '../../hooks/useCardSearch';
import { API_BASE_URL } from '../../constants';

const CustomPagination = () => {
  const totalCards = useCardStore((state) => state.totalCards);
  const searchTerm = useCardStore((state) => state.searchTerm);
  const page = useCardStore((state) => state.page);
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const setPage = useCardStore((state) => state.setPage);
  const { lazyFetchCustomUri } = useCardSearch();
  const pageCount = Math.ceil(totalCards / 175);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setCardsLoading(true);
    lazyFetchCustomUri(`${API_BASE_URL}/cards/search?q=${searchTerm}&page=${page}`, () => {
      setCardsLoading(false);
    });
  }

  if (pageCount < 2) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'end',
      width: '95%',
      margin: '15px 0'
    }}>
      <Pagination
        page={page}
        defaultPage={1}
        onChange={handlePageChange}
        count={pageCount} 
      />
    </div>
  )
}

export default CustomPagination;