function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculateResult() {
    let displayValue = document.getElementById('display').value;
    let result;

    try {
        result = eval(displayValue);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}
