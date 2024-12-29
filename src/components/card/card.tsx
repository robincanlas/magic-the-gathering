import { useParams } from "react-router";

const Card = () => {
  const { id } = useParams();

  return (
    <div>card {id}</div>
  );
}

export default Card;