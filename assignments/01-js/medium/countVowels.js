/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const arr = str.toUpperCase().split('');
  let vowelCount = 0;
  arr.forEach((element) => {
    if (
      element === 'A' ||
      element === 'E' ||
      element === 'I' ||
      element === 'O' ||
      element === 'U'
    )
      vowelCount++;
  });
  return vowelCount;
}

module.exports = countVowels;
