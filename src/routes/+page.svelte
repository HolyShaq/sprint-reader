<script>
  import InputPage from "$lib/pages/InputPage.svelte";
  import ReadPage from "$lib/pages/ReadPage.svelte";

  let text = $state("");
  let wpm = $state(300);
  let mode = $state("input");
</script>

{#if mode === "input"}
  <InputPage bind:text bind:wpm onSubmit={() => (mode = "read")} />
{:else if mode === "read"}
  <ReadPage {text} {wpm} onBack={() => (mode = "input")} />
{/if}
