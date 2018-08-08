import React from 'react';
import produce from 'immer';
import DragCard from '../containers/DragCard';
import DropList from '../containers/DropList';

const List = ({
  cards, move, index, curMove, justMove,
}) => {
  const selectedKey = curMove ? curMove.key : 0;

  const TreeCard = ({ card }) => {
    if (!card) {
      return null;
    }
    return (
      <DragCard
        selected={selectedKey === card.key}
        index={index}
        cardKey={card.key}
        key={card.key}
        move={move}
        num={card.num}
      >
        <TreeCard card={card.children} />
      </DragCard>
    );
  };

  let treeCards;
  let treeCardsElement = null;

  if (cards.length > 0) {
    treeCards = produce(cards, (draft) => {
      let prevCard = null;
      draft.reduce((prev, card) => {
        prevCard = prev;
        prevCard.children = card;
        return card;
      });
    });
    treeCardsElement = <TreeCard card={treeCards[0]} />;
  }

  return (
    <div
      className="cards-list"
      onClick={() => {
        move({
          index,
        });
      }}
    >
      {treeCardsElement}
      <DropList index={index} cards={cards} justMove={justMove} />
    </div>
  );
};

export default List;
