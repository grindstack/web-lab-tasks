const previous = document.getElementById('previous'); // shows expression
const resultDisplay = document.getElementById('result'); // shows result
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Variable to store user input
let currentInput = "";

// Handle number and operator buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    currentInput += value;
    previous.textContent = currentInput; // show current expression
    console.log(`Button clicked: ${value}`);
  });
});

// Handle Clear (C) button
clearButton.addEventListener('click', () => {
  currentInput = "";
  previous.textContent = "";
  resultDisplay.textContent = "0";
  console.log("Calculator cleared");
});

// Handle Equals (=) button
equalsButton.addEventListener('click', () => {
  try {
    if (currentInput.trim() === "") {
      alert("Please enter a valid expression!");
      return;
    }

    // Safely evaluate the expression
    const result = eval(currentInput);

    // Update both displays
    resultDisplay.textContent = result;
    previous.textContent = currentInput;

    console.log(`Expression: ${currentInput}`);
    console.log(`Result: ${result}`);

    // Allow chaining (e.g., pressing + after result)
    currentInput = result.toString();

  } catch (error) {
    console.error("Invalid expression!", error);
    alert("Error: Invalid input!");
  }
});
