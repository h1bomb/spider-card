import React from 'react';
import Card from './Card';

const Stack = ({ cards, add }) => (
  <div className='cards-stack' onClick={add}>
    {cards.map((card) => (
      <Card key={card.key} num={card.num} />
    ))}
  </div>
);

export default Stack;
