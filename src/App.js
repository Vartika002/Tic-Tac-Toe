import React, { useState } from "react";
import "./App.css";

const Player = {
  A: 0,
  B: 1,
};

const PlayerMoves = {
  [Player.A]: "",
  [Player.B]: "",
};

const winningCondition = [
  "012",
  "345",
  "678",
  "036",
  "147",
  "258",
  "048",
  "246",
];

function App() {
  const [player, setPlayer] = useState(Player.A);
  const [playerMoves, setPlayerMoves] = useState({ ...PlayerMoves });
  const [hasWon, setHasWon] = useState(false);

  const handleClick = (e) => {
    const whichPlayer = e?.target?.dataset?.playerType;
    const moveId = e?.target?.getAttribute("data-move-id");

    if (!whichPlayer) {
      return;
    }
    const prevMoves = { ...playerMoves };
    prevMoves[whichPlayer] = `${prevMoves[whichPlayer]}${moveId}`;

    const isWin = winningCondition.some((win) => {
      const playerSteps = prevMoves[whichPlayer];
      return playerSteps.split("").sort().join("").includes(win);
    });

    setHasWon(isWin);

    if (isWin) {
      setPlayer(Player.A);
      setPlayerMoves({ ...PlayerMoves });
    } else {
      const currentPlayer = player === Player.A ? Player.B : Player.A;
      setPlayer(currentPlayer);
      setPlayerMoves(prevMoves);
    }
    console.log({ whichPlayer, moveId, prevMoves });
  };

  return (
    <div className="App">
      <div onClick={handleClick} className="board">
        {Array.from(new Array(9)).map((_, index) => {
          console.log(
            "PlayerMoves",
            playerMoves,
            "whichPLayer",
            playerMoves[player]
          );

          let mark = "";
          if (playerMoves[Player.A]?.includes(`${index}`)) {
            mark = "X";
          } else if (playerMoves[Player.B]?.includes(`${index}`)) {
            mark = "0";
          }

          return (
            <button
              key={index}
              data-player-type={mark ? "" : player}
              data-move-id={index}
            >
              {mark}
            </button>
          );
        })}
      </div>

      {hasWon && <h1>{player} has won!!</h1>}
    </div>
  );
}

export default App;
