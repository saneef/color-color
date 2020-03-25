<style>
	.controls {
		display: flex;
		flex-wrap: wrap;
	}

	.control-set {
		flex-basis: calc(100% / 3);
		flex-shrink: 0;
		padding: 0.5rem 1rem;
	}

	.control-set--half-width {
		flex-basis: 50%;
	}

	.range-set {
		display: flex;
		align-items: center;
	}

	.range-set__value {
		margin-left: 0.5rem;
	}

	.palettes {
		display: flex;
	}

	.palette {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	.swatch {
		padding: 3rem 1rem 1rem;
	}

	.swatch--light {
		color: white;
	}
</style>

<script>
	import hsluv from "hsluv";
	import eases from "eases";
	const hsluvToHex = hsluv.hsluvToHex;

	let reference =
		"#FFF5F5,#FED7D7,#FEB2B2,#FC8181,#F56565,#E53E3E,#C53030,#9B2C2C,#742A2A";
	let referenceColors = [];

	$: referenceColors =
		reference === "" ? [] : reference.split(",").map(c => c.trim());

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
			hex: hsluvToHex([h, s, l]),
		};
	});
</script>

<main>
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
						max="15" />
					<span class="range-set__value">{length}</span>
				</div>
			</div>
		</div>
		<div class="control-set control-set--half-width">
			<h2>Reference colors</h2>
			<div class="control-group">
				<label for="reference">Colors</label>

				<input
					class="w-100"
					id="reference"
					type="text"
					bind:value="{reference}" />
				<p class="font-sm">
					Comma separated color codes (hex, rgb(), hsl(),...)
				</p>
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
		<ul class="palette">
			{#each waterUv as color, i}
				<li
					class="swatch"
					class:swatch--light="{color.l < 40}"
					style="background-color:{color.hex};">
					{color.hex} · ({color.h.toFixed(2)}, {color.s.toFixed(2)}%, {color.l.toFixed(2)}%)
				</li>
			{/each}
		</ul>

		{#if referenceColors.length}
			<ul class="palette">
				{#each referenceColors as code}
					<li class="swatch" style="background-color:{code};">{code}</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>
