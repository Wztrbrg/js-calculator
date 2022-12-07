const btnContainer = document.querySelector(".btn-container");
const btnToolbar = document.querySelector(".btn-toolbar");
const display = document.querySelector(".display");
//list with all symbols in order
const symbols = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", ".", 0, "=", "/"];
//seperate list for bottom symbols
const toolbar = ["(", ")", "Undo", "Clear"];

//function handeling the evaluation of current expression in "display"
function handleSymbolClick(symbol) {
  let result = display.innerText;

  if (symbol == "=") {
    //calculates expression if symbol is "="
    result = result + symbol + eval(display.innerText);
    console.log(result);
  } else {
    result = result + symbol; //Adding only new symbol
  }
  display.innerText = result; //Updating display with result
}

//function for generating buttons with corresponding symbol from symbol list
function createSymbolButton(symbol) {
  const button = document.createElement("button");
  button.innerText = symbol;
  button.className = "symbol-btn";

  if (isNaN(symbol) && symbol != ".") {
    button.classList.add("operation-btn");
  }

  //event listener for every symbol
  button.addEventListener("click", (event) => {
    handleSymbolClick(symbol);
  });

  return button;
}

//handling "tool button" clicks
function handleToolbarClick(tool) {
  let result = display.innerText;

  //clear text from "display"
  if (tool == "Clear") {
    result = display.innerText = "";
    //undo last digit
  } else if (tool == "Undo") {
    let newResult = display.innerText.slice(0, -1);
    result = newResult;
  } else if (tool == "(" || ")") {
    result = result + tool;
  }
  display.innerText = result;
}

//function for generating buttons with corresponding tool from toolbar list
function createToolbarButtons(tool) {
  const button = document.createElement("button");
  button.innerText = tool;
  button.className = "tool-btn";

  //add listener for every tollbtn som skickar tool till "handleToolbarClick"
  //event listener for every tool
  button.addEventListener("click", (event) => {
    handleToolbarClick(tool);
  });
  return button;
}

//function for assigning symbols to buttons and appending them to given "container"
function addButtonSymbols(container) {
  //looping through symbol list and gnereating a button with each symbol
  for (let symbol of symbols) {
    let symbolButton = createSymbolButton(symbol);
    container.append(symbolButton);
  }
}

//function for assigning tool to buttons and appending them to given "container"
function addButtonTools(container) {
  //looping through toolbar list and gnereating a button with each tool
  for (let tool of toolbar) {
    let toolButton = createToolbarButtons(tool);
    container.append(toolButton);
  }
}

//initializing all calculator related things
function initializeCalculator() {
  addButtonSymbols(btnContainer);
  addButtonTools(btnToolbar);
}

function updateDisplay() {}

initializeCalculator();
