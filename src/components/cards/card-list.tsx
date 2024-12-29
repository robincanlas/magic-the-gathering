import React from 'react';
import useCardStore from '../../store/cardStore';
import { NavLink } from 'react-router';
import { ImageList, ImageListItem, useMediaQuery  } from '@mui/material';
import MyCircularProgress from '../my-circular-progress/myCircularProgress';

const CardList = () => {
  const cards = useCardStore((state) => state.cards);
  const cardsLoading = useCardStore((state) => state.cardsLoading);
  const md = useMediaQuery('(min-width:600px)');
  const lg = useMediaQuery('(min-width:900px)');
  const imageListCols = lg ? 6 : md ? 4 : 1;

  if (cardsLoading) {
    return <MyCircularProgress />;
  }

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} gap={24} cols={imageListCols} rowHeight="auto">
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
  );
};

export default CardList;