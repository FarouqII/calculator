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
let currentEquation = [];

operators.forEach(button => button.addEventListener("click", () => operatorButtons(button.textContent)));
numbers.forEach(button => button.addEventListener("click", () => numberButtons(button.textContent)));
equals.addEventListener("click", () => {
    if (screen.textContent == "") alert("Display empty!");
    else {
        calculate(currentEquation[0], currentEquation[2], currentEquation[1]);
        currentEquation = [];
    }
});
clear.addEventListener("click", () => {
    screen.textContent = "";
    currentEquation = [];
});
dlt.addEventListener("click", () => {
    screen.textContent = "";
    currentEquation.pop();
    currentEquation.forEach(item => screen.textContent += item);
})

function numberButtons(buttonContent) {
    if (currentEquation.length == 0) screen.textContent = "";
    if (currentEquation.length == 0 || isNaN(Number(currentEquation[currentEquation.length - 1]))) {
        currentEquation.push(Number(buttonContent));
    } else {
        let last = currentEquation[currentEquation.length - 1];
    currentEquation[currentEquation.length - 1] = parseInt(String(last) + String(Number(buttonContent)));
    }
    screen.textContent += buttonContent;
    console.log(currentEquation);
    return;
}

function operatorButtons(buttonContent) {
    let last = currentEquation[currentEquation.length - 1];
    // Edge cases
    if (currentEquation.length == 0) {
        alert("First element must be a number!");
        return;
    }
    if (isNaN(parseInt(last))) {
        console.log(last);
        alert("Can't put two consecutive operators!");
        return;
    }

    // Main operation
    if (currentEquation.length == 3) {
        calculate(currentEquation[0], currentEquation[2], currentEquation[1]);
        currentEquation.push(buttonContent);
        screen.textContent += buttonContent;
        return;
    } else {
        currentEquation.push(buttonContent);
        screen.textContent += buttonContent;
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
                if (operandTwo == 0) {
                    alert("Can't divide by 0!");
                    break;
                }
                else {
                    result = operandOne / operandTwo;
                screen.textContent = result;
                currentEquation = [result];
                break;
                }
        }
    }
}