<script>
    export let profile_link_enable = true;
</script>

<section id="proseka_profile">
	<div class="profile-icon">
		<img
			src="https://rmc8.github.io/ToC1Kwin/assets/icon/twi.jpg"
			alt="TwitterIcon"
			class="twitter_icon"
		/>
	</div>
	<h2 class="user_name">K</h2>
	<p>
		<img
			src="https://rmc8.github.io/ToC1Kwin/assets/icon/discord-mark-blue-icon.png"
			alt="DiscordIcon"
			class="discord_icon"
		/>k8x
	</p>
	<p>
		<a href="https://x.com/mskydev">
			<img src="/icon/x.webp" alt="X_Icon" class="x_icon" />mskydev
		</a>
	</p>
</section>
<section id="about">
    <p>
        Kと申します。プロセカでおまかせしたり連勝したりすることが好きです。イベランは４位・５位・その他TOP1000↑が40個ほどあり、連勝は1120連勝しています。普段はとてもゆるい周回をしているので、スタンプ押しながらまったりご一緒できましたらうれしいです！{#if profile_link_enable}プロセカの詳細なプロフィールはURLからご覧ください。URL: <a href="https://rmc-8.com/ToC1Kwin">https://rmc-8.com/ToC1Kwin</a>{/if}
    </p>
</section>

<style>
    #about {
        margin-top: 32px;
    }
	#proseka_profile p {
		font-size: 18px;
		margin: 0;
		text-align: center;
	}

	#proseka_profile img.twitter_icon {
		width: 120px;
		height: 120px;
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 10px;
	}
	#proseka_profile h2.user_name {
		font-size: 24px;
		font-weight: 500;
		margin: 0;
		border: 0px;
		text-align: center;
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
	}
	.x_icon {
		margin-right: 1px;
	}
</style>
