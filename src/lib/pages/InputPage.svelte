<script lang="ts">
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import { Trigger } from "$lib/components/ui/dialog";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { settings } from "$lib/stores/settings";
  import { Menu } from "@lucide/svelte";
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

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<div class="fixed inset-0 flex flex-col">
  <!-- Main Content -->
  <div class="flex-grow flex justify-center items-center">
    <div
      transition:fly={{ duration: 180, y: 16, easing: cubicOut }}
      class="w-full max-w-xl flex flex-col gap-4 bg-card border-border rounded-xl border p-6"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">ReadMeFast</h1>
        <SettingsModal>
          <Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
            <Menu />
          </Trigger>
        </SettingsModal>
      </div>
      <Textarea
        bind:value={text}
        placeholder="Enter text here"
        class="min-h-60 max-h-[60vh]"
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
    class="flex items-center justify-end gap-4 px-4 py-2"
  >
    <span>Made by HolyShaq</span>
    <div class="h-full w-px bg-border"></div>
    <span
      >Source on <a href="https://github.com/HolyShaq/bits-ui">GitHub</a></span
    >
    <div class="h-full w-px bg-border"></div>
    <span>Support me on <a href="https://ko-fi.com/holysaq">Ko-fi</a></span>
    <div class="h-full w-px bg-border"></div>
    <ModeToggle />
  </div>
</div>
