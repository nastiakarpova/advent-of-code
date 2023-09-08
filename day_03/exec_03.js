// The Elves have made a list of all of the items currently in each rucksack.
// Each line is a rucksack, each character is an item ("a" and "A" are different items).
// In rucksacks, items should be divided equally between compartments (halves). 
// There is one common item that appears in both compartments.
// Every item type can be converted to a priority (a - 1, b - 2 ... A - 27, B - 28 ... and Z - 52)

// TASK 1: Find the item type that appears in both compartments of each rucksack. 
// What is the sum of the priorities of those item types?

// TASK 2: For safety, the Elves are divided into groups of three (every three lines is a group). 
// Each rucksack share a common item between three elves.
// Find the common item type that corresponds to each three-Elf group. 
// What is the sum of the priorities of those item types?


const fs = require("fs");
const R = require("ramda");

const dataInit = fs.readFileSync("./input.txt").toString().split("\n");

const logger = R.curry(console.log);

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let priorityValues = {}

R.pipe(
    R.concat(R.__, R.toUpper(alphabet)),
    R.map(R.split("")),
    R.forEachObjIndexed((letter,index) => priorityValues[letter] = ++index),
    logger
)(alphabet);


// Solution 1
R.pipe(
    R.map(line => R.splitAt(R.length(line)/2, line)),
    R.map((halves) => R.intersection(halves[0], halves[1])),
    R.map(letter => priorityValues[letter]),
    R.reduce(R.add, 0),
    logger
)(dataInit)

// Solution 2
R.pipe(
    R.splitEvery(3),
    R.map(groups => R.intersection(R.intersection(groups[0], groups[1]), groups[2])),
    R.map(letter => priorityValues[letter]),
    R.reduce(R.add, 0),
    logger
)(dataInit)