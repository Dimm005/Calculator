// Global constants and variables
const numberOfDigits = 8; 
var number_one = null;
var number_two = null;
var operator = null;
var result = null;
var memory = null;

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