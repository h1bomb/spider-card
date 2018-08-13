import React from 'react';
import { DropTarget } from 'react-dnd';


const Types = {
  CARD: 'card',
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

const spec = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const { cards, index, justMove } = props;
    const item = monitor.getItem();
    const lastCard = cards[cards.length - 1];
    const param = {
      move: {
        num: item.num,
        index: item.index,
        key: item.cardKey,
      },
      index,
      cardKey: cards.length > 0 ? lastCard.key : 0,
      num: cards.length > 0 ? lastCard.num : 0,
    };
    justMove(param);
  },
};

const Box = ({ connectDropTarget, isOverCurrent }) => connectDropTarget(
  <div style={{
    width: 80, height: 1500, position: 'relative', bottom: 520, left: -10, zIndex: isOverCurrent ? 0 : -1,
  }}
  />,
);

export default DropTarget(Types.CARD, spec, collect)(Box);
