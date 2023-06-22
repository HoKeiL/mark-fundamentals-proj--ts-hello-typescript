let numberOne = 5;
const numberTwo = 10;
numberOne = 7;

const additionResult = numberOne + numberTwo;
console.log(`${numberOne} plus ${numberTwo} is... ${additionResult}`);

const arrOne = [1, 2, 3];
const arrTwo = [4, 5, 6];
const joinedArr = arrOne.concat(arrTwo);
console.log(`Array addition: ${arrOne} + ${arrTwo} is... ${joinedArr}`);

const rectangle = { width: 4, height: 10 };
const area = rectangle.width * rectangle.height; // an easy typo to make!
console.log(
  `Rectangle area: ${rectangle.width} x ${rectangle.height} is... ${area}`
);
