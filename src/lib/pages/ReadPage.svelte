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

  const offset = -300; // Use this to adjust x position of the word

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
        firstHalfRect.left - orpLetterRect.left - orpLetterWidth / 2 + offset;

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

<div
  transition:fade={{ duration: 100 }}
  class="relative w-screen h-screen overflow-hidden"
>
  <!-- Close button -->
  <Button
    onclick={onBack}
    size="icon"
    class="absolute top-8 left-8 text-accent-foreground hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-background hover:bg-background hover:border-background"
  >
    <X class="size-12" />
  </Button>

  <!-- Word -->
  <h1
    class="flex gap-0 font-bold absolute top-1/2 left-1/2 -translate-y-1/2"
    style:font-size={`${120}px`}
  >
    <span id="firstHalf">{firstHalf}</span>
    <span id="orpLetter" class="text-red-500">{orpLetter}</span>
    <span id="secondHalf">{secondHalf}</span>
  </h1>

  <!-- Guideline Markers -->
  <div
    class="absolute top-1/2 w-full h-2 bg-border"
    style:transform={`translateY(-${300}px)`}
  ></div>
  <div
    class="absolute top-1/2 w-full h-2 bg-border"
    style:transform={`translateY(${300}px)`}
  ></div>
  <div
    class="absolute top-1/2 left-1/2 w-2 bg-border"
    style:transform={`translate(${offset}px, -${300 - 8}px)`}
    style:height={`${100}px`}
  ></div>

  <div
    class="absolute top-1/2 left-1/2 w-2 bg-border -translate-y-full"
    style:transform={`translate(${offset}px, ${300}px)`}
    style:height={`${100}px`}
  ></div>
</div>
