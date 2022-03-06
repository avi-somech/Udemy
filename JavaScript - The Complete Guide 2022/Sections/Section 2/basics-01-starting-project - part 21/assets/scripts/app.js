const defaultResult = 0;
let currentResult = defaultResult;

function add(num1, num2) {
    const result = num1 + num2;
    return result;
}

currentResult = add(1,3);

addBtn.addEventListener('click', add);

calculationDescription = "Calculation description";

outputResult(currentResult, calculationDescription);
