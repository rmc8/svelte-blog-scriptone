<script lang="ts">
	import { onMount } from 'svelte';

	interface Category {
		id: string;
		name: string;
		count: number;
	}
	interface Tag {
		id: string;
		name: string;
		count: number;
	}
	interface PostCount {
		yearMonth: string;
		count: number;
	}
	export let categories: Category[] = [];
	export let tags: Tag[] = [];
	export let postCounts: PostCount[] = [];

	function handleDateSelect(event: Event) {
		const select = event.target as HTMLSelectElement;
		if (select.value) {
			window.location.href = `/?d=${select.value}`;
		}
	}

	function getTagColor(index: number) {
		const colors = [
			'#00c0ce', // 明るい青緑（元の色）
			'#009cac', // 中間の青緑（元の色）
			'#00747c', // 暗い青緑（元の色）
			'#00a0b0', // 明るい青緑と中間の青緑の中間
			'#008890', // 中間の青緑と暗い青緑の中間
			'#609da2', // より明るい青緑
			'#006068', // より暗い青緑
			'#58b7bd', // 最も明るい青緑
			'#004c54' // 最も暗い青緑
		];
		return colors[index % colors.length];
	}

	function getTagSize(count: number) {
		const minSize = 12;
		const maxSize = 18;
		const maxCount = Math.max(...tags.map((t) => t.count));
		return minSize + (count / maxCount) * (maxSize - minSize);
	}
</script>

<footer class="mt-16 border-t border-[#eff3f3] text-center px-4 pt-16 pb-32">
	<h2 class="sr-only">サイトマップ</h2>
	<div class="container">
		<div id="sitemap" class="flex flex-wrap justify-start items-start">
			<section
				id="profile"
				class="w-full md:w-[46%] lg:w-[31%] ml-0 md:ml-5 mb-8 text-left flex flex-col items-center"
			>
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full text-left">Profile</h3>
				<div id="profile_header" class="text-center">
					<div class="profile-icon">
						<img
							src="https://rmc8.github.io/rmc_km/assets/icon/twi.webp"
							alt="TwitterIcon"
							class="twitter_icon flex justify-center items-center mx-auto"
						/>
					</div>
					<h4 class="user_name text-2xl font-medium m-0 pb-1">K</h4>
					<p class="flex items-center justify-center m-0">
						<img src="/logo/discord_icon.webp" alt="DiscordIcon" class="discord_icon" />
						k8x
					</p>
					<p class="text-center m-0 text-lg">
						<a href="https://k.rmc-8.com" class="flex items-center justify-center">
							<img
								src="/icon/bluesky.webp"
								alt="Bluesky_Icon"
								class="bsky_icon inline-block align-middle w-5 h-5 mr-1 mb-1 object-contain"
							/>k.rmc-8.com
						</a>
					</p>
				</div>
				<p class="p-4">
					プログラミング・書写・文房具・オーディオ・コーヒー・フレグランスなどいろいろと趣味があります。
					プログラミングはPythonがメインで、Scriptone開設時にJavaScriptを学び本サイトを作りました。
					本サイトや筆者の詳細は<a href="/about" class="about-link hover:underline">About</a
					>をご覧ください。
				</p>
				<!-- アーカイブ -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Archive</h3>
				<select
					on:change={handleDateSelect}
					class="mt-2 p-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">Select Month</option>
					{#each postCounts as postCount}
						<option value={postCount.yearMonth}>
							{postCount.yearMonth} ({postCount.count})
						</option>
					{/each}
				</select>
				<!-- カテゴリー -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Category</h3>
				<ul>
					{#each categories as category}
						<li>
							<a href="/?c={category.id}">{category.name} ({category.count})</a>
						</li>
					{/each}
				</ul>
			</section>

			<section class="w-full md:w-[46%] lg:w-[31%] ml-0 md:ml-5 mb-8 text-left">
				<!-- 内部リンク -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Link(Internal)</h3>
				<ul class="p-1">
					<li
						class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
					>
						<a href="/random_shosha" class="block w-full h-full">ランダム書写Bot</a>
					</li>
					<li
						class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
					>
						<a href="/project_sekai" class="block w-full h-full">プロセカ関連</a>
					</li>
					<li
						class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
					>
						<a href="/diary" class="block w-full h-full">ダイアリー</a>
					</li>
					<li
						class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
					>
						<a href="/privacy_policy" class="block w-full h-full">プライバシーポリシー・免責事項</a>
					</li>
				</ul>
				<!-- 外部リンク -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Link(External)</h3>
				<div class="external_links">
					<ul class="p-1">
						<li
							class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
						>
							<a
								class="inline-block bg-[url('/icon/bluesky.webp')] bg-no-repeat bg-[0_3px] bg-[length:22px] pl-7 pb-1 align-text-top external-link"
								href="https://bsky.app/profile/k.rmc-8.com">k.rmc-8.com</a
							>
						</li>
						<li
							class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
						>
							<a
								class="inline-block bg-[url('/icon/github.ico')] bg-no-repeat bg-[0_3px] bg-[length:22px] pl-7 pb-1 align-text-top external-link"
								href="https://github.com/rmc8/">GitHub</a
							>
						</li>
						<li
							class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
						>
							<a
								class="inline-block bg-[url('/icon/x.webp')] bg-no-repeat bg-[0_3px] bg-[length:22px] pl-7 pb-1 align-text-top external-link"
								href="https://twitter.com/rmc_km">@rmc_km</a
							>
						</li>
						<li
							class="p-2.5 rounded-md transition-colors duration-500 ease-in-out hover:bg-[--accent-color-light] hover:text-white"
						>
							<a
								class="inline-block bg-[url('/icon/amzn.webp')] bg-no-repeat bg-[0_4px] bg-[length:20px] pl-7 pb-1 align-text-top external-link"
								href="https://www.amazon.jp/hz/wishlist/ls/EFSY7JHYBP5K?ref_=wl_share">WithList</a
							>
						</li>
					</ul>
				</div>
				<!-- Buy me a coffee -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full">Buy me a coffee</h3>
				<div id="buyme">
					<ul class="p-1">
						<li class="mb-2">
							<a href="https://www.buymeacoffee.com/rmc8">
								<img
									class="bn"
									alt="buy_me_a_coffee"
									width="192"
									height="54"
									src="/logo/buy_me_a_coffee_y.webp"
								/>
							</a>
						</li>
						<li>
							<img
								class="qr"
								alt="buy_me_a_coffee_qr"
								width="120"
								height="120"
								src="/logo/buy_me_a_coffee_qr.webp"
							/>
						</li>
					</ul>
				</div>
			</section>
			<section class="w-full md:w-[46%] lg:w-[31%] ml-0 md:ml-5 mb-8 text-left">
				<!-- タグ -->
				<h3 class="text-2xl border-b border-[#ececec] text-gray-700 w-full mt-4">Tags</h3>
				<div class="tag-cloud">
					{#each tags as tag, index}
						<a
							href="/?t={tag.id}"
							class="tag-link"
							style="background-color: {getTagColor(index)}; font-size: {getTagSize(tag.count)}px;"
						>
							{tag.name} ({tag.count})
						</a>
					{/each}
				</div>
			</section>
		</div>
	</div>
	<div class="container">
		<p class="text-center">&copy;{new Date().getFullYear()} - Scriptone</p>
	</div>
</footer>

<style>
	.bsky_icon {
		width: 20px;
		height: 20px;
		margin-right: 4px;
		margin-bottom: 2px;
		object-fit: contain;
		display: inline-block;
		vertical-align: middle;
		border-radius: 0;
	}
	footer h3 {
		padding-bottom: 8px;
	}
	footer section ul li,
	.external-link {
		transition: all 750ms ease;
	}

	footer section ul li {
		list-style: none;
		padding: 10px;
		border-radius: 5px;
		margin-left: 0px;
		margin-bottom: 0px;
		width: 100%;
	}

	footer section ul li a {
		text-decoration: none;
		display: block;
		width: 100%;
		height: 100%;
		color: inherit;
	}

	footer section ul li:hover a {
		color: white;
	}

	footer section ul li:hover {
		background-color: --accent-color-light;
	}

	footer section {
		width: 100%;
		margin-left: 0px;
		display: block;
		text-align: left;
	}

	@media screen and (min-width: 904px) {
		footer section {
			width: 46%;
			margin-left: 20px;
		}
	}

	@media screen and (min-width: 1328px) {
		footer section {
			width: 31%;
			margin-left: 20px;
		}
	}

	#profile_header,
	#profile h4.user_name,
	#profile_header p {
		text-align: center;
	}

	#profile img.twitter_icon {
		width: 120px;
		height: 120px;
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 10px;
	}

	.discord_icon {
		width: 20px;
		height: 20px;
		margin-right: 2px;
		margin-bottom: 2px;
		object-fit: contain;
		display: inline-block;
		vertical-align: middle;
	}

	.bn {
		width: 192px;
	}

	.qr {
		width: 120px;
	}

	select {
		font-size: 14px;
		cursor: pointer;
	}

	select:hover {
		background-color: var(--accent-color-light);
		color: white;
	}

	.category-link {
		font-size: 14px;
		padding: 4px 8px;
		background-color: var(--accent-color-light);
		color: white;
		border-radius: 4px;
		text-decoration: none;
		transition: background-color 0.3s ease;
	}

	.category-link:hover {
		background-color: var(--accent-color-dark);
	}

	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		max-height: 888px;
		overflow-y: auto;
		padding: 10px;
		border-radius: 8px;
	}

	.tag-link {
		padding: 4px 8px;
		color: white;
		border-radius: 12px;
		text-decoration: none;
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.tag-link:hover {
		transform: scale(1.05);
		opacity: 0.9;
	}
</style>
