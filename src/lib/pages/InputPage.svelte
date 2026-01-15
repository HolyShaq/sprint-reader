<script>
	import ModeToggle from "$lib/components/ModeToggle.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Menu } from "@lucide/svelte";
</script>

<div class="fixed inset-0 flex flex-col">
	<!-- Main Content -->
	<div class="flex-grow flex justify-center items-center">
		<div
			class="w-full max-w-3xl flex flex-col gap-2 bg-card border-border rounded-xl border p-6"
		>
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold">ReadMeFast</h1>
				<Button variant="outline" class="size-10">
					<Menu />
				</Button>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-end gap-4 px-4 py-2">
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
