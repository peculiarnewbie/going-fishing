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
