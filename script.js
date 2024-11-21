
/*const firstOperand = document.getElementById("question-first-operand");
const secondOperand = document.getElementById("question-second-operand");
const operator = document.getElementById("question-operator");

const firstOption = document.getElementById("answer-one");
const secondOption = document.getElementById("answer-two");
const thirdOption = document.getElementById("answer-three");

const randomNumber = (min, max) => {
  let number = Math.floor(Math.random() * 100);
  if (number >= min && number <= max) return number;
  else return randomNumber(min, max);
};

let finalResult = -1;

const addition = () => {
  let firstNumber = randomNumber(0, 20);
  let secondNumber = randomNumber(0, 20);

  finalResult = firstNumber + secondNumber;

  firstOperand.innerText = firstNumber;
  secondOperand.innerText = secondNumber;
  operator.innerText = "+";

  optionsManager();
};

const subtraction = () => {
  let firstNumber = randomNumber(10, 20);
  let secondNumber = randomNumber(0, 10);

  finalResult = firstNumber - secondNumber;

  firstOperand.innerText = firstNumber;
  secondOperand.innerText = secondNumber;
  operator.innerText = "-";
  optionsManager();
};

const multiplication = () => {
  let firstNumber = randomNumber(0, 10);
  let secondNumber = randomNumber(0, 10);

  finalResult = firstNumber * secondNumber;

  firstOperand.innerText = firstNumber;
  secondOperand.innerText = secondNumber;
  operator.innerText = "x";
  optionsManager();
};

const division = () => {
  do {
    firstNumber = randomNumber(6, 10);
    secondNumber = randomNumber(1, 5);
  } while (firstNumber % 2 !== 0 || secondNumber % 2 !== 0);

  finalResult = firstNumber / secondNumber;

  firstOperand.innerText = firstNumber;
  secondOperand.innerText = secondNumber;
  operator.innerText = "÷";
  optionsManager();
};

// const optionsManager = () => {
//   firstOption.innerText = randomNumber(1, 20);
//   thirdOption.innerText = randomNumber(1, 20);

//   let number = randomNumber(1, 3);

//   if (number == 1) {
//     firstOption.innerText = finalResult;

//     let value2 = randomNumber(1, 20);
//     if (value2 == finalResult) return randomNumber(1, 20);
//     secondOption.innerText = value;

//     let value3 = randomNumber(1, 20);
//     if (value3 == finalResult || value2) return randomNumber(1, 20);
//     thirdOption.innerText = value;
//   } else if (number == 2) {
//     secondOption.innerText = finalResult;

//     value1 = randomNumber(1, 20);
//     if (value1 == finalResult) return randomNumber(1, 20);
//     firstOptionOption.innerText = value;

//     value3 = randomNumber(1, 20);
//     if (value3 == finalResult || value1) return randomNumber(1, 20);
//     thirdOption.innerText = value;
//   } else {
//     thirdOption.innerText = finalResult;

//     value1 = randomNumber(1, 20);
//     if (value1 == finalResult) return randomNumber(1, 20);
//     firstOptionOption.innerText = value;

//     value2 = randomNumber(1, 20);
//     if (value2 == finalResult || value1) return randomNumber(1, 20);
//     secondOption.innerText = value;
//   }

//   finalResult = -1;
// };

const optionsManager = () => {
  // Generate the correct option (finalResult)
  const correctOption = finalResult;

  // Generate two random options that aren't the correct answer
  let firstOptionValue = randomNumber(1, 20);
  while (firstOptionValue === correctOption) {
    firstOptionValue = randomNumber(1, 20); // Regenerate if the number is the same as the correct answer
  }

  let secondOptionValue = randomNumber(1, 20);
  while (secondOptionValue === correctOption || secondOptionValue === firstOptionValue) {
    secondOptionValue = randomNumber(1, 20); // Regenerate if it's the same as the correct or the first option
  }

  // Assign values to the options
  let number = randomNumber(1, 3); // Randomly choose where to place the correct option

  if (number === 1) {
    firstOption.innerText = correctOption;
    secondOption.innerText = firstOptionValue;
    thirdOption.innerText = secondOptionValue;
  } else if (number === 2) {
    secondOption.innerText = correctOption;
    firstOption.innerText = firstOptionValue;
    thirdOption.innerText = secondOptionValue;
  } else {
    thirdOption.innerText = correctOption;
    firstOption.innerText = firstOptionValue;
    secondOption.innerText = secondOptionValue;
  }
  if (validator(firstOption)==true) console.log("correct");
  else if (validator(secondOption)==true) alert("correct")
  else if (validator(thirdOption)==true) alert("correct");

};

const validator = (option) => {
  option.addEventListener('click', (e) => {
    const value = e.target.innerText;
    if (finalResult == value) return true;
    else return false;
  })
}


  // Reset finalResult
  finalResult = -1;
  */

// Selecting elements
const firstOperand = document.getElementById("question-first-operand");
const secondOperand = document.getElementById("question-second-operand");
const operator = document.getElementById("question-operator");

const firstOption = document.getElementById("answer-one");
const secondOption = document.getElementById("answer-two");
const thirdOption = document.getElementById("answer-three");

// Utility function to generate random numbers within a range
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let finalResult = -1; // Stores the correct answer

// Math operation functions
const addition = () => {
  generateQuestion("+", 0, 20, (a, b) => a + b);
};

const subtraction = () => {
  generateQuestion("-", 10, 20, (a, b) => a - b, 0, 10);
};

const multiplication = () => {
  generateQuestion("x", 0, 10, (a, b) => a * b);
};

const division = () => {
  let firstNumber, secondNumber;
  do {
    firstNumber = randomNumber(6, 10);
    secondNumber = randomNumber(1, 5);
  } while (firstNumber % secondNumber !== 0);

  generateQuestion("÷", firstNumber, secondNumber, (a, b) => a / b);
};

// Generalized function to generate questions
const generateQuestion = (op, min1, max1, operation, min2 = min1, max2 = max1) => {
  const firstNumber = randomNumber(min1, max1);
  const secondNumber = randomNumber(min2, max2);

  finalResult = operation(firstNumber, secondNumber);

  // Display the question
  firstOperand.innerText = firstNumber;
  secondOperand.innerText = secondNumber;
  operator.innerText = op;

  // Generate answer options
  optionsManager();
};

// Function to manage options
const optionsManager = () => {
  const correctOption = finalResult;

  // Generate two unique random options that are not the correct answer
  const options = new Set([correctOption]);
  while (options.size < 3) {
    const randomOption = randomNumber(1, 20);
    if (randomOption !== correctOption) options.add(randomOption);
  }

  // Randomize the order of options
  const optionArray = Array.from(options);
  shuffleArray(optionArray);

  // Assign options to buttons
  [firstOption, secondOption, thirdOption].forEach((btn, index) => {
    btn.innerText = optionArray[index];
    btn.onclick = () => validateAnswer(optionArray[index]); // Attach click handler
  });

  // Reset finalResult
};

// Validate the clicked option
const validateAnswer = (selectedValue) => {
  if (selectedValue === finalResult) {
    alert("Correct!");
    generateNextQuestion(); // Generate the next question
  } else {
    alert("Wrong! Try again.");
  }
};

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Generate the next question based on the current operator
const generateNextQuestion = () => {
  const currentOperator = operator.innerText;
  switch (currentOperator) {
    case "+":
      addition();
      break;
    case "-":
      subtraction();
      break;
    case "x":
      multiplication();
      break;
    case "÷":
      division();
      break;
    default:
      addition(); // Default to addition if no operator is set
  }
};

// Start the first question when the page loads
addition();
finalResult = -1;


/*

akshat's branch
2nd commit
*/