<style>
	.chrome {
		@apply w-screen h-screen grid;
		grid-template-rows: 4rem 1fr;
		grid-template-columns: 1fr 3fr 2fr;
		grid-template-areas:
			"header		palettes	graphs"
			"controls	palettes	graphs";
	}

	.header {
		@apply p-4 bg-gray-900;
		grid-area: header;
	}

	.controls {
		@apply p-2;
		grid-area: controls;
	}

	.palettes {
		@apply grid;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-area: palettes / span 2;
	}

	.controls,
	.palettes {
		@apply overflow-y-auto;
	}

	.controls {
		@apply border-r-4 border-gray-900;
	}

	.title {
		@apply text-2xl font-bold text-gray-100 text-center;
	}
</style>

<script>
	import "./global.css";
	import eases from "eases";
	import hsluv from "hsluv";
	import Palette from "./Palette.svelte";
	import Swatch from "./Swatch.svelte";

	const hsluvToHex = hsluv.hsluvToHex;

	let hMin = 230; //204;
	let hMax = 240;
	let hEase = "quadOut";
	let sMin = 60;
	let sMax = 100;
	let sEase = "quadOut";
	let lMin = 5;
	let lMax = 100;
	let lEase = "quadOut";

	let hUnit;
	let sUnit;
	let lUnit;
	let waterUv = [];

	let length = 9;

	const easeOptions = Object.keys(eases);

	$: hUnit = (hMax - hMin) / length;
	$: sUnit = (sMax - sMin) / length;
	$: lUnit = (lMin - lMax) / length;

	const easeSteps = (easeFn, currentStep, totalStep) =>
		easeFn(currentStep / totalStep) * currentStep;

	$: waterUv = Array.from({ length }).map((_, i) => {
		const h = hMin + easeSteps(eases[hEase], i + 1, length) * hUnit;
		const s = sMin + easeSteps(eases[sEase], i + 1, length) * sUnit;
		const l = lMax + easeSteps(eases[lEase], i + 1, length) * lUnit;
		return {
			h,
			s,
			l,
			isUv: true,
		};
	});
</script>

<main class="chrome">
	<header class="header">
		<h1 class="title">
			color
			<span aria-hidden="true">×</span>
			color
		</h1>
	</header>
	<div class="controls">
		<div class="control-set control-set--half-width">
			<h2>Steps</h2>
			<div class="control-group">
				<label for="steps">Steps</label>

				<div class="range-set">
					<input
						id="steps"
						type="range"
						bind:value="{length}"
						min="3"
						max="21" />
					<span class="range-set__value">{length}</span>
				</div>
			</div>
		</div>

		<div class="control-set">
			<h2>Hue</h2>
			<div class="control-group">
				<label for="hue-min">Min</label>
				<input
					id="hue-min"
					type="range"
					bind:value="{hMin}"
					min="0"
					max="360" />
			</div>
			<div class="control-group">
				<label for="hue-max">Max</label>
				<input
					id="hue-max"
					type="range"
					bind:value="{hMax}"
					min="0"
					max="360" />
			</div>
			<div class="control-group">
				<label for="hue-ease">Easing</label>
				<select id="hue-ease" bind:value="{hEase}">
					{#each easeOptions as ease}
						<option value="{ease}">{ease}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="control-set">
			<h2>Saturation</h2>
			<div class="control-group">
				<label for="sat-min">Min</label>
				<input
					id="sat-min"
					type="range"
					bind:value="{sMin}"
					min="0"
					max="100" />
			</div>
			<div class="control-group">
				<label for="sat-max">Max</label>
				<input
					id="sat-max"
					type="range"
					bind:value="{sMax}"
					min="0"
					max="100" />
			</div>
			<div class="control-group">
				<label for="sat-ease">Easing</label>
				<select id="sat-ease" bind:value="{sEase}">
					{#each easeOptions as ease}
						<option value="{ease}">{ease}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="control-set">
			<h2>Lightness</h2>
			<div class="control-group">
				<label for="light-min">Min</label>
				<input
					id="light-min"
					type="range"
					bind:value="{lMin}"
					min="0"
					max="100" />
			</div>
			<div class="control-group">
				<label for="light-max">Max</label>
				<input
					id="light-max"
					type="range"
					bind:value="{lMax}"
					min="0"
					max="100" />
			</div>
			<div class="control-group">
				<label for="light-ease">Easing</label>
				<select id="light-ease" bind:value="{lEase}">
					{#each easeOptions as ease}
						<option value="{ease}">{ease}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<div class="palettes">
		<Palette>
			{#each waterUv as color, i}
				<Swatch
					fillHeight
					hexCode="{hsluvToHex([color.h, color.s, color.l])}"
					label="{i}" />
			{/each}
		</Palette>
	</div>
</main>
