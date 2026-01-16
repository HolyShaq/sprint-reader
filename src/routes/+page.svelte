<script>
	import InputPage from "$lib/pages/InputPage.svelte";
	import ReadPage from "$lib/pages/ReadPage.svelte";

	let text = $state("");
	let mode = $state("input");
</script>

{#if mode === "input"}
	<InputPage bind:text onSubmit={() => (mode = "read")} />
{:else if mode === "read"}
	<ReadPage {text} onBack={() => (mode = "input")} />
{/if}
