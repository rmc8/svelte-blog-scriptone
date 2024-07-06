<script>
	export let profile_link_enable = true;
</script>

<section id="proseka_profile" class="flex flex-col items-center">
	<div class="profile-icon">
		<img
			src="https://rmc8.github.io/ToC1Kwin/assets/icon/twi.jpg"
			alt="TwitterIcon"
			class="twitter_icon w-30 h-30 rounded-full object-cover mb-2"
		/>
	</div>
	<h2 class="user_name text-2xl font-medium text-center m-0">K</h2>
	<p class="text-center m-0 text-lg">
		<img
			src="https://rmc8.github.io/ToC1Kwin/assets/icon/discord-mark-blue-icon.png"
			alt="DiscordIcon"
			class="discord_icon inline-block align-middle w-5 h-5 mr-1 mb-1 object-contain"
		/>k8x
	</p>
	<p class="text-center m-0 text-lg">
		<a href="https://x.com/mskydev" class="flex items-center justify-center">
			<img
				src="/icon/x.webp"
				alt="X_Icon"
				class="x_icon inline-block align-middle w-5 h-5 mr-1 mb-1 object-contain"
			/>mskydev
		</a>
	</p>
</section>
<section id="about" class="mt-8">
	<p class="text-center text-lg">
		Kと申します。プロセカでおまかせしたり連勝したりすることが好きです。イベランは４位・５位・その他TOP1000↑が40個ほどあり、チアフル連勝は1120連勝しています。普段はとてもゆるい周回をしているので、スタンプ押しながらまったりMV鑑賞や特攻などなんでもご一緒できましたらうれしいです！{#if profile_link_enable}プロセカの詳細なプロフィールはURLからご覧ください。URL:
			<a href="https://rmc-8.com/ToC1Kwin" class="text-blue-500 hover:underline"
				>https://rmc-8.com/ToC1Kwin</a
			>{/if}
	</p>
</section>

<style>
	#about p {
		text-align: left;
	}
	#proseka_profile img.twitter_icon {
		width: 120px;
		height: 120px;
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 10px;
	}
	#proseka_profile h2.user_name {
		border: 0px;
	}

	.discord_icon,
	.x_icon {
		width: 20px;
		height: 20px;
		margin-right: 4px;
		margin-bottom: 2px;
		object-fit: contain;
		display: inline-block;
		vertical-align: middle;
		border-radius: 0;
	}
	.x_icon {
		margin-right: 2px;
	}
</style>
