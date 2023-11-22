// Global constants and variables
const numberOfDigits = 10; 
const numberDisplay = document.getElementById("number_display");
var numberOne = [];
var numberTwo = [];
var numberInputArray = [];
var numberMarker = 1; // shows what number we are working with, One or Two
var operator = "";
// var result = null;
var memory = null;

// Add event listeners to digit buttons
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", onclickDigitEvent);
});

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", onclickOperatorEvent);
});

// Add event listener to equal button
const equalButton = document.getElementById("equal_button");
equalButton.addEventListener("click", onclickEqualEvent);

// Transform array into number
function arrToNum (array) {
    let string = array.join("");
    return roundNumber(parseFloat(string));
    };

// Transorm number into array
function numToArr (number) {
    number = roundNumber(number);
    if (isNaN(number)) {
        return [];
    };
    return number.toString().split("");
};

// Calculating fuction, return Nan in case of error
function calculate (num1, num2, oper) {
    switch (oper) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 != 0) {
                return num1 / num2;
            };
            return NaN;
        case "*=":
            return Math.pow(num1, 2)
        default:
            return NaN;
    };
};

// Display number
function displayNumber (number) {
    number = roundNumber(number);
    let string = "";
    if (isNaN(number)) {
        string = "ERROR"
    } else {
        string = number.toString(); 
    };
    numberDisplay.textContent = string;
}; 

// Round number to max number of digits (or return ERROR)
function roundNumber (number) {
    let maxDisplayedNumber = "9"; // maximum number we can display
    let signMarker = 1; // is a number positive or negative
    let jMax = numberOfDigits - 2;
    if (number < 0) {
        signMarker = -1;
        number *= signMarker; // make a number positive
    };
    for (let j = 0; j < jMax; j++) {
        maxDisplayedNumber += "9";
    };
    maxDisplayedNumber = parseInt(maxDisplayedNumber);
    let array = number.toString().split("");
    let i = array.findIndex((element) => element == ".");
    let tens = Math.pow(10, jMax - i);

    number = number * tens;
    number = Math.round(number) / tens;
    if (number > maxDisplayedNumber) {
        return NaN;
    };
    return number * signMarker;
};

// Digit buttons event funcion
function onclickDigitEvent () {
    switch (numberMarker) {
        case 1:
            if (numberOne.length < numberOfDigits - 1) {
                if (numberOne[0] == "0") {
                    numberOne.shift();
                };
                numberOne.push(this.id);
            };
            displayNumber(arrToNum(numberOne));
            break;
        case 2:
            if (numberTwo.length < numberOfDigits - 1) {
                if (numberTwo[0] == "0") {
                    numberTwo.shift();
                };
                numberTwo.push(this.id)
            };
            displayNumber(arrToNum(numberTwo));
            break;
    };
    return;
};

// Operator buttons event function
function onclickOperatorEvent () {
    if (this.id == "*=") {
        if (numberTwo.length != 0) {
            return;
        };
        let number = arrToNum(numberOne);
        number = calculate(number, 0, "*=");
        displayNumber(number);
        numberOne = numToArr(number);
        numberTwo = [];
        operator = "";
        return;
    };
    numberTwo = [];
    numberMarker = 2;
    operator = this.id;
    display.textContent = operator;
};

// Equal button event function
function onclickEqualEvent () {
    if (numberOne.length == 0 || numberTwo.length == 0) {
        operator = "";
        return;
    };
    let num1 = arrToNum(numberOne);
    let num2 = arrToNum(numberTwo);
    if (operator == "") {
        return;
    };
    let resultNumber = calculate(num1, num2, operator);
    displayNumber(resultNumber);
    numberOne = numToArr(resultNumber);
    numberTwo = [];
    operator = "";
    numberMarker = 1;
    return;
}