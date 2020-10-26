import React from "react";

import Square from "./square.js";
import * as utils from "../utils/functions";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      gridLength: 3,
      gameOverWithWinner: false,
      gameOverWithDraw: false,
      winner: ""
    };
  }

  handleSquareClick(index) {
    // get current state of boxes
    const squares = this.state.squares.slice();

    // Mark the square either as 'x' or 'o'
    const {
      xIsNext,
      gameOverWithWinner,
      gameOverWithDraw,
      gridLength
    } = this.state;

    if (gameOverWithWinner === false && gameOverWithDraw === false) {
      squares[index] = xIsNext ? "x" : "o";
      this.setState({
        squares: squares,
        xIsNext: !xIsNext
      });
    }

    const winner = utils.findWinner(squares);
    if (winner) {
      this.setState({ gameOverWithWinner: true, winner: winner });
    }

    if (utils.areAllSquaresClicked(squares, gridLength) === true) {
      this.setState({ gameOverWithDraw: true });
    }
  }

  render() {
    const style = {
      width: "250px",
      height: "250px",
      display: "grid",
      gridTemplate: `repeat(${this.state.gridLength}, 1fr)/repeat(${
        this.state.gridLength
      }, 1fr)`
    };

    const {
      gridLength,
      xIsNext,
      gameOverWithDraw,
      gameOverWithWinner,
      winner
    } = this.state;

    const x = localStorage.getItem("x");
    const o = localStorage.getItem("o");

    let gridLengthArr = [];
    for (let i = 0; i < gridLength * gridLength; i++) {
      gridLengthArr[i] = i;
    }

    const displayNextPlayer =
      gameOverWithDraw === false && gameOverWithWinner === false;

    return (
      <div className="boardContainer">
        {displayNextPlayer &&
          (xIsNext ? <p>{`${x}'s turn`}</p> : <p>{`${o}'s turn`}</p>)}

        {!!gameOverWithWinner && <p>{winner} wins!</p>}
        {!!gameOverWithDraw && <p>It's a tie!</p>}
        <div className="board" style={style}>
          {gridLengthArr.map((item, index) => (
            <Square
              key={index}
              value={this.state.squares[index]}
              onClick={() => this.handleSquareClick(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
