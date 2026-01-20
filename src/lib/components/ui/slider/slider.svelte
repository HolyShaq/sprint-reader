<script lang="ts">
  import { Slider as SliderPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    value = $bindable(),
    orientation = "horizontal",
    class: className,
    dull = false,
    ...restProps
  }: WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
    dull?: boolean;
  } = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  class={cn(
    "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbs })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={cn(
        `${dull ? "bg-muted/50" : "bg-muted"} relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 transition-colors duration-100`,
      )}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        class={cn(
          `${dull ? "bg-primary/30" : "bg-primary"} absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full transition-colors duration-100`,
        )}
      />
    </span>
    {#each thumbs as thumb (thumb)}
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        index={thumb}
        class={`border-primary ring-ring/50 block size-4 shrink-0 rounded-full border ${dull ? "bg-white/30" : "bg-white "} shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`}
      />
    {/each}
  {/snippet}
</SliderPrimitive.Root>
