import React from "react";

import Square from "./square.js";
import * as utils from "../utils/functions";

import "../styles/board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    let gridLength = localStorage.getItem("boardSize") || 3;
    let defaultValues = this.fillBoardDefaultValues(gridLength);

    this.state = { ...defaultValues };
  }

  fillBoardDefaultValues(gridLength) {
    return {
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
    let gridLength = localStorage.getItem("boardSize") || 3;
    let defaultValues = this.fillBoardDefaultValues(gridLength);

    this.setState({ ...defaultValues });
  }

  render() {
    // console.table(this.state.grid);
    const style = {
      display: "grid",
      gridTemplate: `repeat(${this.state.gridLength}, 1fr)/repeat(${
        this.state.gridLength
      }, 1fr)`,
      marginBottom: "2em",
      width: `${this.state.gridLength * 5}vw`
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
        {!!gameOverWithDraw &&
          gameOverWithWinner === false && <p>It's a tie!</p>}
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
