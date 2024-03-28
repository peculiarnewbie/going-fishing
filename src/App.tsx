import {
	Switch,
	type Component,
	Match,
	createEffect,
	createSignal,
} from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import PurchaseList from "./UI/PurchaseList";
import { Baits, FishingPoles } from "./Game/data";
import {
	BaitType,
	DayStayeKeys,
	FishColorKeys,
	FishSizeKeys,
	FishingPoleType,
	GameState,
	BaitStore,
} from "./Game/types";
import { createStore, produce } from "solid-js/store";
import DebugUI from "./UI/DebugUI";
import { generateFishes } from "./Game/helpers";

const App: Component = () => {
	const [gameState, setGameState] = createStore<GameState>({
		state: DayStayeKeys.BuyPole,
		gold: 100,
		fisingPole: "none",
		baits: { red: 0, green: 0, blue: 0 },
		fishes: [],
	});

	const [fishSizes, setFishSizes] = createSignal<number[]>([]);
	const [fishColors, setFishColors] = createSignal<number[]>([]);
	const [relevantFishes, setRelevantFishes] = createSignal<
		[number, number][]
	>([]);

	const buyPole = (pole: FishingPoleType) => {
		console.log(pole);
		setGameState("state", DayStayeKeys.BuyBait);
		setGameState("fisingPole", pole.size);
		setGameState("gold", (prev) => prev - pole.price);
	};

	const buyBait = (bait: BaitType) => {
		console.log(bait);
		setGameState("gold", (prev) => prev - bait.price);
		switch (bait.color) {
			case FishColorKeys.Red:
				setGameState("baits", (prev) => {
					const { red, ...rest } = prev;
					return { red: red + 1, ...rest };
				});
				break;
			case FishColorKeys.Blue:
				setGameState("baits", (prev) => {
					const { blue, ...rest } = prev;
					return { blue: blue + 1, ...rest };
				});
				break;
			default:
				setGameState("baits", (prev) => {
					const { green, ...rest } = prev;
					return { green: green + 1, ...rest };
				});
		}
	};

	const buy = (item: FishingPoleType | BaitType) => {
		if ("size" in item) buyPole(item);
		else buyBait(item);
	};

	const startFishing = () => {
		setGameState("state", DayStayeKeys.Fishing);
	};

	createEffect(() => {
		const { fishes, colorChance, sizeChance } = generateFishes(10);
		setFishColors(colorChance);
		setFishSizes(sizeChance);
		setGameState("fishes", fishes);
	});

	createEffect(() => {
		if (gameState.state === DayStayeKeys.BuyBait) {
			let size = 0;
			if (gameState.fisingPole === FishSizeKeys.Medium) size = 1;
			if (gameState.fisingPole === FishSizeKeys.Big) size = 2;
			setRelevantFishes(
				gameState.fishes.filter((fish) => fish[1] === size)
			);
		}
	});

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<div class="container mx-auto flex flex-col items-center max-w-[600px]">
					<img
						src="src/assets/title.webp"
						class="mx-auto w-2/3 max-w-[600px]"
					/>
					<div class="flex w-full items-center max-w-[600px] gap-8 p-2">
						<div class="flex flex-col text-amber-600 ">
							<p>gold</p>
							<p>{gameState.gold}</p>
						</div>

						<div class="flex flex-col ">
							<p>fishing pole</p>
							<p>{gameState.fisingPole}</p>
						</div>
						<div class="flex flex-col ">
							<div>baits</div>
							<div class="flex gap-2">
								<div class=" text-red-800">
									red: {gameState.baits.red}
								</div>
								<div class=" text-blue-800">
									blue: {gameState.baits.blue}
								</div>
								<div class=" text-green-800">
									green: {gameState.baits.green}
								</div>
							</div>
						</div>
					</div>
					<div class="self-start py-2">
						fish forecast:
						<div>{`small: ${fishSizes()[0]}, medium: ${
							fishSizes()[1]
						}, big: ${fishSizes()[2]}`}</div>
						<div>{`red: ${fishColors()[0]}, green: ${
							fishColors()[1]
						}, blue: ${fishColors()[2]}`}</div>
						<div>
							relevant fishes: {JSON.stringify(relevantFishes())}
						</div>
					</div>
					<Switch>
						<Match when={gameState.state === DayStayeKeys.BuyPole}>
							<div class="p-2 font-bold">
								Choose your fishing pole:
							</div>
							<PurchaseList
								items={FishingPoles}
								buy={buy}
								gold={gameState.gold}
							/>
						</Match>
						<Match when={gameState.state === DayStayeKeys.BuyBait}>
							<div class="p-2 font-bold">Buy your baits:</div>
							<PurchaseList
								items={Baits}
								buy={buy}
								gold={gameState.gold}
							/>
							<button
								onclick={startFishing}
								class="flex p-2 mt-2  bg-blue-400 rounded-md"
							>
								continue
							</button>
						</Match>
					</Switch>

					<DebugUI gameState={gameState} />
				</div>
			</header>
		</div>
	);
};

export default App;
