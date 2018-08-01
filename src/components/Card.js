import React from "react";
const Card = ({ isFace, num, isLast, index, move, cardKey,selected }) => (
  <div
    onClick={(e) => {
      if (!move) return;
      move({ num, isFace, isLast, index,cardKey });
      e.stopPropagation();
    }}
    className={selected ? "card selected" : "card"}
  >
    {num}
  </div>
);

export default Card;
