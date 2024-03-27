import { For, Show } from "solid-js";
import { BaitType, FishingPoleType, Purchasable } from "../Game/types";
import { createEffect, createSignal } from "solid-js";

export default function PurchaseList(props: {
	items: FishingPoleType[] | BaitType[];
	buy: (item: FishingPoleType | BaitType) => void;
}) {
	return (
		<div>
			<div></div>
			<div class="flex flex-col">
				<For each={props.items}>
					{(item) => <BuyButton item={item} buy={props.buy} />}
				</For>
			</div>
		</div>
	);
}

function BuyButton(props: {
	item: FishingPoleType | BaitType;
	buy: (item: FishingPoleType | BaitType) => void;
}) {
	const [text, setText] = createSignal("");

	createEffect(() => {
		if ("size" in props.item) {
			setText(`Buy ${props.item.size} fishing pole`);
		} else {
			setText(`Buy ${props.item.color} bait`);
		}
	});

	return (
		<button
			class="flex p-1 bg-slate-400 rounded-md"
			onclick={() => props.buy(props.item)}
		>
			<div>{text()}</div>
			<div>{props.item.price} gold</div>
		</button>
	);
}
