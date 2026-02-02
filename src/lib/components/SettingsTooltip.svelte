<script>
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { CircleQuestionMark } from "@lucide/svelte";
  import { buttonVariants } from "./ui/button";
  let { text } = $props();
</script>

<Tooltip.Provider delayDuration={200}>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <CircleQuestionMark class="size-4" />
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{text}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
