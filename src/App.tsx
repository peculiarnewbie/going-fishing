import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import PurchaseList from "./UI/PurchaseList";
import { FishingPoles } from "./Game/data";
import { FishSizeKeys, GameState } from "./Game/types";
import { createStore } from "solid-js/store";

const App: Component = () => {
	const [gameState, setGameState] = createStore<GameState>({
		gold: 100,
		fisingPole: FishSizeKeys.Small,
		baits: { red: 0, green: 0, blue: 0 },
		fishes: [],
	});

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<PurchaseList items={FishingPoles} />
			</header>
		</div>
	);
};

export default App;
