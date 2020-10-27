import { BrowserRouter, Route } from "react-router-dom";

import UserInput from "./components/userInput.js";
import Board from "./components/board.js";
import Reset from "./components/reset.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="headingContainer">
        <div>
          <h1>Tic Tac Toe</h1>
        </div>

        <Reset />
      </div>

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="appContainer">
          <div>
            <Route exact path="/" component={UserInput} />
            <Route path="/board" component={Board} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
