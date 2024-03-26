import {
	BaitType,
	FishColorKeys,
	FishSizeKeys,
	FishingPoleType,
} from "./types";

export const FishingPoles: FishingPoleType[] = [
	{ size: FishSizeKeys.Small, price: 5 },
	{ size: FishSizeKeys.Medium, price: 10 },
	{ size: FishSizeKeys.Big, price: 15 },
];

export const Baits: BaitType[] = [
	{ color: FishColorKeys.Red, price: 1 },
	{ color: FishColorKeys.Blue, price: 2 },
	{ color: FishColorKeys.Green, price: 3 },
];
