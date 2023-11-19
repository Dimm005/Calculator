// Global constants and variables
const numberOfDigits = 8; 
var number_one = null;
var number_two = null;
var operator = null;
var result = null;

// Transform array into number, length is limited by numberOfDigits
function arrToNum (array) {
    let string = "";
    for (let i = 0; i < numberOfDigits; i++) {
            string += array[i];
        };
    return parseFloat(string);
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
        default:
            return NaN;
    };
};



