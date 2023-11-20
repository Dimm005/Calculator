// Global constants and variables
const numberOfDigits = 8; 
var number_one = null;
var number_two = null;
var operator = null;
var result = null;
var memory = null;

// Transform array into number, length is limited by numberOfDigits
function arrToNum (array) {
    let string = array.join("");
    return roundNumber(parseFloat(string));
    };

// Transorm number into array, length is limited by 8 numberOfDigits
function numToArr (number) {
    let array = number.toString().split("");
    if (array.length <= numberOfDigits) { 
        return array;
    };
    let array1 = [];

    for (let i = 0; i < numberOfDigits; i++) {
        array1.push(array[i]);
    };
    if (array1[array1.length - 1] === ".") {    // delete "." in the end
        array1.pop();
    };
    return array1;
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
    let maxDisplayedNumber = ""; // Caculate maximum number we can display
    let signMarker = 1; // is a number positive or negative
    if (number < 0) {
        signMarker = -1;
        number *= signMarker; // make a number positive
    };
    for (let j = 0; j < numberOfDigits; j++) {
        maxDisplayedNumber += "9";
    };
    maxDisplayedNumber = parseInt(maxDisplayedNumber);

    let array = number.toString().split("");
    let i = array.findIndex((element) => element == ".");
    let tens = Math.pow(10, numberOfDigits - i - 1);
    number = number * tens;
    number = Math.round(number) / tens;
    if (number > maxDisplayedNumber) {
        return NaN;
    };
    return number * signMarker;
};