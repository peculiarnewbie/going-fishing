import { GameState } from "../Game/types";

export default function DebugUI(props: { gameState: GameState }) {
	return (
		<div class="flex flex-col">
			<div>state: {props.gameState.state}</div>
			<div>gold: {props.gameState.gold}</div>
			<div>pole: {props.gameState.fisingPole}</div>
			<div>{JSON.stringify(props.gameState.baits)}</div>
			<div>{JSON.stringify(props.gameState.fishes)}</div>
		</div>
	);
}
