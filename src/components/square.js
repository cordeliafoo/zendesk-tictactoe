import React from "react";

const gridLength = localStorage.getItem("boardSize");

const style = {
  height: `calc(${gridLength * 5}vw/${gridLength})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const Square = props => {
  return (
    <button className="square" onClick={props.onClick} style={style}>
      {props.value}
    </button>
  );
};

export default Square;
