import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import useCardStore, { CardData } from "../../store/cardStore";
import './card.css';
import CardText from "./card-text";

const CardInfo = () => {
  const card = useCardStore((state) => state.card);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 16, sm: 16, md: 16 }}>
          <Grid size={{ xs: 16, sm: 16, md: 8 }} sx={{ display: 'flex', justifyContent: 'center'}}>
          <img className="card-page-card-image" src={card?.imageUris.normal} alt={card?.name} />
          </Grid>
          <Grid className="card-page-card-info" size={{ xs: 16, sm: 16, md: 8 }}>
            <div className="row">
              <span className="label">Card Name:</span>
              <span className="value">{card?.name}</span>
            </div>
            <div className="row">
              <span className="label">Card Text:</span>
              <span className="value" style={{whiteSpace: "pre-wrap"}}><CardText oracleText={card?.oracleText} /></span>
            </div>
            <div className="row">
              <span className="label">Rarity:</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>{card?.rarity}</span>
            </div>
            <div className="row">
              <span className="label">Artist:</span>
              <span className="value">{card?.artist}</span>
            </div>
          </Grid>
        </Grid>
      </Box> 
    </>
  );
}

export default CardInfo;