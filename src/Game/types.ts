export const FishColorKeys = {
	Red: "red",
	Blue: "blue",
	Green: "green",
} as const;

export type FishColorType = (typeof FishColorKeys)[keyof typeof FishColorKeys];

export const FishSizeKeys = {
	Small: "small",
	Medium: "medium",
	Big: "big",
} as const;

export type FishSizeType = (typeof FishSizeKeys)[keyof typeof FishSizeKeys];

export type FishType = {
	color: FishColorType;
	size: FishSizeType;
};

export type FishTypeWithPrice = {
	color: FishColorType;
	size: FishSizeType;
	price: number;
};

export class Fish {
	readonly color: FishColorType;
	readonly size: FishSizeType;
	readonly price: number;

	constructor(color: FishColorType, size: FishSizeType) {
		this.color = color;
		this.size = size;

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

		this.price = price;
	}
}

export interface Purchasable {
	price: number;
}

export type FishingPoleType = Purchasable & { size: FishSizeType };

export type BaitType = Purchasable & { color: FishColorType };

export type BaitStore = {
	[Property in FishColorType]: number;
};

export const DayStayeKeys = {
	InputFish: "input fish",
	BuyPole: "buy pole",
	BuyBait: "buy bait",
	Fishing: "fishing",
} as const;

export type DayStateType = (typeof DayStayeKeys)[keyof typeof DayStayeKeys];

export type GameState = {
	state: DayStateType;
	gold: number;
	fisingPole: FishSizeType | "none";
	baits: BaitStore;
	fishes: [number, number][];
};
