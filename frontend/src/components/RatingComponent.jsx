import { useState } from "react";
import Rating from "@mui/material/Rating";

const RatingComponent = () => {
  const [stars, setStars] = useState(0);
  return (
    <>
      <Rating
        name="rating"
        defaultValue={stars}
        precision={0.5}
        value={stars}
        onChange={(evt, newValue) => setStars(newValue)}
      />
    </>
  );
};

export default RatingComponent;
