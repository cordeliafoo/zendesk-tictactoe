import React from "react";

import "../styles/reset.css";

class Reset extends React.Component {
  handleOnReset = () => {
    localStorage.clear();
    window.location = process.env.PUBLIC_URL;
  };

  render() {
    return (
      <div className="resetContainer">
        <button onClick={this.handleOnReset}>Reset Game</button>
      </div>
    );
  }
}

export default Reset;
