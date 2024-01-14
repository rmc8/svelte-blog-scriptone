<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import Support from '../../components/Support.svelte';
</script>

<svelte:head>
	<title>Scriptone - ランダム書写@shosha.rmc-8.com</title>
	<meta name="description" content="Blueskyで運用しているランダム書写botのページです" />
	<meta name="twitter:site" content="@rmc_km" />
	<meta name="twitter:creator" content="@rmc_km" />
	<meta property="og:title" content="ランダム書写BotのWebページです" />
	<meta name="twitter:title" content="ランダム書写BotのWebページです" />
	<meta property="og:description" content="Blueskyで運用しているランダム書写botのページです" />
	<meta name="twitter:description" content="Blueskyで運用しているランダム書写botのページです" />
</svelte:head>

<Header />

<main>
	<article>
		<div class="container">
			<section id="banner">
				<h2>ランダム書写Bot(@shosha.rmc-8.com)</h2>
				<p>
					Blueskyで運用している<a href="https://bsky.app/profile/shosha.rmc-8.com"
						>ランダム書写bot(@shosha.rmc-8.com)</a
					>のページです。
				</p>
			</section>
			<section id="how-to-play">
				<h2>ランダム書写Botの遊び方</h2>
				<p>
					ランダム書写Botの投稿に返信するか、@shosha.rmc-8.comをPostに含めて投稿するとランダム書写Botから書写用のお題をランダムでお返事します。お返事のお題に沿ってお気に入りの紙・ペンなどで書写をして、書写した画像をタグ(#ランダム書写)とともに投稿してください。みんなで書写したり文房具を使ったりする楽しみをシェアしましょう！
				</p>
				<div><img src="/random_shosha/random_shosha.jpeg" /></div>
			</section>
			<section id="spec">
				<h2>仕様</h2>
				<p>
					お題は著作権が切れた作者様の作品を活用しております。ポストのリンクは青空文庫の該当する作品のページに設定しており、原文をご確認いただけます。BotはPythonで記述しており、通知欄のReplyとMentionのうちお返事が1つもないポストに対して自動返信するように24時間Botを動かしております。Botにより作家＞作品＞文章の選定をランダムで行い都度、文字から画像を作る処理をしており動作状況により自動返信にお時間をいただく場合もございます。
				</p>
				<p>
					現時点では誰でも無料でBotをご活用いただけます。利用者様が増えたり安全な活用の必要性が生じた場合に、相互フォローのみに自動返信を制限するなど仕様を変更する可能性はあります。
				</p>
			</section>
			<section id="contact">
				<h2>お問い合わせ</h2>
				<p>
					Botに関するお問い合わせがありましたら<a href="https://k.rmc-8.com">@k.rmc-8.com</a
					>宛にご連絡ください。Botはプログラムで通知欄を見るのみですので、お返事が難しく無差別にお題をお返事してしまいます。ご不便をおかけしますがよろしくお願いいたします。
				</p>
			</section>
		</div>
	</article>
</main>
<Footer />

<style>
</style>
