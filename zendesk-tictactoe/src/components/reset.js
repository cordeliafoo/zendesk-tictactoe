import React from "react";
import { Link } from "react-router-dom";

class Reset extends React.Component {
  handleOnReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <Link to="/">
          <button onClick={this.handleOnReset}>Reset Game</button>
        </Link>
      </div>
    );
  }
}

export default Reset;
