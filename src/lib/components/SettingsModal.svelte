<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { FONT_SIZES, settings } from "$lib/stores/settings";
  import { Checkbox } from "./ui/checkbox";
  import Input from "./ui/input/input.svelte";
  import Slider from "./ui/slider/slider.svelte";

  // Ideally, this should come from a store or props
  let { children } = $props();

  const fonts = [
    { value: "sans-serif", label: "Sans Serif" },
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "open-sans", label: "Open Sans" },
    { value: "source-sans-3", label: "Source Sans 3" },
    { value: "helvetica", label: "Helvetica" },
    { value: "arial", label: "Arial" },
    { value: "verdana", label: "Verdana" },
    { value: "georgia", label: "Georgia" },
    { value: "times-new-roman", label: "Times New Roman" },
    { value: "courier-new", label: "Courier New" },
  ];

  let fontStyle = $state($settings.fontStyle);
  const triggerContent = $derived(
    fonts.find((f) => f.value === fontStyle)?.label ?? "Select a font",
  );

  let isDragging = $state(false);
</script>

<Dialog.Root open={true}>
  {@render children()}
  <Dialog.Overlay class={isDragging ? "bg-transparent" : "bg-black/50"} />
  <Dialog.Content class="sm:max-w-[480px] {isDragging ? 'opacity-50' : ''}">
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
    </Dialog.Header>

    <div class="grid gap-4 py-4">
      <div class="flex flex-col gap-4">
        <h4
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider leading-none"
        >
          Typography
        </h4>

        <div class="flex items-start gap-4">
          <div class="grid gap-2 flex-1">
            <label
              for="fontStyle"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Font Style
            </label>
            <Select.Root
              type="single"
              name="fontStyle"
              bind:value={$settings.fontStyle}
            >
              <Select.Trigger class="w-full">
                {triggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each fonts as font (font.value)}
                    <Select.Item value={font.value} label={font.label}>
                      {font.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <div class="flex flex-col flex-1 h-full">
            <div class="flex items-center justify-between">
              <label
                for="fontSize"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Font Size
              </label>
              <span class="text-sm text-muted-foreground"
                >{$settings.fontSize}px</span
              >
            </div>
            <Slider
              id="fontSize"
              type="single"
              min={36}
              step={FONT_SIZES}
              max={180}
              onValueChange={() => (isDragging = true)}
              onValueCommit={() => (isDragging = false)}
              bind:value={$settings.fontSize}
              class="flex h-2 my-auto w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <label
              for="offset"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Offset
            </label>
            <span class="text-sm text-muted-foreground"
              >{$settings.wordCenterOffset}px</span
            >
          </div>
          <Slider
            id="offset"
            type="single"
            min={-400}
            max={200}
            step={10}
            onValueChange={() => (isDragging = true)}
            onValueCommit={() => (isDragging = false)}
            bind:value={$settings.wordCenterOffset}
            class="flex h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
        </div>
      </div>

      <hr class="border-border" />

      <div class="flex flex-col gap-4">
        <h4
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider leading-none"
        >
          Viewport
        </h4>
        <div class="grid gap-3">
          <div class="flex">
            <div class="flex flex-1 items-center space-x-2">
              <Checkbox
                id="progressBar"
                bind:checked={$settings.progressBarVisible}
                class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
              />
              <label for="progressBar" class="text-sm font-medium leading-none"
                >Progress Bar</label
              >
            </div>

            <div class="flex flex-1 items-center space-x-2">
              <Checkbox
                id="progressText"
                bind:checked={$settings.progressTextVisible}
                class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
              />
              <label for="progressText" class="text-sm font-medium leading-none"
                >Progress Text</label
              >
            </div>
          </div>

          <div class="flex items-start">
            <div class="grid flex-1 gap-3">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="guidelines"
                  bind:checked={$settings.guidelineVisible}
                  class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
                <label
                  for="guidelines"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Guidelines
                </label>
              </div>
              {#if $settings.guidelineVisible}
                <div
                  class="ml-6 flex items-center space-x-2 animate-in slide-in-from-top-1 fade-in duration-200"
                >
                  <Checkbox
                    id="verticalTicks"
                    bind:checked={$settings.verticalTicksVisible}
                    class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                  />
                  <label
                    for="verticalTicks"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Vertical Ticks
                  </label>
                </div>
              {/if}
            </div>

            <div class="grid flex-1 gap-3">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="centerOnOrp"
                  bind:checked={$settings.centerOnOrp}
                  class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
                <label
                  for="centerOnOrp"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Center on ORP
                </label>
              </div>
              {#if $settings.centerOnOrp}
                <div
                  class="ml-6 flex items-center space-x-2 animate-in slide-in-from-top-1 fade-in duration-200"
                >
                  <Checkbox
                    id="orpHighlight"
                    bind:checked={$settings.orpHighlight}
                    class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                  />
                  <label
                    for="orpHighlight"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ORP Highlight
                  </label>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <hr class="border-border" />

      <div class="grid gap-4">
        <h4
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider leading-none"
        >
          Timing
        </h4>
        <div class="grid gap-3">
          <div class="flex items-center space-x-2">
            <Checkbox
              id="uniformWordTiming"
              bind:checked={$settings.dynamicWordTiming}
              class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
            />
            <label
              for="uniformWordTiming"
              class="text-sm font-medium leading-none"
            >
              Dynamic Word Timing
            </label>
          </div>

          {#if $settings.dynamicWordTiming}
            <div
              class="ml-6 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in duration-200"
            >
              <div class="grid gap-1.5">
                <label
                  for="softStop"
                  class="text-xs font-medium text-muted-foreground"
                >
                  Soft Stop Mult.
                </label>
                <Input
                  id="softStop"
                  type="number"
                  step="0.1"
                  bind:value={$settings.softStopMultiplier}
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div class="grid gap-1.5">
                <label
                  for="hardStop"
                  class="text-xs font-medium text-muted-foreground"
                >
                  Hard Stop Mult.
                </label>
                <Input
                  id="hardStop"
                  type="number"
                  step="0.1"
                  bind:value={$settings.hardStopMultiplier}
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          {/if}

          <div class="grid gap-2">
            <div class="flex items-center justify-between">
              <label
                for="wpm"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Words Per Minute
              </label>
              <span class="text-sm text-muted-foreground"
                >{$settings.wpm} wpm</span
              >
            </div>
            <Slider
              id="wpm"
              type="single"
              min={50}
              max={1000}
              step={50}
              bind:value={$settings.wpm}
              class="flex h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
            />
          </div>
        </div>
      </div>
    </div>

    <Dialog.Footer class="-mt-4">
      <Dialog.Close
        class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      >
        Done
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
