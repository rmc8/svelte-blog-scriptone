<script lang="ts">
	import xIcon from './img/x_share.webp';
	import blueskyIcon from './img/bsky_share.webp';
	import hatenaBookmarkIcon from './img/hatena_bookmark_share.webp';
	import threadsIcon from './img/threads_share.webp';
	import misskeyIcon from './img/misskey_share.webp';
	import mastodonIcon from './img/mastodon_share.webp';

	export let share_title: string;
	export let share_url: string;

	const newline = encodeURIComponent('\n');
	const encodedTitle = encodeURIComponent(share_title);
	const encodedUrl = encodeURIComponent(share_url);

	const BLUESKY_BASE_URL = `https://bsky.app/intent/compose?text=${encodedTitle}${newline}${encodedUrl}`;
	const X_BASE_URL = `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`;
	const HATENA_BASE_URL = `https://b.hatena.ne.jp/add?url=${encodedUrl}`;
	const THREADS_BASE_URL = `https://www.threads.net/intent/post?text=${encodedTitle}${newline}${encodedUrl}`;
	const MISSKEY_BASE_URL = `https://misskey-hub.net/share?text=${encodedTitle}&url=${encodedUrl}`;
	const MASTODON_BASE_URL = `https://donshare.net/share.html?text=${encodedTitle}${newline}${encodedUrl}`;
</script>

<div class="share_block">
	<h2>Share</h2>
	<div class="flex space-x-4 mt-8 mb-8">
		{#each [{ url: X_BASE_URL, icon: xIcon, alt: 'Share on X' }, { url: BLUESKY_BASE_URL, icon: blueskyIcon, alt: 'Share on Bluesky' }, { url: HATENA_BASE_URL, icon: hatenaBookmarkIcon, alt: 'Share on Hatena Bookmark' }, { url: THREADS_BASE_URL, icon: threadsIcon, alt: 'Share on Threads' }, { url: MASTODON_BASE_URL, icon: mastodonIcon, alt: 'Share on Mastodon' }, { url: MISSKEY_BASE_URL, icon: misskeyIcon, alt: 'Share on Misskey' }] as { url, icon, alt }}
			<a href={url} target="_blank" rel="noopener noreferrer" class="share-icon-link">
				<div class="share-icon-wrapper">
					<img src={icon} {alt} class="share-icon" />
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="postcss">
	.share-icon-wrapper {
		@apply w-12 h-12 flex items-center justify-center rounded-full bg-[#0aadb9] hover:bg-[#089aa5] transition-all duration-300 ease-in-out;
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
