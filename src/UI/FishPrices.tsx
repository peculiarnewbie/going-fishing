import { Show, createSignal } from "solid-js";

export default function FishPrices() {
	const [show, setShow] = createSignal(false);

	return (
		<div class="w-screen h-full flex justify-end items-end mb-4">
			<div class="flex flex-col border border-blue-300 p-2 rounded-md max-w-96 mr-4">
				<Show
					when={show()}
					fallback={
						<button
							class="flex p-2 bg-blue-300 rounded-md"
							onclick={() => setShow(true)}
						>
							show fish prices
						</button>
					}
				>
					<ul>
						<li>- Red small fish: 1-5 gold</li>
						<li>- Red medium fish: 5-10 gold</li>
						<li>- Red big fish: 10-15 gold</li>
						<li>- Blue small fish: 3-5 gold</li>
						<li>- Blue medium fish: 8-10 gold</li>
						<li>- Blue big fish: 13-15 gold</li>
						<li>- Green small fish: 5 gold</li>
						<li>- Green medium fish: 10 gold</li>
						<li>- Green big fish: 15 gold</li>
					</ul>
					<button
						class="flex p-2 mt-2  bg-blue-300 rounded-md text-center justify-center"
						onclick={() => setShow(false)}
					>
						close
					</button>
				</Show>
			</div>
		</div>
	);
}
