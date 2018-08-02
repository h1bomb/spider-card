import React from 'react';
const Card = ({ num, index, move, cardKey, selected }) => (
  <div
    onClick={(e) => {
      if (!move) return;
      move({ num, index,cardKey });
      e.stopPropagation();
    }}
    className={selected ? 'card selected' : 'card'}
  >
    {num}
  </div>
);

export default Card;
