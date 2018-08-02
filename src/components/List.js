import React from 'react';
import Card from './Card';

const List = ({ cards, move, index, curMove }) => {
  const selectedKey = curMove ? curMove.key : 0;
  return (
    <div
      className='cards-list'
      onClick={() => {
        move({ index });
      }}
    >
      {cards.map(card => (
        <Card
          selected={selectedKey===card.key}
          index={index}
          cardKey={card.key}
          key={card.key}
          move={move}
          num={card.num}
        />
      ))}
    </div>
  );
};

export default List;
