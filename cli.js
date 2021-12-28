#!/usr/bin/env node

const ts = performance.now()

const colors = require('colors')

const [,, ...args] = process.argv

// ERROR HANDLING
const wrongArgType = !parseInt(args[0]) || !parseInt(args[0])

if (args.length != 2 || wrongArgType) {
	throw 'Args need to be provided as follows:\nmontysim [number of doors] [number of trials]'.red
} else if (args[0] < 3) {
	throw 'Number of doors must be at least 3'.red
} else if (args[1] < 1) {
	throw 'At least 1 trial required.'.red
}

// MEAT
const numDoors = parseInt(args[0])
const numTrials = parseInt(args[1])

const rdmIndex = arr => Math.floor(Math.random() * arr.length)

const initDoors = () => {
	/*
		Door statuses:
		0: closed (goat)
		1: closed (car)
		2: open (always goat)
	*/

	const doors = []
	
	for (let i = 1; i <= numDoors; i++) {
		doors.push(0)
	}

	doors[rdmIndex(doors)] = 1

	return doors
}

let winCount = 0

for (let trialNum = 1; trialNum <= numTrials; trialNum++) {
	const doors = initDoors()
	let choiceIndex = rdmIndex(doors)
	let choice = doors[choiceIndex]
	let closedIndex

	if (choice) {
		closedIndex = rdmIndex(doors)
		while (closedIndex == choiceIndex) {
			closedIndex = rdmIndex(doors)
		}
	} else {
		closedIndex = doors.indexOf(1)
	}
	
	// for (let i = 0; i < doors.length; i++) {
	// 	const choiceDoor = i == choiceIndex
	// 	const closedDoor = i == closedIndex

	// 	if (choiceDoor || closedDoor) continue
	// 	else doors[i] = 2
	// }

	choice = doors[closedIndex]

	if (choice) winCount++
}

const theoretical = (numDoors - 1) / numDoors * 100
const experimental = winCount / numTrials * 100

let result = {
	numDoors,
	numTrials,
	expectedWinRate: Math.round(theoretical * 100) / 100 + '%',
	actualWinRate: Math.round(experimental * 100) / 100 + '%',
}

const percentErr = Math.abs((experimental - theoretical) / theoretical) * 100
result.percentError = Math.round(percentErr * 100) / 100 + '%'

const te = performance.now()
result.timeTaken = Math.round((te - ts) * 100) / 100000 + 's'

console.log(result)