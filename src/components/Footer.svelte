<script>
	let categories = [
		{
			id: 'programming',
			name: 'Programming'
		},
		{
			id: 'gadget',
			name: 'Gadget'
		},
		{
			id: 'audio',
			name: 'Audio'
		}
		// {
		// 	id: 'coffee',
		// 	name: 'Coffee'
		// },
		// {
		// 	id: 'fragrance',
		// 	name: 'Fragrance'
		// },
	];
</script>

<footer>
	<h2 style="color:transparent;font-size:0;border:0;">サイトマップ</h2>
	<div class="container">
		<div id="sitemap">
			<section id="profile">
				<h3>Profile</h3>
				<div id="profile_header">
					<div class="profile-icon">
						<img
							src="https://rmc8.github.io/rmc_km/assets/icon/twi.webp"
							alt="TwitterIcon"
							class="twitter_icon"
						/>
					</div>
					<h4 class="user_name">K</h4>
					<p>
						<img
							src="https://rmc8.github.io/rmc_km/assets/icon/discord-mark-blue-icon.png"
							alt="DiscordIcon"
							class="discord_icon"
						/>
						k8x
					</p>
				</div>
				<p style="padding:16px;">
					プログラミング・書写・文房具・オーディオ・コーヒー・フレグランスなどいろいろと趣味があります。
					プログラミングはPythonがメインで、Scriptone開設時にJavaScriptを学び本サイトを作りました。
					本サイトや筆者の詳細は<a href="/about">About</a>をご覧ください。
				</p>
			</section>
			<section>
				<h3>Link(Internal)</h3>
				<ul>
					<li><a href="/moyouSky">moyouSky</a></li>
					<li><a href="/ToC1Kwin">プロセカ関連</a></li>
					<li><a href="/privacy_policy">プライバシーポリシー・免責事項</a></li>
				</ul>
				<h3>Link(External)</h3>
				<div class="external_links">
					<ul style="padding-left:24px;padding-right:24px;width:96%;">
						<li>
							<a
								style="background:url('/icon/bluesky.webp')"
								href="https://bsky.app/profile/k.rmc-8.com">k.rmc-8.com</a
							>
						</li>
						<li>
							<a
								style="background:url('https://github.githubassets.com/favicon.ico')"
								href="https://github.com/rmc8/">GitHub</a
							>
						</li>
						<li>
							<a
								style="background:url('https://abs.twimg.com/favicons/twitter.ico')"
								href="https://twitter.com/rmc_km">@rmc_km</a
							>
						</li>
						<!-- <li>
							<a
								style="background:url('https://zenn.dev/images/logo-transparent.png')"
								href="https://zenn.dev/km">Zenn</a
							>
						</li> -->
						<li>
							<a
								style="background:url('https://raw.githubusercontent.com/rmc8/rmc_km/main/docs/assets/icon/amznlogo.png');background-size:20px!important;background-position:0px 4px!important;"
								href="https://www.amazon.jp/hz/wishlist/ls/EFSY7JHYBP5K?ref_=wl_share">WithList</a
							>
						</li>
					</ul>
				</div>
			</section>
			<section>
				<h3>Category</h3>
				<ul>
					{#each categories as category}
						<li><a href="/category/{category.id}/p/1" rel="external">{category.name}</a></li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
	<div class="container">
		<p class="copyright">&copy;2023 - Scriptone</p>
	</div>
</footer>

<style>
	footer {
		margin-top: 64px;
		border-top: 1px solid #eff3f3;
		text-align: center;
		padding-left: 16px;
		padding-right: 16px;
		padding-top: 64px;
		padding-bottom: 128px;
	}
	footer div.external_links ul {
		list-style: none;
		padding: 0;
	}
	footer h3 {
		font-size: 1.5em;
		border-bottom: #ececec 1px solid;
		color: #444;
		width: 100%;
		text-align: left;
	}
	footer div.external_links ul li {
		text-align: left;
		list-style: none;
	}

	footer div.external_links ul li a {
		background-repeat: no-repeat !important;
		background-position: 0px 3px !important;
		background-size: 22px !important;
		padding-left: 28px;
		padding-top: 0px;
		padding-bottom: 4px;
		margin-right: 16px;
		vertical-align: text-top;
		width: auto;
	}

	#sitemap {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}

	footer #sitemap ul {
		justify-content: flex-start;
	}

	footer section ul {
		padding: 4px !important;
	}

	footer section ul li {
		list-style: none;
		padding: 10px;
		transition: background 0.5s ease, color 0.5s ease;
		border-radius: 5px;
		margin-left: 0px;
		margin-bottom: 0px;
		width: 100%;
	}

	.external_links ul li {
		margin-bottom: 8px;
		border-radius: 5px;
	}

	footer section ul li a {
		text-decoration: none;
		display: block;
		width: 100%;
		height: 100%;
	}

	footer section ul li:hover {
		/* background-color: #777; */
		background-color: #0aadb9;
		color: #fff;
	}

	footer section ul li:hover a {
		color: #fff;
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

	#sitemap ul li {
		margin-bottom: 0px;
	}
	.copyright {
		text-align: center;
	}

	#profile {
		flex-direction: column;
		align-items: center;
	}

	#profile_header,
	#profile h4.user_name,
	#profile_header p {
		text-align: center;
	}

	#profile h4.user_name {
		font-size: 24px;
		font-weight: 500;
		margin: 0;
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
</style>
