<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import { fly } from "svelte/transition";

  let { children } = $props();
</script>

<Popover.Root>
  {@render children()}
  <Popover.Content
    forceMount
    side="right"
    sideOffset={8}
    class="w-fit bg-transparent ring-0"
  >
    {#snippet child({ wrapperProps, props, open })}
      {#if open}
        <div {...wrapperProps}>
          <div
            {...props}
            transition:fly={{
              x: -10,
              duration: 200,
            }}
            class="flex flex-col items-center gap-4"
          >
            <p class="text-muted-foreground text-sm">
              Use
              <Kbd.Root>{"<-"}</Kbd.Root> and <Kbd.Root>{"->"}</Kbd.Root>
              to navigate. Use
              <Kbd.Root>{"↑"}</Kbd.Root> and <Kbd.Root>{"↓"}</Kbd.Root>
              to control WPM. Use
              <Kbd.Root>Space</Kbd.Root>
              to toggle play.
            </p>
          </div>
        </div>
      {/if}
    {/snippet}
  </Popover.Content>
</Popover.Root>
