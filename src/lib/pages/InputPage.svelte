<script lang="ts">
  import { browser } from "$app/environment";
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import { Trigger } from "$lib/components/ui/dialog";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { getRandomPreset } from "$lib/preset";
  import { settings } from "$lib/stores/settings";
  import { Menu, Sparkle, Github, UserRound, HandCoins } from "@lucide/svelte";
  import { getRandomPresetInput } from "$lib/utils";
  import { onDestroy, onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  interface Props {
    text: string;
    onSubmit: () => void;
  }
  let { text = $bindable(), onSubmit }: Props = $props();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      onSubmit();
    }
  };

  const generateRandomPreset = () => {
    let randomPreset = getRandomPreset();
    while (randomPreset === text) {
      randomPreset = getRandomPreset();
    }
    text = randomPreset;
  };

  onMount(() => {
    if (!browser) return;
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    if (!browser) return;
    document.removeEventListener("keydown", handleKeyDown);
  });

  const handleGeneratePresetPress = () => {
    let newPresetInput = text;
    while (text == newPresetInput) {
      newPresetInput = getRandomPresetInput();
    }
    text = newPresetInput;
  };
</script>

<div class="fixed inset-0 flex flex-col">
  <!-- Main Content -->
  <div class="flex-grow flex justify-center items-center">
    <div
      transition:fly={{ duration: 180, y: 16, easing: cubicOut }}
      class="w-full mx-8 max-w-xl flex flex-col gap-4 bg-card border-border rounded-xl border p-6"
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-4 items-center">
          <h1 class="text-2xl font-bold">SprintReader</h1>
          <Button
            onclick={handleGeneratePresetPress}
            variant="outline"
            size="icon"
          >
            <Sparkle />
          </Button>
        </div>
        <SettingsModal>
          <Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
            <Menu />
          </Trigger>
        </SettingsModal>
      </div>
      <Textarea
        bind:value={text}
        placeholder="Enter text here"
        class="min-h-80 sm:min-h-60 max-h-[60vh]"
      />
      <div class="flex gap-2 items-center">
        <div class="flex-grow flex gap-4 items-center px-4">
          <Slider
            type="single"
            bind:value={$settings.wpm}
            min={50}
            max={1000}
            step={50}
          />
          <span class="whitespace-nowrap">{$settings.wpm} wpm</span>
        </div>
        <Button onclick={onSubmit}>Submit</Button>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div
    transition:fade={{ duration: 100 }}
    class="flex items-center justify-center sm:justify-end gap-4 px-4 py-2 text-xs font-medium text-muted-foreground"
  >
    <!-- Portfolio -->
    <a href="https://acehalili-portfolio.vercel.app/" target="_blank">
      <span class="hidden sm:inline hover:underline">Made by HolyShaq</span>
      <UserRound class="sm:hidden" />
    </a>

    <div class="h-full w-px bg-border"></div>

    <!-- Github -->
    <a target="_blank" href="https://github.com/HolyShaq/sprint-reader">
      <span class="hidden sm:inline hover:underline">Source on Github</span>
      <Github class="sm:hidden" />
    </a>

    <div class="h-full w-px bg-border"></div>

    <!-- Ko-fi -->
    <a href="https://ko-fi.com/holyshaq" target="_blank">
      <span class="hidden sm:inline hover:underline">Support me on Ko-fi</span>
      <HandCoins class="sm:hidden" />
    </a>

    <div class="h-full w-px bg-border"></div>

    <!-- Mode Toggle -->
    <ModeToggle />
  </div>
</div>
