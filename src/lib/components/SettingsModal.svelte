<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  // Ideally, this should come from a store or props
  let { children } = $props();
  let settings = {
    offset: 0,
    fontSize: 64,
    guidelines: true,
    verticalTicks: false,
    progressBar: true,
    progressText: true,
    uniformWordTiming: true,
    softStopMultiplier: 1.5,
    hardStopMultiplier: 2.0,
  };
</script>

<Dialog.Root>
  {@render children()}
  <Dialog.Content class="sm:max-w-[480px]">
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
    </Dialog.Header>

    <div class="grid gap-6 py-4">
      <div class="grid gap-4">
        <h4
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Typography
        </h4>
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <label
              for="offset"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Offset
            </label>
            <span class="text-sm text-muted-foreground"
              >{settings.offset}px</span
            >
          </div>
          <input
            id="offset"
            type="range"
            min="-400"
            max="200"
            bind:value={settings.offset}
            class="flex h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <label
              for="fontSize"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Font Size
            </label>
            <span class="text-sm text-muted-foreground"
              >{settings.fontSize}px</span
            >
          </div>
          <input
            id="fontSize"
            type="range"
            min="36"
            max="180"
            bind:value={settings.fontSize}
            class="flex h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
        </div>
      </div>

      <hr class="border-border" />

      <h4
        class="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
      >
        Viewport
      </h4>
      <div class="grid gap-3">
        <div class="flex items-center space-x-2">
          <input
            id="guidelines"
            type="checkbox"
            bind:checked={settings.guidelines}
            class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
          />
          <label
            for="guidelines"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Guidelines
          </label>
        </div>

        {#if settings.guidelines}
          <div
            class="ml-6 flex items-center space-x-2 animate-in slide-in-from-top-1 fade-in duration-200"
          >
            <input
              id="verticalTicks"
              type="checkbox"
              bind:checked={settings.verticalTicks}
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

        <div class="flex items-center space-x-2">
          <input
            id="progressBar"
            type="checkbox"
            bind:checked={settings.progressBar}
            class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
          />
          <label for="progressBar" class="text-sm font-medium leading-none"
            >Progress Bar</label
          >
        </div>

        <div class="flex items-center space-x-2">
          <input
            id="progressText"
            type="checkbox"
            bind:checked={settings.progressText}
            class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
          />
          <label for="progressText" class="text-sm font-medium leading-none"
            >Progress Text</label
          >
        </div>
      </div>

      <hr class="border-border" />

      <h4
        class="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
      >
        Timing
      </h4>
      <div class="grid gap-3">
        <div class="flex items-center space-x-2">
          <input
            id="uniformWordTiming"
            type="checkbox"
            bind:checked={settings.uniformWordTiming}
            class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
          />
          <label
            for="uniformWordTiming"
            class="text-sm font-medium leading-none"
          >
            Uniform Word Timing
          </label>
        </div>

        {#if !settings.uniformWordTiming}
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
              <input
                id="softStop"
                type="number"
                step="0.1"
                bind:value={settings.softStopMultiplier}
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
              <input
                id="hardStop"
                type="number"
                step="0.1"
                bind:value={settings.hardStopMultiplier}
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        {/if}
      </div>
    </div>

    <Dialog.Footer>
      <Dialog.Close
        class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      >
        Done
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
