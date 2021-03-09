var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
function double(x) {
  return x * 2;
}
const doubledNumbers = numbers.map(double);
console.log(doubledNumbers);

//Filter - Create a new array by keeping the items that return true.
const filteredNumbers = numbers.filter(function(number){
  return number < 10;
});
console.log(filteredNumbers);

//Reduce - Accumulate a value by doing something to each item in an array.
const reducedNumber = numbers.reduce(function(accumulator, currentNumber){
  return accumulator + currentNumber
});
console.log(reducedNumber);

//Find - find the first item that matches from an array.
const foundNumber = numbers.find(function(number){
  return number < 10;
});
console.log(foundNumber);

//FindIndex - find the index of the first item that matches.
const foundNumberIndex = numbers.findIndex(function(number){
  return number > 10;
});
console.log(foundNumberIndex);