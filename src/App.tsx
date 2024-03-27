import { Switch, type Component, Match } from "solid-js";

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
		fisingPole: FishSizeKeys.Small,
		baits: { red: 0, green: 0, blue: 0 },
		fishes: [],
	});

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
		const { fishes, colorChance, sizeChance } = generateFishes(10);
		setGameState("fishes", fishes);
	};

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<div>state: {gameState.state}</div>
				<div>gold: {gameState.gold}</div>
				<Switch>
					<Match when={gameState.state === DayStayeKeys.BuyPole}>
						<PurchaseList items={FishingPoles} buy={buy} />
					</Match>
					<Match when={gameState.state === DayStayeKeys.BuyBait}>
						<PurchaseList items={Baits} buy={buy} />
						<button
							onclick={startFishing}
							class="flex p-1 bg-slate-400 rounded-md"
						>
							continue
						</button>
					</Match>
				</Switch>
				<DebugUI gameState={gameState} />
			</header>
		</div>
	);
};

export default App;
