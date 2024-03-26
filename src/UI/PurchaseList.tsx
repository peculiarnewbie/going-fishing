import { For, Show } from "solid-js";
import { BaitType, FishingPoleType, Purchasable } from "../Game/types";
import BuyButton from "./BuyButton";

export default function PurchaseList(props: {
	items: FishingPoleType[] | BaitType[];
}) {
	return (
		<div>
			<For each={props.items}>{(item) => <BuyButton item={item} />}</For>
			<div></div>
		</div>
	);
}
