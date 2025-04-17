//HTML elements
const calculator = document.querySelector(".calculator");
const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keypad");
const button = document.querySelectorAll("button");
const equals = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const dlt = document.querySelector("#delete");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

//Other variables
let equalButton = false;
let equation = 0;
let currentEquation = [];

operators.forEach(button => button.addEventListener("click", () => addToScreen(button.textContent)));
numbers.forEach(button => button.addEventListener("click", () => addToScreen(button.textContent)));
equals.addEventListener("click", () => calculate(currentEquation[0], currentEquation[2], currentEquation[1]));


function addToScreen(buttonContent) {
    if (currentEquation.length == 3) {
        calculate(currentEquation[0], currentEquation[2], currentEquation[1]);
        if (isNaN(parseInt(buttonContent))) currentEquation.push(buttonContent);
        else currentEquation.push(parseInt(buttonContent));
        screen.textContent += buttonContent;
        return;
    } else {
        if (isNaN(parseInt(buttonContent))) currentEquation.push(buttonContent);
        else currentEquation.push(parseInt(buttonContent));
        screen.textContent += buttonContent;
        console.log(currentEquation);
    }
}

function calculate(one, two, operator) {
    if (currentEquation.length == 3) {
        operandOne = parseInt(one);
        operandTwo = parseInt(two);
        switch (operator) {
            case ('+'):
                result = operandOne + operandTwo;
                console.log("result is " + result);
                screen.textContent = result;
                currentEquation = [result];
                break;
            case ('-'):
                result = operandOne - operandTwo;
                screen.textContent = result;
                currentEquation = [result];
                break;
            case ('×'):
                result = operandOne * operandTwo;
                screen.textContent = result;
                currentEquation = [result];
                break;
            case ('÷'):
                result = operandOne / operandTwo;
                screen.textContent = result;
                currentEquation = [result];
                break;
        }
    }
}