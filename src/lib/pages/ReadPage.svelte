<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { getORPIndexFromLength } from "$lib/utils";
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

  const orpIndex = $derived(getORPIndexFromLength(currentWord.length));
  const firstHalf = $derived(currentWord.slice(0, orpIndex));
  const orpLetter = $derived(currentWord[orpIndex]);
  const secondHalf = $derived(currentWord.slice(orpIndex + 1));

  $effect(() => {
    currentWord;
    const firstHalfElement = document.getElementById("firstHalf");
    const orpLetterElement = document.getElementById("orpLetter");
    const secondHalfElement = document.getElementById("secondHalf");

    if (firstHalfElement && orpLetterElement && secondHalfElement) {
      // Offset the word such that the ORP letter is centered
      const firstHalfRect = firstHalfElement.getBoundingClientRect();
      const orpLetterRect = orpLetterElement.getBoundingClientRect();
      const orpLetterWidth = orpLetterRect.width;
      const xOffset =
        firstHalfRect.left - orpLetterRect.left - orpLetterWidth / 2;

      firstHalfElement.style.transform = `translateX(${xOffset}px)`;
      orpLetterElement.style.transform = `translateX(${xOffset}px)`;
      secondHalfElement.style.transform = `translateX(${xOffset}px)`;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      textIndex = Math.max(0, textIndex - 1);
    } else if (e.key === "ArrowRight") {
      textIndex = Math.min(textArray.length - 1, textIndex + 1);
    }
  });
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
    class="flex gap-0 text-9xl font-bold absolute top-1/2 left-1/2 -translate-y-1/2"
  >
    <span id="firstHalf">{firstHalf}</span>
    <span id="orpLetter" class="text-red-500">{orpLetter}</span>
    <span id="secondHalf">{secondHalf}</span>
  </h1>
</div>
