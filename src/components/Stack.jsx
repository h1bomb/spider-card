import React from 'react';
import Card from './Card';
import MotionCards from './MotionCards';

const Stack = ({ cards, add, activeItems }) => (
  <div className="cards-stack" onClick={add}>
    <MotionCards activeItems={activeItems} />
    {cards.map(card => (
      <Card key={card.key} num={card.num} />
    ))}
  </div>
);

export default Stack;
