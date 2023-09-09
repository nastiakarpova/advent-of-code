// Elves have been assigned the job of cleaning up sections of the camp.
// They are divided into pairs (separated by a comma) and asigned a range of area (separated by a hyphen) for each pair (one line).
// There are overlaps that need to be calculated.

// TASK 1: In how many pairs does one range fully contain the other (in other words one is a subset of another)?
// TASK 2: In how many pairs do the ranges overlap?

const fs = require("fs");
const R = require("ramda");

const dataInit = fs.readFileSync("./input.txt").toString().split("\n");
const logger = R.curry(console.log);

R.pipe(
    R.map(R.split(",")),
    R.map(R.map(R.split("-"))),
    R.unnest(),
    R.map(pair => R.range(+pair[0], ++pair[1])),
    R.splitEvery(2),
    R.map((pair) => {
        return R.length(R.intersection(pair[0], pair[1])) === R.length(R.minBy(R.length, pair[0], pair[1]))
    }),
    R.filter(x => x === true),
    R.count(R.add),
    logger
)(dataInit)

R.pipe(
    R.map(R.split(",")),
    R.map(R.map(R.split("-"))),
    R.unnest(),
    R.map(pair => R.range(+pair[0], ++pair[1])),
    R.splitEvery(2),
    R.map(pair => R.intersection(pair[0], pair[1])),
    R.filter(x => R.length(x) > 0),
    R.count(R.add),
    logger
)(dataInit)