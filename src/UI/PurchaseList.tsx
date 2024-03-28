import { For, Show } from "solid-js";
import { BaitType, FishingPoleType, Purchasable } from "../Game/types";
import { createEffect, createSignal } from "solid-js";

export default function PurchaseList(props: {
	items: FishingPoleType[] | BaitType[];
	buy: (item: FishingPoleType | BaitType) => void;
	gold: number;
}) {
	return (
		<div class=" max-w-[600px] mx-auto w-full">
			<div></div>
			<div class="flex flex-col gap-2">
				<For each={props.items}>
					{(item) => (
						<BuyButton
							item={item}
							buy={props.buy}
							gold={props.gold}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

function BuyButton(props: {
	item: FishingPoleType | BaitType;
	buy: (item: FishingPoleType | BaitType) => void;
	gold: number;
}) {
	const [text, setText] = createSignal("");
	const [disabled, setDisabled] = createSignal(false);

	createEffect(() => {
		if ("size" in props.item) {
			setText(`Buy ${props.item.size} fishing pole`);
		} else {
			setText(`Buy ${props.item.color} bait`);
		}
	});

	createEffect(() => {
		if (props.gold < props.item.price) setDisabled(true);
	});

	return (
		<button
			disabled={disabled()}
			class={`flex justify-between ${
				disabled() ? "bg-neutral-500" : "bg-blue-300"
			} rounded-md`}
			onclick={() => props.buy(props.item)}
		>
			<div class="p-2">{text()}</div>
			<div
				class={`
				${disabled() ? "bg-neutral-700" : "bg-blue-500"}
			 rounded-r-md p-2 w-1/6`}
			>
				{props.item.price} gold
			</div>
		</button>
	);
}
