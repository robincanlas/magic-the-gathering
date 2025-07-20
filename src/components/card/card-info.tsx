import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import useCardStore from "../../store/cardStore";
import './card.css';
import './mana.css';
import useReplaceManaSymbols from "../../hooks/useReplaceManaSymbols";

const CardInfo = () => {
  const card = useCardStore((state) => state.card);
  const replaceManaSymbols = useReplaceManaSymbols();

  return (
    <>
      <Box className="card-page-card-info-wrapper" sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} columns={{ xs: 16, sm: 16, md: 16 }}>
          <Grid height={{ xs: 700, sm: 700, md: 'auto' }} size={{ xs: 16, sm: 16, md: 8 }} sx={{ display: 'flex', justifyContent: 'center'}}>
          <img className="card-page-card-image" src={card?.imageUris.normal} alt={card?.name} />
          </Grid>
          <Grid className="card-page-card-info" size={{ xs: 16, sm: 16, md: 8 }}>
            <div className="row">
              <span className="label flex-center">Card Name:</span>
              <span className="value">{card?.name}</span>
            </div>
              <div className="row">
              <span className="label flex-center">Mana Cost:</span>
              <span className="value" style={{whiteSpace: "pre-wrap"}}>{card?.oracleText ? replaceManaSymbols(card?.manaCost, 'medium') : null}</span>
            </div>
            <div className="row">
              <span className="label">Card Text:</span>
              <span className="value" style={{whiteSpace: "pre-wrap"}}>{card?.oracleText ? replaceManaSymbols(card?.oracleText) : null}</span>
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

export default CardInfo;