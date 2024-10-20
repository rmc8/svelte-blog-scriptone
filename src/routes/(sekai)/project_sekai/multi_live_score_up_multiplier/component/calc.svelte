<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	let leaderMultiplier: number = $state(110);
	let otherMultipliers: number[] = $state([110, 110, 110, 110]);
	let scoreUpResult: number = $state(198);
	let internalValue: string = $state('110/550');

	function calculateScoreUp(): void {
		const sumOfOthers: number = otherMultipliers.reduce((acc, val) => acc + val, 0);
		const totalMultiplier: number = leaderMultiplier + sumOfOthers;
		scoreUpResult = Math.floor(leaderMultiplier + sumOfOthers / 5);
		internalValue = `${leaderMultiplier}/${totalMultiplier}`;
	}

	function handleInput(event: Event, index?: number): void {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/[^0-9]/g, '');
		if (index !== undefined) {
			otherMultipliers[index] = parseInt(value) || 0;
		} else {
			leaderMultiplier = parseInt(value) || 0;
		}
	}
</script>

<section id="calc" class="w-full">
	<h3 class="mb-2">スコアアップ倍率計算</h3>
	<p class="pb-8">
		リーダーおよびリーダー以外の合計５人分のスコアアップ倍率を入力して計算ボタンを押してください。みんなでライブでのスコアアップ倍率などが計算できます。
	</p>
	<div class="text-left w-full">
		<form
			onsubmit={preventDefault(calculateScoreUp)}
			class="flex flex-col gap-6 max-w-md"
			style="margin-left: 0;"
		>
			<div class="flex items-center text-left">
				<label for="leader" class="font-medium text-gray-700 w-48">1枠（リーダー）</label>
				<div class="relative flex-1">
					<input
						id="leader"
						type="text"
						value={leaderMultiplier}
						oninput={handleInput}
						maxlength="3"
						class="w-full py-2 px-3 border-b-2 border-gray-300 focus:border-[#0aadb9] outline-none transition-colors"
					/>
					<span class="absolute right-0 top-2 text-gray-500">%</span>
				</div>
			</div>
			{#each otherMultipliers as multiplier, index (index)}
				<div class="flex items-center">
					<label for={`other-${index}`} class="font-medium text-gray-700 w-48"
						>{index + 2}枠</label
					>
					<div class="relative flex-1">
						<input
							id={`other-${index}`}
							type="text"
							value={multiplier}
							oninput={(event) => handleInput(event, index)}
							maxlength="3"
							class="w-full py-2 px-3 border-b-2 border-gray-300 focus:border-[#0aadb9] outline-none transition-colors"
						/>
						<span class="absolute right-0 top-2 text-gray-500">%</span>
					</div>
				</div>
			{/each}
			<button
				type="submit"
				class="bg-[#0aadb9] text-white py-2 px-4 rounded-lg hover:bg-[#088f9c] transition-colors font-medium w-full"
				><b>計算</b></button
			>
		</form>
		<div class="mt-6 bg-[#e6f7f8] p-4 rounded-lg text-[#0aadb9] font-medium  max-w-md">
			<p class="mb-2">スコアアップ倍率（実効値）＝ <b>{scoreUpResult}%</b></p>
			<p>内部値 ＝ <b>{internalValue}</b></p>
		</div>
	</div>
</section>
