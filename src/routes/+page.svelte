<div class="bg-surface border-line-bold rounded-xl border p-6 shadow-sm">
	<h2 class="text-content text-xl font-bold">Hello Developer</h2>
	<p class="text-content-muted mt-2">
		This card automatically adjusts its colors when you switch themes.
	</p>
	<button
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
	</button>
</div>
