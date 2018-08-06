import React from 'react';

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
  const faceCode = {
    13: 'K', 12: 'Q', 11: 'J', 1: 'A',
  };
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
        {faceCode[num] ? faceCode[num] : num}
        <span>
        &spades;
        </span>
      </div>
      {children}
    </div>,
  );
};

export default Card;
