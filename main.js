document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let firstOperand = "";
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (value === "C") {
                clearCalculator();
            } 
            
            else if (value === "DEL") {
                deleteLastCharacter();
            } 
            
            else if (value === "=") {
                calculateResult();
            } 
            
            else if (["+", "-", "*", "/"].includes(value)) {
                chooseOperator(value);
            } 
            
            else {
                addNumber(value);
            }
        });
    });

    function addNumber(value) {
        if (value === "." && currentInput.includes(".")) {
            return;
        }

        currentInput += value;
        display.value = currentInput;
    }

    function chooseOperator(selectedOperator) {
        if (currentInput === "") {
            return;
        }

        firstOperand = currentInput;
        operator = selectedOperator;
        currentInput = "";
    }

    function calculateResult() {
        if (firstOperand === "" || currentInput === "" || operator === null) {
            return;
        }

        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;

            case "-":
                result = num1 - num2;
                break;

            case "*":
                result = num1 * num2;
                break;

            case "/":
                if (num2 === 0) {
                    display.value = "Error";
                    currentInput = "";
                    firstOperand = "";
                    operator = null;
                    return;
                }
                result = num1 / num2;
                break;

            default:
                return;
        }

        display.value = result;
        currentInput = result.toString();
        firstOperand = "";
        operator = null;
    }

    function deleteLastCharacter() {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    function clearCalculator() {
        currentInput = "";
        firstOperand = "";
        operator = null;
        display.value = "";
    }
});