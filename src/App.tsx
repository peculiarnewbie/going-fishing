import {
	Switch,
	type Component,
	Match,
	createEffect,
	createSignal,
	Show,
} from "solid-js";

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
	FishTypeWithPrice,
} from "./Game/types";
import { createStore } from "solid-js/store";
import DebugUI from "./UI/DebugUI";
import { generateFishes, getFishPrice, sellFishes } from "./Game/helpers";
import SoldFishes from "./UI/SoldFishes";
import FishPrices from "./UI/FishPrices";

const App: Component = () => {
	const [gameState, setGameState] = createStore<GameState>({
		state: DayStayeKeys.InputFish,
		gold: 100,
		fisingPole: "none",
		baits: { red: 0, green: 0, blue: 0 },
		fishes: [],
	});

	const [fishCount, setFishCount] = createSignal(10);
	const [fishSizes, setFishSizes] = createSignal<number[]>([]);
	const [fishColors, setFishColors] = createSignal<number[]>([]);
	const [relevantFishes, setRelevantFishes] = createSignal<
		[number, number][]
	>([]);
	const [soldFishes, setSoldFishes] = createSignal<FishTypeWithPrice[]>([]);
	const [earned, setEarned] = createSignal(0);

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

	createEffect(() => {});

	createEffect(() => {
		if (gameState.state === DayStayeKeys.BuyPole) {
			const { fishes, colorChance, sizeChance } = generateFishes(
				fishCount()
			);
			setFishColors(colorChance);
			setFishSizes(sizeChance);
			setGameState("fishes", fishes);
		} else if (gameState.state === DayStayeKeys.BuyBait) {
			let size = 0;
			if (gameState.fisingPole === FishSizeKeys.Medium) size = 1;
			if (gameState.fisingPole === FishSizeKeys.Big) size = 2;
			setRelevantFishes(
				gameState.fishes.filter((fish) => fish[1] === size)
			);
		} else if (gameState.state === DayStayeKeys.Fishing) {
			if (gameState.fisingPole === "none") return;
			const { sold, earned } = sellFishes(
				relevantFishes(),
				gameState.fisingPole,
				{ ...gameState.baits }
			);
			setSoldFishes(sold);
			setEarned(earned);
		}
	});

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<div class="container mx-auto flex flex-col items-center max-w-[600px] h-screen p-2">
					<img
						src="https://raw.githubusercontent.com/peculiarnewbie/going-fishing/master/src/assets/title.webp"
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

					<Show when={gameState.state !== DayStayeKeys.InputFish}>
						<div class="self-start py-2">
							{"today's fish forecast:"}
							<div>{`small: ${fishSizes()[0]}, medium: ${
								fishSizes()[1]
							}, big: ${fishSizes()[2]}`}</div>
							<div>{`red: ${fishColors()[0]}, green: ${
								fishColors()[1]
							}, blue: ${fishColors()[2]}`}</div>
							{/* <div>
							relevant fishes: {JSON.stringify(relevantFishes())}
						</div> */}
						</div>
					</Show>

					<Switch>
						<Match
							when={gameState.state === DayStayeKeys.InputFish}
						>
							<form
								class="flex flex-col gap-2 pt-2"
								onsubmit={() =>
									setGameState("state", DayStayeKeys.BuyPole)
								}
							>
								<div>{`input number of fishes (10-50)`}</div>
								<input
									class="border border-blue-400 p-1 rounded-md"
									placeholder="10"
									type="number"
									min={10}
									max={50}
									onchange={(e) => {
										setFishCount(
											parseInt(
												(e.target as HTMLInputElement)
													.value
											)
										);
									}}
								/>
								<button
									class="flex p-2 mt-2  bg-blue-400 rounded-md justify-center"
									type="submit"
								>
									continue
								</button>
							</form>
						</Match>

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

						<Match when={gameState.state === DayStayeKeys.Fishing}>
							<Show
								when={soldFishes().length > 0}
								fallback={
									<div>{`you've caught no fish today`}</div>
								}
							>
								<SoldFishes
									fishes={soldFishes()}
									earned={earned()}
								/>
							</Show>
							<Switch>
								<Match when={gameState.gold + earned() > 100}>
									<div>
										{`
										Congratulations! In total you've earned 
										${gameState.gold + earned() - 100} gold
										today
									`}
									</div>
								</Match>
								<Match when={gameState.gold + earned() === 100}>
									<div>
										{`	Welp, feels like you just wasted the
										day. You've ended up with the same
										amount of gold as you started
									`}
									</div>
								</Match>
								<Match when={gameState.gold + earned() < 100}>
									<div>
										{`Oh No! you've lost ${
											100 - (gameState.gold + earned())
										} gold today`}
									</div>
								</Match>
							</Switch>
							<button
								onclick={() => location.reload()}
								class="flex p-2 mt-2  bg-blue-400 rounded-md"
							>
								restart
							</button>
						</Match>
					</Switch>

					<FishPrices />

					{/* <DebugUI gameState={gameState} /> */}
				</div>
			</header>
		</div>
	);
};

export default App;
