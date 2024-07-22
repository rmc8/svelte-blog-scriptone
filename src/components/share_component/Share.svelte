<script lang="ts">
	import xIcon from './img/x_share.webp';
	import blueskyIcon from './img/bsky_share.webp';
	import hatenaBookmarkIcon from './img/hatena_bookmark_share.webp';
	import threadsIcon from './img/threads_share.webp';
	import misskeyIcon from './img/misskey_share.webp';
	import mastodonIcon from './img/mastodon_share.webp';
	import pocketIcon from './img/pocket_share.webp';

	export let share_title: string;
	export let share_url: string;

	const newline: string = encodeURIComponent('\r\n');
	const encodedTitle: string = encodeURIComponent(share_title);
	const encodedUrl: string = encodeURIComponent(share_url);

	const BLUESKY_BASE_URL: string = `https://bsky.app/intent/compose?text=${encodedTitle}${newline}${encodedUrl}`;
	const X_BASE_URL: string = `https://twitter.com/intent/tweet?text=${encodedTitle}${newline}&url=${encodedUrl}`;
	const HATENA_BASE_URL: string = `https://b.hatena.ne.jp/add?url=${encodedUrl}`;
	const THREADS_BASE_URL: string = `https://www.threads.net/intent/post?text=${encodedTitle}${newline}${encodedUrl}`;
	const MISSKEY_BASE_URL: string = `https://misskey-hub.net/share?text=${encodedTitle}&url=${encodedUrl}`;
	const MASTODON_BASE_URL: string = `https://donshare.net/share.html?text=${encodedTitle}${newline}${encodedUrl}`;
	const POCKET_BASE_URL: string = `https://getpocket.com/edit?url=${encodedUrl}&title=${encodedTitle}`;

	interface ShareIcon {
		url: string;
		icon: string;
		alt: string;
	}

	const shareIcons: ShareIcon[] = [
		{ url: X_BASE_URL, icon: xIcon, alt: 'Share on X' },
		{ url: BLUESKY_BASE_URL, icon: blueskyIcon, alt: 'Share on Bluesky' },
		{ url: HATENA_BASE_URL, icon: hatenaBookmarkIcon, alt: 'Share on Hatena Bookmark' },
		{ url: POCKET_BASE_URL, icon: pocketIcon, alt: 'Save to Pocket' },
		{ url: THREADS_BASE_URL, icon: threadsIcon, alt: 'Share on Threads' },
		{ url: MASTODON_BASE_URL, icon: mastodonIcon, alt: 'Share on Mastodon' },
		{ url: MISSKEY_BASE_URL, icon: misskeyIcon, alt: 'Share on Misskey' }
	];
</script>

<div class="share_block">
	<h2>Share</h2>
	<div class="share-icons-container">
		<div class="share-icons-scroll">
			{#each shareIcons as { url, icon, alt }}
				<a href={url} target="_blank" rel="noopener noreferrer" class="share-icon-link">
					<div class="share-icon-wrapper">
						<img src={icon} {alt} class="share-icon" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">	.share-icons-container {
		@apply relative w-full overflow-hidden mt-8 mb-8;
	}
	.share-icons-scroll {
		@apply flex space-x-4 overflow-x-auto pb-4 -mb-4;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}
	.share-icons-scroll::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
	.share-icon-wrapper {
		@apply w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#0aadb9] hover:bg-[#089aa5] transition-all duration-300 ease-in-out;
	}
	.share-icon {
		@apply w-6 h-6 object-contain transition-transform duration-300 ease-in-out;
		filter: brightness(0) invert(1) brightness(1.2);
	}
	.share-icon-link:hover .share-icon {
		@apply transform scale-110;
	}
	@media (max-width: 640px) {
		.share-icon-wrapper {
			@apply w-10 h-10;
		}
		.share-icon {
			@apply w-5 h-5;
		}
	}
</style>
