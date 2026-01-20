<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>

<Dialog.Root>
  <slot />
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
