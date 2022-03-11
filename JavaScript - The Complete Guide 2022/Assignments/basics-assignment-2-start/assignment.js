const task3Element = document.getElementById('task-3');


function alertText(){
    alert('hi this is an alert');
}

function alertParam(param){
    alert(param);
}



alertText();
alertParam("Hiiii");

task3Element.addEventListener('click', alertText);

//this is how I wrote the function but note it will add numbers and concatnenate strings...
//but if you pass in numbers as strings it will work
// function concatenate3(one, two, three) {
//     return one+two+three;
// }

//this is how he did it: will make numbers strings as well
//So even if someone passes in the numbers as numbers, this code will treat them as strings
function concatenate3(str1, str2, str3){
    const combined = `${str1} ${str2} ${str3}`;
    return combined;
}

alert(concatenate3('a','b','c'));
alert(concatenate3(1,2,3));