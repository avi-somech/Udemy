const defaultResult = 0;
let currentResult = defaultResult;

//he said that in general a function should not mix stuff from outside. 
//in this case, its fine because its global but its only global. 
//it is not a mix of global and local stuff
//he said we will get a feel for when it is fine and when not
function add() {
    currentResult = currentResult + userInput.value;
    outputResult(currentResult, '');
}


addBtn.addEventListener('click', add);


