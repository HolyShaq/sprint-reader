<script lang="ts">
  import { browser } from "$app/environment";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Trigger } from "$lib/components/ui/dialog";
  import { Slider } from "$lib/components/ui/slider";
  import { innerWidth } from "svelte/reactivity/window";
  import { getORPIndexFromLength, getDelayMultiplier } from "$lib/rsvp";
  import { settings } from "$lib/stores/settings";
  import {
    ChevronLeft,
    ChevronRight,
    Menu,
    Pause,
    Play,
    X,
  } from "@lucide/svelte";
  import clsx from "clsx";
  import { onDestroy, onMount } from "svelte";
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

  const wordChunkSize = 0;
  const wordsBefore = $derived(
    textArray.slice(Math.max(0, textIndex - wordChunkSize), textIndex) ?? [],
  );
  const wordsAfter = $derived(
    textArray.slice(textIndex + 1, textIndex + wordChunkSize + 1) ?? [],
  );

  const isMobile = $derived.by(() => {
    if (innerWidth.current) {
      return innerWidth.current < 640;
    }
    return false;
  });
  const centerOffset = $derived(isMobile ? 0 : $settings.wordCenterOffset);
  const controlPanelVisible = $derived(
    isMobile ? true : $settings.controlPanelVisible,
  );
  const atFirstWord = $derived(textIndex === 0);
  const atLastWord = $derived(textIndex === textArray.length - 1);

  $effect(() => {
    if (!browser) return;

    currentWord;
    $settings.fontSize;

    const wordElement = document.getElementById("word");
    const orpLetterElement = document.getElementById("orpLetter");
    const wordBeforeElement = document.getElementById("wordBefore");

    if (!wordElement || !orpLetterElement || !wordBeforeElement) return;

    let xOffset;
    if ($settings.centerOnOrp) {
      // Offset the word such that the ORP letter is centered
      const firstHalfRect = wordBeforeElement.getBoundingClientRect();
      const orpLetterRect = orpLetterElement.getBoundingClientRect();
      const orpLetterWidth = orpLetterRect.width;
      xOffset =
        firstHalfRect.left -
        orpLetterRect.left -
        orpLetterWidth / 2 +
        centerOffset;
    } else {
      const wordRect = wordElement!.getBoundingClientRect();
      xOffset = -wordRect.width / 2 + centerOffset;
    }
    wordElement.style.transform = `translateX(${xOffset}px)`;
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
    nextWordTimeout = setTimeout(
      nextWord,
      (60000 / $settings.wpm) * delayMultiplier,
    );
  };

  // Utility Functions for controlling reader
  const goToPrevWord = () => {
    textIndex = Math.max(0, textIndex - 1);
  };

  const goToNextWord = () => {
    textIndex = Math.min(textArray.length - 1, textIndex + 1);
  };

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (isPlaying) nextWord();
    else if (nextWordTimeout) {
      clearTimeout(nextWordTimeout);
      nextWordTimeout = null;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      goToPrevWord();
    } else if (event.code === "ArrowRight") {
      goToNextWord();
    } else if (event.code === "Space") {
      togglePlay();
    } else if (event.code === "Escape") {
      onBack();
    }
  };

  onMount(() => {
    if (!browser) return;
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    if (!browser) return;
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

  <SettingsModal dimOnDrag>
    <Trigger
      onkeydown={(e) => e.preventDefault()}
      class={clsx(
        buttonVariants({ variant: "outline", size: "icon" }),
        isPlaying ? "text-accent-foreground/20" : "text-accent-foreground",
        "absolute top-8 right-8 hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-0 hover:bg-background",
      )}
    >
      <Menu class="size-12" />
    </Trigger>
  </SettingsModal>

  <!-- Word -->
  <div
    id="word"
    style:font-size={`${$settings.fontSize}px`}
    style:font-family={$settings.fontStyle}
    class="flex items-end gap-8 absolute top-1/2 left-1/2 -translate-y-1/2 whitespace-nowrap"
  >
    <div id="wordBefore" class="flex space-x-8">
      {#each wordsBefore as word}
        <h1 class="text-muted-foreground/50">{word}</h1>
      {/each}
    </div>
    <h1 class="flex gap-0 font-bold">
      <span id="firstHalf">{firstHalf}</span>
      <span
        id="orpLetter"
        class="transition-colors duration-200"
        class:text-red-500={$settings.centerOnOrp && $settings.orpHighlight}
        >{orpLetter}</span
      >
      <span id="secondHalf">{secondHalf}</span>
    </h1>
    <div id="wordAfter" class="flex space-x-8">
      {#each wordsAfter as word}
        <h1 class="text-muted-foreground/50">{word}</h1>
      {/each}
    </div>
  </div>

  <!-- Guideline Markers -->
  {#if $settings.guidelineVisible}
    <div
      transition:fade={{ duration: 100 }}
      class="absolute top-1/2 w-full h-2 bg-border/50"
      style:transform={`translateY(-${300}px)`}
    ></div>
    <div
      transition:fade={{ duration: 100 }}
      class="absolute top-1/2 w-full h-2 bg-border/50"
      style:transform={`translateY(${300}px)`}
    ></div>
    {#if $settings.verticalTicksVisible}
      <div
        transition:fade={{ duration: 100 }}
        class="absolute top-1/2 left-1/2 w-2 bg-border/50 -translate-x-1/2"
        style:transform={`translate(${centerOffset}px, -${300 - 8}px)`}
        style:height={`${100}px`}
      ></div>
      <div
        transition:fade={{ duration: 100 }}
        class="absolute top-1/2 left-1/2 w-2 bg-border/50 -translate-x-1/2 -translate-y-full"
        style:transform={`translate(${centerOffset}px, ${300}px)`}
        style:height={`${100}px`}
      ></div>
    {/if}
  {/if}

  <!-- Progress Bar -->
  <div
    class="absolute w-full h-6 px-4 sm:px-12 gap-4 flex justify-end top-1/2 items-center"
    style:transform={`translateY(${320}px)`}
  >
    {#if controlPanelVisible}
      <div class="flex items-center mt-2">
        <Button
          onclick={goToPrevWord}
          variant="ghost"
          size="icon"
          class={atFirstWord
            ? "pointer-events-none opacity-50"
            : "cursor-pointer"}
        >
          <ChevronLeft />
        </Button>
        <Button
          onclick={togglePlay}
          variant="ghost"
          size="icon"
          class="cursor-pointer"
        >
          {#if !isPlaying}
            <Play />
          {:else}
            <Pause />
          {/if}
        </Button>
        <Button
          onclick={goToNextWord}
          variant="ghost"
          size="icon"
          class={atLastWord
            ? "pointer-events-none opacity-50"
            : "cursor-pointer"}
        >
          <ChevronRight />
        </Button>
      </div>
    {/if}

    {#if $settings.progressBarVisible}
      <div class="flex-grow mt-2" transition:fade={{ duration: 100 }}>
        <Slider
          type="single"
          bind:value={textIndex}
          min={0}
          max={textArray.length - 1}
          step={1}
          dull={isPlaying}
          class="w-full transition-all duration-200"
        />
      </div>
    {/if}

    {#if $settings.progressTextVisible}
      <span
        transition:fade={{ duration: 100 }}
        class="mt-2 whitespace-nowrap {isPlaying
          ? 'text-muted'
          : ''} transition-colors duration-100"
        >{textIndex + 1} / {textArray.length}</span
      >
    {/if}
  </div>
</div>
