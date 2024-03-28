import { For } from "solid-js";
import { FishTypeWithPrice } from "../Game/types";

export default function SoldFishes(props: { fishes: FishTypeWithPrice[] }) {
	return (
		<div class="flex flex-col">
			<For each={props.fishes}>
				{(fish) => (
					<div>
						{fish.size} {fish.color} fish: {fish.price} gold
					</div>
				)}
			</For>
		</div>
	);
}
