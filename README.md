# MontySim — A Monty Hall problem simulator

## Description

The Monty Hall problem:

> Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?

This simulator runs a specified amount of automatic trials of the problem for a specified amount of doors.

## Installation

`$ npm i montysim -g`

## Usage

`$ montysim <doors> <trials>`

`@param {number} doors` — the number of doors to test.

`@param {number} trials` — the number of trials to run.

## Output

When `$ monty 3 100` is run, the following example result is returned:

```
{
  numDoors: 3,
  numTrials: 100,
  expectedWinRate: '66.67%',
  actualWinRate: '66%',
  percentError: '1%',
  timeTaken: '0.03126s'
}
```