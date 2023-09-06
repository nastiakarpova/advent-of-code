// The elves carry food items of various calorie contents. 
// In the input file, each elf (and the calories they carry) is separated by an empty line 
// from the next elf and his food items.

// TASK 1: Find the Elf carrying the most Calories. 
// How many total Calories is that Elf carrying?
// TASK 2: Find the top three Elves carrying the most Calories. 
// How many Calories are those Elves carrying in total?

const fs = require("fs");
const R = require("ramda");

const dataInit = fs.readFileSync("./input.txt").toString().split("\n");

const sum = (x,y) => +x + +y;

const sortCalories = R.pipe(
    R.splitWhenever(R.equals("")),
    R.map((cals) => R.reduce(sum, 0, cals)),
    R.sort((a,b)=> a - b)
);

const calculateLargestCalorie = R.pipe(
    sortCalories, 
    R.slice(-1, Infinity)
);

const calculateTop3Calories = R.pipe(
    sortCalories,
    R.slice(-3, Infinity),
    R.reduce(sum, 0)
);

console.log(calculateLargestCalorie(dataInit));
console.log(calculateTop3Calories(dataInit));