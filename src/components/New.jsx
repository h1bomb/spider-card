import React from 'react';
import Confetti from 'react-confetti';
import sizeMe from 'react-sizeme';

const WinCom = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Win extends React.PureComponent {
  render() {
    const { size, win } = this.props;
    if (!win) {
      return null;
    }
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      }}
      >
        <h1>
YOU WIN!
        </h1>
        <Confetti width={size.width} height="1000" />
      </div>
    );
  }
});

export default ({ newGame, win }) => (
  <div className="new-game">
    <button type="button" onClick={newGame}>
       New game
    </button>
    <WinCom win={win} />
  </div>
);
