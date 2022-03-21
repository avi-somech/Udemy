const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if (randomNumber > 0.7){
    alert('Random number is greater than 0.7');
}

let arr = [1,2,3,4,5];

for (const element of arr){
    console.log(element);
}

for (let i = 0; i<arr.length; i++){
    console.log(arr[i]);
}

for (let i = arr.length-1; i>=0; i--){
    console.log(arr[i]);
}

const randomNumber2 = Math.random();

if ((randomNumber > 0.7 && randomNumber2 > 0.7 )  || randomNumber <= 0.2 || randomNumber2 <=0.2){
    alert('made it to condition 2');
}