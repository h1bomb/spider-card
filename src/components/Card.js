import React from "react";

const Card = ({
  num,
  index,
  move,
  cardKey,
  selected,
  children,
  isDragging,
  connectDragSource
}) => {
  console.log('isDragging:',isDragging);
  if(!connectDragSource) {
    connectDragSource = function(com) {
      return com;
    }
  }
  return connectDragSource(<div style={{ opacity: isDragging ? 0.1 : 1 }}>
    <div
      onClick={e => {
        if (!move) return;
        move({ num, index, cardKey });
        e.stopPropagation();
      }}
      className={selected ? "card selected" : "card"}
    >
      {num}
    </div>
    {children}
  </div>)
};

export default Card;
