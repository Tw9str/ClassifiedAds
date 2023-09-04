import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function SubmitRating() {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingHover = (hoveredStar) => {
    setHoveredRating(hoveredStar);
  };

  const handleRatingClick = (selectedStar) => {
    setSelectedRating(selectedStar);
  };

  const handleMouseLeave = () => {
    setHoveredRating(selectedRating);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          className={`cursor-pointer duration-300 ${
            hoveredRating >= star || selectedRating >= star
              ? "text-star"
              : "text-neutral-400"
          }`}
          key={star}
          onClick={() => handleRatingClick(star)}
          onMouseEnter={() => handleRatingHover(star)}
          onMouseLeave={handleMouseLeave}
        >
          <AiFillStar />
        </button>
      ))}
    </div>
  );
}
