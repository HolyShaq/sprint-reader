<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { X } from "@lucide/svelte";
    import { fade } from "svelte/transition";

	interface Props {
		text: string;
		onBack: () => void;
	}
	let { text, onBack }: Props = $props();

	let textIndex = $state(0);
	const textArray = $derived(text.trim().split(/\s+/));
	const currentWord = $derived(textArray[textIndex] ?? "");
</script>

<div transition:fade={{ duration: 100 }} class="relative w-screen h-screen">
	<Button
		onclick={onBack}
		size="icon"
		class="absolute top-8 left-8 text-accent-foreground hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-background hover:bg-background hover:border-background"
	>
		<X class="size-12" />
	</Button>

	<h1
		class="text-9xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -translate-x-100 -translate-y-24"
	>
		{currentWord}
	</h1>
</div>
