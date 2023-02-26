import { useState } from "react";
import Board from "./Board";

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  let moves = convertToListItems(history);

  function convertToListItems(element) {
    return element.map((_, move) => {
      if (move === currentMove) {
        return (
          <li key={move}>
            {move === 0 ? `Starting position` : `You are at the move #${move}`}
          </li>
        );
      }
      let description = move > 0 ? `Go to move # ${move}` : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => {
              const elements = document.getElementsByClassName("square");
              for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("highlight");
              }
              setCurrentMove(move);
            }}
          >
            {description}
          </button>
        </li>
      );
    });
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol id="list">{moves}</ol>
      </div>
    </div>
  );
};

export default App;
