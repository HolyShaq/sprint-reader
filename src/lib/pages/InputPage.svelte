<script lang="ts">
	import { Button, Separator } from "bits-ui";
</script>

<div class="fixed inset-0 flex flex-col">
	<div class="flex-grow flex justify-center items-center">
		<div
			class="size-fit bg-surface border-line-bold rounded-xl border p-6 shadow-sm"
		>
			<h2 class="text-content text-xl font-bold">Hello Developer</h2>
			<p class="text-content-muted mt-2">
				This card automatically adjusts its colors when you switch themes.
			</p>
			<Button.Root
				class="bg-primary hover:bg-primary-hover text-content-inverse mt-4 rounded-lg px-4 py-2 transition-colors"
				onclick={() => {
					// Cycle through light, dark, and sepia
					const themes = ["light", "dark", "sepia"];
					document.documentElement.setAttribute(
						"data-theme",
						themes[
							(themes.indexOf(
								document.documentElement.getAttribute("data-theme") || "light",
							) +
								1) %
								themes.length
						],
					);
				}}
			>
				Click Me
			</Button.Root>
		</div>
	</div>
	<div class="flex items-center justify-end gap-4 px-4 py-2">
		<span>Made by HolyShaq</span>
		<div class="h-full w-px bg-line-bold"></div>
		<span
			>Source on <a href="https://github.com/HolyShaq/bits-ui">GitHub</a></span
		>
		<div class="h-full w-px bg-line-bold"></div>
		<span>Support me on <a href="https://ko-fi.com/holysaq">Ko-fi</a></span>
	</div>
</div>
