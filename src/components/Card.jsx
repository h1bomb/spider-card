import React from 'react';

// card show code map
const faceCode = {
  13: 'K', 12: 'Q', 11: 'J', 1: 'A',
};

const Card = ({
  num,
  index,
  move,
  cardKey,
  selected,
  children,
  isDragging,
  connectDragSource,
}) => {
  const connect = connectDragSource || (com => com);
  return connect(
    <div style={{ opacity: isDragging ? 0.1 : 1 }}>
      <div
        onClick={(e) => {
          if (!move) return;
          move({ num, index, cardKey });
          e.stopPropagation();
        }}
        className={selected ? 'card selected' : 'card'}
      >
        <span>
        &spades;
        </span>
        {faceCode[num] ? faceCode[num] : num}
      </div>
      {children}
    </div>,
  );
};

export default Card;
