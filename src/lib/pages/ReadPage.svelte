<script>
	import { Button } from "$lib/components/ui/button";
	import { X } from "@lucide/svelte";
</script>

<div class="relative inset-0">
	<Button
		size="icon"
		class="absolute top-8 left-8 text-accent-foreground hover:text-accent-foreground/80 hover:scale-110 transition-all duration-100 bg-background border-background hover:bg-background hover:border-background"
	>
		<X class="size-12" />
	</Button>
</div>
