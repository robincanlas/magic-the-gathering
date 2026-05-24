import { Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useState } from 'react';
import useReplaceManaSymbols from '../../../hooks/useReplaceManaSymbols';
import useCardStore from '../../../store/cardStore';
import './double-face-card-info.css';

const DoubleFaceCardInfo = () => {
  const card = useCardStore((state) => state.card);
  console.log("🚀 ~ DoubleFaceCardInfo ~ card:", card)
  
  const replaceManaSymbols = useReplaceManaSymbols();
  const [isFlipped, setIsFlipped] = useState(false);
  const cardFace1 = card?.cardFaces[0];
  const cardFace2 = card?.cardFaces[1];

  const front = cardFace1;
  const back = cardFace2;

  const toggleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFlipped((s) => !s);
  };

  return (
    <>
      <Box className="card-page-card-info-wrapper">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} columns={{ xs: 16, sm: 16, md: 16 }}>
          <Grid height={{ xs: 430, sm: 430, md: 600 }} size={{ xs: 16, sm: 16, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', position: 'relative'}}>
            <Box className={`dfci-flip-card`} onClick={() => { /* allow clicking the image to flip if desired */ }}>
              <Box className={`dfci-flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                <Box className="dfci-flip-card-side dfci-front">
                  <img className="card-page-card-image" src={front?.imageUris.large ?? ''} alt={front?.name ?? ''} />
                </Box>
                <Box className="dfci-flip-card-side dfci-back">
                  <img className="card-page-card-image" src={back?.imageUris.large ?? ''} alt={back?.name ?? ''} />
                </Box>
              </Box>
            </Box>
            {cardFace2 && (
              <IconButton className="dfci-flip-button" size="small" onClick={toggleFlip} aria-label={isFlipped ? 'Show front' : 'Show back'}>
                <FlipCameraAndroidIcon sx={{ fontSize: 35 }} />
              </IconButton>
            )}
          </Grid>
          <Grid className="card-page-card-info" size={{ xs: 16, sm: 16, md: 8 }}>
            <div className="row">
              <span className="label flex-center">Card Name:</span>
              <span className="value">{cardFace1?.name}</span>
            </div>
              <div className="row">
              <span className="label flex-center">Mana Cost:</span>
              <span className="value" style={{whiteSpace: "pre-wrap"}}>{cardFace1?.oracleText ? replaceManaSymbols(cardFace1?.manaCost ?? '', 'medium') : null}</span>
            </div>
            <div className="row">
              <span className="label">Card Text:</span>
              <span className="value" style={{whiteSpace: "pre-wrap"}}>{cardFace1?.oracleText ? replaceManaSymbols(cardFace1?.oracleText ?? '') : null}</span>
            </div>
            <div className="row">
              <span className="label flex-center">Rarity:</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>{card?.rarity}</span>
            </div>
            <div className="row">
              <span className="label flex-center">Artist:</span>
              <span className="value">{card?.artist}</span>
            </div>
          </Grid>
        </Grid>
      </Box> 
    </>
  );
}

export default DoubleFaceCardInfo;