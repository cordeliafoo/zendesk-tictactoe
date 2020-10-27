import React from "react";

import Square from "./square.js";
import * as utils from "../utils/functions";

import "../styles/board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    let gridLength = localStorage.getItem("boardSize") || 3;

    this.state = {
      xIsNext: true,
      gridLength: gridLength,
      grid: Array(parseInt(gridLength))
        .fill(null)
        .map(() => Array(parseInt(gridLength)).fill(null)),
      gameOverWithWinner: false,
      gameOverWithDraw: false,
      winner: "",
      showPlayAgainButton: false
    };
  }

  handleSquareClick(rowIndex, colIndex) {
    // get current state of boxes
    const grid = this.state.grid.slice();

    // Mark the square either as 'x' or 'o'
    const {
      xIsNext,
      gameOverWithWinner,
      gameOverWithDraw,
      gridLength
    } = this.state;

    if (
      gameOverWithWinner === false &&
      gameOverWithDraw === false &&
      grid[rowIndex][colIndex] === null
    ) {
      grid[rowIndex][colIndex] = xIsNext ? "x" : "o";
      this.setState({
        grid: grid,
        xIsNext: !xIsNext
      });
    }

    const winner = utils.findWinner(grid[rowIndex][colIndex], grid, gridLength);
    if (winner) {
      this.setState({
        gameOverWithWinner: true,
        winner: winner,
        showPlayAgainButton: true
      });
    }

    if (utils.areAllSquaresClicked(grid, gridLength) === true) {
      this.setState({ gameOverWithDraw: true, showPlayAgainButton: true });
    }
  }

  handlePlayAgainButton() {
    window.location.reload();
  }

  render() {
    // console.table(this.state.grid);
    const style = {
      width: "250px",
      height: "250px",
      display: "grid",
      gridTemplate: `repeat(${this.state.gridLength}, 1fr)/repeat(${
        this.state.gridLength
      }, 1fr)`
    };

    const {
      grid,
      xIsNext,
      gameOverWithDraw,
      gameOverWithWinner,
      winner,
      showPlayAgainButton
    } = this.state;

    const x = localStorage.getItem("x");
    const o = localStorage.getItem("o");

    const displayNextPlayer =
      gameOverWithDraw === false && gameOverWithWinner === false;

    return (
      <div className="boardContainer">
        {displayNextPlayer &&
          (xIsNext ? <p>{`${x}'s turn`}</p> : <p>{`${o}'s turn`}</p>)}

        {!!gameOverWithWinner && <p>{winner} wins!</p>}
        {!!gameOverWithDraw && <p>It's a tie!</p>}
        <div className="board" style={style}>
          {grid.map((rowItem, rowIndex) =>
            grid.map((colItem, colIndex) => (
              <Square
                key={`${rowIndex},${colIndex}`}
                value={this.state.grid[rowIndex][colIndex]}
                onClick={() => this.handleSquareClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
        {showPlayAgainButton && (
          <div>
            <button onClick={() => this.handlePlayAgainButton()}>
              Play again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
