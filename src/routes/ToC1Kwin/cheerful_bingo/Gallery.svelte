<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import lightGallery from 'lightgallery';
	import 'lightgallery/css/lightgallery.css';

	let images = [];
	let isLoading = true;
	let galleryElement;
	let galleryInstance;

	onMount(async () => {
		const numbers = new Set();
		while (numbers.size < 6) {
			numbers.add(Math.floor(Math.random() * 1000) + 1);
		}
		for (const number of numbers) {
			const paddedNumber = String(number).padStart(4, '0');
			const baseUrl = 'https://raw.githubusercontent.com/rmc8/prsk_bingo_card/';
			const imagePath = `${baseUrl}/bingo/bingo_${paddedNumber}.png`;
			images.push(imagePath);
		}
		isLoading = false;

		// Wait for the next microtask to ensure that the DOM is updated
		await Promise.resolve();

		// Initialize lightGallery after the images are loaded
		galleryInstance = lightGallery(galleryElement, {});
	});

	onDestroy(() => {
		galleryInstance?.destroy(true);
	});
</script>

<section id="bingo">
	<div class="container" id="lightgallery_images">
		<h2>Cheerful Bingo</h2>
		<p>チアフルイベント用のビンゴカードがランダムで6種類表示されます。ご自由にご活用ください！</p>
		<div id="gallery" bind:this={galleryElement}>
			{#if isLoading}
				<div>Loading...</div>
			{:else}
				{#each images as image}
					<div class="bingo_card">
						<a href={image} data-src={image} class="gallery-item">
							<img src={image} alt={image} class="gallery-item" />
						</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	#gallery {
		display: flex;
		flex-wrap: wrap;
	}

	.bingo_card img {
		width: 100%;
	}

	@media only screen and (max-width: 767px) {
		.bingo_card {
			max-width: 50%;
		}
	}

	@media only screen and (min-width: 768px) {
		.bingo_card {
			max-width: 33%;
		}
	}
</style>
