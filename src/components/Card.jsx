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
        {num}
      </div>
      {children}
    </div>,
  );
};

export default Card;
