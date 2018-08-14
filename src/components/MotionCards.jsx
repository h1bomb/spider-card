import React from 'react';
import { Trail, animated, interpolate } from 'react-spring';
import Card from './Card';

const MotionCards = ({ activeItems, go }) => {
  let move = null;
  const keys = activeItems.map(v => v.key);
  if (activeItems.length > 0) {
    move = (
      <Trail
        native
        from={{ x: 0, y: 0 }}
        to={{ x: -85, y: -570 }}
        keys={keys}
      >
        {activeItems.map((val, key) => ({ x, y }) => {
          const { size } = val;
          return (
            <animated.div
              key={`m${val.key}`}
              onClick={() => {
                go();
              }}
              style={{
                zIndex: 100,
                transform: interpolate([x, y], (mx, my) => `translate3d(${(mx * key - 85)}px,${my + size * 36}px,0)`),
              }}
            >
              <Card key={val.key} num={val.num} />
            </animated.div>
          );
        })}
      </Trail>
    );
  }
  return move;
};

export default MotionCards;
