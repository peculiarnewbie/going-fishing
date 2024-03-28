import {
	FishColorKeys,
	FishColorType,
	FishSizeKeys,
	FishSizeType,
	FishType,
	FishTypeWithPrice,
	FishingPoleType,
} from "./types";

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

export function sellFishes(
	relevantFishes: [number, number][],
	size: FishSizeType,
	baits: { red: number; green: number; blue: number }
) {
	const sold: FishTypeWithPrice[] = [];
	let earned = 0;

	relevantFishes.forEach((fish) => {
		let price = 0;
		if (fish[0] === 0) {
			if (baits.red > 0) {
				price = getFishPrice(size, FishColorKeys.Red);
				baits.red--;
				sold.push({
					color: FishColorKeys.Red,
					size: size,
					price: price,
				});
			}
		} else if (fish[0] === 1) {
			if (baits.green > 0) {
				price = getFishPrice(size, FishColorKeys.Green);
				baits.green--;
				sold.push({
					color: FishColorKeys.Green,
					size: size,
					price: price,
				});
			}
		} else {
			if (baits.blue > 0) {
				price = getFishPrice(size, FishColorKeys.Blue);
				baits.blue--;
				sold.push({
					color: FishColorKeys.Blue,
					size: size,
					price: price,
				});
			}
		}
		earned += price;
	});

	return { sold: sold, earned: earned };
}
