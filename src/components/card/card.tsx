import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../constants";
import useCardStore from "../../store/cardStore";
import { useDebounceCallback } from "usehooks-ts";
import MyCircularProgress from "../my-circular-progress/myCircularProgress";

const Card = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const setCard = useCardStore((state) => state.setCard);
  const card = useCardStore((state) => state.card);

  const lazyLoad = useDebounceCallback(() => {
    axios.get(`${API_BASE_URL}/cards/${id}`)
    .then((response) => {
      setCard(response.data);
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
    <div>card {card.name}</div>
  );
}

export default Card;