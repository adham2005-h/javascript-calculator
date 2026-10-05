document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let firstOperand = "";
    let operator = null;
    let resultShown = false;

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
        // A digit after "=" starts a new calculation.
        if (resultShown) {
            currentInput = "";
            resultShown = false;
        }
        if (value === "." && currentInput === "") currentInput = "0";
        if (value === "." && currentInput.includes(".")) {
            return;
        }

        currentInput += value;
        display.value = currentInput;
    }

    function chooseOperator(selectedOperator) {
        if (currentInput === "") {
            if (firstOperand !== "") operator = selectedOperator;
            return;
        }

        // Finish the previous operation before starting the next one.
        if (firstOperand !== "" && operator !== null) {
            calculateResult();
            if (currentInput === "") return;
        }
        resultShown = false;
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

        if (!Number.isFinite(result)) {
            clearCalculator();
            display.value = "Error";
            return;
        }
        resultShown = true;
        display.value = result;
        currentInput = result.toString();
        firstOperand = "";
        operator = null;
    }

    function deleteLastCharacter() {
        resultShown = false;
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    function clearCalculator() {
        resultShown = false;
        currentInput = "";
        firstOperand = "";
        operator = null;
        display.value = "";
    }
});