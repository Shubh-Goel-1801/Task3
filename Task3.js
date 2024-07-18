document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    
    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let resetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '0';
                operator = null;
                previousInput = '';
                display.textContent = currentInput;
            } else if (value === '=') {
                if (operator && previousInput !== '') {
                    currentInput = operate(previousInput, currentInput, operator);
                    operator = null;
                    previousInput = '';
                    display.textContent = currentInput;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operator && previousInput !== '') {
                    currentInput = operate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                }
                previousInput = currentInput;
                operator = value;
                resetDisplay = true;
            } else {
                if (resetDisplay) {
                    currentInput = value;
                    resetDisplay = false;
                } else {
                    currentInput = currentInput === '0' ? value : currentInput + value;
                }
                display.textContent = currentInput;
            }
        });
    });

    function operate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return b;
        }

        return result.toString();
    }
});
