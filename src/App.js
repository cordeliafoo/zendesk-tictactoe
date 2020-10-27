import { BrowserRouter, Route } from "react-router-dom";

import UserInput from "./components/userInput.js";
import Board from "./components/board.js";
import Reset from "./components/reset.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <BrowserRouter
        // basename="http://cordeliafoo.github.io/zendesk-tictactoe"
        basename={process.env.PUBLIC_URL}
      >
        <div className="appContainer">
          <div>
            <Route exact path="/" component={UserInput} />
            <Route path="/board" component={Board} />
          </div>
          <div>
            <Reset />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
