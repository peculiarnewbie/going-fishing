import { Switch, type Component, Match } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import PurchaseList from "./UI/PurchaseList";
import { Baits, FishingPoles } from "./Game/data";
import {
	BaitType,
	DayStayeKeys,
	FishSizeKeys,
	FishingPoleType,
	GameState,
} from "./Game/types";
import { createStore, produce } from "solid-js/store";

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
	};

	const buyBait = (bait: BaitType) => {
		console.log(bait);
	};

	const buy = (item: FishingPoleType | BaitType) => {
		if ("size" in item) buyPole(item);
		else buyBait(item);
	};

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<div>state: {gameState.state}</div>
				<Switch>
					<Match when={gameState.state === DayStayeKeys.BuyPole}>
						<PurchaseList items={FishingPoles} buy={buy} />
					</Match>
					<Match when={gameState.state === DayStayeKeys.BuyBait}>
						<PurchaseList items={Baits} buy={buy} />
					</Match>
				</Switch>
			</header>
		</div>
	);
};

export default App;
