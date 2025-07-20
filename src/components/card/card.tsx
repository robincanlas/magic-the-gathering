import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../../constants";
import useCardStore, { CardData } from "../../store/cardStore";
import { useDebounceCallback } from "usehooks-ts";
import MyCircularProgress from "../my-circular-progress/myCircularProgress";
import useCardSearch from "../../hooks/useCardSearch";
import CardInfo from "./card-info";
import { Button, Container } from "@mui/material";

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const setCard = useCardStore((state) => state.setCard);
  const card = useCardStore((state) => state.card);
  const { getCardDataForView } = useCardSearch();

  const lazyLoad = useDebounceCallback(() => {
    axios.get(`${API_BASE_URL}/cards/${id}`)
    .then((response) => {
      setCard(getCardDataForView(response.data as CardData));
    }).catch((error) => {
      console.log("🚀 ~ file: card.tsx:15 ~ .then ~ error:", error)
    }).finally(() => {
      setLoading(false);
    });
  }, 500);

  useEffect(() => {
    if (id) {
      lazyLoad();
    }
  }, [id]);


  if (loading) {
    return <MyCircularProgress />;
  }

  if (!card) {
    return <div>Card not found</div>;
  }


  return (
    <div className="card-page">
      <Button onClick={() => navigate(`/`)}>Back to Homepage</Button>
      <Container maxWidth="md" sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
        <CardInfo />
      </Container>
    </div>
  );
}

export default CardPage;