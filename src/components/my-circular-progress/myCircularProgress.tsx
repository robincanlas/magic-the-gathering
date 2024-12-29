import { CircularProgress } from "@mui/material";
import './myCircularProgress.css';

const MyCircularProgress = () => {
  return (
    <div className="loading-container">
      <CircularProgress color="inherit" />
    </div>
  )
}

export default MyCircularProgress;