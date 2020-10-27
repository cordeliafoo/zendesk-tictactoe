var winCount = 3;

function checkRows(playerChosen, grid, gridLength) {
  for (let row = 0; row < gridLength; row++) {
    let count = 0;
    for (let col = 0; col < gridLength; col++) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("win on row");
        return true;
      }
    }
  }
}

function checkCols(playerChosen, grid, gridLength) {
  for (let col = 0; col < gridLength; col++) {
    let count = 0;
    for (let row = 0; row < gridLength; row++) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("win on col");
        return true;
      }
    }
  }
}

function checkDiagLR(playerChosen, grid, gridLength) {
  // Diagonal line running from top left corner to bottom right corner

  let count = 0;
  let maxLength = gridLength - winCount + 1;

  // Looking at left portion of diagonal line (including middle strip)
  for (let rowStart = 0; rowStart < maxLength; rowStart++) {
    for (
      let row = rowStart, col = 0;
      row < gridLength && col < gridLength;
      row++, col++
    ) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("Win left portion of diagonal top left to bottom right");
        return true;
      }
    }
  }

  // Looking at right portion of diagonal line (excluding middle strip)
  for (var colStart = 1; colStart < maxLength; colStart++) {
    for (
      var col = colStart, row = 0;
      col < gridLength && row < gridLength;
      col++, row++
    ) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("Win right portion of diagonal top left to bottom right");
        return true;
      }
    }
  }
}

function checkDiagRL(playerChosen, grid, gridLength) {
  // Diagonal line running from top right corner to bottom left corner

  var count = 0;
  var maxLength = gridLength - winCount + 1;

  // Looking at right portion of diagonal line (including middle strip)
  for (let rowStart = 0; rowStart < maxLength; rowStart++) {
    for (
      let row = rowStart, col = gridLength - 1;
      row < gridLength && col >= 0;
      row++, col--
    ) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("Win right portion of diagonal top right to bottom left");
        return true;
      }
    }
  }

  // Looking at left portion of diagonal line (excluding middle strip)
  for (let colStart = gridLength - 2; colStart > winCount - 2; colStart--) {
    for (
      var col = colStart, row = 0;
      col >= 0 && row <= gridLength - 2;
      col-- && row++
    ) {
      if (grid[row][col] === playerChosen) {
        count++;
      } else {
        count = 0;
      }
      if (count === winCount) {
        console.log("Win left portion of diagonal top right to bottom left");
        return true;
      }
    }
  }
}

export function findWinner(playerChosen, grid, gridLength) {
  if (checkRows(playerChosen, grid, gridLength)) {
    return localStorage.getItem(playerChosen);
  }
  if (checkCols(playerChosen, grid, gridLength)) {
    return localStorage.getItem(playerChosen);
  }
  if (checkDiagLR(playerChosen, grid, gridLength)) {
    return localStorage.getItem(playerChosen);
  }
  if (checkDiagRL(playerChosen, grid, gridLength)) {
    return localStorage.getItem(playerChosen);
  }
  // Otherwise do nothing
  return null;
}

export function areAllSquaresClicked(grid, gridLength) {
  // Declare variable to store number of clicked squares.
  let count = 0;

  // Iterate over all squares
  for (let row = 0; row < gridLength; row++) {
    for (let col = 0; col < gridLength; col++) {
      if (grid[row][col] !== null) {
        count++;
      }
    }
  }

  // Check if all squares are clicked (filled)
  if (count === gridLength * gridLength) {
    return true;
  } else {
    return false;
  }
}
