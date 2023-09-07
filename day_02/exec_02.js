// There is a "rock-paper-scissors" tournament. I am given an encrypted stategy guide 
// for winning the tournament. Total points of a round are calculated 
// by the shape I choose and the outcome of the round.
// Points: rock - 1, paper - 2, scissors - 3; 
// lose - 0, draw - 3, win - 6.

// TASK 1: Calculate my total score, if I assign XYZ to the chosen shapes.
// Task 2: Calculate my total score, if I assign XYZ to the round outcome. 

const fs = require("fs");
const R = require("ramda");

const dataInit = fs.readFileSync("input.txt").toString().split("\n");

// Rows for both key-value stores: Lose - Tie - Win
// ABC = Rock Paper Scissors; XYZ = Rock Paper Scissors
const scoreReferenceShapes = {
    "B X": 1, "C Y": 2, "A Z": 3,
    "A X": 4, "B Y": 5, "C Z": 6,
    "C X": 7, "A Y": 8, "B Z": 9
};

// ABC = Rock Paper Scissors; XYZ = Lose Draw Win
const scoreReferenceOutcome = {
    "B X": 1, "C X": 2, "A X": 3,
    "A Y": 4, "B Y": 5, "C Y": 6,
    "C Z": 7, "A Z": 8, "B Z": 9
}

const totalScoreShapes = R.pipe(
    R.map(line => scoreReferenceShapes[line]),
    R.reduce(R.add, 0)
);

const totalResultOutcome = R.pipe(
    R.map(line => scoreReferenceOutcome[line]),
    R.reduce(R.add, 0)
);

console.log(totalScoreShapes(dataInit));
console.log(totalResultOutcome(dataInit));