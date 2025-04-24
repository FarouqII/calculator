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
const decimal = document.querySelector("#decimal");

//Other variables
let equalButton = false;
let currentEquation = [];

operators.forEach(button => button.addEventListener("click", () => operatorButtons(button.textContent)));
numbers.forEach(button => button.addEventListener("click", () => numberButtons(button.textContent)));
decimal.addEventListener("click", () => {
    let last = currentEquation[currentEquation.length - 1];

    if (!last || isNaN(last)) {
        currentEquation.push("0.");
        screen.textContent += "0.";
        return;
    }

    if (!last.includes(".")) {
        currentEquation[currentEquation.length - 1] += ".";
        screen.textContent += ".";
    }
})
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
    if (currentEquation.length === 0) return;
    let last = currentEquation[currentEquation.length - 1];

    if (isNaN(last)) {
        currentEquation.pop();
    } else {
        last = last.toString().slice(0, -1);

        if (last === "" || last === "-" || last === "-0") {
            currentEquation.pop();
        } else {
            currentEquation[currentEquation.length - 1] = last;
        }
    }

    screen.textContent = currentEquation.join("");
});


function numberButtons(buttonContent) {
    if (currentEquation.length == 0) screen.textContent = "";
    if (currentEquation.length === 0 || isNaN(currentEquation[currentEquation.length - 1])) {
        currentEquation.push(buttonContent);
    } else {
        currentEquation[currentEquation.length - 1] += buttonContent;
    }
    screen.textContent += buttonContent;
    console.log(currentEquation);
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
        let operandOne = parseFloat(one);
        let operandTwo = parseFloat(two);
        switch (operator) {
            case ('+'):
                result = operandOne + operandTwo;
                console.log("result is " + result);
                screen.textContent = result;
                currentEquation = [result.toString()];
                break;
            case ('-'):
                result = operandOne - operandTwo;
                screen.textContent = result;
                currentEquation = [result.toString()];
                break;
            case ('×'):
                result = operandOne * operandTwo;
                screen.textContent = result;
                currentEquation = [result.toString()];
                break;
            case ('÷'):
                if (operandTwo == 0) {
                    alert("Can't divide by 0!");
                    break;
                }
                else {
                    result = operandOne / operandTwo;
                    screen.textContent = result;
                    currentEquation = [result.toString()];
                    break;
                }
        }
    }
}