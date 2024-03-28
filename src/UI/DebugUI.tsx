import { Show, createSignal } from "solid-js";
import { GameState } from "../Game/types";

export default function DebugUI(props: { gameState: GameState }) {
	const [show, setShow] = createSignal(false);
	return (
		<div class="flex flex-col items-start fixed bottom-4 left-4 border border-blue-300 p-2 rounded-md">
			<Show when={!show()}>
				<button
					class="p-1 rounded-md bg-blue-300"
					onclick={() => setShow(true)}
				>
					Show States
				</button>
			</Show>
			<Show when={show()}>
				<button
					class="p-1 rounded-md bg-blue-300"
					onclick={() => setShow(false)}
				>
					Close
				</button>
				<div>state: {props.gameState.state}</div>
				<div>gold: {props.gameState.gold}</div>
				<div>pole: {props.gameState.fisingPole}</div>
				<div>{JSON.stringify(props.gameState.baits)}</div>
				<div>{JSON.stringify(props.gameState.fishes)}</div>
			</Show>
		</div>
	);
}
