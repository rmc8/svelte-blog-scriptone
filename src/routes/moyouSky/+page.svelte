<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
	<title>Scriptone - moyouSky - Bluesky Client Application</title>
	<meta name="description" content="BlueskyのClientアプリのmoyouSKyのホームページです。" />
	<meta name="twitter:site" content="@rmc_km" />
	<meta name="twitter:creator" content="@rmc_km" />
	<meta property="og:title" content="moyouSky - Bluesky Client Application" />
	<meta name="twitter:title" content="moyouSky - Bluesky Client Application" />
	<meta property="og:description" content="BlueskyのClientアプリのmoyouSKyのホームページです。。" />
	<meta name="twitter:description" content="BlueskyのClientアプリのmoyouSKyのホームページです。" />
	<meta
		name="twitter:image"
		content="/moyouSky/moyouSkyBanner.png"
	/>
	<meta
		property="og:image"
		content="/moyouSky/moyouSkyBanner.png"
	/>
</svelte:head>

<Header />

<main>
	<article>
		<div class="container">
			<section id="banner">
				<img src="/moyouSky/moyouSkyBanner.png" />
				<div class="banner-text">
					<p>Coming soon ...</p>
				</div>
			</section>
		</div>
	</article>
</main>
<Footer />

<style>
	.banner-text {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin-top: 20px;
	}
	ul,
	li {
		margin-left: 0px;
		padding: 0;
	}
	ul li ul,
	#tools ul {
		margin-top: 32px;
		margin-bottom: 32px;
	}
	ul li ul li,
	#tools ul li {
		margin-left: 32px;
		padding-left: 28px;
	}
	ul.decoration li:before {
		content: '✿';
		position: absolute;
		top: 0;
		left: 0;
		color: #008c9c;
	}

	#tools ul {
		text-align: left;
		margin-right: auto;
		padding-left: 0px;
	}

	#profile p {
		font-size: 18px;
		margin: 0;
		text-align: center;
	}

	#profile img.twitter_icon {
		width: 120px;
		height: 120px;
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 10px;
	}
	#profile h2.user_name {
		font-size: 24px;
		font-weight: 500;
		margin: 0;
		border: 0px;
		text-align: center;
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
