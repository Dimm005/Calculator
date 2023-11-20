// Global constants and variables
const numberOfDigits = 8; 
var display = document.getElementById("display");
var numberOne = [];
var numberTwo = [];
var numberInputArray = [];
var numberMarker = 1; // shows what number we are working with, One or Two
var operator = "";
var result = null;
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
    display.textContent = string;
}; 

// Round number to max number of digits (or return ERROR)
function roundNumber (number) {
    let maxDisplayedNumber = ""; // maximum number we can display
    let signMarker = 1; // is a number positive or negative
    let jMax = 0; // for negative numbers cycle should be 1 step shorter
    if (number < 0) {
        signMarker = -1;
        number *= signMarker; // make a number positive
        jMax = numberOfDigits - 1;
    } else {
        jMax = numberOfDigits;
    };

    for (let j = 0; j < jMax; j++) {
        maxDisplayedNumber += "9";
    };
    maxDisplayedNumber = parseInt(maxDisplayedNumber);

    let array = number.toString().split("");
    let i = array.findIndex((element) => element == ".");
    let tens = Math.pow(10, jMax - i - 1);
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
            if (numberOne.length < numberOfDigits) {
                if (numberOne[0] == "0") {
                    numberOne.pop();
                };
                numberOne.push(this.id);
            };
            displayNumber(arrToNum(numberOne));
            break;
        case 2:
            if (numberTwo.length < numberOfDigits) {
                if (numberTwo[0] == "0") {
                    numberTwo.pop();
                };
                numberTwo.push(this.id)
            };
            displayNumber(arrToNum(numberTwo));
            break;
    };

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
        numberOne = [];
        return;
    };
    numberMarker = 2;
    operator = this.id;
    display.textContent = operator;
};