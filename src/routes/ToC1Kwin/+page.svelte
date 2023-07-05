<script lang="ts">
	import Header from '../../components/HeaderForPrsk.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
	<title>Scriptone - @Toc1Kwin's Profile & Tools</title>
	<meta name="description" content="ToC1Kwin@twitter.comのプロセカのプロフィールです。" />
	<meta name="twitter:site" content="@ToC1Kwin" />
	<meta name="twitter:creator" content="@ToC1Kwin" />
	<meta property="og:title" content="ToC1KWin@twitter.com Project Sekai Profile & Tools" />
	<meta name="twitter:title" content="ToC1KWin@twitter.com Project Sekai Profile & Tools" />
	<meta property="og:description" content="ToC1Kwin@twitter.comのプロセカのプロフィールです。" />
	<meta name="twitter:description" content="ToC1Kwin@twitter.comのプロセカのプロフィールです。" />
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/rmc8/ToC1Kwin/main/docs/assets/icon/eyecatch.jpg"
	/>
</svelte:head>

<Header />
<main>
	<article>
		<div class="container">
			<h1>Profile & Tools</h1>
			<section id="profile">
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
					/>うみつばめ(k8x)
				</p>
			</section>
			<section id="about">
				<h2>About</h2>
				<p>
					はじめまして。Kと申します。プロセカでおまかせしたり連勝したりすることが好きです。スタンプ押しながらまったりご一緒できましたらうれしいです！
				</p>
			</section>
			<section id="prsk">
				<h2>Project Sekai</h2>
				<ul style="padding:0;">
					<li style="padding:0">
						<h3>ツイ募</h3>
						<p>
							普段は36万編成で☆4募集を以下のようにしています。気持ち的にはだれでもご一緒したいのですが集まりが悪くなってしまうためやむを得ず☆4にしております。SFもとくに気にせず適当に叩きながらスタンプをひたすら連打しているので、気楽にご一緒できましたらうれしいです！
						</p>
						<div>
							<h4>マラソンイベ</h4>
							<blockquote>
								おまかせ(選曲○)【[room_number]】＠４<br />主：36万/[leader_skill]%　募：☆４<br
								/>#プロセカ募集 #プロセカ協力<br />
							</blockquote>
						</div>
						<div>
							<h4>チアフルイベ</h4>
							<blockquote>
								[team_name]【[room_number]】＠４<br />主：36万/[leader_skill]%　募：☆４<br
								/>#プロセカ募集 #プロセカ協力<br />
							</blockquote>
						</div>
					</li>
					<li>
						<h3>支援編成</h3>
						<p>
							ツイ募支援が多めですがお声がけくださいましたらDiscordの周回にもお邪魔します。連勝用であればいろいろな総合力の調整に対応できます。
						</p>
						<ul class="decoration">
							<li>150/690/36.3(P1)</li>
							<li>150/730/33.0(P1, L1)</li>
							<li>150/680/19.3</li>
							<li>100/650/19.3(回復リーダースキルマ)</li>
						</ul>
						<p />
					</li>
					<li>
						<h3>連勝</h3>
						<p>
							チアフルカーニバルイベントで固定メンバーやツイ募などでまったり連勝しています。1000連勝以上を目指した大型連勝も14か月しており1120連勝まで歩みを進められました。これからもツイボで色々な方々と連勝しながらときどき大型も楽しみたいです。以下は300連勝以上の記録です。
						</p>
						<ul id="winning_streak_record" class="decoration">
							<li>金魚グループ「株式会社スイミーグループ」1120連勝</li>
							<li>しょうゆグループ「fantasista」816連勝</li>
							<li>みどりぷよグループ「fantasista」500連勝</li>
							<li>サッカーグループ「浅瀬を遊泳中のニモ」456連勝</li>
							<li>しっとりした曲グループ「もういちど希望をみんなに！」399連勝</li>
							<li>山グループ「Quintet」350連勝</li>
							<li>金魚グループ「株式会社スイミーグループ」319連勝</li>
							<li>金魚グループ「株式会社スイミーグループ」307連勝</li>
							<li>お化け屋敷グループ「歌うよ！」302連勝</li>
							<li>ミルクグループ「ミルタンクが倒せない」301連勝</li>
						</ul>
						<p />
					</li>
					<li>
						<h3>イベラン</h3>
						<p>
							ほぼほぼツイボランでTwitterのTLをたびたび賑わせておりますが楽しくご一緒いただいてありがとうございます！
						</p>
						<ul id="event_rank" class="decoration">
							<li>青空に願うユア・ハピネス！ 4位</li>
							<li>MOREMOREMakingXmas 5位</li>
							<li>POP IN MY HEART!! 13位</li>
							<li>ハッピー・ラブリー・エブリデイ！ 23位</li>
							<li>Legend still vivid 32位</li>
							<li>Walk on and on 43位</li>
							<li>Cast Spell on You 62位</li>
							<li>お悩み聞かせて！わくわくピクニック 72位</li>
							<li>TOP200~TOP1000 25回</li>
						</ul>
						<p />
					</li>
				</ul>
			</section>
			<section id="hobby">
				<h2>Hobby</h2>
				<p>書ききれないぐらいに趣味がありますが5つ書きます。</p>
				<ul>
					<li>
						<h3>Coffee</h3>
						<p>
							自宅で豆を焼いて挽いて飲むぐらいにはコーヒーが好きです。苦みや酸味・甘味・香りのバランスを考えて焼いたり、ブレンドして味のバランスを整えたり、いれ方を変えて味変したりで意外と奥が深いです。豆を選ぶ瞬間からコーヒーの楽しみが広がっていて長いこと楽しんでいます。メインはコーヒーですがお茶も好きで紅茶・緑茶・ブレンドなど国内外を問わずにいろいろと取り寄せて楽しんでいます。
						</p>
					</li>
					<li>
						<h3>Stationery</h3>
						<p>
							長時間の勉強や書写が好きで文房具にこっています。万年筆やガラスペンが好きでインク集めて勉強だったり趣味だったりでのんびり文字を書いています。ちなみに文字を書くときは左利きです。手から伝わる滑らかな感触やインクの色・匂い、文字や絵から得られる刺激や知識がいつまで経っても飽きないですし、実用性もあるので気に入っている趣味の1つです。
						</p>
					</li>
					<li>
						<h3>Programming</h3>
						<p>
							プログラムを書くのが好きで、Discord用のBotも作っています。得意な言語はPythonで、他にもHTMLやJavaScript、Rustなどもお遊び程度に使っています。お仕事でもプログラムを書いていて簡単なWebアプリの構築やデータ分析、学習モデルの構築、めんどくさい作業の自動化とかとても好きです。お仕事以外だとGoogle
							Apps
							Scriptでもよく遊んでいます。Discordでプログラミングをする開発鯖もあるのでご興味のある方はぜひお声がけください。
						</p>
					</li>
					<li>
						<h3>Audio</h3>
						<p>
							一番長く続いている趣味だと思います。イヤホン・ヘッドホン・スピーカーとなんでも好きで、イヤホン自体をつくったり、アンプやケーブルを作ったりしながら音響システム全体の音を整えていくのがいつまでたっても終わりがなく楽しめます。音楽を聴くこと自体もとても楽しいですが、1つの音楽でも音や音楽の表現が変わって何度聞いても楽しい気持ちになれます。とても長く続けていても新しい発見が音楽にも機材側にもでてくるので手をかけることがやめられません。
						</p>
					</li>
					<li>
						<h3>Fragrance</h3>
						<p>
							コーヒーと同様に匂いが好きなので意外とハマっている趣味です。といいつつご存じの通り香水は匂いやクセが強いものもあって私自身もそのあたりのものだったり、電車で遠くからも香るような強烈な感じだったりは得意ではないです。なので、やわらかく瑞々しく香る傾向のあるアクアディパルマの製品に好みが偏りがちです。
						</p>
					</li>
				</ul>
			</section>
			<section id="tools">
				<h2>Tools</h2>
				<ul class="decoration">
					<li>
						<a href="/ToC1Kwin/event_point_calculator">独りんぼエンヴィーポイント計算</a>
					</li>
					<li>
						<a href="/ToC1Kwin/tag_search_query_collection">プロセカタグ検索クエリ集</a>
					</li>
					<li>
						<a href="/ToC1Kwin/cheerful_bingo/">Cheerful Bingo Card</a>
					</li>
					<li>
						<a href="/ToC1Kwin/cheerful_winning_streak_ranking/">チアフル連勝ランキング</a>
					</li>
					<li>
						<a href="/ToC1Kwin/simple_efficiency_table_for_prsk_music/">プロセカ楽曲効率表</a>
					</li>
					<!-- <li>						<a href="/ToC1Kwin/prsk_event_border_central/" target="_blank" rel="noopener noreferrer"							>プロセカイベントボーダー</a></li> -->
					<li>
						<a href="/ToC1Kwin/prsk_active_user_count/">プロセカアクティブユーザー数推移</a>
					</li>
				</ul>
			</section>
		</div>
	</article>
</main>
<Footer />

<style>
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
		color: #009898;
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
