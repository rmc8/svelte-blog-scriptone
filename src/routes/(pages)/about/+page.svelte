<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Scriptone - About</title>
	<meta name="description" content="Scriptoneについて記載しております。" />
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<h1>About</h1>
			<section>
				<h2>Scriptoneについて</h2>
				<p>
					『Scriptone』は筆者の趣味であるプログラミング・文房具・オーディオ・コーヒー・香水・美容や購入したものを自由にまとめつつ情報を共有するサイトです。
					加えて、プログラミングにより作った成果物を配ったり、ナレッジシェアをしたり、Webアプリとして公開したりなどもひとまとめに行います。
				</p>
				<p>
					『Scriptone』には`Script`や`tone`、あるいは`one`などの単語が含まれています。`Script`には手書きの文字やプログラムを書くことなどの意味が含まれています。
					生成AIにより文章やプログラムを書くこともできるようになりました。それでも人間が文字やプログラム・絵など手を動かし書く（描く）ことの重要性は変わりません。
					書く行為は言葉を使って思考をしその内容を伝えたり表現したりする行為であり、書き手も読み手も心を豊かにする人間らしい行為の1つです。
					生成AIがどれだけ発達しても人間が豊かに生きていくための機能として書くこと（あるいは思考をすること）は不可欠です。
					また`Tone`も同じく私の趣味のオーディオの音調（トーン）であったり、あるいは書写や文房におけるインクの色調（トーン）だったりもイメージしております。
					また`One`についてはインターネットやAIの登場により多様な情報があふれて集合知に触れる機会も増えていく中であっても個を忘れないことも意識しています。Only
					oneであり、創造する楽しみを忘れないこと。また、多様な趣味を一つに集約して掲載することをイメージしています。
				</p>
				<p>
					自らの趣味を書き、読み手や書き手の創造性を高め楽しみながら、すでにはじまっているAI時代を生き抜いて行きたいです。
					一個人の小さなサイトによる発信ですが知識や体験したことなどのシェアをしながら自分らしく生きる手助けをScriptoneを通じてできましたら幸いです。
				</p>
			</section>
			<section>
				<h2>Profile</h2>
				<p>
					Kという名前で<a href="https://twitter.com/rmc_km">Twitter</a
					>などに14年ほど気づいたら居座っています(2023年時点)。
					普段はお仕事や趣味でプログラミングをしており、メインの言語は<a
						href="https://www.python.org">Python</a
					>です。 このブログは<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript"
						>JavaScript</a
					>（や<a href="https://kit.svelte.dev">SvelteKit</a>・<a href="https://microcms.io"
						>MicroCMS</a
					>）などを初めて使ってつくりました。
				</p>
				<p>
					私の目標や、自身の経験や知識を通じて創造的な活動の楽しさや重要性を共有することです。
					同時にITやAIの発展によりこれらを活用できるかできないかによる格差も生じていますが、
					こうした格差をやわらげながらも人間らしい創造的な活動を生涯楽しみ続けながら生きていきたいです。
				</p>
				<p>
					AIの発達により、私たちは文章を手軽に書くことができるようになりました。また、私たちは生成AIの応答を自分の判断の参考にしたり、退屈な作業をAIに任せたりすることも可能になりました。
					あるいは生成AIを集合知のように扱いブレーンストーミングをしたり、自身のアイデアを磨いたりしながらゼロから新しいものを作る方もいるかもしれません。
					こうしたものができたのにはすぐれたAI・コンピューターの仕組みや構造もありますが、人間の創造の営みも確かにあります。
					AIにより手軽に情報に触れ生成できるようになりましたがそれでも人間が読み書きをやめるべきではありませんし創造的な活動をより楽しみAI時代を生きていくことが必要だと思います。
					これが私がScriptoneを更新していく理由であり、私の活動や発信により人間とAIの双方が成長していきより人生を楽しむ一助となることを願います。
				</p>
			</section>
		</div>
	</article>
</main>
<Footer categories={data.categories} tags={data.tags} postCounts={data.monthly_post_counts} />
