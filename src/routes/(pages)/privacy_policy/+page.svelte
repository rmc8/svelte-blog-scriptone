<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Scriptone - プライバシーポリシー・免責事項</title>
	<meta name="description" content="Detail Pages" />
	<meta name="robots" content="noindex" />
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<h1>プライバシーポリシー・免責事項</h1>
			<section>
				<h2>当ブログの運営者情報</h2>
				<p>運営者：K</p>
				<p>ブログ名：Scriptone</p>
				<p>ブログURL：<a href="https://rmc-8.com/">https://blog.rmc-8.com/</a></p>
				<p>連絡先：contact*rmc-8.com (*を半角のアットマークに置換してください。)</p>
			</section>
			<section>
				<h2>当ブログのプライバシーポリシー</h2>
				<h3>初出掲載日・最終改定日</h3>
				<p>初出掲載日：2021年2月25日</p>
				<p>最終改定日：2024年7月23日</p>
				<!-- 以下にその他のプライバシーポリシーセクションが続きます。-->
			</section>

			<section>
				<h2>個人情報の利用目的</h2>
				<p>
					お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
					取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
				</p>
			</section>

			<section>
				<h2>Cookieについて</h2>
				<p>
					当ブログはユーザーの利便性向上や広告の配信のためにCookieを使用しています。ブラウザの設定によりCookieを無効にすることが可能ですが、その場合、当ブログの全ての機能が正常に動作しない場合があります。
				</p>
			</section>

			<section>
				<h2>広告の配信について</h2>
				<p>
					当ブログはGoogle及びGoogleのパートナーウェブサイト（第三者配信事業者）の提供する広告を設置しております。その広告配信にはCookieを使用し、当ブログを含む過去のアクセス情報に基づいて広告を配信します。
				</p>
			</section>

			<section>
				<h2>コメントについて</h2>
				<p>
					当ブログへのコメントを残す際に、IPアドレスを収集しています。また、すべてのコメントは管理人が事前にその内容を確認し、承認した上での掲載となります。特定の自然人または法人を誹謗し、中傷するコメントや、極度にわいせつな内容を含むコメントなどは承認されません。
				</p>
			</section>

			<section>
				<h2>お問い合わせフォームについて</h2>
				<p>
					当ブログでは、お問い合わせフォームからお問い合わせいただく際に、お名前とメールアドレス等の個人情報をご登録いただいています。これらの情報はお問い合わせに対する回答を行うためのみに使用し、その他の目的では利用いたしません。
				</p>
			</section>

			<section>
				<h2>著作権・肖像権について</h2>
				<p>
					当ブログで掲載している文章や画像などの著作権は放棄しておりません。著作権の侵害を目的とするものではありません。著作権や肖像権に関して問題がありましたらご連絡ください。
				</p>
			</section>

			<section>
				<h2>リンクについて</h2>
				<p>
					当ブログは基本的にリンクフリーです。ただし、当ブログに掲載されている画像への直リンクや、インラインフレームによる当ブログのコンテンツの使用はご遠慮ください。
				</p>
			</section>

			<section>
				<h2>免責事項</h2>
				<p>
					当ブログは、アフィリエイトプログラムを使って商品を紹介しており、直接の販売は行っておりません。本免責事項、および当ブログに掲載しているすべての記事は、予告なしに変更・削除されることがあります。
				</p>
			</section>

			<section>
				<h2>プライバシーポリシー・免責事項の変更について</h2>
				<p>
					当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーおよび免責事項の内容を適宜見直しその改善に努めます。
				</p>
			</section>
		</div>
	</article>
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />
