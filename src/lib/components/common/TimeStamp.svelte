<script lang="ts">
	import ClockOutline from 'svelte-material-icons/ClockTimeThree.svelte';
	interface Props {
		dtStr: string;
	}

	let { dtStr }: Props = $props();
</script>

<div class="flex items-center">
	<div class="clock pt-1">
		<ClockOutline width={22} height={22} color="#777777" } />
	</div>
	<time class="text-gray-500 ml-1">
		{new Date(dtStr)
			.toLocaleString('ja-JP', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			})
			.replace(/\//g, '-')}
	</time>
</div>
