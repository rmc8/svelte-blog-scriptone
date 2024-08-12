<script lang="ts">
	import { tick } from 'svelte';

	export let postCounts: { date: string; count: number }[];

	let isOpen = false;

	async function toggleDropdown() {
		console.log('Dropdown toggled');
		isOpen = !isOpen;
		console.log('isOpen:', isOpen);
		await tick();
	}

	function formatDate(date: string): string {
		const [year, month] = date.split('-');
		return `${year}年${parseInt(month)}月`;
	}

	function getLink(date: string): string {
		return `/date/${date}/1`;
	}

	$: console.log('postCounts:', postCounts);
</script>

<div class="dropdown">
	<a href="/#" on:click|preventDefault|stopPropagation={toggleDropdown}>アーカイブ</a>
	{#if isOpen}
		<ul class="dropdown-content">
			{#each postCounts as { date, count }}
				<li>
					<a href={getLink(date)}>
						{formatDate(date)} ({count}件)
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		position: absolute;
		top: 100%;
		left: 0;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}

	.dropdown-content li {
		list-style-type: none;
	}

	.dropdown-content a {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}

	.dropdown-content a:hover {
		background-color: #f1f1f1;
	}
</style>
