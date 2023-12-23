const input = [1, 2, 3, 4, 5];

// map function
const newArray = input.map((input) => 2 * input);

// filter
const filterArray = input.filter((input) => input > 2);

console.log('original array value: ', input);
console.log('newArray value: ', newArray);
console.log('filterArray value > 2: ', filterArray);

// arrow function

const arrowFns = (num) => {
  console.log('---------------');
  console.log('Hi, from arrow function');
  console.log('Your input value is: ', num);
};

arrowFns(input);
