import React from 'react';
import useCardStore, { Card } from '../../store/cardStore';
import { NavLink } from 'react-router';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import MyCircularProgress from '../my-circular-progress/myCircularProgress';
import ScrollTopButton from '../scroll-top/scroll-top';
import cardBack from '../../assets/magic-back.jpg';
import './cards.css';

const ImageWithFallback = ({ card }: { card: Card }) => {
  
  return (
    <ImageListItem key={card.id} className="card-list-image-item">
      {
        card.imageUris.normal ? (
          <img
            srcSet={`${card.imageUris.normal}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${card.imageUris.normal}?w=164&h=164&fit=crop&auto=format`}
            alt={card.name}
            loading="lazy"
          />
        ) : (
          <img src={cardBack} alt={card.name} />
        )
      }
    </ImageListItem>
  )
}

const CardList = () => {
  const cards = useCardStore((state) => state.cards);
  const cardsLoading = useCardStore((state) => state.cardsLoading);
  const sm = useMediaQuery('(min-width:400px)');
  const md = useMediaQuery('(min-width:768px)');
  const lg = useMediaQuery('(min-width:900px)');
  const xl = useMediaQuery('(min-width:1200px)');
  const imageListColumns = xl ? 6 : lg ? 5 : md ? 4 : sm ? 2 : 1;

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
              <ImageWithFallback card={card} />
          </NavLink>
        ))}
      </ImageList>
      <ScrollTopButton />
    </>
  );
};

export default CardList;