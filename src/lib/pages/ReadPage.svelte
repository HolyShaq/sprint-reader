<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import { Slider } from "$lib/components/ui/slider";
  import { getORPIndexFromLength, getDelayMultiplier } from "$lib/rsvp";
  import { settings } from "$lib/stores/settings";
  import { Menu, X } from "@lucide/svelte";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    text: string;
    wpm: number;
    onBack: () => void;
  }
  let { text, wpm, onBack }: Props = $props();

  let textIndex = $state(0);
  const textArray = $derived(text.trim().split(/\s+/));
  let progress = $derived((textIndex + 1) / textArray.length);
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

  let isPlaying = $state(false);
  let nextWordTimeout: number | null = null;
  const nextWord = () => {
    if (!isPlaying) return;
    if (textIndex >= textArray.length - 1) {
      isPlaying = false;
      return;
    }

    textIndex++;
    const delayMultiplier = getDelayMultiplier(currentWord, $settings);
    nextWordTimeout = setTimeout(nextWord, (60000 / wpm) * delayMultiplier);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      textIndex = Math.max(0, textIndex - 1);
    } else if (event.code === "ArrowRight") {
      textIndex = Math.min(textArray.length - 1, textIndex + 1);
    } else if (event.code === "Space") {
      isPlaying = !isPlaying;
      if (isPlaying) nextWord();
      else if (nextWordTimeout) {
        clearTimeout(nextWordTimeout);
        nextWordTimeout = null;
      }
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
    if (nextWordTimeout) clearTimeout(nextWordTimeout);
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
    class="absolute top-8 left-8 {isPlaying
      ? 'text-accent-foreground/20'
      : 'text-accent-foreground'} hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-background hover:bg-background hover:border-background"
  >
    <X class="size-12" />
  </Button>

  <Button
    class="absolute top-8 right-8 {isPlaying
      ? 'text-accent-foreground/20'
      : 'text-accent-foreground'} hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-background hover:bg-background hover:border-background"
    size="icon"
  >
    <Menu class="size-12" />
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
    class="absolute top-1/2 w-full h-2 bg-border/50"
    style:transform={`translateY(-${300}px)`}
  ></div>
  <div
    class="absolute top-1/2 w-full h-2 bg-border/50"
    style:transform={`translateY(${300}px)`}
  ></div>
  <div
    class="absolute top-1/2 left-1/2 w-2 bg-border/50 -translate-x-1/2"
    style:transform={`translate(${offset}px, -${300 - 8}px)`}
    style:height={`${100}px`}
  ></div>
  <div
    class="absolute top-1/2 left-1/2 w-2 bg-border/50 -translate-x-1/2 -translate-y-full"
    style:transform={`translate(${offset}px, ${300}px)`}
    style:height={`${100}px`}
  ></div>

  <!-- Progress Bar -->
  <div
    class="absolute w-full px-12 gap-4 flex top-1/2 items-center"
    style:transform={`translateY(${320}px)`}
  >
    <Slider
      type="single"
      bind:value={textIndex}
      min={0}
      max={textArray.length - 1}
      step={1}
      dull={isPlaying}
      class="flex-grow"
    />
    <span class="whitespace-nowrap {isPlaying ? 'text-muted' : ''} transition-colors duration-100"
      >{textIndex + 1} / {textArray.length}</span
    >
  </div>
</div>
