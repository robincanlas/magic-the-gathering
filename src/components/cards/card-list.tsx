import React, { useEffect } from 'react';
import useCardStore from '../../store/cardStore';
import { NavLink } from 'react-router';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import MyCircularProgress from '../my-circular-progress/myCircularProgress';
import './cards.css';
import useCardSearch from '../../hooks/useCardSearch';
import ScrollTopButton from '../scroll-top/scroll-top';

const CardList = () => {
  const cards = useCardStore((state) => state.cards);
  const cardsLoading = useCardStore((state) => state.cardsLoading);
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const setSearchTerm = useCardStore((state) => state.setSearchTerm);
  const { lazyFetch } = useCardSearch();
  const sm = useMediaQuery('(min-width:400px)');
  const md = useMediaQuery('(min-width:768px)');
  const lg = useMediaQuery('(min-width:900px)');
  const xl = useMediaQuery('(min-width:1200px)');
  const imageListColumns = xl ? 6 : lg ? 5 : md ? 4 : sm ? 2 : 1;

  useEffect(() => {
    setCardsLoading(true);
    setSearchTerm('is:reserved');
    lazyFetch('is:reserved', () => {
      setCardsLoading(false);
    });
  }, []);

  if (cardsLoading) {
    return (
      <div className="loading-container">
        <MyCircularProgress />
      </div>
    );
  }

  return (
    <>
      <ImageList className='card-list-image' sx={{ width: "100%", height: "100%" }} gap={24} cols={imageListColumns} rowHeight="auto">
        {cards.map((card) => (
          <NavLink to={`/card/${card.id}`} key={card.id}>
            <ImageListItem key={card.id} className="card-list-image-item">
              <img
                srcSet={`${card.imageUris.normal}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${card.imageUris.normal}?w=164&h=164&fit=crop&auto=format`}
                alt={card.name}
                loading="lazy"
              />
            </ImageListItem>
          </NavLink>
        ))}
      </ImageList>
      <ScrollTopButton />
    </>
  );
};

export default CardList;