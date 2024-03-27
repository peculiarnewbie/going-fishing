import {
	FishColorKeys,
	FishColorType,
	FishSizeKeys,
	FishSizeType,
	FishingPoleType,
} from "./types";

export function purchasePole(pole: FishingPoleType) {}

export function getFishPrice(size: FishSizeType, color: FishColorType) {
	let price = 0;

	switch (size) {
		case FishSizeKeys.Small:
			price = 5;
			break;
		case FishSizeKeys.Medium:
			price = 10;
			break;
		case FishSizeKeys.Big:
			price = 15;
			break;
	}

	switch (color) {
		case FishColorKeys.Red:
			price -= Math.floor(Math.random() * 5);
			break;
		case FishColorKeys.Blue:
			price -= Math.floor(Math.random() * 3);
			break;
	}

	return price;
}

function generateCount(totalCount: number) {
	let rest = 1;
	const count = [];

	for (let i = 0; i < 2; i++) {
		const rand = Math.random() * rest;
		count.push(Math.floor(rand * totalCount));
		rest -= rand;
	}

	count.push(totalCount - count[0] - count[1]);

	return count;
}

function arrayFromChance(array: number[]) {
	const newArray = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i]; j++) {
			newArray.push(i);
		}
	}

	return newArray;
}

function shuffle(array: any[]) {
	return array.sort(() => Math.random() - 0.5);
}

export function generateFishes(fishCount: number) {
	const colorChance = generateCount(fishCount);
	const sizeChance = generateCount(fishCount);
	const [redCount, greenCount, blueCount] = colorChance;

	const sizeArray = arrayFromChance(sizeChance);
	const shuffledSize = shuffle(sizeArray);

	const fishes: [number, number][] = [];

	for (let i = 0; i < fishCount; i++) {
		let color = 0;
		if (i < redCount) color = 0;
		else if (i >= redCount && i < redCount + greenCount) color = 1;
		else color = 2;

		fishes.push([color, shuffledSize[i]]);
	}

	return { fishes: fishes, colorChance: colorChance, sizeChance: sizeChance };
}
