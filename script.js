const display = document.getElementById('display');
let currentInput = '';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            resetCalculator();
            return;
        }

        if (value === '=') {
            performCalculation();
            return;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
            return;
        }

        handleNumber(value);
    });
});

function handleNumber(value) {
    if (waitingForSecondValue) {
        currentInput = value;
        waitingForSecondValue = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    display.innerText = currentInput;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = performOperation(firstValue, inputValue, operator);
        currentInput = String(result);
        display.innerText = currentInput;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function performOperation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

function performCalculation() {
    let result = performOperation(firstValue, parseFloat(currentInput), operator);
    display.innerText = String(result);
    firstValue = result;
    operator = null;
    waitingForSecondValue = true;
}

function resetCalculator() {
    currentInput = '';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    display.innerText = '0';
}