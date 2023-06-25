<script>
	let categories = [
		{
			id: 'audio',
			name: 'Audio'
		},
		{
			id: 'coffee',
			name: 'Coffee'
		},
		{
			id: 'fragrance',
			name: 'Fragrance'
		},
		{
			id: 'gadget',
			name: 'Gadget'
		},
		{
			id: 'programming',
			name: 'Programming'
		}
	];
</script>

<footer>
	<h2 style="color:transparent;font-size:0;border:0;">サイトマップ</h2>
	<div class="container">
		<div id="sitemap">
			<section>
				<h3>Profile</h3>
				<div>

				</div>
			</section>
			<section>
				<h3>Category</h3>
				<ul>
					{#each categories as category}
						<li><a href="https://blog.rmc-8.com/category/{category.id}">{category.name}</a></li>
					{/each}
				</ul>
			</section>
			<section>
				<h3>Link</h3>
				<ul>
					<li><a href="https://blog.rmc-8.com/privacy_policy">プライバシーポリシー・免責事項</a></li>
				</ul>
			</section>
		</div>
	</div>
	<div class="container">
		<div class="external_links">
			<ul style="padding-left:24px;padding-right:24px;width:96%;">
				<li>
					<a
						style="background:url('https://abs.twimg.com/favicons/twitter.ico')"
						href="https://twitter.com/rmc_km">@rmc_km</a
					>
				</li>

				<li>
					<a
						style="background:url('https://zenn.dev/images/logo-transparent.png')"
						href="https://zenn.dev/km">Zenn</a
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
						style="background:url('https://raw.githubusercontent.com/rmc8/rmc_km/main/docs/assets/icon/amznlogo.png');background-size:20px!important;background-position:0px 4px!important;"
						href="https://www.amazon.jp/hz/wishlist/ls/EFSY7JHYBP5K?ref_=wl_share">WithList</a
					>
				</li>
			</ul>
		</div>
		<p>&copy;2023 - Scriptone</p>
	</div>
</footer>

<style>
	footer {
		margin-top: 64px;
		border-top: 1px solid #eff3f3;
		text-align: center;
	}
	footer div.external_links ul {
		text-align: center;
		display: flex;
		list-style: none;
		justify-content: center;
		padding: 0;
	}
	footer h3 {
		font-size: 1.5em;
		border-bottom: #ececec 1px solid;
		color: #444;
		width: 100%;
		text-align: left;
	}
	footer section li {
		list-style: none;
	}
	footer div.external_links ul li {
		text-align: left;
		list-style: none;
	}

	footer div.external_links ul li a {
		background-repeat: no-repeat !important;
		background-position: 0px 3px !important;
		background-size: 22px !important;
		padding-left: 24px;
		padding-top: 2px;
		padding-bottom: 2px;
		margin-right: 24px;
		vertical-align: text-top;
	}

	#sitemap {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}

	footer section ul {
		padding: 4px;
	}

	footer section ul li {
		list-style: none;
		padding: 10px;
		transition: background 0.3s ease, color 0.3s ease;
	}

	footer section ul li a {
		color: #444;
		text-decoration: none;
	}

	footer section ul li:hover {
		background-color: #777;
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
</style>
