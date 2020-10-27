import React from "react";
import { Link } from "react-router-dom";

import "../styles/userInput.css";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      formErrors: {},
      boardSize: 3
    };
  }

  handleNameFormSubmit(e, player) {
    const { player1, player2 } = this.state;
    if (player1 !== "" || player2 !== "") {
      if (player === "player1") {
        localStorage.setItem("x", player1);
      } else {
        localStorage.setItem("o", player2);
      }
    } else {
      e.preventDefault();
      this.setState({ formErrors: { name: "You can't be nameless!" } });
    }
  }

  handleBoardSizeFormSubmit(e) {
    const { boardSize } = this.state;
    if (boardSize > 2) {
      localStorage.setItem("boardSize", boardSize);
    } else {
      e.preventDefault();
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          boardSize: "Board size needs to be at least 3"
        }
      });
    }
  }

  handleChange = event => {
    const input = event.target;
    this.setState({ [input.name]: input.value });
  };

  render() {
    const { formErrors } = this.state;

    let player1 = localStorage.getItem("x");
    let player2 = localStorage.getItem("o");
    let boardSize = localStorage.getItem("boardSize");

    return (
      <div className="formsContainer">
        <div className="nameFormsContainer">
          {player1 === null ? (
            <form onSubmit={e => this.handleNameFormSubmit(e, "player1")}>
              <label>
                Player 1:{" "}
                <input
                  name="player1"
                  value={this.state.player1}
                  onChange={this.handleChange}
                  placeholder="enter your name"
                />
              </label>
              <button type="submit">Go</button>
              {formErrors && <p className="formError">{formErrors.name}</p>}
            </form>
          ) : (
            <p>Player 1: {player1}</p>
          )}
          {!!player1 &&
            (player2 === null ? (
              <form onSubmit={e => this.handleNameFormSubmit(e, "player2")}>
                <label>
                  Player 2:{" "}
                  <input
                    name="player2"
                    value={this.state.player2}
                    onChange={this.handleChange}
                    placeholder="enter your name"
                  />
                </label>
                <button type="submit">Go</button>
                {formErrors && <p className="formError">{formErrors.name}</p>}
              </form>
            ) : (
              <p>Player 2: {player2}</p>
            ))}
        </div>

        {!!player1 &&
          !!player2 && (
            <div className="boardSizeFormContainer">
              {boardSize === null ? (
                <form onSubmit={e => this.handleBoardSizeFormSubmit(e)}>
                  <label>
                    <span>Board Size (enter a number between 3 - 100)</span>
                    <input
                      type="number"
                      name="boardSize"
                      value={this.state.boardSize}
                      onChange={this.handleChange}
                    />
                  </label>
                  <button type="submit">Go</button>
                  {formErrors && (
                    <p className="formError">{formErrors.boardSize}</p>
                  )}
                </form>
              ) : (
                <p>
                  Board Size: {boardSize} x {boardSize}
                </p>
              )}
            </div>
          )}
        <br />
        {!!player1 &&
          !!player2 &&
          !!boardSize && (
            <div className="playButton">
              <Link to={"/board/"}>
                <button>Let's play!</button>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default UserInput;
