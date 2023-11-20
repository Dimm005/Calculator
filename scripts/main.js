// Global constants and variables
const numberOfDigits = 8; 
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
    digitButton.addEventListener("click", onclickButtonEvent);
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
            return Math.pow(num1, num2)
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
    let display = document.getElementById("display");
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

// Button event funcions
function onclickButtonEvent () {
    // console.log(this.id)
    // console.log(numberInputArray)
    switch (numberMarker) {
        case 1:
            if (numberOne.length < numberOfDigits) {
                numberOne.push(this.id);
            };
            break;
        case 2:
            if (numberTwo.length < numberOfDigits) {
                numberTwo.push(this.id)
            };
            break;
    };
    console.log(numberOne);
    console.log(numberTwo);
};