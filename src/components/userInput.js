import React from "react";
import { Link } from "react-router-dom";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      formErrors: false
    };
  }

  handleFormSubmit(e, player) {
    const { player1, player2 } = this.state;
    if (player1 !== "" || player2 !== "") {
      if (player === "player1") {
        localStorage.setItem("x", player1);
      } else {
        localStorage.setItem("o", player2);
      }
    } else {
      e.preventDefault();
      this.setState({ formErrors: true });
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

    return (
      <div>
        {player1 === null ? (
          <form onSubmit={e => this.handleFormSubmit(e, "player1")}>
            <label>
              Player 1:{" "}
              <input
                name="player1"
                value={this.state.player1}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Go</button>
            {formErrors && <p>You can't be nameless!</p>}
          </form>
        ) : (
          <p>Player 1: {player1}</p>
        )}
        {!!player1 &&
          (player2 === null ? (
            <form onSubmit={e => this.handleFormSubmit(e, "player2")}>
              <label>
                Player 2:{" "}
                <input
                  name="player2"
                  value={this.state.player2}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Go</button>
              {formErrors && <p>You can't be nameless!</p>}
            </form>
          ) : (
            <p>Player 2: {player2}</p>
          ))}

        {!!player1 &&
          !!player2 && (
            <Link to="/board">
              <button>Let's play!</button>
            </Link>
          )}
      </div>
    );
  }
}

export default UserInput;
