import { useState } from 'react';
import { Box, IconButton, ImageListItem } from '@mui/material';
import { NavLink } from 'react-router';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { Card } from '../../store/cardStore';
import cardBack from '../../assets/magic-back.jpg';
import './double-face-card.css';

const DoubleFaceCardElement = ({ card }: { card: Card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardFace1 = card.cardFaces[0];
  const cardFace2 = card.cardFaces[1];

  const getFaceImage = (face: { imageUris: { normal: string } } | undefined) => {
    if (face?.imageUris?.normal) {
      return {
        srcSet: `${face.imageUris.normal}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`,
        src: `${face.imageUris.normal}?w=164&h=164&fit=crop&auto=format`,
      };
    }

    return { srcSet: undefined, src: cardBack };
  };

  const front = getFaceImage(cardFace1);
  const back = getFaceImage(cardFace2);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ImageListItem key={card.id} className="card-list-image-item double-face-card-root">
      <NavLink to={`/card/${card.id}`} className="card-link" style={{ display: 'block' }}>
        <Box className="flip-card">
          <Box className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            <Box className="flip-card-side flip-card-front">
              {front.srcSet ? (
                <img srcSet={front.srcSet} src={front.src} alt={`${card.name} front`} loading="lazy" />
              ) : (
                <img src={front.src} alt={`${card.name} front`} />
              )}
            </Box>
            <Box className="flip-card-side flip-card-back">
              {back.srcSet ? (
                <img srcSet={back.srcSet} src={back.src} alt={`${card.name} back`} loading="lazy" />
              ) : (
                <img src={back.src} alt={`${card.name} back`} />
              )}
            </Box>
          </Box>
        </Box>
      </NavLink>

      {cardFace2 && (
        <IconButton
          className="flip-card-button"
          size="small"
          onClick={(e) => {
            // prevent NavLink navigation if the button overlaps the link area
            e.preventDefault();
            e.stopPropagation();
            handleFlip();
          }}
          aria-label={isFlipped ? 'Show front face' : 'Show back face'}
        >
          <FlipCameraAndroidIcon />
        </IconButton>
      )}
    </ImageListItem>
  );
};

export default DoubleFaceCardElement;
